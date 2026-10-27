/**
 * Homepage content.
 *
 * The terminal (projects.js) has the long project write-ups. These are the
 * short ones, written for someone skimming, plus the 9 × 9 sprite each project
 * gets on the index. Same ground rule as projects.js: every claim has to
 * survive someone opening the repo.
 *
 * Writing is the exception: the essays and logs in site.js are read in full
 * on the homepage, so they are imported here rather than linked to.
 *
 * Sprite rows are 9 characters each: w ink, a green, b blue, g light green,
 * r red, d grey, . empty.
 */

import { blockArena, isOut } from './releases.js'
import { certifications } from './work.js'
import { stackEntries, logs } from './site.js'

const T = '/terminal/#'
const GH = 'https://github.com/hamzahap/'
const arenaOut = isOut(blockArena)

export const homeProjects = [
  // ---------------------------------------------------------------- games
  {
    slug: 'blockarena',
    cat: 'game',
    name: 'Block Arena',
    line: 'Couch-first party shooter for up to twelve cube robots.',
    year: '2026',
    status: arenaOut ? 'shipped' : 'soon',
    statusLabel: arenaOut ? null : `Out ${blockArena.label}`,
    kicker: arenaOut ? 'Game · 2026 · on Steam' : `Game · on Steam ${blockArena.date}`,
    desc: `${blockArena.name} is a fast, readable party shooter: up to twelve cube robots on one grid, one shot each and then a reload. Up to eight people share one screen on any mix of gamepads and keyboards, the rest join online through Steam, and bots fill the empty seats.`,
    notes: [
      'Six modes, from Capture the Flag and King of the Hill to Juggernaut and Gun Game, across 13 arenas in seven venues.',
      'Windows and Mac players share Steam lobbies, and a player who drops out rejoins into the same seat.',
      "The music and sound effects are synthesised by the game's own code.",
    ],
    stack: 'Godot 4 · GDScript · Steamworks · Local and online multiplayer',
    links: [
      { label: arenaOut ? 'Get it on Steam ↗' : 'Wishlist on Steam ↗', url: blockArena.steam },
      { label: 'More in the terminal →', url: T + 'open/block-arena' },
    ],
    icon: [
      '...b.....',
      '.wwwww...',
      '.w.w.w...',
      '.wwwww...',
      '.wwwwww.a',
      '.wwwww...',
      '.wwwww...',
      '.w...w...',
      '.........',
    ],
  },
  {
    slug: 'breakline',
    cat: 'game',
    name: 'Breakline',
    line: 'One touch, full speed, 600 levels.',
    year: '2026',
    status: 'shipped',
    desc: 'A one-touch precision runner built around the retry loop: 20 themed chapters, 600 levels, and difficulty that climbs without turning unfair. Shipped end to end, store review included.',
    notes: [
      'Late-jump buffering and a safe intro, so the difficulty comes from the level and not from input latency.',
      'AdMob with Google UMP consent gating, and a one-time purchase to remove ads.',
    ],
    stack: 'Mobile · AdMob · Google UMP · In-app purchases',
    links: [
      { label: 'Game page ↗', url: 'https://hamzahap.github.io/breakline/' },
      { label: 'More in the terminal →', url: T + 'open/breakline' },
    ],
    icon: [
      '.........',
      '.dd..aa..',
      '..dd.aa..',
      '.........',
      '.........',
      '.........',
      'www...www',
      'www...www',
      '.........',
    ],
  },
  {
    slug: 'edgebloom',
    cat: 'game',
    name: 'EdgeBloom',
    line: 'Line-capture strategy for 2 to 8 players, or one stubborn AI.',
    year: '2026',
    status: 'shipped',
    playable: true,
    desc: 'Claim the lines, watch the pattern bloom. Draw the last edge of a cell to claim it, and closing a shape chains your turn. Pass-and-play for 2 to 8 players, or solo against the Pulse AI, across five board shapes that share one rule set.',
    notes: [
      'Ads stay on menus and results screens, never mid-game.',
      'Square, triangle, hex, diamond and crown boards change the strategy without changing the rules.',
    ],
    stack: 'Mobile · Game AI · AdMob · In-app purchases',
    links: [
      { label: 'Game page ↗', url: 'https://hamzahap.github.io/edgebloom/' },
      { label: 'More in the terminal →', url: T + 'open/edgebloom' },
    ],
    icon: [
      'wwwwwwwww',
      'waaawbbbw',
      'waaawbbbw',
      'waaawbbbw',
      'wwwwwwwww',
      'w...w...w',
      'w...w...w',
      'w...w...w',
      'wwwww...w',
    ],
  },
  {
    slug: 'majlis',
    cat: 'game',
    name: 'Majlis',
    line: 'Game nights with people you actually know. No gambling.',
    year: '2026',
    status: 'building',
    desc: 'A social multiplayer platform built around persistent rooms: a community makes a room and it stays theirs to chat in, hang out in and play casual games in. One rule from day one: no gambling, no loot boxes, no wagering.',
    notes: [
      'Game logic is a generic GameEngine<State, Action> that knows nothing about HTTP or React, and decides what each player is allowed to see.',
      'Redis holds what is true right now; Postgres holds what has to survive a restart.',
    ],
    stack: 'TypeScript · React Native · Expo · Fastify · Socket.IO · Redis · PostgreSQL',
    links: [{ label: 'Read: building Majlis →', url: '#writing/majlis' }],
    icon: [
      'wwwwww...',
      'w....w...',
      'w....w...',
      'wwwwww...',
      '.w.aaaaaa',
      '...a....a',
      '...a....a',
      '...aaaaaa',
      '.......a.',
    ],
  },
  {
    slug: 'graveyard',
    cat: 'game',
    name: 'Graveyard Shift',
    line: "Co-op roguelite where you are the dungeon's janitors.",
    year: '2026',
    status: 'building',
    desc: 'A co-op top-down roguelite about a crew of dungeon cleaners surviving a cursed night shift, armed with mops, vacuums and sprays against supernatural filth. Cleanliness is a real mechanic, not set dressing.',
    notes: [
      'Wave survival, per-room objectives, shop upgrades and bosses, plus an endless overtime mode.',
      'Enemy spawning built for performance, because waves plus co-op is where these games usually fall over.',
    ],
    stack: 'Godot · GDScript · Local co-op · Pixel art',
    links: [{ label: 'More in the terminal →', url: T + 'open/graveyard-shift' }],
    icon: [
      '...www...',
      '.wwwwwww.',
      '.ww.w.ww.',
      '.ww.w.ww.',
      '.wwwwwww.',
      '.wwwwwww.',
      '.wwwwwww.',
      '.w.w.w.w.',
      '.........',
    ],
  },
  {
    slug: 'arcabeasts',
    cat: 'game',
    name: 'Arcabeasts',
    line: 'Grid tactics: four houses, one shrine to hold.',
    year: '2026',
    status: 'building',
    desc: 'Original fantasy tactics with turn-based, grid-based battles. Pick an academy house (Pyrelume, Verdantis, Aethercrest or Duskwoven) and win on positioning, shrine control and mana rather than raw stats.',
    notes: [
      'Scout, bruiser, caster, tank and support roles give each house its own rhythm.',
      'A data-driven art pipeline feeds sprites, terrain, props and effects into the battle systems.',
    ],
    stack: 'Godot · GDScript · Turn-based tactics · Pixel art',
    links: [{ label: 'More in the terminal →', url: T + 'open/arcabeasts' }],
    icon: [
      'w.......w',
      'ww.....ww',
      '.wwwwwww.',
      '.wawwwaw.',
      '.wwwwwww.',
      '..wwwww..',
      '..w.w.w..',
      '...www...',
      '.........',
    ],
  },
  {
    slug: 'snakes',
    cat: 'game',
    name: 'Snakes',
    line: 'Runners versus a snake that grows with every player it eats.',
    year: '2026',
    status: 'building',
    desc: 'A fast multiplayer survival game on a grid arena. Runners try to stay alive while a snake, played by another person or by AI, hunts them down. Every catch makes the snake longer, so each round escalates on its own.',
    notes: ['No timer needed: the growing snake is what forces the ending.'],
    stack: 'Unity · C# · Multiplayer · AI opponent',
    links: [{ label: 'More in the terminal →', url: T + 'open/snakes' }],
    icon: [
      '.........',
      '..gggggg.',
      '.g.......',
      '..ggggg..',
      '.......g.',
      '.gggggg..',
      'gwg......',
      'ggg......',
      '.........',
    ],
  },
  {
    slug: 'blood2d',
    cat: 'game',
    name: 'Blood2D',
    line: 'C++ and SFML, with shaders, NPCs and a level editor.',
    year: '2022',
    status: 'finished',
    desc: 'A 2D game written from scratch in C++ on SFML as a university group project, with collision, inventory, progression, custom shaders and NPC behaviour, plus a level editor so levels could be authored instead of hard-coded.',
    notes: ['The level editor mattered more than any single gameplay feature.'],
    stack: 'C++ · SFML · GLSL',
    links: [{ label: 'More in the terminal →', url: T + 'open/blood2d' }],
    icon: [
      '.......ww',
      '......www',
      '.....www.',
      '....www..',
      '.r.www...',
      '..rww....',
      '..rr.....',
      '.r..r....',
      'r........',
    ],
  },
  {
    slug: 'dino',
    cat: 'game',
    name: 'Dino',
    line: 'A dino clone, and an RL agent that never learned to play it.',
    year: '2023',
    status: 'abandoned',
    desc: 'A Chrome-dinosaur-style runner in Pygame that works, and an attempt to train an agent to play it that did not. Kept public on purpose, because the failure is more instructive than the game.',
    notes: [
      'It trained on every frame at 60fps, never reset episodes properly and had no target network.',
    ],
    stack: 'Python · Pygame · Keras · NumPy',
    links: [{ label: 'Repo ↗', url: GH + 'Dino' }],
    icon: [
      '.....wwww',
      '.....w.ww',
      '.....wwww',
      'w...www..',
      'ww.wwwww.',
      '.wwwwww..',
      '..wwwww..',
      '...w..w..',
      '...ww.ww.',
    ],
  },

  // ---------------------------------------------------------------- tools
  {
    slug: 'companions',
    cat: 'tool',
    name: 'Companion apps',
    line: 'Steer Claude Code and Codex from your phone. The code stays home.',
    year: '2026',
    status: 'building',
    desc: 'Mobile and desktop companions for watching and steering AI coding sessions remotely: live activity, change review, action approval and follow-up prompts. Code, terminal access and credentials never leave the developer machine.',
    notes: [
      'Three tiers, one trust boundary: a Flutter client, a Rust desktop bridge that holds everything sensitive, and a thin Cloudflare backend.',
      'Per-machine trusted-device pairing and session reconnection, with several computers managed from one app.',
    ],
    stack: 'Flutter · Dart · Rust · Cloudflare Workers',
    links: [
      { label: 'ClaudeCompanion →', url: T + 'open/claudecompanion' },
      { label: 'CodexCompanion →', url: T + 'open/codexcompanion' },
    ],
    icon: [
      '..wwwww..',
      '..w...w..',
      '..wa..w..',
      '..w.a.w..',
      '..wa..w..',
      '..w...w..',
      '..w.aaw..',
      '..w...w..',
      '..wwwww..',
    ],
  },
  {
    slug: 'context',
    cat: 'tool',
    name: 'LLM Context Optimizer',
    line: 'Fits context into a token budget without trimming your stack trace.',
    year: '2026',
    status: 'shipped',
    desc: 'A TypeScript library, CLI and local proxy with a seven-stage pipeline (classify, collect, rank, compress, protect, pack, audit) that fits files, diffs, logs and stack traces into a token budget before they reach a model.',
    notes: [
      'The proxy fronts the OpenAI and Anthropic APIs and only rewrites oversized requests; everything else, SSE streams included, passes through byte for byte.',
      'Four protection tiers keep stack traces and test output verbatim. About 3.7k lines and 63 passing tests.',
    ],
    stack: 'TypeScript · Node.js · Vitest',
    links: [{ label: 'Repo ↗', url: GH + 'LLMContextOptimizer' }],
    icon: [
      'aaaa...r.',
      '.......r.',
      'wwwww..r.',
      '.......r.',
      'wwwwwwwr.',
      '.......r.',
      'dddddddrd',
      '.......r.',
      'aaa....r.',
    ],
  },
  {
    slug: 'querypilot',
    cat: 'tool',
    name: 'QueryPilot',
    line: "English to SQL, refused unless it's provably read-only.",
    year: '2026',
    status: 'shipped',
    desc: 'An agent that answers database questions in plain English. The model gets the schema as a tool definition and returns structured output, and every query it writes has to pass a default-deny guard before it can run.',
    notes: [
      'The guard tokenizes SQL instead of string-matching, and rejects anything that is not provably a single read-only SELECT.',
      'The LLM sits behind an interface with a deterministic fake, so the suite runs offline; mutation checks prove every guard rule is tested.',
    ],
    stack: 'C# · .NET 8 · OpenAI API · SQLite · xUnit · Docker',
    links: [{ label: 'Repo ↗', url: GH + 'QueryPilot' }],
    icon: [
      '.bbbbbbb.',
      'b.......b',
      '.bbbbbbb.',
      'b.......b',
      '.bbbbbbb.',
      'b.......b',
      '.bbbbbbb.',
      '.........',
      '.........',
    ],
  },
  {
    slug: 'catan',
    cat: 'tool',
    name: 'Catan board generator',
    line: 'Every Seafarers scenario, fairness rules, seeded boards.',
    year: '2026',
    status: 'shipped',
    playable: true,
    desc: 'A seeded Catan board generator that lives in the terminal: the base game, all nine Seafarers scenarios, Cities & Knights and Traders & Barbarians, for 3 to 6 players, with how-to-play rules for each scenario.',
    notes: [
      'Four balance modes, from beginner, which enforces every fairness rule, to chaos, which is a straight shuffle. Individual rules can be pinned on top.',
      'Boards are seeded, so everyone at the table opens the same map from one link.',
    ],
    stack: 'React · JavaScript',
    links: [{ label: 'Open the generator →', url: T + 'catan' }],
    icon: [
      '....a....',
      '..aaaaa..',
      'aaaaaaaaa',
      'aaawwwaaa',
      'aaawrwaaa',
      'aaawwwaaa',
      'aaaaaaaaa',
      '..aaaaa..',
      '....a....',
    ],
  },
  {
    slug: 'terminal',
    cat: 'tool',
    name: 'This site, as a shell',
    line: 'The original hamzahap: a terminal that renders real panels.',
    year: '2026',
    status: 'shipped',
    desc: 'The site this one grew out of, and still the other half of it: a shell where commands return real interactive panels instead of text. ps lists every project, arch draws a diagram, and catan builds a board.',
    notes: [
      'Clicking and typing go through the same path, so mouse and keyboard users see the same history.',
      'Abandoned projects get an honest Z in ps instead of quietly disappearing.',
    ],
    stack: 'React · Vite · JavaScript',
    links: [{ label: 'Open /terminal →', url: '/terminal/' }],
    icon: [
      'wwwwwwwww',
      'w.......w',
      'w.a.....w',
      'w..a....w',
      'w.a.aaa.w',
      'w.......w',
      'wwwwwwwww',
      '.........',
      '.........',
    ],
  },
  {
    slug: 'vibecodemax',
    cat: 'tool',
    name: 'VibeCodeMax',
    line: 'Reprompts a coding agent until an auditor agrees it is done.',
    year: '2026',
    status: 'paused',
    desc: 'A zero-dependency CLI that wraps a coding agent in a verify, audit and retry loop, because agents habitually stop at 80% and call it finished.',
    notes: [
      'A run only counts as complete when an auditor says so; a hash of the workspace catches the agent that changed nothing.',
      'Drives a raw shell, codex exec or claude -p behind one interface.',
    ],
    stack: 'TypeScript · Node.js · node:test',
    links: [{ label: 'Repo ↗', url: GH + 'VibeCodeMax' }],
    icon: [
      '..wwwww..',
      '.w.....w.',
      'w.......w',
      'w.......w',
      'w.....aaa',
      'w......a.',
      '.w.......',
      '..wwwww..',
      '.........',
    ],
  },
  {
    slug: 'orbitdesk',
    cat: 'tool',
    name: 'OrbitDesk',
    line: 'Plan with Claude, execute with Codex, review in one app.',
    year: '2026',
    status: 'paused',
    desc: 'A local-first Electron app that runs plan, assets, execute and review stages over a workspace, each routable to a different model: plan with Claude, generate media with Gemini, execute with Codex.',
    notes: [
      'Hardened by default: context isolation on, node integration off, sandboxed, and API keys redacted before anything touches disk.',
      'Honest scope: an MVP from a short sprint that still runs from source.',
    ],
    stack: 'TypeScript · Electron · React 19 · Zod · Vitest',
    links: [{ label: 'Repo ↗', url: GH + 'OrbitDesk' }],
    icon: [
      '.........',
      '...www...',
      '..wwwww.a',
      '.wwwwwaa.',
      '.wwwaaww.',
      '.aawwwww.',
      'a.wwwww..',
      '...www...',
      '.........',
    ],
  },
  {
    slug: 'tasktracker',
    cat: 'tool',
    name: 'TaskTracker',
    line: '.NET 8 API whose architecture rules are enforced by tests.',
    year: '2026',
    status: 'shipped',
    desc: 'A task management REST API where the architecture is enforced, not suggested: reflection-based tests fail the build if a layer picks up a forbidden dependency.',
    notes: [
      'Lifecycle rules live in the domain and surface as 409 conflicts; filtering, sorting and paging compose into one IQueryable that runs as SQL.',
      'Azure infrastructure as code with Bicep, deployed through an OIDC workflow.',
    ],
    stack: 'C# · .NET 8 · EF Core · SQL Server · Azure · Bicep · Docker',
    links: [{ label: 'Repo ↗', url: GH + 'TaskTracker' }],
    icon: [
      'wwwwwwwww',
      'w.......w',
      'w......gw',
      'w.....g.w',
      'wg...g..w',
      'w.g.g...w',
      'w..g....w',
      'w.......w',
      'wwwwwwwww',
    ],
  },
  {
    slug: 'books',
    cat: 'tool',
    name: 'Book Management System',
    line: 'Spring Boot and MongoDB, modelled as real documents.',
    year: '2026',
    status: 'shipped',
    desc: 'A personal library API modelled as real documents: server-side Criteria search with paging, and tag facets computed by an aggregation pipeline instead of in application code.',
    notes: [
      'Allow-listed sort fields, optimistic locking and atomic array operators; tests run against an embedded mongod.',
      'Multi-stage Docker build with a documented AWS ECS and Fargate path.',
    ],
    stack: 'Java 21 · Spring Boot 3 · MongoDB · JUnit 5 · Docker · AWS',
    links: [{ label: 'Repo ↗', url: GH + 'BookManagementSystem' }],
    icon: [
      '.........',
      'www...www',
      'w..w.w..w',
      'wdd.w.ddw',
      'w...w...w',
      'wdd.w.ddw',
      'w...w...w',
      'wwwwwwwww',
      '.........',
    ],
  },
  {
    slug: 'resumetailor',
    cat: 'tool',
    name: 'LaTeX Résumé Tailor',
    line: 'Splits a LaTeX résumé into sections you can reorder.',
    year: '2023',
    status: 'abandoned',
    desc: 'A local Flask and React tool that parses a LaTeX résumé into its sections so you can toggle, reorder and edit them, then emit a version tailored to one application. A prototype: it never compiled the LaTeX for you.',
    notes: ['Kept public on purpose, like everything else here that did not make it.'],
    stack: 'Python · Flask · React',
    links: [{ label: 'Repo ↗', url: GH + 'resume_tailor' }],
    icon: [
      '.wwwww...',
      '.w...ww..',
      '.w.dd.ww.',
      '.w.....w.',
      '.w.ddd.w.',
      '.w.....w.',
      '.w.ddd.w.',
      '.w.....w.',
      '.wwwwwww.',
    ],
  },
]

/** The default index: a mix of games, tools and one honest failure. */
export const highlights = [
  'blockarena',
  'breakline',
  'edgebloom',
  'companions',
  'context',
  'majlis',
  'catan',
  'graveyard',
  'querypilot',
  'dino',
]

export const dayJob = {
  kicker: 'Software Developer · Dec 2023 to now',
  title: 'All Things Rugby and The Rugby App',
  org: 'AllThingsSports · AllThingsRugby · BinYousef — Doha',
  bullets: [
    'Designed and maintain the backend: live scores, stats, highlights and news.',
    'High-throughput .NET APIs over several data providers, with Redis and in-memory caching.',
    'Editorial automation: scheduled workers, article matching and AI-drafted reports in a custom TipTap editor.',
    'OpenClaw agents that watch live matches and draft a daily news brief.',
    'Azure architecture, DevOps pipelines, and the Next.js and Flutter frontends.',
  ],
  links: [
    { label: 'Read: how a score gets to your phone →', url: '#writing/ingest' },
    { label: 'allthingsrugby.com ↗', url: 'https://allthingsrugby.com/' },
  ],
  before: [
    {
      when: '2021 — 2022',
      what: 'Software Developer, SmartICE',
      note: "St. John's, Canada · dashboards and firmware for sea-ice monitoring",
    },
    {
      when: '2019 — 2023',
      what: 'BSc Computer Science, Memorial University',
      note: "GPA 3.46 · Faculty of Science Dean's List 2022–23",
    },
    {
      when: '2023 · 2026',
      what: 'AWS Solutions Architect – Associate',
      note: 'Professional in progress, target 2026',
      link: { label: 'verify on Credly ↗', url: certifications[0].url },
    },
  ],
}

/** One-line standfirsts for the writing list, by slug. The text is in site.js. */
const standfirsts = {
  ingest: 'Why the validation step sits in front of the cache, not behind it.',
  majlis: 'A social multiplayer platform, in four parts.',
  openclaw: "Someone else's agent, my workflows.",
  'terminal-rebuild': 'Commands that return React panels instead of strings.',
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
/** '2026-07-26' → 'Jul 2026', or '26 Jul 2026' with the day. */
const formatDate = (iso, withDay = false) => {
  const [y, m, d] = iso.split('-')
  return `${withDay ? `${Number(d)} ` : ''}${MONTHS[Number(m) - 1]} ${y}`
}
const minutesToRead = (body) => Math.max(1, Math.round(body.join(' ').split(/\s+/).length / 220))

/** Essays first, in site.js order, then logs, newest first. Each opens at #writing/<slug>. */
export const writing = [
  ...stackEntries.map((e) => ({
    slug: e.slug,
    kind: 'Essay',
    kicker: `Essay · ${minutesToRead(e.body)} min read`,
    title: e.title,
    sub: standfirsts[e.slug] || '',
    body: e.body,
    tags: e.tags,
    readPath: e.diagram,
  })),
  ...[...logs]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((l) => ({
      slug: l.slug,
      kind: `Log · ${formatDate(l.date)}`,
      kicker: `Log · ${formatDate(l.date, true)}`,
      title: l.title,
      sub: standfirsts[l.slug] || '',
      body: l.body,
      tags: [],
      readPath: false,
    })),
]

/** The figure in the ingest essay: the steps its second paragraph names, as on the terminal's `arch`. */
export const readPath = {
  steps: [
    { verb: 'Fetch', name: 'Provider APIs', note: 'several third-party feeds' },
    { verb: 'Validate', name: 'Feed checks', note: 'shape and match-state validation', key: true },
    { verb: 'Store + cache', name: 'SQL + cache', note: 'in-memory aggregation' },
    { verb: 'Serve', name: 'REST API', note: '.NET, concurrency-safe refresh' },
    { verb: 'Read', name: 'Web and app', note: 'allthingsrugby.com and The Rugby App' },
  ],
  aside: "Editors' overrides from the CRM, and OpenClaw's briefs and alerts, join at the API.",
}

export const about = {
  bio: "I'm a software engineer in Doha, Qatar. I studied computer science at Memorial University in St. John's, Newfoundland, and spent a year of it at SmartICE building tools for sea-ice monitoring. These days I build backends for a living, and games and developer tools for fun.",
  honesty:
    'I like honest software. Everything here has a real status, and the projects I gave up on stay public instead of quietly disappearing.',
  now: [
    arenaOut
      ? `Just shipped ${blockArena.name} on Steam.`
      : `Getting ${blockArena.name} ready for Steam: it unlocks on ${blockArena.date}.`,
    'Studying for the AWS Solutions Architect – Professional, target 2026.',
    'Building Majlis: game nights with people you actually know, no gambling.',
    'Making Graveyard Shift and Arcabeasts in Godot.',
    'Building companion apps for Claude Code and Codex.',
  ],
  setup: [
    'Windows 11, with Git Bash and PowerShell side by side.',
    'Visual Studio for .NET, VS Code for everything else.',
    'Claude Code and Codex CLI, plus my own orchestrators when the CLIs stop early.',
    'LaTeX for the résumé, Markdown for everything else.',
  ],
}
