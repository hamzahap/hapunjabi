/** Shared panel chrome + small primitives used by every rich command output. */

export function Panel({ title, sub, links = [], children }) {
  return (
    <section className="panel">
      <header className="panel__head">
        <h2 className="panel__title">{title}</h2>
        {sub ? <span className="panel__sub">{sub}</span> : <span className="panel__sub" />}
        {links.length > 0 && (
          <div className="panel__links">
            {links.map((l) => (
              <a
                key={l.url}
                className="btnlink"
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {l.label} ↗
              </a>
            ))}
          </div>
        )}
      </header>
      <div className="panel__body">{children}</div>
    </section>
  )
}

export function Tags({ items, accent = false }) {
  if (!items?.length) return null
  return (
    <div className="card__tech">
      {items.map((t) => (
        <span key={t} className={accent ? 'tag tag--accent' : 'tag'}>
          {t}
        </span>
      ))}
    </div>
  )
}

export function Section({ label, children }) {
  return (
    <div className="detail__section">
      <div className="detail__label">{label}</div>
      {children}
    </div>
  )
}

export function Bullets({ items }) {
  if (!items?.length) return null
  return (
    <ul className="detail__list">
      {items.map((b, i) => (
        <li key={i}>{b}</li>
      ))}
    </ul>
  )
}

export function Stats({ items }) {
  return (
    <div className="stats">
      {items.map((s) => (
        <div className="stat" key={s.label}>
          <div className="stat__num">{s.num}</div>
          <div className="stat__label">{s.label}</div>
        </div>
      ))}
    </div>
  )
}

/** Plain terminal text output. */
export function Out({ children, tone = 'dim' }) {
  const cls = tone === 'err' ? 'out out--err' : tone === 'plain' ? 'out out--plain' : 'out'
  return <div className={cls}>{children}</div>
}
