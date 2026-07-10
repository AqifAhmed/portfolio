// Renders Work + Roadmap sections from data/projects.json.
// To update projects, edit that file only — this module never needs to change.

export async function loadProjects(onRendered) {
  const shippedGrid = document.getElementById('shipped-grid');
  const roadmapList = document.getElementById('roadmap-list');

  try {
    const res = await fetch('data/projects.json');
    if (!res.ok) throw new Error('Could not load projects.json');
    const data = await res.json();

    renderShipped(shippedGrid, data.shipped || []);
    renderRoadmap(roadmapList, data.roadmap || []);
  } catch (err) {
    shippedGrid.innerHTML = `<p class="mono-tag">Couldn't load projects.json — see console.</p>`;
    console.error(err);
  }

  if (typeof onRendered === 'function') onRendered();
}

function renderShipped(grid, items) {
  grid.innerHTML = items.map((p, i) => `
    <article class="project-card reveal">
      <div class="project-card__visual">
        <span class="project-card__index">${String(i + 1).padStart(2, '0')}</span>
      </div>
      <div class="project-card__body">
        <span class="project-card__year">${escapeHtml(p.year || '')}</span>
        <h3 class="project-card__title">${escapeHtml(p.title)}</h3>
        <p class="project-card__subtitle">${escapeHtml(p.subtitle || '')}</p>
        <p class="project-card__desc">${escapeHtml(p.description || '')}</p>
        <div class="tech-row">
          ${(p.tech || []).map(t => `<span class="tech-pill">${escapeHtml(t)}</span>`).join('')}
        </div>
        ${p.github
          ? `<a class="project-card__link" href="${escapeAttr(p.github)}" target="_blank" rel="noopener">View code <span class="arrow">↗</span></a>`
          : (p.demo ? `<a class="project-card__link" href="${escapeAttr(p.demo)}" target="_blank" rel="noopener">View demo <span class="arrow">↗</span></a>` : '')}
      </div>
    </article>
  `).join('');
}

function renderRoadmap(list, items) {
  list.innerHTML = items.map((p, i) => `
    <div class="roadmap-item reveal">
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
