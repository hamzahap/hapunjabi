/**
 * Project catalogue.
 *
 * Ground rule for this file: every claim here has to survive an interviewer
 * opening the repo. Where something is an MVP or a weekend build, it says so.
 * Overselling reads worse than a modest, accurate description.
 */

export const CATEGORIES = ['professional', 'ai-tooling', 'games', 'data', 'tools', 'academic']

const GH = 'https://github.com/hamzahap'

export const projects = [
  // ---------------------------------------------------------------- hero
  {
    slug: 'rugby-platform',
    name: 'All Things Rugby / The Rugby App',
    tagline: 'Live scores, stats and editorial for 50k+ downloads. The day job.',
    year: '2023 — present',
    tier: 'hero',
    category: 'professional',
    status: 'in production',
    description:
      'Full ownership of the backend and platform behind a consumer sports product: high-throughput .NET REST APIs over multiple third-party providers, the SQL data model, Firebase services, a Next.js web front end and a Flutter mobile client. The interesting problem is not any one endpoint — it is that upstream providers disagree with each other, go stale, and occasionally lie, while a user staring at a live match expects a correct scoreline immediately.',
    highlights: [
      'Reached 900%+ throughput gains on the hot paths through in-memory caching, aggregation and concurrency-safe refresh, rather than by scaling hardware.',
      'Built an internal CRM/admin platform with role-based access for admins and authors, custom tournament management, and full override of provider data for matches, fixtures, incidents, stats and media.',
      'Integrated a heavily customized TipTap editor with smart embeds, plus an AI article generator with selectable GPT models that drafts match reports from live data.',
      'Runs on Azure DevOps pipelines with Docker, across API, worker, scheduler and scraper services.',
    ],
    tech: ['.NET', 'C#', 'SQL', 'Next.js', 'Flutter', 'Firebase', 'Docker', 'Azure DevOps'],
    links: [
      { label: 'allthingsrugby.com', url: 'https://allthingsrugby.com/' },
      { label: 'The Rugby App', url: 'https://tr.ee/ACCwg0XR1s' },
    ],
  },
  {
    slug: 'openclaw',
    name: 'OpenClaw workflows at ATR',
    tagline: 'Agent workflows running against live production sports data.',
    year: '2025 — present',
    tier: 'hero',
    category: 'ai-tooling',
    status: 'in production',
    description:
      'OpenClaw is an open-source, local-first AI assistant — I did not write it, I run it. What I built are the workflows on top of it, and the plumbing that makes them trustworthy against live sports data. One drafts the daily rugby brief: pull recent coverage across sources, deduplicate the same story reported five different ways, rank what matters, hand the editorial team a draft rather than a published article. The other watches match feeds through the weekend and raises an alert when inbound provider data disagrees with what the match state says is possible.',
    highlights: [
      'The brief is a draft on purpose. Unreviewed model output in front of readers is a category of risk worth not owning.',
      'Feed watching catches the failures schema validation cannot see: a score that moved backwards, a match still live three hours after full time, two providers reporting different scorelines for one fixture.',
      'Both jobs are really the same job — reconciling sources that disagree — which is why they live in one assistant rather than two services.',
      'Credit where due: OpenClaw itself is open source, by Peter Steinberger. My work here is configuration, custom workflows and integration, not the agent runtime.',
    ],
    tech: ['OpenClaw', 'LLM APIs', '.NET', 'SQL', 'Scheduled jobs', 'Data validation'],
    links: [{ label: 'openclaw.ai', url: 'https://openclaw.ai/' }],
  },
  {
    slug: 'breakline',
    name: 'Breakline',
    tagline: 'One touch. Full speed. No soft landings. 20 chapters, 600 levels.',
    year: '2026',
    tier: 'hero',
    category: 'games',
    status: 'released',
    description:
      'A one-touch precision runner built around instant retries and difficulty that escalates without becoming unfair. Twenty themed chapters across 600 levels, late-jump buffering so a near-miss still feels fair, and second-wind revives for optional continues. Shipped end to end — including the unglamorous half: AdMob with Google UMP consent gating, a one-time $3.99 ad removal purchase, store listing and review.',
    highlights: [
      'Single-tap timing with a fixed-speed runner rhythm and fast restarts — the whole game is tuned around the retry loop.',
      'Late jump buffering and a 3-second safe intro, so the difficulty comes from the level and not from input latency.',
      'Rewarded-ad revives, manual or automatic retry, and configurable sound, music and haptics.',
      'Full release compliance: AdMob mediation, UMP consent, app-ads.txt, and a published privacy policy.',
    ],
    tech: ['Mobile game dev', 'AdMob', 'Google UMP', 'In-app purchases', 'Store release'],
    // TODO(hamzah): add the Google Play URL here once you paste it.
    links: [{ label: 'Game page', url: 'https://hamzahap.github.io/breakline/' }],
  },
  {
    slug: 'edgebloom',
    name: 'EdgeBloom',
    tagline: 'Claim the lines, watch the pattern bloom. 2–8 players, or Pulse AI.',
    year: '2026',
    tier: 'hero',
    category: 'games',
    status: 'released',
    description:
      'A line-capture strategy game: draw the final edge to claim a cell, and closing a shape chains your turn. Supports 2–8 players pass-and-play or a solo run against the Pulse AI opponent, across five board families — square, triangle, hex, diamond and crown — that change the shape of the game without changing the rules.',
    highlights: [
      'Five board topologies share one rule set, so the strategy shifts without the player relearning the game.',
      'Pulse AI provides a solo opponent for one-on-one matches.',
      'Ads deliberately confined to menu and result screens, never mid-game, with a one-time ad-free unlock.',
      'Touch-friendly boards with haptics and a readable score flow from title screen to match.',
    ],
    tech: ['Mobile game dev', 'AdMob', 'Google UMP', 'In-app purchases', 'Store release'],
    // TODO(hamzah): add the Google Play URL here once you paste it.
    links: [{ label: 'Game page', url: 'https://hamzahap.github.io/edgebloom/' }],
  },
  {
    slug: 'context-optimizer',
    name: 'LLM Context Optimizer',
    tagline: 'Ranks, compresses and bin-packs context to fit a token budget.',
    year: '2026',
    tier: 'hero',
    category: 'ai-tooling',
    status: 'complete',
    description:
      'A TypeScript library, CLI and local HTTP proxy that preprocesses context before it reaches a model. A seven-stage pipeline — classify, collect, rank, compress, protect, pack, audit — turns files, diffs, logs and stack traces into a budgeted bundle, with a four-tier protection model that guarantees stack traces and test output survive verbatim rather than being trimmed away exactly when you need them.',
    highlights: [
      'The proxy fronts the OpenAI and Anthropic APIs but only rewrites message arrays past a size threshold — everything else, including SSE streams, passes through byte for byte.',
      'Protection tiers make the bin-packing lossless where it matters: the packer can drop context, but never the stack trace you are debugging.',
      'Around 3.7k lines with 63 passing tests, a clean build and clean typecheck — the best-tested thing I have written outside work.',
      'Compression here is heuristic line trimming and deduplication, not semantic summarization. Worth saying plainly.',
    ],
    tech: ['TypeScript', 'Node.js', 'Commander', 'Vitest', 'tsup', 'node:http'],
    links: [{ label: 'Repo', url: `${GH}/LLMContextOptimizer` }],
  },

  // ---------------------------------------------------------------- major
  {
    slug: 'orbitdesk',
    name: 'OrbitDesk',
    tagline: 'Electron desktop app routing plan/execute/review across three models.',
    year: '2026',
    tier: 'major',
    category: 'ai-tooling',
    status: 'MVP',
    description:
      'A local-first Electron app that runs a four-stage pipeline — plan, assets, execute, review — over a workspace folder you pick, with each stage independently routable to a different provider. Plan with Claude, generate media with Gemini, execute with Codex, review with Claude. Every subprocess, API key and filesystem touch stays in the main process behind a hardened contextBridge preload.',
    highlights: [
      'Cross-platform executable resolution that no tutorial teaches: on Windows it shells to where.exe, de-prioritizes WindowsApps shims and parses npm .cmd wrappers to find the underlying .js entrypoint so it can spawn node directly; on Unix it merges the login-shell environment via env -0 first.',
      'Codex NDJSON is parsed into typed events and the final payload recovered by walking events in reverse and safe-parsing candidates against a Zod schema, so a malformed model response degrades instead of crashing.',
      'Real security posture for a desktop MVP: contextIsolation on, nodeIntegration off, sandbox true, workspace path-escape checks, and API keys redacted in the diagnostic writer before anything is written to disk.',
      'Honest scope: this is an MVP — 5.6k lines built in a short sprint, 26 Node-side tests, no packaging config yet, so it runs from source.',
    ],
    tech: ['TypeScript', 'Electron', 'React 19', 'Zod', 'electron-vite', 'Vitest'],
    links: [{ label: 'Repo', url: `${GH}/OrbitDesk` }],
  },
  {
    slug: 'vibecodemax',
    name: 'VibeCodeMax',
    tagline: 'Reprompts a coding agent until an auditor agrees the work is done.',
    year: '2026',
    tier: 'major',
    category: 'ai-tooling',
    status: 'v0.1 prototype',
    description:
      'A zero-dependency CLI that wraps a coding agent in a verify-audit-retry loop, because agents habitually stop at 80%. Each attempt generates a prompt, spawns the agent, runs your verification commands, snapshots the workspace, then hands an audit packet to either a second LLM auditor or a built-in heuristic one. A continue decision feeds that feedback into the next attempt.',
    highlights: [
      'Termination is designed rather than counted: a SHA-256 hash of filtered git status detects the "agent changed nothing" stall, and a run is only marked complete when an auditor explicitly says so — budget and stall exits stay honestly marked incomplete.',
      'Three agent invocation strategies behind one interface — raw shell, codex exec, and claude -p — handling per-CLI flag translation and prompt-over-stdin.',
      'A heuristic fallback auditor fails runs on non-zero verification exits, missing files, or unchecked markdown checkboxes parsed out of the task tracker.',
      'Zero runtime dependencies, ~2.1k lines, 22 tests. Cost budgets are user-supplied estimates, not measured API spend.',
    ],
    tech: ['TypeScript', 'Node.js', 'node:test', 'JSON Schema', 'GitHub Actions'],
    links: [{ label: 'Repo', url: `${GH}/VibeCodeMax` }],
  },
  {
    slug: 'majlis',
    name: 'Majlis',
    tagline: 'Social multiplayer platform. Mobile app, realtime backend, game engine, admin.',
    year: '2026',
    tier: 'hero',
    category: 'games',
    status: 'in progress',
    description:
      'A social multiplayer platform built around persistent rooms — a community makes a room and it stays theirs to chat in, hang out in, and play casual games in. The design constraint that shapes everything: no gambling, no loot boxes, no wagering. It is built for game nights with people you actually know, so cosmetics and progression give a room its own identity rather than extracting money from it. Structurally it is a TypeScript monorepo: an Expo mobile app, a Fastify API, a React admin dashboard, and shared packages between them.',
    highlights: [
      'Game logic lives in its own package as a generic GameEngine<State, Action>, deliberately independent of both the UI and the transport — it validates moves, applies actions, decides winners and derives the public state each player is allowed to see. Adding Chess or Ludo means implementing an interface, not touching the server.',
      'Realtime is Socket.IO for room presence, chat, typing indicators and match events, with Redis holding presence, socket sessions and in-flight match state so the API layer stays stateless.',
      'PostgreSQL via Prisma for everything durable — users, rooms, messages, matches, wallet transactions, cosmetics, quests, tournaments — with the schema and migrations type-checked end to end against the shared types.',
      'The server derives public state rather than trusting the client, which is the part that decides whether a multiplayer game is cheatable.',
      'Deliberately gambling-free: monetization is fixed-price cosmetics and subscriptions through Apple IAP and Google Play Billing. No loot boxes, no randomized purchases.',
    ],
    tech: [
      'TypeScript',
      'React Native',
      'Expo',
      'Fastify',
      'Node.js',
      'PostgreSQL',
      'Prisma',
      'Socket.IO',
      'Redis',
      'React',
      'Vite',
      'Docker',
      'JWT',
    ],
    links: [],
  },
  {
    slug: 'graveyard-shift',
    name: "Hking's Graveyard Shift",
    tagline: 'Co-op roguelite where you are the janitors, and the dungeon is filthy.',
    year: '2026',
    tier: 'major',
    category: 'games',
    status: 'in progress',
    description:
      'A co-op top-down action roguelite about a crew of dungeon cleaners trying to survive a cursed night shift. You fight waves of supernatural filth, pests, trash monsters and haunted bosses using mops, vacuums, sprays and carts. The joke carries real systems underneath — cleanliness and filth are actual mechanics, not set dressing.',
    highlights: [
      'Local co-op with wave-based survival, per-room objectives, shop upgrades and boss encounters.',
      'Endless overtime mode for runs that refuse to end, plus achievement support.',
      'Filth and cleanliness systems drive the state of a room rather than just scoring it.',
      'Enemy spawning built with performance in mind, since waves plus co-op is where these games usually fall over.',
    ],
    tech: ['Godot', 'GDScript', 'Local co-op', 'Roguelite systems', 'Pixel art'],
    links: [],
  },
  {
    slug: 'arcabeasts',
    name: "Hking's Arcabeasts",
    tagline: 'Grid-based fantasy tactics. Four houses, distinct creatures, shrine control.',
    year: '2026',
    tier: 'major',
    category: 'games',
    status: 'in progress',
    description:
      'An original fantasy tactics game where you command a team of magical creatures in turn-based, grid-based battles. Players pick an academy house — Pyrelume, Verdantis, Aethercrest or Duskwoven — each with its own Arcabeasts, abilities, visual identity and tactical role. The game is about positioning, shrine control and mana management rather than raw stat checks.',
    highlights: [
      'Units fill scout, bruiser, caster, tank and support roles, so each house plays to a different tactical rhythm.',
      'Handcrafted battlefield arenas built around shrine control as the win condition.',
      'Data-driven art pipeline feeding sprites, terrain, props, animations and VFX into the battle systems.',
      'Built in Godot, with tactical battle systems and unit/objective rendering written against that pipeline.',
    ],
    tech: ['Godot', 'GDScript', 'Turn-based tactics', 'Pixel art', 'Data-driven pipeline'],
    links: [],
  },
  {
    slug: 'snakes',
    name: "Hking's Snakes",
    tagline: 'Runners versus a snake that grows with every player it eats.',
    year: '2026',
    tier: 'minor',
    category: 'games',
    status: 'in progress',
    description:
      'A fast multiplayer survival game on a grid arena. Runners try to stay alive while a snake — controlled by another player or by AI — hunts them. Every elimination makes the snake longer and more dangerous, so each round escalates on its own without needing a timer to force the ending.',
    highlights: [],
    tech: ['Unity', 'C#', 'Multiplayer', 'Grid movement', 'AI opponent'],
    links: [],
  },
  {
    slug: 'block-arena',
    name: "Hking's Block Arena",
    tagline: 'Quick chaotic PvP matches with friends and a hostile environment.',
    year: '2026',
    tier: 'minor',
    category: 'games',
    status: 'in progress',
    description:
      'A multiplayer arena game built for short, chaotic co-op PvP matches. Simple to pick up and competitive underneath, with the environment as a weapon — most of the memorable moments come from players using the arena against each other rather than from mechanical depth.',
    highlights: [],
    tech: ['Unity', 'C#', 'Multiplayer', 'Arena PvP'],
    links: [],
  },
  {
    slug: 'querypilot',
    name: 'QueryPilot',
    tagline: 'Turns plain English into SQL, then refuses to run it if it is not safe.',
    year: '2026',
    tier: 'major',
    category: 'ai-tooling',
    status: 'active',
    description:
      'An agent that answers questions about a database in English. The model gets the schema as a tool definition and returns structured output rather than prose you regex apart — but the model is the least interesting part. Everything it produces goes through a guard that parses the SQL and rejects anything that is not provably a single read-only SELECT. Default-deny, not blocklist.',
    highlights: [
      'The guard tokenizes rather than string-matches, because "does it contain DELETE" fails on a column named deleted_at.',
      'Rejects stacked statements, comment-based evasion, CTEs wrapping a write, EXEC, SELECT INTO, and any table outside the allowed schema.',
      'The LLM sits behind an interface with a deterministic fake, so the whole suite runs with no API key and no network.',
      'Adversarial corpus of malicious inputs, plus a mutation check: disabling a guard rule must break tests, or the rule was never really tested.',
    ],
    tech: ['C#', '.NET 8', 'OpenAI API', 'SQLite', 'xUnit', 'Docker'],
    links: [{ label: 'Repo', url: `${GH}/QueryPilot` }],
  },
  {
    slug: 'tasktracker',
    name: 'TaskTracker',
    tagline: 'Task API where the architecture rules are enforced by the test suite.',
    year: '2026',
    tier: 'major',
    category: 'tools',
    status: 'active',
    description:
      'A task management REST API in .NET 8, split into Domain, Application, Infrastructure and Api. The part worth showing is that the layering is not a convention in a README — reflection-based architecture tests fail the build if Domain or Application ever picks up a reference to EF Core or ASP.NET, or if an entity grows a public setter.',
    highlights: [
      'Lifecycle rules live in the domain aggregate, not the controller: Archived is terminal, so completing an archived task throws, and the API surfaces that as a 409 with the attempted transition attached.',
      'EF Core with a UTC value converter, because both SQL Server datetime2 and SQLite TEXT hand back DateTimeKind.Unspecified and the domain guard rejects it.',
      'Filtering, sorting and paging compose into one IQueryable so it all executes as SQL rather than in memory.',
      'Azure path is real: Bicep for ACR, App Service and SQL, with an OIDC deploy workflow.',
    ],
    tech: ['C#', '.NET 8', 'EF Core', 'SQL Server', 'Azure', 'Bicep', 'Docker'],
    links: [{ label: 'Repo', url: `${GH}/TaskTracker` }],
  },
  {
    slug: 'bookmanagement',
    name: 'Book Management System',
    tagline: 'Spring Boot + MongoDB, modelled as documents rather than tables in disguise.',
    year: '2026',
    tier: 'major',
    category: 'tools',
    status: 'active',
    description:
      'A personal library API on Spring Boot 3 and MongoDB. The interesting constraint was resisting the urge to treat Mongo as a relational store — books are documents with embedded value objects, search runs as a real Criteria query with server-side paging, and tag facets come from an aggregation pipeline rather than pulling everything into Java and filtering there.',
    highlights: [
      'Search, paging and sorting execute in the database; the sort field is allow-listed so an arbitrary property cannot be injected into the query.',
      'Tests run with no MongoDB and no Docker installed, via an embedded mongod — which meant pinning the package resolver, because the version Spring pulls transitively cannot resolve mongod on Windows.',
      'Optimistic locking, declared indexes, and atomic array operators for tags and notes instead of read-modify-write.',
      'Multi-stage Dockerfile and compose, with an AWS ECS/Fargate path documented including the DocumentDB gotchas that actually bite.',
    ],
    tech: ['Java 21', 'Spring Boot 3', 'MongoDB', 'JUnit 5', 'Maven', 'Docker', 'AWS'],
    links: [{ label: 'Repo', url: `${GH}/BookManagementSystem` }],
  },
  {
    slug: 'blood2d',
    name: 'Blood2D',
    tagline: 'C++/SFML game with shaders, NPCs and a custom level editor.',
    year: '2022',
    tier: 'major',
    category: 'academic',
    status: 'complete',
    description:
      'A 2D game written from scratch in C++ on SFML as a group project, with collision handling, an inventory system, game progression, custom shaders, a bespoke UI layer and NPC behaviour — plus a level creation tool built alongside it so levels could be authored rather than hard-coded.',
    highlights: [
      'The only native, real-time-rendering project I have shipped — useful counterweight to a mostly managed-runtime profile.',
      'Custom level editor, which turned out to matter more than any single gameplay feature.',
      'Group project: worth being specific in conversation about which systems were mine.',
    ],
    tech: ['C++', 'SFML', 'GLSL'],
    links: [],
  },

  // ---------------------------------------------------------------- minor
  {
    slug: 'hkinggames-site',
    name: 'hkinggames dev site',
    tagline: 'Release and compliance infrastructure for the games. Zero JS.',
    year: '2026',
    tier: 'minor',
    category: 'tools',
    status: 'active',
    description:
      'The public developer site for Breakline and EdgeBloom: landing pages, per-app privacy policies, support contact, and the AdMob app-ads.txt record. Six hand-written HTML pages over a single CSS design system, with every visual — including the app icon and gameplay mockups — authored as inline SVG or pure CSS, so the site ships no image assets at all.',
    highlights: [
      'Carries the live AdMob DIRECT app-ads.txt record — the thing that makes ad inventory attributable to the developer — plus Search Console verification for the domain.',
      'Privacy policies document UMP consent gating and ATT, as required for store review.',
      'Release infrastructure, not a flagship engineering project — but it is the thing that lets the games actually ship.',
    ],
    tech: ['HTML', 'CSS', 'Inline SVG', 'GitHub Pages'],
    links: [
      { label: 'Live', url: 'https://hamzahap.github.io/' },
      { label: 'Repo', url: `${GH}/hamzahap.github.io` },
    ],
  },
  {
    slug: 'aoc2025',
    name: 'Advent of Code 2025',
    tagline: 'Solved with vectorized NumPy instead of loops.',
    year: '2025',
    tier: 'minor',
    category: 'data',
    status: 'partial',
    description:
      'Advent of Code solved array-first rather than iteratively: interval merging via a sorted sweep and np.searchsorted, branchless boundary detection with np.maximum.accumulate and reduceat, and an object-dtype DP table for arbitrary-precision path counts. Seven days in, not twenty-five.',
    highlights: [],
    tech: ['Python', 'NumPy'],
    links: [{ label: 'Repo', url: `${GH}/AdventOfCode2025` }],
  },
  {
    slug: 'quoridor',
    name: 'Quoridor',
    tagline: 'Java Swing board game where the pathfinding is the whole problem.',
    year: '2020',
    tier: 'minor',
    category: 'academic',
    status: 'complete',
    description:
      'The Quoridor board game in Java Swing and AWT. The genuinely interesting part is move validation: before a wall placement is legal you have to prove it does not fully block any player from reaching their goal, which turns every wall move into a graph search.',
    highlights: [],
    tech: ['Java', 'Swing', 'Pathfinding'],
    links: [],
  },
  {
    slug: 'pollution-viz',
    name: 'Canadian Pollution Visualizer',
    tagline: 'Node + React dashboard for filtering and graphing pollution data.',
    year: '2021',
    tier: 'minor',
    category: 'data',
    status: 'complete',
    description:
      'A group web project with a Node backend and React frontend that let users generate several graph types over Canadian pollution datasets and filter the underlying data feeding them.',
    highlights: [],
    tech: ['Node.js', 'React'],
    links: [],
  },
  {
    slug: 'nlp-screening',
    name: 'Resume Screening with NLP',
    tagline: 'TF-IDF vs Word2Vec vs BERT for resume-to-role matching.',
    year: '2023',
    tier: 'minor',
    category: 'data',
    status: 'complete',
    description:
      'A group course project comparing classical and transformer-based text representations — TF-IDF, Word2Vec and BERT — for automated resume screening, and where each one breaks down.',
    highlights: [],
    tech: ['Python', 'scikit-learn', 'BERT'],
    links: [],
  },
  {
    slug: 'dino',
    name: 'Dino',
    tagline: 'A working dino clone, and a reinforcement learning agent that failed.',
    year: '2023',
    tier: 'minor',
    category: 'games',
    status: 'archived',
    description:
      'A Chrome-dinosaur-style side-scroller in Pygame that works, plus an attempt to train an agent to play it that did not. I am keeping it public because the failure is more instructive than the game: it trained on every rendered frame at 60fps with a predict call per sample, never reset episodes properly, and had no target network.',
    highlights: [],
    tech: ['Python', 'Pygame', 'Keras', 'NumPy'],
    links: [{ label: 'Repo', url: `${GH}/Dino` }],
  },
  {
    slug: 'resume-tailor',
    name: 'LaTeX Resume Tailor',
    tagline: 'Splits a LaTeX resume into sections you can reorder and prune.',
    year: '2023',
    tier: 'minor',
    category: 'tools',
    status: 'prototype',
    description:
      'A local Flask and React tool that parses a LaTeX resume into its sections so you can toggle, reorder and edit them, then emit a version tailored to a specific application. A prototype — it does not compile the LaTeX for you.',
    highlights: [],
    tech: ['Python', 'Flask', 'React'],
    links: [{ label: 'Repo', url: `${GH}/resume_tailor` }],
  },
  {
    slug: 'this-site',
    name: 'This site',
    tagline: 'The terminal you are currently typing into.',
    year: '2026',
    tier: 'minor',
    category: 'tools',
    status: 'active',
    description:
      'A React and Vite single page app that boots as a shell. Commands are a small registry with their own tab-completion handlers, output blocks are React nodes rather than strings, so a command can return a full interactive panel or an SVG architecture diagram. History, completion, themes and deep links are all handled in about 400 lines of terminal code.',
    highlights: [
      'Try: ls, cat about.txt, theme amber, or arch.',
      'Deep links work — anything after the # runs as a command on load.',
    ],
    tech: ['React', 'Vite', 'JavaScript', 'CSS'],
    links: [{ label: 'Repo', url: `${GH}/hapunjabi` }],
  },
]

const TIER_ORDER = { hero: 0, major: 1, minor: 2 }
projects.sort((a, b) => TIER_ORDER[a.tier] - TIER_ORDER[b.tier])

/**
 * Process metadata for the `ps` view.
 *
 * These are deliberately subjective, and the legend on screen says so:
 *   stat   R running · S sleeping (shipped, stable) · T stopped (paused)
 *          · Z zombie (abandoned, kept public on purpose)
 *   cpu    roughly what share of my attention it holds right now
 *   uptime time since I started it, not time actively spent on it
 */
const PROC = {
  'rugby-platform': { pid: 1, stat: 'R', cpu: 94.2, uptime: '2y 7mo' },
  openclaw: { pid: 2, stat: 'R', cpu: 61.0, uptime: '1y 2mo' },
  breakline: { pid: 3, stat: 'S', cpu: 15.2, uptime: '5mo' },
  edgebloom: { pid: 4, stat: 'S', cpu: 12.8, uptime: '5mo' },
  'context-optimizer': { pid: 5, stat: 'S', cpu: 1.2, uptime: '4mo' },
  orbitdesk: { pid: 6, stat: 'T', cpu: 2.0, uptime: '3mo' },
  vibecodemax: { pid: 7, stat: 'T', cpu: 1.5, uptime: '3mo' },
  'hkinggames-site': { pid: 8, stat: 'R', cpu: 4.1, uptime: '5mo' },
  'this-site': { pid: 9, stat: 'R', cpu: 22.4, uptime: '0d' },
  majlis: { pid: 10, stat: 'R', cpu: 47.5, uptime: '4mo' },
  querypilot: { pid: 11, stat: 'R', cpu: 18.0, uptime: '0d' },
  'graveyard-shift': { pid: 14, stat: 'R', cpu: 34.0, uptime: '3mo' },
  arcabeasts: { pid: 15, stat: 'R', cpu: 29.5, uptime: '2mo' },
  snakes: { pid: 16, stat: 'R', cpu: 11.0, uptime: '2mo' },
  'block-arena': { pid: 17, stat: 'R', cpu: 7.5, uptime: '2mo' },
  tasktracker: { pid: 12, stat: 'R', cpu: 9.5, uptime: '0d' },
  bookmanagement: { pid: 13, stat: 'R', cpu: 8.2, uptime: '0d' },
  aoc2025: { pid: 21, stat: 'T', cpu: 0.4, uptime: '7mo' },
  blood2d: { pid: 42, stat: 'S', cpu: 0.0, uptime: '4y' },
  'nlp-screening': { pid: 61, stat: 'S', cpu: 0.0, uptime: '3y' },
  quoridor: { pid: 70, stat: 'S', cpu: 0.0, uptime: '6y' },
  'pollution-viz': { pid: 74, stat: 'S', cpu: 0.0, uptime: '5y' },
  dino: { pid: 88, stat: 'Z', cpu: 0.0, uptime: '3y' },
  'resume-tailor': { pid: 91, stat: 'Z', cpu: 0.0, uptime: '3y' },
}

for (const [i, p] of projects.entries()) {
  Object.assign(p, PROC[p.slug] ?? { pid: 900 + i, stat: 'S', cpu: 0.0, uptime: '?' })
}

export const STAT_MEANING = {
  R: 'running — actively worked on',
  S: 'sleeping — shipped and stable',
  T: 'stopped — paused, may resume',
  Z: 'zombie — abandoned, kept public on purpose',
}

/** Sort helper for the process table. Uptime sorts by real duration, not string. */
const UPTIME_DAYS = (s) => {
  if (s === '0d') return 0
  const y = /(\d+)y/.exec(s)
  const m = /(\d+)mo/.exec(s)
  return (y ? +y[1] * 365 : 0) + (m ? +m[1] * 30 : 0)
}

export function sortProjects(list, key, dir) {
  const sign = dir === 'asc' ? 1 : -1
  const by = {
    pid: (a, b) => a.pid - b.pid,
    cpu: (a, b) => a.cpu - b.cpu,
    stat: (a, b) => a.stat.localeCompare(b.stat),
    uptime: (a, b) => UPTIME_DAYS(a.uptime) - UPTIME_DAYS(b.uptime),
    command: (a, b) => a.slug.localeCompare(b.slug),
    category: (a, b) => a.category.localeCompare(b.category),
  }[key]
  return [...list].sort((a, b) => sign * (by ? by(a, b) : 0))
}

/** Resolve a user-typed name to a project: exact slug, then name, then prefix. */
export function findProject(query) {
  const q = query.trim().toLowerCase().replace(/\s+/g, '-')
  return (
    projects.find((p) => p.slug === q) ||
    projects.find((p) => p.name.toLowerCase() === query.trim().toLowerCase()) ||
    projects.find((p) => p.slug.startsWith(q)) ||
    projects.find((p) => p.name.toLowerCase().includes(query.trim().toLowerCase())) ||
    null
  )
}
