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

/* Local time (UTC+5) in the hero */
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

document.getElementById('year').textContent = new Date().getFullYear();
initTheme();
initNav();
initReveal();
initClock();
