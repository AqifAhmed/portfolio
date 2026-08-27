const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Scroll reveal — staggers siblings that enter together */
export function initReveal() {
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(
    (entries) => {
      let stagger = 0;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.style.setProperty('--reveal-delay', `${stagger * 90}ms`);
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
        stagger++;
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
  );
  els.forEach((el) => io.observe(el));
}

/* Local time (UTC+5) — used in the terminal header and the stat rail */
export function initClock() {
  const els = document.querySelectorAll('[data-local-time]');
  if (!els.length) return;
  const tick = () => {
    const text = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Karachi',
    }).format(new Date());
    els.forEach((el) => (el.textContent = text));
  };
  tick();
  setInterval(tick, 30_000);
}

/* Scroll progress bar — fills 0→100% as you scroll */
export function initScrollProgress() {
  const bar = document.querySelector('.scroll-progress');
  if (!bar || REDUCED) return;

  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? window.scrollY / max : 0;
    bar.style.transform = `scaleX(${Math.min(1, Math.max(0, p))})`;
  };

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      update();
      ticking = false;
    });
  }, { passive: true });
  update();
}

/* Terminal typing — types each command left-to-right, staggered */
export function initTyping() {
  const cmds = document.querySelectorAll('.terminal .cmd-text');
  if (!cmds.length || REDUCED) return;

  const charsPerTick = 2;
  const tickMs = 30;
  const cmdDelay = 500;

  cmds.forEach((el, i) => {
    const full = el.textContent;
    el.textContent = '';
    let idx = 0;
    const startAt = performance.now() + 600 + i * cmdDelay;

    const tick = (now) => {
      const t = (now - startAt) / tickMs;
      if (t < 0) return requestAnimationFrame(tick);
      idx = Math.min(full.length, Math.floor(t) * charsPerTick);
      el.textContent = full.slice(0, idx);
      if (idx < full.length) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}

/* Section-title scramble — resolves to the real text as it enters view */
export function initScramble() {
  const els = document.querySelectorAll('[data-scramble]');
  if (!els.length || REDUCED) return;

  const chars = 'abcdefghijklmnopqrstuvwxyz#_/-';
  const rand = (n) => Array.from({ length: n }, () => chars[(Math.random() * chars.length) | 0]).join('');

  const run = (el) => {
    const full = el.textContent;
    const len = full.length;
    let frame = 0;
    const totalFrames = 14;

    const step = () => {
      frame++;
      const revealCount = Math.floor((frame / totalFrames) * len);
      el.textContent = full.slice(0, revealCount) + rand(Math.max(0, len - revealCount));
      if (frame < totalFrames) requestAnimationFrame(step);
      else el.textContent = full;
    };
    requestAnimationFrame(step);
  };

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        run(entry.target);
        io.unobserve(entry.target);
      }
    },
    { threshold: 0.4 }
  );
  els.forEach((el) => io.observe(el));
}

/* Pointer-tracked glow on the hero terminal panel */
export function initTerminalGlow() {
  if (REDUCED || window.matchMedia('(pointer: coarse)').matches) return;
  const terminal = document.querySelector('.terminal');
  if (!terminal) return;
  terminal.addEventListener('pointermove', (e) => {
    const r = terminal.getBoundingClientRect();
    terminal.style.setProperty('--gx', `${e.clientX - r.left}px`);
    terminal.style.setProperty('--gy', `${e.clientY - r.top}px`);
  });
}

/* Stack bento cards — click to expand curriculum detail */
export function initStackCards() {
  const cards = document.querySelectorAll('.stack-card');
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const open = card.getAttribute('aria-expanded') === 'true';
      card.setAttribute('aria-expanded', String(!open));
    });
  });
}
