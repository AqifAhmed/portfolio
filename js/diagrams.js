/* Plays each diagram's entrance animation once, the first time it scrolls into view */
export function initDiagrams() {
  const targets = document.querySelectorAll('.diagram, .pipeline');
  if (!targets.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-active');
        io.unobserve(entry.target);
      }
    },
    { threshold: 0.35 }
  );
  targets.forEach((el) => io.observe(el));
}
