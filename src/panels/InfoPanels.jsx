import { Panel, Tags, Bullets, Out, Stats } from './Panel.jsx'
import { profile, asciiArt, stats } from '../data/profile.js'
import { work, education, certifications } from '../data/work.js'
import { skills } from '../data/skills.js'

function Timeline({ items }) {
  return (
    <div className="timeline">
      {items.map((item, i) => (
        <article className={item.current ? 'tl-item' : 'tl-item tl-item--past'} key={i}>
          <div className="tl-item__head">
            <span className="tl-item__role">{item.role}</span>
            <span className="dim">@</span>
            <span className="tl-item__org">{item.org}</span>
          </div>
          <div className="tl-item__meta">
            {item.period} · {item.location}
          </div>
          {item.summary && <p className="dim">{item.summary}</p>}
          <Bullets items={item.bullets} />
          {item.tech?.length > 0 && (
            <div className="tag-row">
              <Tags items={item.tech} />
            </div>
          )}
        </article>
      ))}
    </div>
  )
}

export function WorkPanel() {
  return (
    <Panel title="WORK HISTORY" sub="what I do for a living">
      <Timeline items={work} />
    </Panel>
  )
}

export function EducationPanel() {
  return (
    <Panel title="EDUCATION & CERTS" sub="the paper trail">
      <Timeline items={education} />
      <div className="detail__section" style={{ marginTop: 'var(--sp-5)' }}>
        <div className="detail__label">Certifications</div>
        {certifications.map((c) => (
          <div key={c.name} style={{ marginBottom: 'var(--sp-2)' }}>
            <div>
              <span className="accent">▸ </span>
              <span className="bold">{c.name}</span>
            </div>
            <div className="faint" style={{ paddingLeft: '1.5ch' }}>
              {c.issuer} · {c.date} ·{' '}
              <a href={c.url} target="_blank" rel="noopener noreferrer">
                verify ↗
              </a>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  )
}

export function SkillsPanel() {
  return (
    <Panel title="SKILLS" sub="things I reach for">
      <div className="skills">
        {skills.map((g) => (
          <div className="skillgroup" key={g.label}>
            <div className="skillgroup__label">{g.label}</div>
            <Tags items={g.items} />
          </div>
        ))}
      </div>
    </Panel>
  )
}

export function ContactPanel() {
  const items = [
    { k: 'email', v: profile.email, href: `mailto:${profile.email}` },
    { k: 'github', v: '@hamzahap', href: profile.github },
    { k: 'linkedin', v: 'hamzahpunjabi', href: profile.linkedin },
    { k: 'games', v: 'hkinggames', href: profile.gamesSite },
    { k: 'location', v: profile.location, href: null },
    { k: 'resume', v: 'download PDF', href: profile.resumePath },
  ]
  return (
    <Panel title="CONTACT" sub="open to interesting problems">
      <div className="contact__grid">
        {items.map((it) =>
          it.href ? (
            <a
              className="contact__item"
              key={it.k}
              href={it.href}
              target={it.href.startsWith('mailto:') ? undefined : '_blank'}
              rel="noopener noreferrer"
            >
              <span className="contact__k">{it.k}</span>
              <span className="contact__v">{it.v}</span>
            </a>
          ) : (
            <div className="contact__item" key={it.k}>
              <span className="contact__k">{it.k}</span>
              <span className="contact__v">{it.v}</span>
            </div>
          )
        )}
      </div>
    </Panel>
  )
}

export function NeofetchPanel({ projectCount }) {
  const rows = [
    ['name', profile.name],
    ['title', profile.role],
    ['uptime', '5 years in software'],
    ['host', profile.location],
    ['shell', 'hap-os 2.0.4'],
    ['kernel', '.NET · Node · Flutter'],
    ['projects', `${projectCount} indexed`],
    ['shipped', 'The Rugby App · Breakline · EdgeBloom'],
    ['certs', 'AWS SA – Associate'],
    ['contact', profile.email],
  ]
  return (
    <div className="neofetch">
      <pre className="neofetch__art" aria-hidden="true">
        {asciiArt}
      </pre>
      <div className="neofetch__info">
        <div style={{ marginBottom: 'var(--sp-2)' }}>
          <span className="accent bold">{profile.handle}</span>
          <span className="faint">@</span>
          <span className="accent bold">hap-os</span>
        </div>
        {rows.map(([k, v]) => (
          <div className="neofetch__row" key={k}>
            <span className="neofetch__key">{k}</span>
            <span className="neofetch__val">{v}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function AboutPanel() {
  return (
    <Panel title="WHOAMI" sub={`${profile.name} · ${profile.location}`}>
      <Stats items={stats} />
      <p className="detail__lede">
        I&apos;m a software engineer who spends most of his time on the unglamorous half of the
        stack — the APIs, the caching layers, the data pipelines that have to be right at 3am when a
        match kicks off on the other side of the world.
      </p>
      <p className="dim">
        Day job: I own the backend and platform for{' '}
        <a href="https://allthingsrugby.com/" target="_blank" rel="noopener noreferrer">
          All Things Rugby
        </a>{' '}
        and The Rugby App — live scores, stats, highlights and editorial for 50k+ downloads. That
        means high-throughput REST APIs over messy third-party providers, an internal CRM that lets
        editors override anything a provider gets wrong, and a growing set of AI agents that write
        the daily brief and watch the data feeds for me.
      </p>
      <p className="dim">
        Nights and weekends: I ship mobile games under the hkinggames name, and I build local-first
        tooling for coding agents — orchestrators, context optimizers, audit loops. Mostly because
        I got tired of agents that stop three-quarters of the way through the job.
      </p>
      <p className="faint">
        Try <span className="accent">projects</span>, <span className="accent">work</span>, or{' '}
        <span className="accent">games</span> next.
      </p>
    </Panel>
  )
}

export function HelpPanel({ groups }) {
  return (
    <Panel title="HELP" sub="tab completes · ↑ ↓ recalls history">
      <div className="helptable">
        {groups.map((g) => (
          <div key={g.label} style={{ display: 'contents' }}>
            <div className="helptable__group">{g.label}</div>
            {g.commands.map((c) => (
              <div key={c.name} style={{ display: 'contents' }}>
                <div className="helptable__cmd">{c.usage || c.name}</div>
                <div className="helptable__desc">{c.desc}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 'var(--sp-4)' }}>
        <Out>
          <span className="faint">Shortcuts: </span>
          <kbd>Tab</kbd> <span className="faint">complete</span> · <kbd>↑</kbd>
          <kbd>↓</kbd> <span className="faint">history</span> · <kbd>Ctrl</kbd>+<kbd>L</kbd>{' '}
          <span className="faint">clear</span> · <kbd>Ctrl</kbd>+<kbd>C</kbd>{' '}
          <span className="faint">cancel line</span>
        </Out>
      </div>
    </Panel>
  )
}
