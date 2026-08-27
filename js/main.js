import { initNav, initNavCompact, initActiveSection } from './nav.js';
import {
  initReveal,
  initClock,
  initScrollProgress,
  initTyping,
  initScramble,
  initTerminalGlow,
  initStackCards,
} from './motion.js';
import { initDiagrams } from './diagrams.js';

document.getElementById('year').textContent = new Date().getFullYear();

initNav();
initNavCompact();
initActiveSection();
initReveal();
initClock();
initScrollProgress();
initTyping();
initScramble();
initTerminalGlow();
initStackCards();
initDiagrams();
