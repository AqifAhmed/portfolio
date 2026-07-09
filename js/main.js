// ==========================================================================
// THEME TOGGLE (light / dark, persisted)
// ==========================================================================
(function initTheme() {
  const root = document.documentElement;
  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = stored || (prefersDark ? 'dark' : 'light');
  root.setAttribute('data-theme', theme);

  const toggle = document.getElementById('theme-toggle');
  toggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
})();

// ==========================================================================
// MOBILE MENU
// ==========================================================================
(function initMobileMenu() {
  const burger = document.getElementById('nav-burger');
  const menu = document.getElementById('mobile-menu');
  burger.addEventListener('click', () => menu.classList.toggle('open'));
  menu.querySelectorAll('a').forEach(link =>
    link.addEventListener('click', () => menu.classList.remove('open'))
  );
})();

// ==========================================================================
// FOOTER YEAR
// ==========================================================================
document.getElementById('year').textContent = new Date().getFullYear();

// ==========================================================================
// PROJECTS — loaded from data/projects.json
// To add/update/remove a project, edit that file only. No HTML/JS editing.
// ==========================================================================
(async function loadProjects() {
  const shippedGrid = document.getElementById('shipped-grid');
  const roadmapList = document.getElementById('roadmap-list');

  try {
    const res = await fetch('data/projects.json');
    if (!res.ok) throw new Error('Could not load projects.json');
    const data = await res.json();

    renderShipped(data.shipped || []);
    renderRoadmap(data.roadmap || []);
  } catch (err) {
    shippedGrid.innerHTML = `<p class="mono-tag">Couldn't load projects.json — see console.</p>`;
    console.error(err);
  }

  function renderShipped(items) {
    shippedGrid.innerHTML = items.map(p => `
      <article class="project-card">
        <span class="project-card__year">${escapeHtml(p.year || '')}</span>
        <h3 class="project-card__title">${escapeHtml(p.title)}</h3>
        <p class="project-card__subtitle">${escapeHtml(p.subtitle || '')}</p>
        <p class="project-card__desc">${escapeHtml(p.description || '')}</p>
        <div class="tech-row">
          ${(p.tech || []).map(t => `<span class="tech-pill">${escapeHtml(t)}</span>`).join('')}
        </div>
        ${p.github ? `<a class="project-card__link" href="${escapeAttr(p.github)}" target="_blank" rel="noopener">View code ↗</a>`
          : (p.demo ? `<a class="project-card__link" href="${escapeAttr(p.demo)}" target="_blank" rel="noopener">View demo ↗</a>` : '')}
      </article>
    `).join('');
  }

  function renderRoadmap(items) {
    roadmapList.innerHTML = items.map((p, i) => `
      <div class="roadmap-item">
        <div class="roadmap-node">${String(i + 1).padStart(2, '0')}</div>
        <div class="roadmap-body">
          <div class="roadmap-body__top">
            <h3 class="roadmap-title">${escapeHtml(p.title)}</h3>
            <span class="roadmap-status">${escapeHtml(p.status || 'planned')}</span>
          </div>
          <p class="roadmap-subtitle">${escapeHtml(p.subtitle || '')}</p>
          <p class="roadmap-desc">${escapeHtml(p.description || '')}</p>
          ${p.why ? `<p class="roadmap-why">${escapeHtml(p.why)}</p>` : ''}
          <div class="tech-row">
            ${(p.tech || []).map(t => `<span class="tech-pill">${escapeHtml(t)}</span>`).join('')}
          </div>
        </div>
      </div>
    `).join('');
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }
  function escapeAttr(str) { return escapeHtml(str); }
})();
