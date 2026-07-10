import { initTheme } from './theme.js';
import { initNav } from './nav.js';
import { initTerminal } from './terminal.js';
import { initReveal, initMagnetic } from './reveal.js';
import { loadProjects } from './projects.js';

initTheme();
initNav();
initTerminal();
initReveal();
initMagnetic();

// Project cards are injected after fetch, so re-run reveal observation
// once they exist in the DOM.
loadProjects(() => initReveal());
