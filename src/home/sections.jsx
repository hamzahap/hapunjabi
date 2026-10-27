import { Fragment } from 'react'
import { Sprite } from './Sprite.jsx'
import { dayJob, writing, readPath, about } from '../data/home.js'

const STATUS = {
  building: 'Building',
  shipped: 'Shipped',
  finished: 'Finished',
  paused: 'Paused',
  abandoned: 'Abandoned',
}

export const statusLabel = (p) => p.statusLabel || STATUS[p.status]

function Status({ project }) {
  return <span className={`ix-st st-${project.status}`}>{statusLabel(project)}</span>
}

/** External links open in a new tab and say so with ↗; links within the site do not. */
export function SiteLink({ href, className = 'e-link', children }) {
  const external = /^https?:/.test(href)
  return (
    <a
      className={className}
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  )
}

// ---------------------------------------------------------------- 01

export function ProjectIndex({ list }) {
  return (
    <>
      <div className="ix-head" aria-hidden="true">
        <span />
        <span className="e-cap">Project</span>
        <span className="e-cap">Kind</span>
        <span className="e-cap ix-head-st">Status</span>
      </div>
      <div className="ix-list">
        {list.map((p) => (
          <a
            key={p.slug}
            className="ix"
            href={`#make/${p.slug}`}
            aria-label={`${p.name}, ${statusLabel(p).toLowerCase()}. ${p.line}`}
          >
            <Sprite rows={p.icon} />
            <span className="ix-txt">
              <span className="ix-name">{p.name}</span>
              <span className="ix-line">{p.line}</span>
            </span>
            <span className="ix-kind">{p.cat === 'game' ? 'Game' : 'Tool'}</span>
            <Status project={p} />
          </a>
        ))}
      </div>
    </>
  )
}

export function ProjectFeature({ project: p }) {
  const kind = p.cat === 'game' ? 'Game' : 'Tool'
  const kicker =
    p.kicker || `${kind} · ${p.year}${p.status === 'abandoned' ? ' · kept public on purpose' : ''}`
  return (
    <article className="ft v-in">
      <div className="ft-text">
        <p className="e-meta">{kicker}</p>
        <h3 className="ft-title">{p.name}</h3>
        <p className="ft-p">{p.desc}</p>
        {p.parts && (
          <dl className="ft-parts">
            {p.parts.map((part) => (
              <div key={part.name}>
                <dt>{part.name}</dt>
                <dd>{part.text}</dd>
              </div>
            ))}
          </dl>
        )}
        <ul className="dash">
          {p.notes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
        <p className="ft-stack">{p.stack}</p>
        {(p.links.length > 0 || p.playable) && (
          <div className="ft-links">
            {p.links.map((l) => (
              <SiteLink key={l.url} href={l.url}>
                {l.label}
              </SiteLink>
            ))}
            {p.playable && (
              <a className="e-play" href="#play">
                Play the pocket version
              </a>
            )}
          </div>
        )}
      </div>
      <figure className="fig ft-fig">
        <Sprite rows={p.icon} large />
        <Status project={p} />
        <figcaption className="e-cap">Fig. — {p.name}, as a 9 × 9 sprite</figcaption>
      </figure>
    </article>
  )
}

// ---------------------------------------------------------------- 02

export function DayJob() {
  return (
    <div className="jb v-in">
      <div className="jb-main">
        <p className="e-meta">{dayJob.kicker}</p>
        <p className="jb-role">{dayJob.title}</p>
        <p className="e-cap">{dayJob.org}</p>
        <ul className="dash">
          {dayJob.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        <div className="ft-links">
          {dayJob.links.map((l) => (
            <SiteLink key={l.url} href={l.url}>
              {l.label}
            </SiteLink>
          ))}
        </div>
      </div>
      <figure className="fig">
        <span className="e-meta jb-k">API performance</span>
        <span className="jb-big">900%+</span>
        <span className="jb-note">
          from caching, aggregation and concurrency-safe refresh, not bigger machines.
        </span>
        <span className="jb-sep" />
        <span className="jb-mid">100k+</span>
        <span className="jb-note">downloads across the web and mobile apps</span>
        <figcaption className="e-cap">Fig. — the day job, in two numbers</figcaption>
      </figure>
      <div className="jb-prev">
        {dayJob.before.map((row) => (
          <div className="jb-row" key={row.what}>
            <span className="e-cap">{row.when}</span>
            <span className="jb-what">
              <b>{row.what}</b>
              <span>
                {row.note}
                {row.link && (
                  <>
                    {' · '}
                    <SiteLink href={row.link.url} className={null}>
                      {row.link.label}
                    </SiteLink>
                  </>
                )}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------- 04

export function Writing() {
  return (
    <div className="v-in">
      {writing.map((w) => (
        <a className="wr-row" href={`#writing/${w.slug}`} key={w.slug}>
          <span className="e-meta wr-k">{w.kind}</span>
          <span>
            <span className="wr-t">{w.title}</span>
            <span className="wr-s">{w.sub}</span>
          </span>
          <span className="wr-go" aria-hidden="true">
            →
          </span>
        </a>
      ))}
    </div>
  )
}

/** The logs mark commands with `backticks`; set those in mono. */
function Prose({ text }) {
  return text.split('`').map((part, i) => (i % 2 ? <code key={i}>{part}</code> : part))
}

function ReadPath() {
  return (
    <figure className="fig rp">
      <span className="e-meta jb-k">The read path</span>
      <ol className="rp-list">
        {readPath.steps.map((s) => (
          <li key={s.verb} className={s.key ? 'rp-step is-key' : 'rp-step'}>
            <span className="e-cap rp-verb">{s.verb}</span>
            <span className="rp-what">
              <b>{s.name}</b>
              <span>{s.note}</span>
            </span>
          </li>
        ))}
      </ol>
      <p className="rp-aside">{readPath.aside}</p>
      <figcaption className="e-cap">
        Fig. — the read path, simplified: feed checks run before anything is cached
      </figcaption>
    </figure>
  )
}

/** One essay or log, read in the page column rather than in the terminal. */
export function Piece({ piece: w }) {
  const i = writing.indexOf(w)
  const prev = writing[i - 1]
  const next = writing[i + 1]
  const [lede, ...rest] = w.body
  return (
    <article className="ar v-in">
      <header className="ar-head">
        <p className="e-meta">{w.kicker}</p>
        <h3 className="ar-title">{w.title}</h3>
        {w.sub && <p className="ar-dek">{w.sub}</p>}
      </header>
      <div className="ar-body">
        <p className="ar-lede">
          <Prose text={lede} />
        </p>
        {rest.map((p, n) => (
          <Fragment key={n}>
            <p>
              <Prose text={p} />
            </p>
            {/* The figure follows the paragraph that names the steps. */}
            {n === 0 && w.readPath && <ReadPath />}
          </Fragment>
        ))}
      </div>
      {w.tags.length > 0 && <p className="ft-stack">{w.tags.join(' · ')}</p>}
      <nav className="ar-nav" aria-label="More writing">
        <a href={prev ? `#writing/${prev.slug}` : '#writing'}>
          <span className="e-cap">{prev ? '← Previous' : '← All writing'}</span>
          {prev && <span className="ar-nav-t">{prev.title}</span>}
        </a>
        <a className="ar-nav-next" href={next ? `#writing/${next.slug}` : '#writing'}>
          <span className="e-cap">{next ? 'Next →' : 'All writing →'}</span>
          {next && <span className="ar-nav-t">{next.title}</span>}
        </a>
      </nav>
    </article>
  )
}

// ---------------------------------------------------------------- 05

export function About() {
  return (
    <div className="ab v-in">
      <p className="ab-bio">{about.bio}</p>
      <p className="ab-bio ab-bio--quiet">{about.honesty}</p>
      <div className="ab-cols">
        <div>
          <p className="e-cap">Now</p>
          <ul className="dash">
            {about.now.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="e-cap">Setup</p>
          <ul className="dash">
            {about.setup.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
