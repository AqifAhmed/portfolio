/* Theme toggle — initial theme is set inline in <head> to avoid a flash. */
function initTheme() {
  const root = document.documentElement;
  document.getElementById('theme-toggle').addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
}

/* Mobile menu */
function initNav() {
  const burger = document.getElementById('nav-burger');
  const menu = document.getElementById('mobile-menu');

  const close = () => {
    burger.setAttribute('aria-expanded', 'false');
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
  };

  burger.addEventListener('click', () => {
    const open = burger.getAttribute('aria-expanded') === 'true';
    if (open) close();
    else {
      burger.setAttribute('aria-expanded', 'true');
      menu.classList.add('is-open');
      menu.setAttribute('aria-hidden', 'false');
    }
  });

  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));
}

/* Scroll reveal — staggers siblings that enter together. */
function initReveal() {
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

/* Local time (UTC+5) in the terminal header */
function initClock() {
  const el = document.getElementById('local-time');
  if (!el) return;
  const tick = () => {
    el.textContent = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Karachi',
    }).format(new Date());
  };
  tick();
  setInterval(tick, 30_000);
}

/* Scroll progress bar — fills 0→100% as you scroll. */
function initScrollProgress() {
  const bar = document.querySelector('.scroll-progress');
  if (!bar) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;

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

/* Nav compacts once the page is scrolled. */
function initNavCompact() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('is-compact', window.scrollY > 24);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* Magnetic buttons — pointer-follow translate, disabled on touch. */
function initMagnetic() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const els = document.querySelectorAll('[data-magnetic]');
  if (!els.length) return;

  els.forEach((el) => {
    const strength = 4;
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) / (r.width / 2);
      const y = (e.clientY - r.top - r.height / 2) / (r.height / 2);
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    });
    el.addEventListener('pointerleave', () => {
      el.style.transform = '';
    });
  });
}

/* Terminal typing — types each command text left-to-right, staggered. */
function initTyping() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cmds = document.querySelectorAll('.terminal .cmd-text');
  if (!cmds.length || reduced) return;

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

document.getElementById('year').textContent = new Date().getFullYear();
initTheme();
initNav();
initReveal();
initClock();
initScrollProgress();
initNavCompact();
initMagnetic();
initTyping();
