// Mobile menu toggle + footer year.
export function initNav() {
  const burger = document.getElementById('nav-burger');
  const menu = document.getElementById('mobile-menu');

  burger.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
  });

  menu.querySelectorAll('a').forEach(link =>
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    })
  );

  document.getElementById('year').textContent = new Date().getFullYear();
}
