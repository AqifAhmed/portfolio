/* Mobile menu open/close */
export function initNav() {
  const burger = document.getElementById('nav-burger');
  const menu = document.getElementById('mobile-menu');
  if (!burger || !menu) return;

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

/* Nav compacts once the page is scrolled */
export function initNavCompact() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('is-compact', window.scrollY > 24);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* Highlights the nav link for the section currently in view, and updates the 0X/0X readout */
export function initActiveSection() {
  const deskLinks = [...document.querySelectorAll('.nav__links a')];
  const allLinks = document.querySelectorAll('.nav__links a, .mobile-menu a');
  const indexEl = document.querySelector('.nav__index');
  if (!allLinks.length) return;

  const total = deskLinks.length;
  const sections = deskLinks
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);
  if (!sections.length) return;

  const setActive = (id) => {
    allLinks.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === `#${id}`));
    const pos = deskLinks.findIndex((a) => a.getAttribute('href') === `#${id}`);
    if (indexEl && pos > -1) {
      indexEl.textContent = `${String(pos + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
    }
  };

  const io = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter((e) => e.isIntersecting);
      if (visible.length) setActive(visible[0].target.id);
    },
    { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
  );
  sections.forEach((s) => io.observe(s));
}
