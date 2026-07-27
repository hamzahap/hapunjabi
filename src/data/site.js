/**
 * Content for the `stack`, `uses` and `logs` sections.
 *
 * `uses` is seeded from what is genuinely installed and in use on my machine —
 * correct anything that has drifted rather than leaving it approximate.
 */

export const stackEntries = [
  {
    slug: 'ingest',
    title: 'Getting a scoreline from a provider to a phone',
    sub: 'the All Things Rugby read path',
    body: [
      'Every live sports product has the same core problem, and it is not the one people expect. It is not throughput and it is not the database. It is that the upstream providers disagree with each other, go stale without telling you, and occasionally return data that is well-formed and simply wrong.',
      'So the pipeline is built defensively, in that order: fetch, validate, store, cache, serve. The validation step sits deliberately upstream of the cache. If a bad payload gets past it, that error is now aggregated, cached, and served to every client until the TTL expires — one bad response becomes thousands of wrong scorelines. Catching it before the cache turns a user-visible defect into an alert nobody outside the team ever sees.',
      'The caching layer is where the throughput came from. Live match data has a brutal access pattern: near-zero reads for hours, then everyone in the world asking for the same three matches at once. In-memory caching with concurrency-safe refresh means one request repopulates a stale entry while the rest keep reading the previous value, instead of a thundering herd all hitting the provider at kickoff.',
      'The last piece is the admin override. No amount of validation catches everything, so editors can override any field a provider got wrong — matches, fixtures, incidents, stats, media — and the override wins over provider data on the next read. It is the escape hatch that makes the rest of the system safe to automate.',
    ],
    diagram: true,
    tags: ['.NET', 'SQL', 'In-memory cache', 'Provider ingest', 'Next.js', 'Flutter'],
  },
  {
    slug: 'majlis',
    title: 'Building Majlis',
    sub: 'a social multiplayer platform, in four parts',
    body: [
      'Majlis is the largest thing I have built outside work, and the interesting decisions are all about boundaries — what belongs where, and what is allowed to know about what.',
      'It is a TypeScript monorepo with four moving parts: an Expo mobile app, a Fastify API, a React admin dashboard, and shared packages holding the types and the game logic. One language across the whole thing, so a change to a shared type breaks the compile in every place that needs updating rather than surfacing as a runtime bug in one of them.',
      'The decision I am happiest with is that game logic lives in its own package, behind a generic GameEngine<State, Action>. It does not know about HTTP, sockets, React, or the database. It validates a move, applies an action, decides a winner, and derives the public state a given player is allowed to see. That last part is the one that matters: the server computes what each client can know instead of shipping the full state and trusting the client not to look. Get that wrong and a card game is trivially cheatable. Adding Chess or Dominoes later means implementing an interface, not touching the server.',
      'Realtime and durability are split on purpose. Socket.IO carries room presence, chat, typing indicators and match events. Redis holds the things that are true right now — who is online, socket sessions, in-flight match state — so the API layer stays stateless and can scale horizontally. PostgreSQL, through Prisma, holds everything that has to survive a restart: users, rooms, messages, match history, wallet transactions, cosmetics, quests, tournaments.',
      'The constraint I set at the start was no gambling. No loot boxes, no randomized purchases, no wagering. Monetization is fixed-price cosmetics and subscriptions through the platform stores. It rules out the easiest revenue model in social gaming, which is exactly why it is worth stating up front — it shapes the economy design rather than being a disclaimer bolted on afterwards.',
      'It is in progress, not shipped. I would rather say that than imply otherwise.',
    ],
    diagram: false,
    tags: ['TypeScript', 'React Native', 'Fastify', 'PostgreSQL', 'Prisma', 'Socket.IO', 'Redis'],
  },
  {
    slug: 'openclaw',
    title: 'Running OpenClaw against live sports data',
    sub: 'someone else’s agent, my workflows',
    body: [
      'First, the disclaimer that matters: OpenClaw is an open-source personal AI assistant built by Peter Steinberger. I did not write it. I run it, and I built the workflows and integration around it. Being precise about that line is worth more than the credit I would get for blurring it.',
      'What I did build are two workflows that turn out to be the same job: read a lot of noisy input and decide what actually matters.',
      'The first is the daily brief. It pulls recent rugby coverage across sources, deduplicates stories that are the same event reported five different ways, ranks what is worth the editorial team reading, and produces a structured draft. The output is a draft on purpose — it goes to a human before it goes to readers. Unreviewed model output in front of an audience is a category of risk I am not interested in owning.',
      'The second watches match feeds through the weekend, when fixtures land back to back and nobody is staring at a dashboard. Provider data gets checked for the things schema validation cannot see: a score that moved backwards, a match still "live" three hours after it ended, two providers reporting different scores for one fixture. Those are semantic failures, not structural ones, and they are the ones that actually reach users.',
      'The common thread is disagreement — between sources, or between what the data claims and what is physically possible. That framing is why both live in one assistant instead of two bespoke services.',
    ],
    diagram: false,
    tags: ['OpenClaw', 'LLM APIs', '.NET', 'Scheduled jobs', 'Data validation'],
  },
]

export const uses = [
  {
    label: 'Machine',
    items: ['Windows 11 Pro', 'Git Bash + PowerShell side by side'],
  },
  {
    label: 'Editors',
    items: ['Visual Studio (for .NET)', 'VS Code (everything else)'],
  },
  {
    label: 'Day-to-day stack',
    items: ['.NET / C#', 'SQL Server', 'Next.js', 'Flutter', 'Firebase', 'Docker'],
  },
  {
    label: 'Pipelines',
    items: ['Azure DevOps', 'GitHub Actions', 'Docker Compose for local'],
  },
  {
    label: 'Agents I actually run',
    items: ['Claude Code', 'Codex CLI', 'my own orchestrators when the CLIs stop early'],
  },
  {
    label: 'Writing',
    items: ['LaTeX + MiKTeX for the resume', 'Markdown for everything else'],
  },
]

export const logs = [
  {
    date: '2026-07-26',
    title: 'Rebuilt this site as a terminal',
    body: [
      'The old version was a React tab strip from early 2023 whose "current" work bullet still said "developing a comprehensive web application" — written before I had done most of the work worth talking about.',
      'The rewrite is a shell. Commands return React nodes rather than strings, which is the whole trick: `arch` renders an SVG, `ps` renders a sortable process table, `ls` renders a directory whose entries run commands when clicked. Clicking and typing go through the same path, so the two never drift apart.',
      'Projects are listed as `ps aux` output. It let me put a STAT column on everything, which means abandoned projects get an honest Z instead of quietly disappearing.',
    ],
  },
]
