import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/profile.js'
import { generalFortunes } from '../data/flavor.js'
import { homeProjects, highlights, writing } from '../data/home.js'
import { ProjectIndex, ProjectFeature, DayJob, Writing, About, SiteLink } from './sections.jsx'
import { Play } from './Play.jsx'

/**
 * The homepage is one screen: a cover on the left, and a page on the right
 * that the contents list switches. Each page has its own hash (#job,
 * #make/breakline, …) so it can be linked to and the back button works.
 */
const PAGES = {
  make: { n: '01', title: 'Things I make', sub: '' },
  job: { n: '02', title: 'Day job', sub: 'What pays for the side projects' },
  play: { n: '03', title: 'Play', sub: 'Two pocket games from things I have built' },
  writing: { n: '04', title: 'Writing', sub: 'Long-form, plus the odd log' },
  about: { n: '05', title: 'About', sub: 'The longer version' },
}

const CONTENTS = [
  ['make', `${homeProjects.length} projects`],
  ['job', 'since 2023'],
  ['play', '2 pocket games'],
  ['writing', `${writing.length} pieces`],
  ['about', 'the longer version'],
]

const bySlug = new Map(homeProjects.map((p) => [p.slug, p]))
const games = homeProjects.filter((p) => p.cat === 'game')
const tools = homeProjects.filter((p) => p.cat === 'tool')
const FILTERS = [
  ['hl', 'Highlights', highlights.map((slug) => bySlug.get(slug))],
  ['game', `Games · ${games.length}`, games],
  ['tool', `Tools · ${tools.length}`, tools],
]

function readRoute() {
  const [page, slug] = window.location.hash.replace(/^#\/?/, '').split('/')
  // An own-property check, not PAGES[page]: #constructor must not count as a page.
  if (!Object.prototype.hasOwnProperty.call(PAGES, page)) return { page: 'make', project: null }
  return { page, project: (page === 'make' && bySlug.get(slug)) || null }
}

function useRoute() {
  const [route, setRoute] = useState(readRoute)
  useEffect(() => {
    const onHash = () => setRoute(readRoute())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  return route
}

function DohaClock() {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 15000)
    return () => clearInterval(t)
  }, [])

  let time = '--:--'
  try {
    time = new Date(now).toLocaleTimeString('en-GB', {
      timeZone: 'Asia/Qatar',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    /* no time zone data: leave the placeholder */
  }
  const hour = Number(time.slice(0, 2))
  const around = hour >= 7 && hour < 23

  return (
    <span className="e-clock">
      <span className={around ? 'e-on' : 'e-off'} aria-hidden="true" />
      <b>{time}</b>
      <span>in Doha · {around ? 'probably around' : 'probably asleep'}</span>
    </span>
  )
}

function Fortune() {
  const [i, setI] = useState(() => Math.floor(Math.random() * generalFortunes.length))
  return (
    <div className="e-fortune">
      <span>
        <span className="e-fortune-user">hamzah@hap-os</span>
        <span className="e-fortune-path">:~$</span> fortune
      </span>
      <span aria-live="polite">{generalFortunes[i % generalFortunes.length]}</span>
      <span>
        <button type="button" className="e-again" onClick={() => setI((n) => n + 1)}>
          ↻ Another
        </button>
      </span>
    </div>
  )
}

export default function Home() {
  const { page, project } = useRoute()
  const [filter, setFilter] = useState('hl')
  const headRef = useRef(null)
  const shownRoute = useRef(null)
  const head = PAGES[page]

  useEffect(() => {
    document.title = project
      ? `${project.name} — ${profile.name}`
      : page === 'make'
        ? profile.name
        : `${head.title} — ${profile.name}`

    // Compare with the route already on screen rather than counting renders:
    // StrictMode runs this twice on mount, and only real navigation should move anything.
    const route = `${page}/${project ? project.slug : ''}`
    if (shownRoute.current === route) return
    const first = shownRoute.current === null
    shownRoute.current = route
    const el = headRef.current
    if (!el || (first && !window.location.hash)) return

    // On a phone the page sits below the cover, so a tap in the contents, or a
    // shared link like /#make/blockarena, would change something off-screen.
    // Bring the page up to meet it. On first load, wait for the fonts so the
    // position is final.
    const reveal = () => {
      const top = el.getBoundingClientRect().top
      if (top >= 0 && top <= window.innerHeight * 0.6) return
      const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
      el.scrollIntoView({ behavior: first || reduce ? 'auto' : 'smooth', block: 'start' })
    }
    if (first) {
      ;(document.fonts?.ready ?? Promise.resolve()).then(reveal)
      return
    }
    reveal()
    // Opening a project or going back removes the link that was clicked, which
    // drops focus to <body>. Put it on the new heading instead.
    if (!document.activeElement || document.activeElement === document.body) {
      el.focus({ preventScroll: true })
    }
  }, [page, project, head])

  const list = FILTERS.find(([id]) => id === filter)[2]

  return (
    <div className="e-root">
      <header className="e-wrap e-bar">
        <a className="e-brand" href="/">
          hamzahap.dev
        </a>
        <span className="e-meta e-hide-sm">
          Doha, Qatar · up 5 years, 2 jobs, 1 continent change
        </span>
        <span className="e-bar-right">
          <DohaClock />
          <a className="e-term" href="/terminal/">
            &gt;_ Terminal
          </a>
        </span>
      </header>
      <div className="e-wrap">
        <div className="e-rule2" />
      </div>
      <div className="e-wrap">
        <h1 className="e-name">
          {profile.name}
          <i>.</i>
        </h1>
        <div className="e-rule1" />
      </div>

      <main className="e-wrap e-body">
        <aside className="g-cover" aria-label="Introduction and contents">
          <p className="e-lede">
            I make games, tools for AI coding agents, and a Catan board generator that is far more
            thorough than it needs to be.
          </p>
          <p className="e-day">
            By day I&apos;m a software engineer, building the backend behind All Things Rugby: live
            scores and news for 100k+ downloads.
          </p>
          <nav className="toc" aria-label="Contents">
            <div className="toc-h">
              <span className="e-cap">Contents</span>
              <span className="e-cap">Inside</span>
            </div>
            {CONTENTS.map(([id, count]) => (
              <a
                key={id}
                className={id === page ? 'toc-row is-on' : 'toc-row'}
                href={`#${id}`}
                aria-current={id === page ? 'page' : undefined}
              >
                <span className="toc-n">{PAGES[id].n}</span>
                <span className="toc-t">{PAGES[id].title}</span>
                <span className="toc-lead" aria-hidden="true" />
                <span className="toc-c">{count}</span>
              </a>
            ))}
          </nav>
          <div className="e-ctas">
            <a className="e-btn e-btn-ink" href={`mailto:${profile.email}`}>
              Email me
            </a>
            <a className="e-btn" href={profile.resumePath} download>
              Résumé ↓
            </a>
            <SiteLink href={profile.github}>GitHub ↗</SiteLink>
            <SiteLink href={profile.linkedin}>LinkedIn ↗</SiteLink>
          </div>
          <Fortune />
        </aside>

        <section className="g-page" aria-labelledby="pg-title">
          <div className="pg-head">
            <h2 id="pg-title" className="pg-title" ref={headRef} tabIndex={-1}>
              <span className="pg-num">{head.n}</span>
              <span>{head.title}</span>
            </h2>
            {page === 'make' && !project && (
              <div className="pg-filters" role="group" aria-label="Filter projects">
                {FILTERS.map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    className={id === filter ? 'pg-filter is-on' : 'pg-filter'}
                    aria-pressed={id === filter}
                    onClick={() => setFilter(id)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
            {project && (
              <a className="pg-back" href="#make">
                ← All projects
              </a>
            )}
            {head.sub && <p className="pg-sub">{head.sub}</p>}
          </div>

          {page === 'make' && !project && <ProjectIndex list={list} />}
          {project && <ProjectFeature project={project} key={project.slug} />}
          {page === 'job' && <DayJob />}
          {page === 'play' && <Play />}
          {page === 'writing' && <Writing />}
          {page === 'about' && <About />}
        </section>
      </main>

      <a className="e-strip" href="/terminal/">
        <span className="e-wrap e-strip-in">
          <span className="e-strip-cmd">
            <span className="e-strip-prompt">hamzah@hap-os ~ $</span> cd /terminal
            <span className="e-cursor" aria-hidden="true" />
          </span>
          <span className="e-strip-cta">
            Prefer a terminal? The whole site also runs as a shell{' '}
            <span className="e-strip-go" aria-hidden="true">
              →
            </span>
          </span>
        </span>
      </a>

      <footer className="e-wrap e-foot">
        <span className="e-cap">
          © {new Date().getFullYear()} {profile.name} · {profile.location}
        </span>
        <span className="e-cap">
          Set in Schibsted Grotesk &amp; IBM Plex Mono · try <a href="/terminal/#sudo">sudo</a> in
          the terminal
        </span>
      </footer>
    </div>
  )
}
