/* ==========================================================================
   CONTENT — the only file that should change day to day.

   Every project, log entry, and diagram carries a `status` of either
   'shipped' or 'planned'. js/main.js enforces a hard gate: nothing marked
   'planned' is ever rendered, under any condition. See the comment above
   the filter in js/main.js for why.

   The ~/stack section has no entries of its own — it is *computed* by
   main.js as the union of `stack` arrays across shipped projects. That is
   deliberate: it is the mechanism that keeps the stack section from ever
   claiming a technology no shipped project actually used.

   To add a project, flip one to shipped, or add a log entry, see CONTENT.md.
   ========================================================================== */

export const content = {

  site: {
    // The <title> and og:title are built from hero.headline below, so the
    // browser tab and the page itself never say different things.
    description: 'Aqif Ahmed is a final-year Software Engineering student in Lahore building backend systems now, and building toward applied AI infrastructure over the next 8 months. Every claim on this site links to a shipped artifact.',
  },

  hero: {
    // Suggested by design: present-tense, defensible today. No project has
    // shipped that demonstrates "AI Engineer" work yet.
    //
    // NOTE: flip this to "AI Infrastructure Engineer" once BOTH
    // 'inference-bench' and 'rag-eval' below are status: 'shipped'. Not
    // before — those two are what the claim would rest on.
    headline: 'backend & infrastructure engineer, building toward applied ai',

    // Rewritten from the old about.txt, which described prompting/RAG/agent
    // work that had not actually been built. This describes what exists.
    aboutText: "I build backend systems — typed APIs, rate-limited proxies, offline-first apps. I'm currently on an 8-month plan toward applied AI infrastructure: self-hosted inference benchmarking, then a RAG pipeline with a real evaluation harness. This site updates as each one ships, not before.",

    // Not "ai engineering roles" — no shipped project demonstrates that yet.
    status: 'open to backend & infrastructure roles',
  },

  now: [
    { key: 'status', val: 'Open to backend & infrastructure roles, building toward applied AI.' },
    { key: 'building', val: 'Inference-bench: self-hosted LLM inference, benchmarked against hosted APIs.' },
    { key: 'next', val: 'Ship inference-bench, then a RAG pipeline with a real evaluation harness.' },
  ],

  // Reverse-chronological. Newest first. See CONTENT.md for the template.
  logEntries: [
    {
      date: '2026-09-08',
      title: 'Rebuilt the site around one content file, added a status gate',
      body: "Pulled every piece of content out of index.html into js/content.js and rewrote the renderer around a hard status gate: anything marked 'planned' never reaches the page, and there is no flag or query parameter that overrides it. Deleted the 9-domain curriculum grid and the generic RAG / agent-loop / similarity diagrams that implied hands-on experience I don't have yet — the ~/stack section now only lists technologies that a shipped project actually used, and ~/build stays empty until a shipped project justifies a diagram. This log is the new source of truth for what's actually happening, in order, as it happens.",
      link: '',
      projectId: '',
      status: 'shipped',
    },
  ],

  // Attached to a specific project via projectId, and rendered only once
  // that project is 'shipped' — see Core change 5. None of the three
  // diagrams below are justified by shipped work yet, so all three stay
  // 'planned' and the ~/build section renders nothing. The SVG markup and
  // animation code in js/diagrams.js is untouched and will be reused the
  // moment one of these flips.
  diagrams: [
    {
      id: 'rag-pipeline',
      type: 'pipeline',
      title: 'retrieval pipeline',
      projectId: 'rag-eval',
      tag: 'retrieval, then generation',
      desc: 'Documents get chunked and embedded once, up front. At query time, the same embedding model turns the question into a vector, pulls the closest chunks, and hands them to the model as context.',
      status: 'planned',
    },
    {
      id: 'agent-loop',
      type: 'loop',
      title: 'ReAct agent loop',
      // NOTE: no planned project below currently involves an agent loop.
      // Do not flip this to 'shipped' until a project both ships AND
      // actually implements this pattern — assign its id here first.
      projectId: '',
      tag: 'think → act → observe',
      desc: '',
      status: 'planned',
    },
    {
      id: 'similarity-rank',
      type: 'rank',
      title: 'similarity ranking',
      projectId: 'rag-eval',
      tag: 'cosine similarity, top-k cutoff',
      desc: 'The query and every chunk live in the same vector space, so "closest" is just a number. Rank by it, keep the top-k, drop the rest — that cutoff is what actually lands in the model\'s context.',
      status: 'planned',
    },
  ],

  education: {
    degree: 'BS Software Engineering, University of Central Punjab (UCP), Lahore',
    coursework: 'DSA, System Design, Applied Machine Learning, Formal Methods',
    focus: 'Backend & infrastructure now, building toward applied AI infrastructure',
    languages: 'English (professional), Urdu (native)',
  },

  contact: [
    { label: 'email', value: 'aqifarain@gmail.com', href: 'mailto:aqifarain@gmail.com' },
    { label: 'x', value: '@aqifahmed_', href: 'https://x.com/aqifahmed_' },
    { label: 'github', value: '@aqifahmed', href: 'https://github.com/aqifahmed' },
    { label: 'linkedin', value: '/in/aqifahmed', href: 'https://linkedin.com/in/aqifahmed' },
    { label: 'resume', value: 'download pdf', href: 'assets/AqifAhmed.pdf', download: true },
  ],

  // See Project shape rules documented in CONTENT.md. Order here is only a
  // fallback — the renderer puts any shipped project with `featured: true`
  // first, then shipped projects in array order, before anything planned
  // (which never renders at all).
  projects: [
    {
      id: 'invisiblesearch',
      title: 'InvisibleSearch',
      tagline: 'live github search engine',
      status: 'shipped',
      summary: 'A minimal search engine over all of GitHub, live. Queries proxy straight to the GitHub search index through a FastAPI backend, mapped into typed, paginated results.',
      role: 'solo',
      problem: 'The GitHub search API returns loosely-typed, rate-limited JSON with no guarantee of availability under repeated queries — a client built directly against it breaks under real use.',
      approach: 'Built a FastAPI backend that proxies queries behind a debounced, keyboard-navigable frontend, maps raw responses into typed paginated results, caches per-query for 60s, and surfaces structured 429s with reset timestamps in the UI instead of failing silently. Containerized with Docker Compose; pytest suite runs against a mocked GitHub client.',
      // NOTE: no measured numbers yet (latency, cache hit rate, etc). This
      // is intentionally left empty rather than filled with guesses —
      // validateContent() will warn about it in the console until it's
      // filled with something actually measured.
      numbers: [],
      stack: ['python', 'fastapi', 'javascript', 'docker'],
      evidence: [
        { label: 'live', url: 'https://invisiblesearch.aqifahmed.com' },
        { label: 'github', url: 'https://github.com/AqifAhmed/InvisibleSearch' },
      ],
      repoUrl: 'https://github.com/AqifAhmed/InvisibleSearch',
      liveUrl: 'https://invisiblesearch.aqifahmed.com',
      writeupUrl: '',
    },
    {
      id: 'netzero',
      title: 'NetZero',
      tagline: 'cross-platform expense app',
      status: 'shipped',
      summary: 'A cross-platform app for tracking expenses offline, with no network round trip required to read or write a record.',
      role: 'solo',
      problem: 'Expense entries need to persist and reload reliably with no connection, and a small React Native app can turn into unmanageable prop-drilling fast without a plan for state.',
      approach: 'Built around a central state layer and reusable components, with validation at the input boundary. Every record writes to local storage directly, so the app is offline-first rather than offline-tolerant.',
      numbers: [],
      stack: ['react-native', 'expo', 'javascript'],
      evidence: [
        { label: 'live', url: 'https://netzero.aqifahmed.com' },
        { label: 'github', url: 'https://github.com/AqifAhmed/NetZero' },
      ],
      repoUrl: 'https://github.com/AqifAhmed/NetZero',
      liveUrl: 'https://netzero.aqifahmed.com',
      writeupUrl: '',
    },

    // ---- Month-8 slots. All 'planned'. Field names are pre-shaped so
    // finishing the work is a matter of filling values and flipping one
    // word, not restructuring the object. None of these render anywhere
    // while status is 'planned' — see js/main.js's status gate. ----

    {
      id: 'inference-bench',
      title: 'Inference Bench',
      tagline: 'self-hosted llm inference & benchmarking',
      status: 'planned',
      // Flagship: when shipped, render first and visually largest.
      featured: true,
      summary: '',
      role: 'solo',
      problem: '',
      approach: '',
      numbers: [],
      stack: [],
      evidence: [],
      repoUrl: '',
      liveUrl: '',
      writeupUrl: '',
    },
    {
      id: 'rag-eval',
      title: 'RAG Eval',
      tagline: 'rag system with a real evaluation harness',
      status: 'planned',
      summary: '',
      role: 'solo',
      problem: '',
      approach: '',
      numbers: [],
      stack: [],
      evidence: [],
      repoUrl: '',
      liveUrl: '',
      writeupUrl: '',
    },
    {
      id: 'outagenet',
      title: 'OutageNet',
      tagline: 'university final-year project, 3-person team, in progress',
      status: 'planned',
      // NOTE: this is a 3-person team project. `role` must always name only
      // the specific subsystems actually owned, and the card must always
      // read as a team project, in progress. Never let this imply solo
      // authorship or a finished product — that's the one rule that
      // matters more than any other field on this entry.
      summary: '',
      role: '',
      problem: '',
      approach: '',
      numbers: [],
      stack: [],
      evidence: [],
      repoUrl: '',
      liveUrl: '',
      writeupUrl: '',
    },
  ],
};
