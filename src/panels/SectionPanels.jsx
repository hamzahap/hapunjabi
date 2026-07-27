import { Panel, Tags, Out } from './Panel.jsx'
import { ArchDiagram } from './ArchDiagram.jsx'
import { stackEntries, uses, logs } from '../data/site.js'

/** `stack` — long-form architecture writeups. `stack <slug>` opens one. */
export function StackPanel({ slug }) {
  const entry = slug ? stackEntries.find((e) => e.slug === slug) : null

  if (slug && !entry) {
    return (
      <Out tone="err">
        {`stack: no entry '${slug}'`}
        {'\n'}
        <span className="faint">Available: {stackEntries.map((e) => e.slug).join(', ')}</span>
      </Out>
    )
  }

  if (!entry) {
    return (
      <Panel title="STACK" sub="how the things I build actually work">
        <Out tone="plain">
          Longer writeups on the systems behind the headlines. Pick one:
        </Out>
        <div className="stack__index">
          {stackEntries.map((e) => (
            <div className="stack__idxrow" key={e.slug}>
              <span className="accent">stack {e.slug}</span>
              <span className="faint"> — {e.title}</span>
            </div>
          ))}
        </div>
      </Panel>
    )
  }

  return (
    <>
      <Panel title={entry.title.toUpperCase()} sub={entry.sub}>
        {entry.body.map((p, i) => (
          <p key={i} className={i === 0 ? 'detail__lede' : 'dim'}>
            {p}
          </p>
        ))}
        <div className="tag-row">
          <Tags items={entry.tags} accent />
        </div>
      </Panel>
      {entry.diagram && <ArchDiagram />}
    </>
  )
}

/** `uses` — the boring but frequently-asked list. */
export function UsesPanel() {
  return (
    <Panel title="USES" sub="what I actually work in">
      <div className="skills">
        {uses.map((g) => (
          <div className="skillgroup" key={g.label}>
            <div className="skillgroup__label">{g.label}</div>
            <Tags items={g.items} />
          </div>
        ))}
      </div>
      <Out>
        <span className="faint">
          No affiliate links, no aesthetic desk photo. It is a Windows box and two editors.
        </span>
      </Out>
    </Panel>
  )
}

/** `logs` — dated entries, newest first. */
export function LogsPanel() {
  const entries = [...logs].sort((a, b) => b.date.localeCompare(a.date))
  return (
    <Panel title="LOGS" sub={`${entries.length} ${entries.length === 1 ? 'entry' : 'entries'}`}>
      {entries.map((e) => (
        <article className="log" key={e.date + e.title}>
          <header className="log__head">
            <time className="log__date" dateTime={e.date}>
              {e.date}
            </time>
            <h3 className="log__title">{e.title}</h3>
          </header>
          {e.body.map((p, i) => (
            <p key={i} className="dim">
              {p}
            </p>
          ))}
        </article>
      ))}
    </Panel>
  )
}
