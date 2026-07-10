// Scroll-triggered fade/slide reveal for .reveal elements, staggered within
// their parent group. Also a subtle magnetic pull on primary CTA buttons.

export function initReveal() {
  const groups = new Map(); // parent element -> count, for stagger delay

  const items = document.querySelectorAll('.reveal');
  items.forEach(el => {
    const parent = el.parentElement;
    const index = groups.get(parent) || 0;
    el.style.setProperty('--delay', `${Math.min(index * 70, 350)}ms`);
    groups.set(parent, index + 1);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  items.forEach(el => observer.observe(el));
}

export function initMagnetic() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  document.querySelectorAll('.magnetic').forEach(btn => {
    let bounds;
    btn.addEventListener('mouseenter', () => { bounds = btn.getBoundingClientRect(); });
    btn.addEventListener('mousemove', (e) => {
      if (!bounds) bounds = btn.getBoundingClientRect();
      const x = (e.clientX - bounds.left - bounds.width / 2) * 0.18;
      const y = (e.clientY - bounds.top - bounds.height / 2) * 0.28;
      btn.style.transform = `translate(${x}px, ${y}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });
}
