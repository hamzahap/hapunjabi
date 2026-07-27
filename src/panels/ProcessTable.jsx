import { useState } from 'react'
import { sortProjects, STAT_MEANING } from '../data/projects.js'
import { Out } from './Panel.jsx'

const COLUMNS = [
  { key: 'pid', label: 'PID', align: 'right', cls: 'ps__pid' },
  { key: 'stat', label: 'STAT', align: 'left', cls: 'ps__stat' },
  { key: 'cpu', label: '%CPU', align: 'right', cls: 'ps__cpu' },
  { key: 'uptime', label: 'UPTIME', align: 'right', cls: 'ps__uptime' },
  { key: 'category', label: 'CATEGORY', align: 'left', cls: 'ps__cat' },
  { key: 'command', label: 'COMMAND', align: 'left', cls: 'ps__cmd' },
]

const STAT_CLASS = { R: 'stat--r', S: 'stat--s', T: 'stat--t', Z: 'stat--z' }

/**
 * Projects rendered as `ps aux` output.
 *
 * A real <table> with sortable column headers, so screen readers get row/column
 * association for free and the sort state is announced via aria-sort. The whole
 * row is clickable for mice; the COMMAND cell holds the focusable button so
 * keyboard users get one stop per process rather than six.
 */
export function ProcessTable({ projects, onOpen, heading }) {
  const [sort, setSort] = useState({ key: 'cpu', dir: 'desc' })

  if (!projects.length) {
    return <Out tone="err">No matching processes.</Out>
  }

  const rows = sortProjects(projects, sort.key, sort.dir)

  const toggle = (key) =>
    setSort((s) => ({ key, dir: s.key === key && s.dir === 'desc' ? 'asc' : 'desc' }))

  const ariaSort = (key) =>
    sort.key === key ? (sort.dir === 'asc' ? 'ascending' : 'descending') : 'none'

  return (
    <div className="ps-wrap">
      {heading && (
        <Out tone="plain">
          {heading} <span className="faint">({projects.length} processes)</span>
        </Out>
      )}

      <div className="ps-scroll">
        <table className="ps">
          <caption className="sr-only">
            Projects listed as processes. Activate a row to open that project. Columns are
            sortable.
          </caption>
          <thead>
            <tr>
              {COLUMNS.map((c) => (
                <th key={c.key} scope="col" className={c.cls} aria-sort={ariaSort(c.key)}>
                  <button type="button" className="ps__sort" onClick={() => toggle(c.key)}>
                    {c.label}
                    <span className="ps__arrow" aria-hidden="true">
                      {sort.key === c.key ? (sort.dir === 'asc' ? '▲' : '▼') : ''}
                    </span>
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr
                key={p.slug}
                className={p.stat === 'Z' ? 'ps__row ps__row--dead' : 'ps__row'}
                onClick={() => onOpen(p.slug)}
              >
                <td className="ps__pid">{String(p.pid).padStart(3, '0')}</td>
                <td className="ps__stat">
                  <span className={STAT_CLASS[p.stat]} title={STAT_MEANING[p.stat]}>
                    {p.stat}
                  </span>
                </td>
                <td className="ps__cpu">
                  <span className="ps__cpunum">{p.cpu.toFixed(1)}</span>
                  <span className="ps__bar" aria-hidden="true">
                    <span className="ps__barfill" style={{ width: `${Math.min(100, p.cpu)}%` }} />
                  </span>
                </td>
                <td className="ps__uptime">{p.uptime}</td>
                <td className="ps__cat">{p.category}</td>
                <td className="ps__cmd">
                  <button
                    type="button"
                    className="ps__open"
                    onClick={(e) => {
                      e.stopPropagation()
                      onOpen(p.slug)
                    }}
                  >
                    {p.slug}
                  </button>
                  <span className="ps__tagline"> — {p.tagline}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="ps__legend">
        <span>
          <b className="stat--r">R</b> running
        </span>
        <span>
          <b className="stat--s">S</b> sleeping, shipped
        </span>
        <span>
          <b className="stat--t">T</b> stopped
        </span>
        <span>
          <b className="stat--z">Z</b> zombie
        </span>
      </div>
      <Out>
        <span className="faint">
          %CPU is roughly what share of my attention it holds now; UPTIME is time since I started
          it, not time spent on it. Click a row, or run{' '}
        </span>
        <span className="accent">open &lt;name&gt;</span>
        <span className="faint">.</span>
      </Out>
    </div>
  )
}
