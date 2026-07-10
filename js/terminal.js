// Runs a short simulated automation script in the hero terminal card —
// the site's signature element: the thing it's about, literally executing.

const SCRIPT = [
  { type: 'prompt', text: 'python pipeline.py --watch inbox/', delay: 35 },
  { type: 'line', text: 'loading 3 workflow steps…', pause: 300 },
  { type: 'ok', text: 'connected: gmail api', pause: 220 },
  { type: 'ok', text: 'classified 14 new messages', pause: 220 },
  { type: 'ok', text: 'drafted 6 replies, flagged 2 leads', pause: 220 },
  { type: 'line', text: 'no manual triage required.', pause: 260 },
  { type: 'done', text: 'done in 1.2s — watching for next run', pause: 0 },
];

export function initTerminal() {
  const body = document.getElementById('terminal-body');
  if (!body) return;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) {
    body.innerHTML = SCRIPT.map(lineHtml).join('');
    return;
  }

  run(body);
}

function lineHtml(step) {
  const cls = step.type === 'prompt' ? 'terminal__line terminal__prompt'
    : step.type === 'ok' ? 'terminal__line terminal__ok'
    : step.type === 'done' ? 'terminal__line terminal__ok'
    : 'terminal__line';
  return `<div class="${cls}">${escapeHtml(step.text)}</div>`;
}

async function run(body) {
  body.innerHTML = '';
  for (const step of SCRIPT) {
    const line = document.createElement('div');
    line.className = step.type === 'prompt' ? 'terminal__line terminal__prompt'
      : step.type === 'ok' || step.type === 'done' ? 'terminal__line terminal__ok'
      : 'terminal__line';
    body.appendChild(line);

    if (step.type === 'prompt') {
      await typeInto(line, step.text, step.delay || 25);
    } else {
      line.textContent = step.text;
    }

    if (step.pause) await sleep(step.pause);
  }
  const cursor = document.createElement('span');
  cursor.className = 'terminal__cursor';
  body.lastElementChild.appendChild(cursor);
}

function typeInto(el, text, delay) {
  return new Promise(resolve => {
    let i = 0;
    const tick = () => {
      el.textContent = text.slice(0, i);
      i++;
      if (i <= text.length) {
        setTimeout(tick, delay);
      } else {
        resolve();
      }
    };
    tick();
  });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function escapeHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
