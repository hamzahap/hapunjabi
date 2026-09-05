import { useState, useMemo, useEffect, useCallback } from 'react'
import { Panel } from './Panel.jsx'
import {
  generateBoard,
  MODES,
  RULE_DEFAULTS,
  RULE_STATES,
  DESERT_STATES,
  randomSeed,
} from '../catan/generator.js'
import { GAMES, TERRAIN, RESOURCES, RESOURCE_COLOR } from '../catan/layouts.js'

const R = 40 // hex radius in SVG units

const PLAYERS = [
  { id: 4, label: '3–4' },
  { id: 6, label: '5–6' },
]

const GAME_ALIASES = {
  base: 'base',
  seafarers: 'seafarers',
  sea: 'seafarers',
  cities: 'cities',
  knights: 'cities',
  ck: 'cities',
  traders: 'traders',
  barbarians: 'traders',
  tb: 'traders',
  explorers: 'explorers',
  pirates: 'explorers',
}
const MODE_ALIASES = {
  beginner: 'beginner',
  easy: 'beginner',
  advanced: 'advanced',
  standard: 'advanced',
  normal: 'advanced',
  strategy: 'strategy',
  hard: 'strategy',
  chaos: 'chaos',
  random: 'chaos',
}
const PLAYER_ALIASES = { 3: 4, 4: 4, '3-4': 4, 34: 4, 5: 6, 6: 6, '5-6': 6, 56: 6 }

/** `68-touch`, `desert-coast`, … override the mode's defaults for one rule. */
const PAIR_TITLES = {
  apart: 'never next to each other',
  free: 'no rule',
  touch: 'at least one pair next to each other',
}
const RULES = [
  { key: 'r68', token: '68', label: '6 & 8', states: RULE_STATES, titles: PAIR_TITLES },
  { key: 'r212', token: '212', label: '2 & 12', states: RULE_STATES, titles: PAIR_TITLES },
  { key: 'rnum', token: 'num', label: 'same number', states: RULE_STATES, titles: PAIR_TITLES },
  { key: 'rter', token: 'terrain', label: 'same terrain', states: RULE_STATES, titles: PAIR_TITLES },
  {
    key: 'rharb',
    token: 'harbour',
    aliases: ['harbor', 'port'],
    label: '2:1 harbour',
    states: RULE_STATES,
    titles: {
      apart: 'no 2:1 harbour touches a hex of its own resource',
      free: 'no rule (the mode may still have an opinion)',
      touch: 'at least one 2:1 harbour touches its own resource',
    },
  },
  {
    key: 'rdesert',
    token: 'desert',
    label: 'desert',
    states: DESERT_STATES,
    titles: {
      inland: 'desert surrounded by land',
      free: 'no rule',
      coast: 'desert on the coast',
    },
  },
]
const RULE_TOKENS = RULES.flatMap((r) => r.states.map((s) => `${r.token}-${s}`))

export const CATAN_TOKENS = Array.from(
  new Set([
    ...Object.keys(GAME_ALIASES),
    ...Object.keys(MODE_ALIASES),
    ...RULE_TOKENS,
    '4',
    '6',
    '3-4',
    '5-6',
  ])
).sort()

/** `catan seafarers 6 strategy 68-touch k3x9pq` in any order; the first unknown token is the seed. */
export function parseCatanArgs(args = []) {
  const out = { game: 'base', players: 4, mode: 'advanced', seed: null, rules: {} }
  for (const raw of args) {
    const t = raw.toLowerCase().replace(/^--/, '')
    const dash = t.indexOf('-')
    const head = dash > 0 ? t.slice(0, dash) : ''
    const state = dash > 0 ? t.slice(dash + 1) : ''
    const rule = RULES.find((r) => r.token === head || (r.aliases || []).includes(head))
    if (GAME_ALIASES[t]) out.game = GAME_ALIASES[t]
    else if (MODE_ALIASES[t]) out.mode = MODE_ALIASES[t]
    else if (PLAYER_ALIASES[t]) out.players = PLAYER_ALIASES[t]
    else if (rule && rule.states.includes(state)) out.rules[rule.key] = state
    else if (!out.seed && /^[\w.-]{1,24}$/.test(t)) out.seed = t
  }
  if (out.game === 'explorers') out.game = 'base'
  return out
}

/** Only the overrides that differ from the mode's defaults, as command tokens. */
function ruleTokens(mode, rules) {
  return RULES.filter((r) => rules[r.key] && rules[r.key] !== RULE_DEFAULTS[mode][r.key]).map(
    (r) => `${r.token}-${rules[r.key]}`
  )
}

function layoutKeyFor(game, players) {
  const g = GAMES.find((x) => x.id === game)
  return `${(g && g.board) || 'base'}${players}`
}

// ---------- terrain art ----------

function TerrainIcon({ terrain }) {
  switch (terrain) {
    case 'forest':
      return (
        <g>
          <path d="M-13,4 l6,-11 l6,11 z" fill="#1d5231" />
          <path d="M-1,5 l7,-13 l7,13 z" fill="#246a3b" />
          <path d="M9,3 l5,-9 l5,9 z" fill="#1d5231" />
          <rect x="-8" y="4" width="2" height="4" fill="#4a2f17" />
          <rect x="5" y="5" width="2" height="4" fill="#4a2f17" />
        </g>
      )
    case 'pasture':
      return (
        <g>
          <ellipse cx="-1" cy="1" rx="9" ry="6" fill="#f7f6ef" stroke="#6b7b3a" strokeWidth="0.8" />
          <circle cx="8" cy="-1" r="3.2" fill="#2f2f2f" />
          <rect x="-6" y="5" width="1.8" height="4" fill="#2f2f2f" />
          <rect x="2" y="5" width="1.8" height="4" fill="#2f2f2f" />
        </g>
      )
    case 'fields':
      return (
        <g stroke="#8a6410" strokeWidth="1.4" fill="none" strokeLinecap="round">
          <path d="M-9,9 v-14 M-9,-2 l-3,-3 M-9,-2 l3,-3 M-9,2 l-3,-3 M-9,2 l3,-3" />
          <path d="M0,9 v-16 M0,-4 l-3,-3 M0,-4 l3,-3 M0,0 l-3,-3 M0,0 l3,-3" />
          <path d="M9,9 v-14 M9,-2 l-3,-3 M9,-2 l3,-3 M9,2 l-3,-3 M9,2 l3,-3" />
        </g>
      )
    case 'hills':
      return (
        <g fill="#8f3a17" stroke="#5a2410" strokeWidth="0.6">
          <rect x="-12" y="-6" width="10" height="5" />
          <rect x="0" y="-6" width="10" height="5" />
          <rect x="-7" y="0" width="10" height="5" />
          <rect x="5" y="0" width="7" height="5" />
          <rect x="-12" y="0" width="4" height="5" />
        </g>
      )
    case 'mountains':
      return (
        <g>
          <path d="M-16,9 L-6,-9 L1,3 L7,-5 L16,9 z" fill="#5f6673" />
          <path d="M-6,-9 L-3,-3.5 L-9,-3.5 z" fill="#eef1f5" />
          <path d="M7,-5 L9.5,-1 L4.5,-1 z" fill="#eef1f5" />
        </g>
      )
    case 'desert':
      return (
        <g stroke="#a88a4a" strokeWidth="1.4" fill="none" strokeLinecap="round">
          <path d="M-15,4 q7,-8 14,0 t14,0" />
          <path d="M-11,-4 q5,-6 10,0" />
        </g>
      )
    case 'gold':
      return (
        <g>
          <path
            d="M-9,5 L-5,-6 L5,-8 L10,2 L4,8 L-4,8 z"
            fill="#e0a800"
            stroke="#8a6300"
            strokeWidth="0.8"
          />
          <path d="M-4,-1 l3,-3 M0,2 l4,-4" stroke="#fff3b0" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M13,-9 v6 M10,-6 h6" stroke="#fff3b0" strokeWidth="1.2" strokeLinecap="round" />
        </g>
      )
    case 'sea':
      return (
        <g stroke="#bfe3ff" strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.8">
          <path d="M-14,-2 q4,-5 8,0 t8,0 t8,0" />
          <path d="M-10,6 q4,-5 8,0 t8,0" />
        </g>
      )
    default:
      return null
  }
}

const PIP_COUNT = { 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 8: 5, 9: 4, 10: 3, 11: 2, 12: 1 }

function Token({ number }) {
  const red = number === 6 || number === 8
  const pips = PIP_COUNT[number]
  const ink = red ? '#c0392b' : '#2b2b2b'
  return (
    <g>
      <circle r="13" fill="#f6ebd0" stroke="#5c4a2a" strokeWidth="1" />
      <text y="3.5" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={ink}>
        {number}
      </text>
      <g fill={ink}>
        {Array.from({ length: pips }, (_, i) => (
          <circle key={i} cx={(i - (pips - 1) / 2) * 3} cy="8.5" r="1.05" />
        ))}
      </g>
    </g>
  )
}

function Robber() {
  return (
    <g>
      <circle cy="-4" r="3.2" fill="#1c1c1c" />
      <path d="M-4.5,7 q0,-8 4.5,-8 q4.5,0 4.5,8 z" fill="#1c1c1c" />
    </g>
  )
}

function Pirate() {
  return (
    <g>
      <path d="M-9,2 h18 l-4,5 h-10 z" fill="#1c1c1c" />
      <path d="M0,2 v-11 l7,7 h-7" fill="#1c1c1c" />
    </g>
  )
}

function Hex({ cell, pirate }) {
  const t = TERRAIN[cell.terrain] || TERRAIN.sea
  const cx = cell.x * R
  const cy = cell.y * R
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = ((-90 + 60 * i) * Math.PI) / 180
    return `${(cx + R * Math.cos(a)).toFixed(2)},${(cy + R * Math.sin(a)).toFixed(2)}`
  }).join(' ')
  const sea = cell.terrain === 'sea'
  let label = `${t.label} ${cell.number == null ? '' : cell.number}`.trim()
  if (sea) label = pirate ? 'sea, pirate starts here' : 'sea'
  if (cell.terrain === 'desert') label = 'desert, robber starts here'
  return (
    <g>
      <title>{label}</title>
      <polygon
        points={pts}
        fill={t.color}
        stroke={sea ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.45)'}
        strokeWidth={sea ? 0.8 : 1.4}
        strokeLinejoin="round"
      />
      <g transform={`translate(${cx},${cy - (cell.number != null ? 16 : 2)})`}>
        <TerrainIcon terrain={cell.terrain} />
      </g>
      {cell.number != null && (
        <g transform={`translate(${cx},${cy + 11})`}>
          <Token number={cell.number} />
        </g>
      )}
      {cell.terrain === 'desert' && (
        <g transform={`translate(${cx},${cy + 14})`}>
          <Robber />
        </g>
      )}
      {pirate && (
        <g transform={`translate(${cx},${cy + 12})`}>
          <Pirate />
        </g>
      )}
    </g>
  )
}

function Harbor({ h, verts }) {
  const hx = h.x * R
  const hy = h.y * R
  const a = verts[h.va]
  const b = verts[h.vb]
  const tok = h.token
  const any = tok.ratio === 3
  return (
    <g>
      <title>{any ? 'harbour 3:1, any resource' : `harbour 2:1 ${tok.resource}`}</title>
      <path
        d={`M${(a.x * R).toFixed(1)},${(a.y * R).toFixed(1)} L${hx.toFixed(1)},${hy.toFixed(1)} L${(b.x * R).toFixed(1)},${(b.y * R).toFixed(1)}`}
        fill="none"
        stroke="var(--fg-faint)"
        strokeWidth="1"
        strokeDasharray="2 2"
      />
      <circle cx={a.x * R} cy={a.y * R} r="2.6" fill="var(--fg-faint)" />
      <circle cx={b.x * R} cy={b.y * R} r="2.6" fill="var(--fg-faint)" />
      <g transform={`translate(${hx},${hy})`}>
        <rect x="-19" y="-9" width="38" height="18" rx="3" fill="var(--bg-inset)" stroke="var(--border-ui)" />
        <text x={any ? 0 : -4} y="3.5" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="var(--fg)">
          {any ? '3:1' : '2:1'}
        </text>
        {!any && (
          <circle
            cx="11"
            cy="0"
            r="4"
            fill={RESOURCE_COLOR[tok.resource]}
            stroke="rgba(0,0,0,0.5)"
            strokeWidth="0.8"
          />
        )}
      </g>
    </g>
  )
}

function Board({ board, showSpots }) {
  const { cells, harbors, geometry, stats } = board
  const { verts, pirate } = geometry
  const xs = cells.map((c) => c.x).concat(harbors.map((h) => h.x))
  const ys = cells.map((c) => c.y).concat(harbors.map((h) => h.y))
  const pad = 1.15
  const minX = (Math.min(...xs) - pad) * R
  const maxX = (Math.max(...xs) + pad) * R
  const minY = (Math.min(...ys) - pad) * R
  const maxY = (Math.max(...ys) + pad) * R
  return (
    <svg
      className="catan__svg"
      viewBox={`${minX.toFixed(0)} ${minY.toFixed(0)} ${(maxX - minX).toFixed(0)} ${(maxY - minY).toFixed(0)}`}
      role="img"
      aria-label="Generated Catan board"
    >
      {cells.map((c) => (
        <Hex key={c.id} cell={c} pirate={pirate === c.id} />
      ))}
      {harbors.map((h, i) => (
        <Harbor key={i} h={h} verts={verts} />
      ))}
      {showSpots &&
        stats.spots.map((s, i) => (
          <g key={i} transform={`translate(${s.x * R},${s.y * R})`}>
            <title>{`${s.pips} pips`}</title>
            <circle r="8.5" fill="var(--accent)" stroke="var(--bg)" strokeWidth="2" />
            <text y="3.2" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="var(--bg)">
              {s.pips}
            </text>
          </g>
        ))}
    </svg>
  )
}

// ---------- controls + stats ----------

function Segment({ label, options, value, onChange }) {
  return (
    <div className="catan__row" role="group" aria-label={label}>
      <span className="catan__rowlabel">{label}</span>
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          className="catan__opt"
          aria-pressed={value === o.id}
          disabled={o.disabled}
          title={o.disabled ? o.note : o.short || undefined}
          onClick={() => onChange(o.id)}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

function PipRows({ stats, seafarers, scarce }) {
  const keys = seafarers ? RESOURCES.concat('gold') : RESOURCES
  const max = Math.max(1, ...keys.map((k) => stats.pips[k]))
  return (
    <div>
      <div className="detail__label">Pips per resource</div>
      {keys.map((k) => (
        <div className="catan__piprow" key={k}>
          <span className={k === scarce ? 'warn' : undefined}>{k}</span>
          <div className="catan__bar">
            <div
              className="catan__barfill"
              style={{ width: `${(stats.pips[k] / max) * 100}%`, background: RESOURCE_COLOR[k] }}
            />
          </div>
          <span className="faint">
            {stats.pips[k]} <span className="dim">/ {stats.hexes[k]} hex</span>
          </span>
        </div>
      ))}
      {scarce && (
        <p className="faint catan__note" style={{ marginTop: 'var(--sp-2)' }}>
          <span className="warn">{scarce}</span> is the scarce resource on this board.
        </p>
      )}
    </div>
  )
}

function Spots({ stats }) {
  return (
    <div>
      <div className="detail__label">Strongest corners</div>
      <ul className="detail__list">
        {stats.spots.map((s, i) => (
          <li key={i}>
            <span className="accent">{s.pips} pips</span>
            <span className="faint"> — </span>
            {s.hexes.map((h, j) => (
              <span key={j}>
                {j > 0 && <span className="faint"> · </span>}
                <span className={h.number === 6 || h.number === 8 ? 'danger' : undefined}>{h.number}</span>{' '}
                {h.resource}
              </span>
            ))}
          </li>
        ))}
      </ul>
    </div>
  )
}

function ruleCheck(label, rule, count) {
  if (rule === 'touch') return { label: `${label} touching`, ok: count > 0, detail: `${count} touching` }
  if (rule === 'free') return { label: `${label} ${count ? 'touching' : 'apart'}`, ok: true, detail: 'no rule set' }
  return { label: `${label} apart`, ok: count === 0, detail: `${count} touching` }
}

function desertCheck(rule, stats) {
  const where = stats.desertCoast === 0 ? 'inland' : stats.desertCoast === stats.deserts ? 'on coast' : 'split'
  if (rule === 'inland') return { label: 'desert inland', ok: stats.desertCoast === 0, detail: where }
  if (rule === 'coast') return { label: 'desert on coast', ok: stats.desertCoast === stats.deserts, detail: where }
  return { label: `desert ${where}`, ok: true, detail: 'no rule set' }
}

function Checks({ stats, rules }) {
  const items = [
    ruleCheck('6 and 8', rules.r68, stats.redAdj),
    ruleCheck('2 and 12', rules.r212, stats.twoTwelve),
    ruleCheck('same numbers', rules.rnum, stats.sameNum),
    ruleCheck('same terrain', rules.rter, stats.sameTerrain),
    ruleCheck('harbour + resource', rules.rharb, stats.harbSame),
    desertCheck(rules.rdesert, stats),
    { label: `best corner ${stats.maxSpot} pips`, ok: stats.maxSpot <= 12, detail: 'pips on the strongest corner' },
  ]
  return (
    <div className="catan__checks">
      {items.map((it) => (
        <span key={it.label} className={it.ok ? 'tag tag--accent' : 'tag'} title={it.detail}>
          {it.ok ? '✓' : '·'} {it.label}
        </span>
      ))}
    </div>
  )
}

export function CatanPanel({ initial = {} }) {
  const [game, setGame] = useState(initial.game || 'base')
  const [players, setPlayers] = useState(initial.players || 4)
  const [mode, setModeState] = useState(initial.mode || 'advanced')
  const [rules, setRules] = useState(initial.rules || {})
  // Switching mode drops any pinned rules back to that mode's defaults.
  const setMode = (m) => {
    setModeState(m)
    setRules({})
  }
  const [seed, setSeed] = useState(() => initial.seed || randomSeed())
  const [seedInput, setSeedInput] = useState(initial.seed || '')
  const [showSpots, setShowSpots] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => setSeedInput(seed), [seed])

  const layoutKey = layoutKeyFor(game, players)
  const board = useMemo(
    () => generateBoard({ layoutKey, modeKey: mode, game, seed, rules }),
    [layoutKey, mode, game, seed, rules]
  )

  const parts = [game, players, mode, ...ruleTokens(mode, rules), seed]
  const link = `${window.location.origin}${window.location.pathname}#catan/${parts.join('/')}`

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(link)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      window.prompt('Copy this link', link)
    }
  }, [link])

  const applySeed = () => {
    const s = seedInput.trim().toLowerCase().replace(/[^\w.-]/g, '').slice(0, 24)
    setSeed(s || randomSeed())
  }

  const gameInfo = GAMES.find((g) => g.id === game)
  const explorers = GAMES.find((g) => g.id === 'explorers')
  const modeInfo = MODES[mode]
  const seafarers = game === 'seafarers'
  const cmd = `catan ${parts.join(' ')}`
  const effectiveRules = board.rules

  return (
    <Panel title="CATAN" sub="board generator · seeded, shareable">
      <div className="catan">
        <div className="catan__controls">
          <Segment label="game" options={GAMES} value={game} onChange={setGame} />
          <Segment label="players" options={PLAYERS} value={players} onChange={setPlayers} />
          <Segment
            label="mode"
            options={Object.entries(MODES).map(([id, m]) => ({ id, label: m.label, short: m.short }))}
            value={mode}
            onChange={setMode}
          />
          <div className="catan__row" role="group" aria-label="rules">
            <span className="catan__rowlabel">rules</span>
            {RULES.map((r) => (
              <span className="catan__rule" key={r.key} role="group" aria-label={r.label}>
                <span className="catan__rulelabel">{r.label}</span>
                {r.states.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className="catan__opt catan__opt--sm"
                    aria-pressed={effectiveRules[r.key] === s}
                    title={r.titles[s]}
                    onClick={() => setRules({ ...rules, [r.key]: s })}
                  >
                    {s}
                  </button>
                ))}
              </span>
            ))}
          </div>
          <div className="catan__row">
            <label className="catan__rowlabel" htmlFor="catan-seed">
              seed
            </label>
            <input
              id="catan-seed"
              className="catan__seed"
              value={seedInput}
              onChange={(e) => setSeedInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') applySeed()
              }}
              onBlur={() => {
                if (seedInput.trim() && seedInput.trim() !== seed) applySeed()
              }}
              spellCheck="false"
              autoComplete="off"
            />
            <button type="button" className="btnlink" onClick={() => setSeed(randomSeed())}>
              new board
            </button>
            <button type="button" className="btnlink" onClick={copyLink}>
              {copied ? 'copied ✓' : 'copy link'}
            </button>
            <label className="catan__toggle">
              <input
                type="checkbox"
                checked={showSpots}
                onChange={(e) => setShowSpots(e.target.checked)}
              />{' '}
              best corners
            </label>
          </div>
        </div>

        <div className="catan__boardwrap" tabIndex={0}>
          <Board board={board} showSpots={showSpots} />
        </div>

        <div className="catan__meta faint">
          {board.geometry.layout.title} · {modeInfo.label.toLowerCase()} · seed{' '}
          <span className="accent">{seed}</span>
          {board.attempts > 1 && ` · ${board.attempts} passes`}
        </div>

        <Checks stats={board.stats} rules={effectiveRules} />

        <div className="catan__stats">
          <PipRows stats={board.stats} seafarers={seafarers} scarce={board.scarce} />
          <Spots stats={board.stats} />
        </div>

        <p className="catan__note dim">
          <span className="accent">{modeInfo.label}.</span> {modeInfo.desc}
        </p>
        <p className="catan__note faint">
          <span className="dim">{gameInfo.label}.</span> {gameInfo.note} {explorers.note}
        </p>
        <p className="catan__note faint">
          <span className="accent">{cmd}</span> brings this exact board back. The link does the same.
        </p>
      </div>
    </Panel>
  )
}
