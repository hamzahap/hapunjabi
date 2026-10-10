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
import { GAMES, SCENARIOS, TERRAIN, RESOURCES, RESOURCE_COLOR } from '../catan/layouts.js'
import { TerrainIcon, Token, Robber, Pirate } from './CatanArt.jsx'
import { HowToPlay } from './CatanRules.jsx'

const R = 40 // hex radius in SVG units

const PLAYERS = [
  { id: 3, label: '3' },
  { id: 4, label: '4' },
  { id: 6, label: '5–6' },
]
const SETUPS = [
  { id: 'variable', label: 'shuffled', short: 'the rulebook’s variable set-up' },
  { id: 'printed', label: 'printed', short: 'the diagram as printed; harbour tokens still shuffle' },
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
  ep: 'explorers',
}
const SCENARIO_ALIASES = {
  shores: 'shores',
  newshores: 'shores',
  islands: 'islands',
  four: 'islands',
  fog: 'fog',
  desert: 'desert',
  tribe: 'tribe',
  forgotten: 'tribe',
  cloth: 'cloth',
  pirates: 'pirates',
  wonders: 'wonders',
  newworld: 'newworld',
  world: 'newworld',
}
const SETUP_ALIASES = { printed: 'printed', fixed: 'printed', shuffled: 'variable', variable: 'variable' }
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
const PLAYER_ALIASES = { 3: 3, 4: 4, '3-4': 4, 34: 4, 5: 6, 6: 6, '5-6': 6, 56: 6 }

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
    ...Object.keys(SCENARIO_ALIASES),
    ...Object.keys(SETUP_ALIASES),
    ...RULE_TOKENS,
    '4',
    '6',
    '3-4',
    '5-6',
  ])
).sort()

/** `catan seafarers 6 strategy 68-touch k3x9pq` in any order; the first unknown token is the seed. */
export function parseCatanArgs(args = []) {
  const out = { game: 'base', players: 4, mode: 'advanced', seed: null, rules: {}, scenario: 'shores', setup: 'variable' }
  for (const raw of args) {
    const t = raw.toLowerCase().replace(/^--/, '')
    const dash = t.indexOf('-')
    const head = dash > 0 ? t.slice(0, dash) : ''
    const state = dash > 0 ? t.slice(dash + 1) : ''
    const rule = RULES.find((r) => r.token === head || (r.aliases || []).includes(head))
    if (GAME_ALIASES[t]) out.game = GAME_ALIASES[t]
    else if (MODE_ALIASES[t]) out.mode = MODE_ALIASES[t]
    else if (PLAYER_ALIASES[t]) out.players = PLAYER_ALIASES[t]
    else if (SCENARIO_ALIASES[t]) out.scenario = SCENARIO_ALIASES[t]
    else if (SETUP_ALIASES[t]) out.setup = SETUP_ALIASES[t]
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

function layoutKeyFor(game, players, scenario) {
  if (game === 'seafarers') return `sea:${scenario}:${players}`
  return `base${players === 6 ? 6 : 4}`
}

function Hex({ cell, pirate, robber }) {
  const t = TERRAIN[cell.terrain] || TERRAIN.sea
  const fog = cell.terrain === 'fog'
  const cx = cell.x * R
  const cy = cell.y * R
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = ((-90 + 60 * i) * Math.PI) / 180
    return `${(cx + R * Math.cos(a)).toFixed(2)},${(cy + R * Math.sin(a)).toFixed(2)}`
  }).join(' ')
  const sea = cell.terrain === 'sea'
  let label = `${t.label} ${cell.number == null ? '' : cell.number}`.trim()
  if (sea) label = pirate ? 'sea, pirate starts here' : 'sea'
  if (fog) label = 'unexplored, revealed from the face-down stack'
  if (cell.village) label = `village, ${t.label} ${cell.village.join(' and ')}`
  if (robber) label += ', robber starts here'
  return (
    <g>
      <title>{label}</title>
      <polygon
        points={pts}
        fill={t.color}
        stroke={sea ? 'rgba(255,255,255,0.18)' : fog ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.45)'}
        strokeWidth={sea ? 0.8 : 1.4}
        strokeDasharray={fog ? '4 3' : undefined}
        strokeLinejoin="round"
      />
      {fog && (
        <text x={cx} y={cy + 7} textAnchor="middle" fontSize="20" fontWeight="700" fill="rgba(0,0,0,0.35)">
          ?
        </text>
      )}
      {cell.village && (
        <>
          <g transform={`translate(${cx - 15},${cy + 11}) scale(0.85)`}>
            <Token number={cell.village[0]} />
          </g>
          <g transform={`translate(${cx + 15},${cy + 11}) scale(0.85)`}>
            <Token number={cell.village[1]} />
          </g>
        </>
      )}
      <g transform={`translate(${cx},${cy - (cell.number != null ? 16 : 2)})`}>
        <TerrainIcon terrain={cell.terrain} />
      </g>
      {cell.number != null && (
        <g transform={`translate(${cx},${cy + 11})`}>
          <Token number={cell.number} />
        </g>
      )}
      {robber && (
        <g transform={`translate(${cx},${cy + (cell.number != null ? -2 : 14)})`}>
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

const EDGE_INDEX = { NE: 0, E: 1, SE: 2, SW: 3, W: 4, NW: 5 }

function Mark({ mark, cells }) {
  const [r, c, edge, kind] = mark
  const cell = cells.find((x) => x.r === r && x.c === c)
  if (!cell) return null
  const ang = ((-60 + 60 * EDGE_INDEX[edge]) * Math.PI) / 180
  const x = (cell.x + Math.cos(ang) * 0.87) * R
  const y = (cell.y + Math.sin(ang) * 0.87) * R
  if (kind === 'vp')
    return (
      <g transform={`translate(${x},${y})`}>
        <title>victory point token, taken by the first ship to reach this edge</title>
        <circle r="7" fill="#c0392b" stroke="#f6ebd0" strokeWidth="1.2" />
        <text y="2.6" textAnchor="middle" fontSize="6.5" fontWeight="700" fill="#f6ebd0">
          VP
        </text>
      </g>
    )
  return (
    <g transform={`translate(${x},${y})`}>
      <title>face-down development card, taken by the first ship to reach this edge</title>
      <rect x="-6" y="-8" width="12" height="16" rx="1.5" fill="#d9825f" stroke="#5c3a2a" strokeWidth="1" />
    </g>
  )
}

function Board({ board, showSpots }) {
  const { cells, harbors, geometry, stats } = board
  const { verts, pirate } = geometry
  const marks = geometry.layout.marks || []
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
        <Hex key={c.id} cell={c} pirate={pirate === c.id} robber={board.robber === c.id} />
      ))}
      {marks.map((m, i) => (
        <Mark key={i} mark={m} cells={cells} />
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

function Checks({ stats, rules, scenarioRules }) {
  const items = [
    ruleCheck('6 and 8', rules.r68, stats.redAdj),
    ruleCheck('2 and 12', rules.r212, stats.twoTwelve),
    ruleCheck('same numbers', rules.rnum, stats.sameNum),
    ruleCheck('same terrain', rules.rter, stats.sameTerrain),
    ruleCheck('harbour + resource', rules.rharb, stats.harbSame),
    desertCheck(rules.rdesert, stats),
    ...(scenarioRules
      ? [{ label: 'scenario rules', ok: stats.scenarioBad === 0, detail: `${stats.scenarioBad} hexes break the scenario set-up advice` }]
      : []),
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
  const [scenario, setScenario] = useState(initial.scenario || 'shores')
  const [setup, setSetup] = useState(initial.setup || 'variable')
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
  const [showHowTo, setShowHowTo] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => setSeedInput(seed), [seed])

  const seafarers = game === 'seafarers'
  const scenInfo = SCENARIOS.find((s) => s.id === scenario)
  const hasPrinted = seafarers && scenario !== 'newworld'
  const effectiveSetup = hasPrinted ? setup : 'variable'
  const layoutKey = layoutKeyFor(game, players, scenario)
  const board = useMemo(
    () => generateBoard({ layoutKey, modeKey: mode, game, seed, rules, setup: effectiveSetup }),
    [layoutKey, mode, game, seed, rules, effectiveSetup]
  )

  const parts = [
    game,
    ...(seafarers ? [scenario] : []),
    players,
    mode,
    ...(effectiveSetup === 'printed' ? ['printed'] : []),
    ...ruleTokens(mode, rules),
    seed,
  ]
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
  const cmd = `catan ${parts.join(' ')}`
  const effectiveRules = board.rules

  return (
    <Panel title="CATAN" sub="board generator · seeded, shareable">
      <div className="catan">
        <div className="catan__controls">
          <Segment label="game" options={GAMES} value={game} onChange={setGame} />
          {seafarers && (
            <Segment
              label="scenario"
              options={SCENARIOS.map((s) => ({ id: s.id, label: s.label, short: s.note }))}
              value={scenario}
              onChange={setScenario}
            />
          )}
          <Segment label="players" options={PLAYERS} value={players} onChange={setPlayers} />
          {hasPrinted && <Segment label="setup" options={SETUPS} value={setup} onChange={setSetup} />}
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
            <button type="button" className="btnlink" aria-pressed={showHowTo} onClick={() => setShowHowTo((v) => !v)}>
              {showHowTo ? 'hide rules' : 'how to play'}
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

        <Checks
          stats={board.stats}
          rules={effectiveRules}
          scenarioRules={board.geometry.nored.length + board.geometry.lowside.length + board.geometry.noLowOn.length > 0}
        />

        <div className="catan__stats">
          <PipRows stats={board.stats} seafarers={seafarers} scarce={board.scarce} />
          <Spots stats={board.stats} />
        </div>

        <p className="catan__note dim">
          <span className="accent">{modeInfo.label}.</span> {modeInfo.desc}
        </p>
        {seafarers && scenInfo && (
          <p className="catan__note dim">
            <span className="accent">{scenInfo.label}.</span> {scenInfo.note}
            {scenInfo.vp ? ` First to ${scenInfo.vp} VP wins.` : ''}{' '}
            <span className="faint">{scenInfo.variable}</span>
            {board.geometry.layout.facedown && (
              <span className="faint">
                {' '}
                Face-down stack:{' '}
                {Object.entries(board.geometry.layout.facedown.terrain)
                  .map(([t, n]) => `${n} ${t}`)
                  .join(', ')}
                ; numbers {board.geometry.layout.facedown.numbers.join(' ')}.
              </span>
            )}
          </p>
        )}
        <p className="catan__note faint">
          <span className="dim">{gameInfo.label}.</span> {gameInfo.note}{' '}
          {board.geometry.layout.frameNote && `${board.geometry.layout.frameNote} `}
          {explorers.note}
        </p>
        <p className="catan__note faint">
          <span className="accent">{cmd}</span> brings this exact board back. The link does the same.
        </p>
        {showHowTo && (
          <HowToPlay
            game={game}
            scenario={scenario}
            players={players}
            scenarioLabel={scenInfo ? scenInfo.label : ''}
          />
        )}
      </div>
    </Panel>
  )
}
