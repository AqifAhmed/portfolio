import { content } from './content.js';
import { initNav } from './nav.js';
import { initSectionAwareness, initValueSettle } from './motion.js';

/* ==========================================================================
   STATUS GATE
   This is the one rule the whole site is built to enforce: a project, log
   entry, or diagram marked 'planned' is not evidence of anything, so it
   must never reach a stranger's screen. Every render function below filters
   through `isShipped` before touching the DOM — there is deliberately no
   flag, query param, or config value that can flip this back on. If you
   want a 'planned' item to show up, ship it and change its status field.
   ========================================================================== */
const isShipped = (item) => item.status === 'shipped';

function escapeHtml(str) {
  return String(str ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

/* ==========================================================================
   VALIDATION — console-only, never blocks rendering
   ========================================================================== */
function validateContent() {
  content.projects.filter(isShipped).forEach((p) => {
    if (!p.repoUrl) {
      console.error(`[content] shipped project "${p.id}" has no repoUrl.`);
    }
    if (!p.evidence || p.evidence.length === 0) {
      console.error(`[content] shipped project "${p.id}" has no evidence entries.`);
    }
    if (!p.numbers || p.numbers.length === 0) {
      console.warn(`[content] shipped project "${p.id}" has no measured numbers — this is the site's main point of differentiation, fill it in when you have real data.`);
    }
    if (!p.role) {
      console.error(`[content] shipped project "${p.id}" has no role set.`);
    }
  });
}

/* ==========================================================================
   HERO + RAIL
   ========================================================================== */
function deriveStack() {
  const map = new Map();
  content.projects.filter(isShipped).forEach((p) => {
    (p.stack || []).forEach((tech) => {
      if (!map.has(tech)) map.set(tech, []);
      map.get(tech).push(p.title);
    });
  });
  return [...map.entries()].map(([name, projects]) => ({ name, projects }));
}

function renderHero() {
  const { hero } = content;

  const pageTitle = `Aqif Ahmed, ${hero.headline}`;
  const titleEl = document.querySelector('title');
  if (titleEl) titleEl.textContent = pageTitle;
  setMeta('name', 'description', content.site.description);
  setMeta('property', 'og:title', pageTitle);
  setMeta('property', 'og:description', content.site.description);

  const about = document.getElementById('hero-about');
  if (about) about.textContent = hero.aboutText;

  const railSubject = document.getElementById('rail-subject');
  if (railSubject) railSubject.textContent = hero.headline;

  const railStatus = document.getElementById('rail-status');
  if (railStatus) railStatus.textContent = hero.status;

  const railReading = document.getElementById('rail-reading');
  if (railReading) {
    const count = content.projects.filter(isShipped).length;
    railReading.textContent = `${count} shipped`;
  }
}

function setMeta(attr, key, value) {
  const el = document.querySelector(`meta[${attr}="${key}"]`);
  if (el) el.setAttribute('content', value);
}

/* ==========================================================================
   NOW
   ========================================================================== */
function renderNow() {
  const el = document.getElementById('now-list');
  if (!el) return;
  el.innerHTML = content.now.map((row) => `
    <div class="now-row">
      <span class="now-row__key">${escapeHtml(row.key)}</span>
      <span class="now-row__val">${escapeHtml(row.val)}</span>
    </div>
  `).join('');
}

/* ==========================================================================
   BUILD — diagrams, gated by the shipped status of the project they explain
   ========================================================================== */
function renderBuild() {
  const el = document.getElementById('build-grid');
  if (!el) return;

  const shippedDiagrams = content.diagrams.filter(isShipped);

  if (!shippedDiagrams.length) {
    el.innerHTML = `
      <div class="diagram diagram--empty">
        <p class="diagram__desc">No shipped project justifies a diagram yet. This section fills in automatically as inference-bench and rag-eval ship.</p>
      </div>
    `;
    return;
  }

  el.innerHTML = shippedDiagrams.map(renderDiagram).join('');
}

function renderDiagram(d) {
  const project = content.projects.find((p) => p.id === d.projectId);
  const label = project ? `how ${d.title} works in ${project.title}` : d.title;
  const wide = d.type === 'pipeline' ? ' diagram--wide' : '';

  return `
    <div class="diagram${wide}" data-diagram>
      <div class="diagram__head">
        <span class="diagram__title">${escapeHtml(label)}</span>
        <span class="diagram__tag">${escapeHtml(d.tag)}</span>
      </div>
      ${d.desc ? `<p class="diagram__desc">${escapeHtml(d.desc)}</p>` : ''}
    </div>
  `;
}

/* ==========================================================================
   STACK — a table row per technology, computed as the union of `stack`
   arrays across shipped projects only. There is no interaction here and
   nothing to author by hand; see deriveStack() above.
   ========================================================================== */
function renderStack() {
  const el = document.getElementById('stack-table-body');
  if (!el) return;

  const stack = deriveStack();

  if (!stack.length) {
    el.innerHTML = `<tr><td colspan="2">No shipped project yet.</td></tr>`;
    return;
  }

  el.innerHTML = stack.map((s) => `
    <tr>
      <td>${escapeHtml(s.name)}</td>
      <td>${escapeHtml(s.projects.join(', '))}</td>
    </tr>
  `).join('');
}

/* ==========================================================================
   LOG
   ========================================================================== */
function renderLog() {
  const el = document.getElementById('log-list');
  if (!el) return;

  const entries = content.logEntries
    .filter(isShipped)
    .slice()
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  if (!entries.length) {
    el.innerHTML = `<p class="diagram__desc">Nothing logged yet.</p>`;
    return;
  }

  el.innerHTML = entries.map((entry) => {
    const related = entry.projectId ? content.projects.find((p) => p.id === entry.projectId) : null;
    return `
      <article class="log-entry">
        <div class="log-entry__meta">
          <span class="log-entry__date">${escapeHtml(entry.date)}</span>
          ${related ? `<span class="log-entry__project">./${escapeHtml(related.title)}</span>` : ''}
        </div>
        <h3 class="log-entry__title">${escapeHtml(entry.title)}</h3>
        <p class="log-entry__body">${escapeHtml(entry.body)}</p>
        ${entry.link ? `<a href="${escapeHtml(entry.link)}" target="_blank" rel="noopener" class="log-entry__link">Full write-up</a>` : ''}
      </article>
    `;
  }).join('');
}

/* ==========================================================================
   PROJECTS — each one renders as a spec table: field name, measured value.
   ========================================================================== */
function renderProjects() {
  const el = document.getElementById('projects-list');
  if (!el) return;

  const shippedProjects = content.projects
    .filter(isShipped)
    .slice()
    .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

  if (!shippedProjects.length) {
    el.innerHTML = `<p class="diagram__desc">Nothing shipped yet.</p>`;
    return;
  }

  el.innerHTML = shippedProjects.map(renderProject).join('');
}

function renderProject(p) {
  const featuredClass = p.featured ? ' project--featured' : '';

  const rows = [
    ['role', escapeHtml(p.role)],
    p.problem ? ['problem', escapeHtml(p.problem)] : null,
    p.approach ? ['approach', escapeHtml(p.approach)] : null,
    (p.stack || []).length ? ['stack', escapeHtml(p.stack.join(', '))] : null,
    (p.evidence || []).length
      ? ['evidence', p.evidence.map((e) => `<a href="${escapeHtml(e.url)}" target="_blank" rel="noopener">${escapeHtml(e.label)}</a>`).join(' &nbsp; ')]
      : null,
  ].filter(Boolean);

  const numbers = (p.numbers || []).length
    ? `<div class="project__numbers">${p.numbers.map((n) => `<span class="project__number">${escapeHtml(n)}</span>`).join('')}</div>`
    : '';

  return `
    <article class="project${featuredClass}">
      <h3 class="project__title">./${escapeHtml(p.title)}</h3>
      <p class="project__tagline">${escapeHtml(p.tagline)}</p>
      <p class="project__summary">${escapeHtml(p.summary)}</p>
      <table class="project__spec">
        ${rows.map(([label, value]) => `<tr><th scope="row">${label}</th><td>${value}</td></tr>`).join('')}
      </table>
      ${numbers}
    </article>
  `;
}

/* ==========================================================================
   EDUCATION
   ========================================================================== */
function renderEducation() {
  const el = document.getElementById('edu-band');
  if (!el) return;
  const e = content.education;
  el.innerHTML = `
    <div class="edu-col">
      <div class="edu-row"><span class="edu-row__key">degree</span><span class="edu-row__val">${escapeHtml(e.degree)}</span></div>
      <div class="edu-row"><span class="edu-row__key">coursework</span><span class="edu-row__val">${escapeHtml(e.coursework)}</span></div>
    </div>
    <div class="edu-col">
      <div class="edu-row"><span class="edu-row__key">focus</span><span class="edu-row__val">${escapeHtml(e.focus)}</span></div>
      <div class="edu-row"><span class="edu-row__key">languages</span><span class="edu-row__val">${escapeHtml(e.languages)}</span></div>
    </div>
  `;
}

/* ==========================================================================
   CONTACT
   ========================================================================== */
function renderContact() {
  const el = document.getElementById('contact-links');
  if (!el) return;
  el.innerHTML = content.contact.map((c) => `
    <a href="${escapeHtml(c.href)}" class="contact-link"${c.href.startsWith('http') ? ' target="_blank" rel="noopener"' : ''}${c.download ? ' download' : ''}>
      <span class="contact-link__label">${escapeHtml(c.label)}</span>
      <span class="contact-link__value">${escapeHtml(c.value)}</span>
    </a>
  `).join('');
}

/* ==========================================================================
   BOOT
   ========================================================================== */
validateContent();

renderHero();
renderNow();
renderBuild();
renderStack();
renderLog();
renderProjects();
renderEducation();
renderContact();

document.getElementById('year').textContent = new Date().getFullYear();

initNav();
initSectionAwareness();
initValueSettle();
