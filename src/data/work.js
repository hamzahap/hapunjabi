export const work = [
  {
    role: 'Software Developer',
    org: 'AllThingsSports · AllThingsRugby · Bin Yousef',
    location: 'Doha, Qatar',
    period: 'December 2023 — Present',
    current: true,
    summary:
      'Own the backend and platform for All Things Rugby and The Rugby App — live scores, stats, highlights and editorial for 50k+ downloads.',
    bullets: [
      'Designed, built and maintain the backend infrastructure behind All Things Rugby and The Rugby App, serving 50k+ downloads with live scores, stats, highlights and news across .NET, SQL, Next.js, Flutter and Firebase.',
      'Built high-throughput REST APIs over multiple third-party data providers, reaching 900%+ performance gains through in-memory caching, aggregation and concurrency-safe refresh strategies.',
      'Architected an internal CRM/admin platform with role-based access for admins and authors, custom tournament management, and full API data override for matches, fixtures, incidents, stats, media and editorial content.',
      'Integrated a heavily customized TipTap editor with smart embeds, and shipped an AI article generator with selectable GPT models that drafts reports directly from live match data.',
      'Deployed and configured OpenClaw, an open-source AI assistant, with custom workflows that draft the daily rugby brief — pulling, deduplicating and ranking the latest news across sources into a consistent editorial format for review before publication.',
      'Set up OpenClaw to watch live match feeds through the weekend, flagging inbound third-party data that looks wrong against expected match state so the team is alerted before bad or stale provider data reaches users.',
    ],
    tech: ['.NET', 'C#', 'SQL', 'Next.js', 'Flutter', 'Firebase', 'Azure DevOps', 'Docker', 'REST'],
  },
  {
    role: 'Software Developer',
    org: 'SmartICE',
    location: "St. John's, NL, Canada",
    period: 'September 2021 — August 2022',
    current: false,
    summary:
      'Full-stack and embedded work on sea-ice monitoring technology used across northern communities.',
    bullets: [
      'Improved performance and scalability of a Laravel and React dashboard, integrating Chart.js and optimizing REST interactions for real-time data visualization.',
      'Contributed to three products: SmartBUOY, SmartQAMUTIK, and an internal data visualization dashboard.',
      'Automated data processing workflows so retrieval, analysis and visualization ran end-to-end inside the internal dashboard.',
      'Programmed an ADXL343 accelerometer into the SmartBUOY board in C using the CCS compiler.',
      'Built a C# Windows Forms feature for SmartQAMUTIK enabling remote report generation, PDF conversion, and Dropbox API storage and sharing.',
      'Wrote a Python encrypted database backup script to safeguard server data.',
    ],
    tech: ['Laravel', 'React', 'PHP', 'Python', 'C', 'C#', 'Chart.js', 'Leaflet', 'MySQL'],
  },
]

export const education = [
  {
    role: 'BSc, Computer Science',
    org: 'Memorial University of Newfoundland and Labrador',
    location: "St. John's, NL, Canada",
    period: 'January 2019 — August 2023',
    current: false,
    summary: 'GPA 3.46 · Faculty of Science Dean’s List 2022–23',
    bullets: [],
    tech: [],
  },
]

export const certifications = [
  {
    name: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services Training and Certification',
    date: 'October 2023',
    url: 'https://www.credly.com/badges/1769a415-88da-4445-9447-f92b9ae73337/public_url',
  },
]
