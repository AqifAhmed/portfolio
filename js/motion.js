const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ==========================================================================
   Motion budget: two moments, both tied to the report/instrumentation
   concept, not decoration.

   1. initSectionAwareness — the rail's "Section" field and the nav's
      active-link state track scroll position. This is the site's only
      wayfinding mechanism; it replaces what used to be a nav index counter
      and a separate scroll-progress bar.
   2. initValueSettle — a measured number (a project's `numbers` entry)
      counts up to its value once, the first time it scrolls into view, like
      an instrument settling on a reading. It only fires where a real
      measured number exists.

   Everything else that used to live here (scroll reveal, a live clock, a
   scroll-progress bar, terminal typing, a title scramble, a pointer-tracked
   glow, stack-card expand) was ambient decoration unrelated to the site's
   subject matter and has been deleted, not disabled.
   ========================================================================== */

export function initSectionAwareness() {
  const navLinks = [...document.querySelectorAll('.nav__links a, .mobile-menu a')];
  const railSection = document.getElementById('rail-section');
  const mobileRailSection = document.getElementById('mobile-rail-section');
  if (!navLinks.length) return;

  const sections = navLinks
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);
  const uniqueSections = [...new Set(sections)];
  if (!uniqueSections.length) return;

  const setActive = (id) => {
    navLinks.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === `#${id}`));
    if (railSection) railSection.textContent = id;
    if (mobileRailSection) mobileRailSection.textContent = id;
  };

  const io = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter((e) => e.isIntersecting);
      if (visible.length) setActive(visible[0].target.id);
    },
    { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
  );
  uniqueSections.forEach((s) => io.observe(s));
}

export function initValueSettle() {
  const els = document.querySelectorAll('.project__number');
  if (!els.length) return;

  // Picks the number that reads as the measured value out of a free-form
  // string like "p95 latency 340ms" or "$0.42 per 1M tokens" or "recall@5 =
  // 0.81". Numbers glued to a preceding letter or "@" are index/label noise
  // ("p95", "recall@5"), not the reading — skip those. Among what's left,
  // prefer a decimal (a measurement is more often "0.81" than a bare "5").
  function pickReading(text) {
    const candidates = [...text.matchAll(/(?<![a-zA-Z0-9@])-?\d+(\.\d+)?/g)];
    if (!candidates.length) return null;
    return candidates.find((m) => m[0].includes('.')) || candidates[0];
  }

  const run = (el) => {
    const full = el.textContent;
    const match = pickReading(full);
    if (!match || REDUCED) return;

    const target = parseFloat(match[0]);
    const prefix = full.slice(0, match.index);
    const suffix = full.slice(match.index + match[0].length);
    const decimals = match[0].includes('.') ? match[0].split('.')[1].length : 0;
    const duration = 500;
    const start = performance.now();

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = (target * eased).toFixed(decimals);
      el.textContent = `${prefix}${current}${suffix}`;
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = full;
    };
    requestAnimationFrame(tick);
  };

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        run(entry.target);
        io.unobserve(entry.target);
      }
    },
    { threshold: 0.6 }
  );
  els.forEach((el) => io.observe(el));
}
