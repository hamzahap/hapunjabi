/**
 * How to play: short step-by-step rules for the base game, the Seafarers
 * basics and each scenario, each step with a small drawn figure. Written
 * from the 2025 CATAN and Seafarers rulebooks; figures are our own art.
 */
import { useState } from 'react'
import { TERRAIN } from '../catan/layouts.js'
import { TerrainIcon, Token, Pirate, Robber } from './CatanArt.jsx'

const R = 26
const SQ = Math.sqrt(3)

// ---------- figure primitives ----------

function hexPoints(cx, cy, r = R) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = ((-90 + 60 * i) * Math.PI) / 180
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`
  }).join(' ')
}

function H({ x, y, t, n, village, children }) {
  const col = (TERRAIN[t] || TERRAIN.sea).color
  const sea = t === 'sea'
  const fog = t === 'fog'
  return (
    <g>
      <polygon
        points={hexPoints(x, y)}
        fill={col}
        stroke={sea ? 'rgba(255,255,255,0.2)' : fog ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.45)'}
        strokeWidth={sea ? 0.6 : 1}
        strokeDasharray={fog ? '3 2' : undefined}
        strokeLinejoin="round"
      />
      {fog && (
        <text x={x} y={y + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill="rgba(0,0,0,0.35)">
          ?
        </text>
      )}
      <g transform={`translate(${x},${y - (n != null ? 10 : 1)}) scale(0.6)`}>
        <TerrainIcon terrain={t} />
      </g>
      {n != null && (
        <g transform={`translate(${x},${y + 8}) scale(0.62)`}>
          <Token number={n} />
        </g>
      )}
      {village && (
        <>
          <g transform={`translate(${x - 9},${y + 8}) scale(0.5)`}>
            <Token number={village[0]} />
          </g>
          <g transform={`translate(${x + 9},${y + 8}) scale(0.5)`}>
            <Token number={village[1]} />
          </g>
        </>
      )}
      {children}
    </g>
  )
}

/** Vertex of the hex at (x,y): i = 0 top, clockwise. */
function V(x, y, i) {
  const a = ((-90 + 60 * i) * Math.PI) / 180
  return [x + R * Math.cos(a), y + R * Math.sin(a)]
}

function Settlement({ x, y, color = '#e04b3f', city = false }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <title>{city ? 'city' : 'settlement'}</title>
      {city ? (
        <path d="M-7,5 v-7 l4,-4 l4,4 v-2 h5 v9 z" fill={color} stroke="#2b1a14" strokeWidth="0.8" />
      ) : (
        <path d="M-5,5 v-6 l5,-4 l5,4 v6 z" fill={color} stroke="#2b1a14" strokeWidth="0.8" />
      )}
    </g>
  )
}

function Road({ a, b, color = '#e04b3f' }) {
  return <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={color} strokeWidth="5" strokeLinecap="round" />
}

function Ship({ a, b, color = '#e04b3f', war = false, ghost = false }) {
  const mx = (a[0] + b[0]) / 2
  const my = (a[1] + b[1]) / 2
  const ang = (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI
  return (
    <g transform={`translate(${mx},${my}) rotate(${ang})`} opacity={ghost ? 0.45 : 1}>
      <title>{war ? 'warship (turned on its side)' : 'ship'}</title>
      {war ? (
        <g transform="rotate(90)">
          <path d="M-7,2 h14 l-3,4 h-8 z" fill={color} stroke="#2b1a14" strokeWidth="0.7" />
          <path d="M0,2 v-8 l5,5 h-5" fill="#f6ebd0" stroke="#2b1a14" strokeWidth="0.7" />
        </g>
      ) : (
        <>
          <path d="M-7,2 h14 l-3,4 h-8 z" fill={color} stroke="#2b1a14" strokeWidth="0.7" />
          <path d="M0,2 v-8 l5,5 h-5" fill="#f6ebd0" stroke="#2b1a14" strokeWidth="0.7" />
        </>
      )}
    </g>
  )
}

function Badge({ x, y, text, tone = 'accent' }) {
  const w = text.length * 6 + 10
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x={-w / 2} y="-8" width={w} height="16" rx="3" fill={tone === 'accent' ? 'var(--accent)' : '#c0392b'} />
      <text y="3.5" textAnchor="middle" fontSize="9" fontWeight="700" fill={tone === 'accent' ? 'var(--bg)' : '#f6ebd0'}>
        {text}
      </text>
    </g>
  )
}

function Arrow({ a, b }) {
  const ang = Math.atan2(b[1] - a[1], b[0] - a[0])
  const hx = b[0] - 6 * Math.cos(ang)
  const hy = b[1] - 6 * Math.sin(ang)
  return (
    <g stroke="var(--fg)" fill="var(--fg)" strokeWidth="1.6">
      <line x1={a[0]} y1={a[1]} x2={hx} y2={hy} />
      <polygon
        points={`${b[0]},${b[1]} ${hx + 4 * Math.sin(ang)},${hy - 4 * Math.cos(ang)} ${hx - 4 * Math.sin(ang)},${hy + 4 * Math.cos(ang)}`}
      />
    </g>
  )
}

function Card({ x, y, label, color = '#d9825f' }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x="-8" y="-11" width="16" height="22" rx="2" fill={color} stroke="#2b1a14" strokeWidth="0.8" />
      {label && (
        <text y="3" textAnchor="middle" fontSize="7" fontWeight="700" fill="#fff">
          {label}
        </text>
      )}
    </g>
  )
}

function Resource({ x, y, kind }) {
  const col = { wood: '#2f7a45', brick: '#c4622d', sheep: '#8dc63f', wheat: '#e8b73a', ore: '#8b93a1', any: 'var(--fg-faint)' }[kind]
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x="-6" y="-8" width="12" height="16" rx="1.5" fill={col} stroke="#2b1a14" strokeWidth="0.7" />
      {kind === 'any' && (
        <text y="3" textAnchor="middle" fontSize="8" fontWeight="700" fill="var(--bg)">
          ?
        </text>
      )}
    </g>
  )
}

// Two land hexes side by side with a sea hex below-right: the standard "coast" scene.
const A = { x: 40, y: 38 }
const B = { x: 40 + SQ * R, y: 38 }
const S1 = { x: 40 + (SQ * R) / 2, y: 38 + 1.5 * R }
const S2 = { x: 40 + (SQ * R) * 1.5, y: 38 + 1.5 * R }

function Fig({ children, w = 180, h = 120 }) {
  return (
    <svg className="howto__fig" viewBox={`0 0 ${w} ${h}`} role="img" aria-hidden="true">
      {children}
    </svg>
  )
}

// ---------- figures ----------

const FIGS = {
  costs: () => (
    <Fig w={200} h={120}>
      {[
        ['road', ['wood', 'brick']],
        ['ship', ['wood', 'sheep']],
        ['settlement', ['wood', 'brick', 'sheep', 'wheat']],
        ['city', ['wheat', 'wheat', 'ore', 'ore', 'ore']],
        ['dev. card', ['sheep', 'wheat', 'ore']],
      ].map(([name, res], i) => (
        <g key={name} transform={`translate(0,${12 + i * 22})`}>
          <text x="4" y="4" fontSize="9" fill="var(--fg-dim)">
            {name}
          </text>
          {res.map((r, j) => (
            <Resource key={j} x={78 + j * 15} y={0} kind={r} />
          ))}
        </g>
      ))}
    </Fig>
  ),
  setup: () => (
    <Fig>
      <H x={A.x} y={A.y} t="forest" n={8} />
      <H x={B.x} y={B.y} t="fields" n={5} />
      <H x={S1.x} y={S1.y} t="hills" n={10} />
      <H x={S2.x} y={S2.y} t="sea" />
      <Settlement x={V(A.x, A.y, 2)[0]} y={V(A.x, A.y, 2)[1]} />
      <Road a={V(A.x, A.y, 2)} b={V(A.x, A.y, 3)} />
      <Settlement x={V(B.x, B.y, 1)[0]} y={V(B.x, B.y, 1)[1]} color="#3b6fd6" />
      <Road a={V(B.x, B.y, 1)} b={V(B.x, B.y, 0)} color="#3b6fd6" />
    </Fig>
  ),
  turn: () => (
    <Fig w={200}>
      <g transform="translate(20,30)">
        <rect x="0" y="0" width="22" height="22" rx="4" fill="#f6ebd0" stroke="#5c4a2a" />
        <circle cx="6" cy="6" r="2.2" fill="#2b2b2b" />
        <circle cx="16" cy="16" r="2.2" fill="#2b2b2b" />
        <rect x="28" y="0" width="22" height="22" rx="4" fill="#c0392b" stroke="#5c4a2a" />
        <circle cx="39" cy="11" r="2.2" fill="#f6ebd0" />
        <circle cx="33" cy="5" r="2.2" fill="#f6ebd0" />
        <circle cx="45" cy="17" r="2.2" fill="#f6ebd0" />
      </g>
      <text x="20" y="72" fontSize="9" fill="var(--fg-dim)">
        1. roll → everyone collects
      </text>
      <text x="20" y="88" fontSize="9" fill="var(--fg-dim)">
        2. trade with players or harbours
      </text>
      <text x="20" y="104" fontSize="9" fill="var(--fg-dim)">
        3. build, in any order
      </text>
      <Resource x={160} y={38} kind="wood" />
      <Resource x={174} y={38} kind="brick" />
    </Fig>
  ),
  robber: () => (
    <Fig>
      <H x={A.x} y={A.y} t="mountains" n={6} />
      <H x={B.x} y={B.y} t="pasture" n={9}>
        <g transform={`translate(${B.x + 12},${B.y - 4}) scale(1.1)`}>
          <Robber />
        </g>
      </H>
      <H x={S1.x} y={S1.y} t="desert" />
      <H x={S2.x} y={S2.y} t="sea" />
      <Settlement x={V(B.x, B.y, 2)[0]} y={V(B.x, B.y, 2)[1]} color="#3b6fd6" />
      <Badge x={150} y={14} text="7: no 9s" tone="red" />
    </Fig>
  ),
  ships: () => (
    <Fig>
      <H x={A.x} y={A.y} t="forest" n={4} />
      <H x={B.x} y={B.y} t="sea" />
      <H x={S1.x} y={S1.y} t="sea" />
      <H x={S2.x} y={S2.y} t="sea" />
      <Settlement x={V(A.x, A.y, 1)[0]} y={V(A.x, A.y, 1)[1]} />
      <Ship a={V(A.x, A.y, 1)} b={V(A.x, A.y, 2)} />
      <Ship a={V(S1.x, S1.y, 0)} b={V(S1.x, S1.y, 1)} />
      <Ship a={V(S1.x, S1.y, 1)} b={V(S1.x, S1.y, 2)} ghost />
      <Resource x={160} y={14} kind="wood" />
      <Resource x={174} y={14} kind="sheep" />
    </Fig>
  ),
  moveShip: () => (
    <Fig>
      <H x={A.x} y={A.y} t="hills" n={5} />
      <H x={B.x} y={B.y} t="sea" />
      <H x={S1.x} y={S1.y} t="sea" />
      <H x={S2.x} y={S2.y} t="sea" />
      <Settlement x={V(A.x, A.y, 1)[0]} y={V(A.x, A.y, 1)[1]} />
      <Ship a={V(A.x, A.y, 1)} b={V(A.x, A.y, 2)} />
      <Ship a={V(S1.x, S1.y, 0)} b={V(S1.x, S1.y, 1)} ghost />
      <Ship a={V(B.x, B.y, 1)} b={V(B.x, B.y, 2)} />
      <Arrow a={[S1.x + 14, S1.y - 24]} b={[B.x + 18, B.y + 2]} />
    </Fig>
  ),
  pirate: () => (
    <Fig>
      <H x={A.x} y={A.y} t="fields" n={3} />
      <H x={B.x} y={B.y} t="sea">
        <g transform={`translate(${B.x},${B.y + 4}) scale(1.3)`}>
          <Pirate />
        </g>
      </H>
      <H x={S1.x} y={S1.y} t="sea" />
      <H x={S2.x} y={S2.y} t="sea" />
      <Ship a={V(B.x, B.y, 3)} b={V(B.x, B.y, 4)} color="#3b6fd6" />
      <g stroke="#c0392b" strokeWidth="2.5" strokeLinecap="round">
        <line x1={B.x - 2} y1={B.y + 14} x2={B.x + 10} y2={B.y + 26} />
        <line x1={B.x + 10} y1={B.y + 14} x2={B.x - 2} y2={B.y + 26} />
      </g>
    </Fig>
  ),
  route: () => (
    <Fig>
      <H x={A.x} y={A.y} t="pasture" n={10} />
      <H x={B.x} y={B.y} t="forest" n={11} />
      <H x={S1.x} y={S1.y} t="sea" />
      <H x={S2.x} y={S2.y} t="sea" />
      <Road a={V(A.x, A.y, 4)} b={V(A.x, A.y, 3)} />
      <Road a={V(A.x, A.y, 3)} b={V(A.x, A.y, 2)} />
      <Settlement x={V(A.x, A.y, 2)[0]} y={V(A.x, A.y, 2)[1]} />
      <Ship a={V(S1.x, S1.y, 0)} b={V(S1.x, S1.y, 1)} />
      <Ship a={V(S1.x, S1.y, 1)} b={V(S1.x, S1.y, 2)} />
      <Badge x={150} y={14} text="route: 4" />
    </Fig>
  ),
  gold: () => (
    <Fig>
      <H x={A.x} y={A.y} t="gold" n={5} />
      <H x={B.x} y={B.y} t="sea" />
      <H x={S1.x} y={S1.y} t="sea" />
      <H x={S2.x} y={S2.y} t="sea" />
      <Settlement x={V(A.x, A.y, 1)[0]} y={V(A.x, A.y, 1)[1]} />
      <Arrow a={[B.x - 4, B.y - 10]} b={[B.x + 30, B.y - 10]} />
      {['wood', 'brick', 'sheep', 'wheat', 'ore'].map((k, i) => (
        <Resource key={k} x={118 + i * 15} y={B.y + 16} kind={k} />
      ))}
    </Fig>
  ),
  harbors: () => (
    <Fig>
      <H x={A.x} y={A.y} t="forest" n={9} />
      <H x={B.x} y={B.y} t="sea" />
      <H x={S1.x} y={S1.y} t="sea" />
      <H x={S2.x} y={S2.y} t="sea" />
      <g transform={`translate(${B.x - 8},${B.y - 6})`}>
        <rect x="-16" y="-8" width="32" height="16" rx="3" fill="var(--bg-inset)" stroke="var(--border-ui)" />
        <text x="-3" y="3.5" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="var(--fg)">
          2:1
        </text>
        <circle cx="9" cy="0" r="3.5" fill="#2f7a45" stroke="rgba(0,0,0,0.5)" strokeWidth="0.7" />
      </g>
      <Settlement x={V(A.x, A.y, 1)[0]} y={V(A.x, A.y, 1)[1]} />
      <Card x={150} y={92} label="?" color="var(--fg-faint)" />
      <Card x={166} y={92} label="?" color="var(--fg-faint)" />
    </Fig>
  ),
  islandVp: (vp = 2) => (
    <Fig>
      <H x={A.x} y={A.y} t="forest" n={8} />
      <H x={B.x} y={B.y} t="sea" />
      <H x={S1.x} y={S1.y} t="sea" />
      <H x={S2.x} y={S2.y} t="mountains" n={4} />
      <Settlement x={V(A.x, A.y, 1)[0]} y={V(A.x, A.y, 1)[1]} />
      <Ship a={V(A.x, A.y, 1)} b={V(A.x, A.y, 2)} />
      <Ship a={V(S1.x, S1.y, 0)} b={V(S1.x, S1.y, 1)} />
      <Settlement x={V(S2.x, S2.y, 5)[0]} y={V(S2.x, S2.y, 5)[1]} />
      <Badge x={S2.x + 14} y={S2.y - 30} text={`+${vp} VP`} />
    </Fig>
  ),
  home: () => (
    <Fig>
      <H x={A.x} y={A.y} t="hills" n={6} />
      <H x={B.x} y={B.y} t="sea" />
      <H x={S1.x} y={S1.y} t="sea" />
      <H x={S2.x} y={S2.y} t="pasture" n={9} />
      <Settlement x={V(A.x, A.y, 2)[0]} y={V(A.x, A.y, 2)[1]} />
      <Settlement x={V(S2.x, S2.y, 0)[0]} y={V(S2.x, S2.y, 0)[1]} />
      <Badge x={A.x} y={A.y - 34} text="home" />
      <Badge x={S2.x} y={S2.y - 34} text="home" />
    </Fig>
  ),
  fog: () => (
    <Fig>
      <H x={A.x} y={A.y} t="fields" n={4} />
      <H x={B.x} y={B.y} t="fog" />
      <H x={S1.x} y={S1.y} t="sea" />
      <H x={S2.x} y={S2.y} t="fog" />
      <Settlement x={V(A.x, A.y, 1)[0]} y={V(A.x, A.y, 1)[1]} />
      <Ship a={V(A.x, A.y, 1)} b={V(A.x, A.y, 2)} />
      <Arrow a={[B.x - 20, B.y + 24]} b={[B.x - 8, B.y + 8]} />
      <Card x={160} y={92} label="?" color="var(--fg-faint)" />
      <Card x={150} y={96} label="?" color="var(--fg-faint)" />
    </Fig>
  ),
  fogReveal: () => (
    <Fig>
      <H x={A.x} y={A.y} t="fields" n={4} />
      <H x={B.x} y={B.y} t="forest" n={9} />
      <H x={S1.x} y={S1.y} t="sea" />
      <H x={S2.x} y={S2.y} t="fog" />
      <Settlement x={V(A.x, A.y, 1)[0]} y={V(A.x, A.y, 1)[1]} />
      <Ship a={V(A.x, A.y, 1)} b={V(A.x, A.y, 2)} />
      <Badge x={150} y={14} text="+1 wood" />
    </Fig>
  ),
  desert: () => (
    <Fig>
      <H x={A.x} y={A.y} t="forest" n={8} />
      <H x={B.x} y={B.y} t="desert" />
      <H x={S1.x} y={S1.y} t="desert" />
      <H x={S2.x} y={S2.y} t="hills" n={5} />
      <Settlement x={V(A.x, A.y, 1)[0]} y={V(A.x, A.y, 1)[1]} />
      <Road a={V(A.x, A.y, 1)} b={V(B.x, B.y, 0)} />
      <Road a={V(B.x, B.y, 0)} b={V(B.x, B.y, 1)} />
      <Badge x={S2.x + 10} y={S2.y - 32} text="+2 VP" />
    </Fig>
  ),
  tribeEdge: () => (
    <Fig>
      <H x={A.x} y={A.y} t="pasture" n={10} />
      <H x={B.x} y={B.y} t="sea" />
      <H x={S1.x} y={S1.y} t="sea" />
      <H x={S2.x} y={S2.y} t="hills" />
      <Settlement x={V(A.x, A.y, 1)[0]} y={V(A.x, A.y, 1)[1]} />
      <Ship a={V(A.x, A.y, 1)} b={V(A.x, A.y, 2)} />
      <Ship a={V(S1.x, S1.y, 0)} b={V(S1.x, S1.y, 1)} />
      <g transform={`translate(${(V(S2.x, S2.y, 5)[0] + V(S2.x, S2.y, 0)[0]) / 2 - 2},${(V(S2.x, S2.y, 5)[1] + V(S2.x, S2.y, 0)[1]) / 2 - 10})`}>
        <circle r="7" fill="#c0392b" stroke="#f6ebd0" strokeWidth="1.2" />
        <text y="2.6" textAnchor="middle" fontSize="6.5" fontWeight="700" fill="#f6ebd0">
          VP
        </text>
      </g>
      <Card x={160} y={30} />
      <Badge x={126} y={104} text="no settlements" tone="red" />
    </Fig>
  ),
  village: () => (
    <Fig>
      <H x={A.x} y={A.y} t="forest" n={6} />
      <H x={B.x} y={B.y} t="sea" />
      <H x={S1.x} y={S1.y} t="sea" />
      <H x={S2.x} y={S2.y} t="desert" village={[4, 9]} />
      <Settlement x={V(A.x, A.y, 1)[0]} y={V(A.x, A.y, 1)[1]} />
      <Ship a={V(A.x, A.y, 1)} b={V(A.x, A.y, 2)} />
      <Ship a={V(S1.x, S1.y, 0)} b={V(S1.x, S1.y, 1)} />
      {[0, 1, 2].map((i) => (
        <Card key={i} x={150 + i * 6} y={28 - i * 3} label="cloth" color="#e8c9a0" />
      ))}
    </Fig>
  ),
  threeStart: () => (
    <Fig>
      <H x={A.x} y={A.y} t="fields" n={9} />
      <H x={B.x} y={B.y} t="hills" n={5} />
      <H x={S1.x} y={S1.y} t="sea" />
      <H x={S2.x} y={S2.y} t="pasture" n={3} />
      <Settlement x={V(A.x, A.y, 4)[0]} y={V(A.x, A.y, 4)[1]} />
      <Settlement x={V(B.x, B.y, 0)[0]} y={V(B.x, B.y, 0)[1]} />
      <Settlement x={V(S2.x, S2.y, 2)[0]} y={V(S2.x, S2.y, 2)[1]} />
      <Badge x={S2.x + 10} y={S2.y + 36} text="3rd: resources" />
    </Fig>
  ),
  pirateMove: () => (
    <Fig>
      <H x={A.x} y={A.y} t="sea">
        <g transform={`translate(${A.x},${A.y + 4}) scale(1.3)`}>
          <Pirate />
        </g>
      </H>
      <H x={B.x} y={B.y} t="sea" />
      <H x={S1.x} y={S1.y} t="sea" />
      <H x={S2.x} y={S2.y} t="forest" n={5} />
      <Arrow a={[A.x + 18, A.y - 6]} b={[B.x - 12, B.y - 6]} />
      <Arrow a={[B.x + 2, B.y + 14]} b={[S2.x - 26, S2.y - 10]} />
      <Settlement x={V(S2.x, S2.y, 5)[0]} y={V(S2.x, S2.y, 5)[1]} color="#3b6fd6" />
      <g transform="translate(20,96)">
        <rect x="0" y="-10" width="18" height="18" rx="3" fill="#f6ebd0" stroke="#5c4a2a" />
        <circle cx="5" cy="-5" r="1.8" fill="#2b2b2b" />
        <circle cx="13" cy="3" r="1.8" fill="#2b2b2b" />
        <rect x="22" y="-10" width="18" height="18" rx="3" fill="#f6ebd0" stroke="#5c4a2a" />
        <circle cx="27" cy="-5" r="1.8" fill="#2b2b2b" />
        <circle cx="31" cy="-1" r="1.8" fill="#2b2b2b" />
        <circle cx="35" cy="3" r="1.8" fill="#2b2b2b" />
        <circle cx="27" cy="3" r="1.8" fill="#2b2b2b" />
        <circle cx="35" cy="-5" r="1.8" fill="#2b2b2b" />
      </g>
      <text x="66" y="100" fontSize="9" fill="var(--fg-dim)">
        move 2, strength 2
      </text>
    </Fig>
  ),
  warships: () => (
    <Fig>
      <H x={A.x} y={A.y} t="hills" n={9} />
      <H x={B.x} y={B.y} t="sea" />
      <H x={S1.x} y={S1.y} t="sea" />
      <H x={S2.x} y={S2.y} t="sea" />
      <Settlement x={V(A.x, A.y, 1)[0]} y={V(A.x, A.y, 1)[1]} />
      <Ship a={V(A.x, A.y, 1)} b={V(A.x, A.y, 2)} war />
      <Ship a={V(S1.x, S1.y, 0)} b={V(S1.x, S1.y, 1)} />
      <Ship a={V(S1.x, S1.y, 1)} b={V(S1.x, S1.y, 2)} />
      <Card x={160} y={26} label="knight" color="#6b4b8a" />
      <Arrow a={[150, 36]} b={[V(A.x, A.y, 1)[0] + 14, V(A.x, A.y, 1)[1] + 10]} />
    </Fig>
  ),
  fortress: () => (
    <Fig>
      <H x={A.x} y={A.y} t="sea" />
      <H x={B.x} y={B.y} t="mountains" n={6} />
      <H x={S1.x} y={S1.y} t="sea" />
      <H x={S2.x} y={S2.y} t="sea" />
      <Ship a={V(A.x, A.y, 1)} b={V(A.x, A.y, 2)} war />
      <Ship a={V(A.x, A.y, 0)} b={V(A.x, A.y, 1)} war />
      <g transform={`translate(${V(B.x, B.y, 5)[0]},${V(B.x, B.y, 5)[1]})`}>
        <rect x="-8" y="2" width="16" height="4" fill="#2b2b2b" />
        <rect x="-8" y="-2" width="16" height="4" fill="#2b2b2b" />
        <rect x="-8" y="-6" width="16" height="4" fill="#2b2b2b" />
        <path d="M-5,-6 v-6 l5,-4 l5,4 v6 z" fill="#e04b3f" stroke="#2b1a14" strokeWidth="0.8" />
      </g>
      <text x="92" y="104" fontSize="9" fill="var(--fg-dim)">
        roll vs warships
      </text>
    </Fig>
  ),
  wonder: () => (
    <Fig w={200}>
      <rect x="14" y="20" width="172" height="40" rx="4" fill="var(--bg-inset)" stroke="var(--border-ui)" />
      {[1, 2, 3, 4].map((n) => (
        <g key={n} transform={`translate(${34 + (n - 1) * 44},40)`}>
          <circle r="12" fill={n <= 2 ? 'var(--accent)' : 'var(--bg)'} stroke="var(--border-ui)" />
          <text y="3.5" textAnchor="middle" fontSize="10" fontWeight="700" fill={n <= 2 ? 'var(--bg)' : 'var(--fg-dim)'}>
            {n}
          </text>
        </g>
      ))}
      <text x="14" y="84" fontSize="9" fill="var(--fg-dim)">
        each level: the same 5 resources
      </text>
      {['wood', 'brick', 'sheep', 'wheat', 'ore'].map((k, i) => (
        <Resource key={k} x={24 + i * 15} y={104} kind={k} />
      ))}
    </Fig>
  ),
  wonderStart: () => (
    <Fig>
      <H x={A.x} y={A.y} t="pasture" n={4} />
      <H x={B.x} y={B.y} t="desert" />
      <H x={S1.x} y={S1.y} t="hills" n={11} />
      <H x={S2.x} y={S2.y} t="sea" />
      <g transform={`translate(${V(A.x, A.y, 1)[0]},${V(A.x, A.y, 1)[1]})`}>
        <rect x="-7" y="-5" width="14" height="10" rx="1" fill="#6b5a3a" stroke="#2b1a14" strokeWidth="0.8" />
        <rect x="-7" y="-8" width="3" height="3" fill="#6b5a3a" />
        <rect x="-1.5" y="-8" width="3" height="3" fill="#6b5a3a" />
        <rect x="4" y="-8" width="3" height="3" fill="#6b5a3a" />
      </g>
      <Settlement x={V(A.x, A.y, 3)[0]} y={V(A.x, A.y, 3)[1]} city />
      <Settlement x={V(S1.x, S1.y, 4)[0]} y={V(S1.x, S1.y, 4)[1]} city />
      <Badge x={150} y={14} text="2 cities" />
    </Fig>
  ),
  newworld: () => (
    <Fig>
      <H x={A.x} y={A.y} t="sea" />
      <H x={B.x} y={B.y} t="forest" />
      <H x={S1.x} y={S1.y} t="fields" />
      <H x={S2.x} y={S2.y} t="sea" />
      <Arrow a={[A.x - 10, A.y - 32]} b={[A.x + 14, A.y - 8]} />
      <Arrow a={[B.x + 30, B.y - 32]} b={[B.x + 6, B.y - 8]} />
      <Card x={160} y={96} label="?" color="var(--fg-faint)" />
      <Card x={150} y={100} label="?" color="var(--fg-faint)" />
    </Fig>
  ),
  randomPorts: () => (
    <Fig>
      <H x={A.x} y={A.y} t="forest" n={6} />
      <H x={B.x} y={B.y} t="sea" />
      <H x={S1.x} y={S1.y} t="sea" />
      <H x={S2.x} y={S2.y} t="hills" n={10} />
      <g transform={`translate(${B.x - 10},${B.y - 8})`}>
        <rect x="-14" y="-7" width="28" height="14" rx="3" fill="var(--bg-inset)" stroke="var(--border-ui)" />
        <text y="3" textAnchor="middle" fontSize="8" fontWeight="700" fill="var(--fg)">
          3:1
        </text>
      </g>
      <g transform={`translate(${S2.x - 20},${S2.y - 6})`}>
        <rect x="-14" y="-7" width="28" height="14" rx="3" fill="var(--bg-inset)" stroke="var(--border-ui)" />
        <text y="3" textAnchor="middle" fontSize="8" fontWeight="700" fill="var(--fg)">
          2:1
        </text>
      </g>
      <Badge x={150} y={14} text="one edge apart" />
    </Fig>
  ),
  specialBuild: () => (
    <Fig w={200}>
      {['A', 'B', 'C', 'D', 'E'].map((p, i) => (
        <g key={p} transform={`translate(${24 + i * 38},34)`}>
          <circle r="12" fill={i === 0 ? 'var(--accent)' : 'var(--bg-inset)'} stroke="var(--border-ui)" />
          <text y="3.5" textAnchor="middle" fontSize="10" fontWeight="700" fill={i === 0 ? 'var(--bg)' : 'var(--fg-dim)'}>
            {p}
          </text>
        </g>
      ))}
      <text x="14" y="70" fontSize="9" fill="var(--fg-dim)">
        A takes a full turn …
      </text>
      <text x="14" y="86" fontSize="9" fill="var(--fg-dim)">
        … then B, C, D and E may each build
      </text>
      <text x="14" y="102" fontSize="9" fill="var(--fg-dim)">
        (no trading, no development cards)
      </text>
    </Fig>
  ),
}

// ---------- rule text ----------

const BASE_STEPS = [
  ['Set up', 'Shuffle the land hexes into the frame, lay the number discs, and put the robber on the desert. Each player places two settlements with a road; the second settlement pays out its three adjacent hexes.', 'setup'],
  ['Your turn', 'Roll both dice. Every hex showing that number pays its resource to every settlement (1) and city (2) on its corners. Then trade with other players or through harbours, then build as much as you can afford.', 'turn'],
  ['Building costs', 'Roads must connect to your own road or building; settlements need a free corner with no building on any neighbouring corner; a city replaces one of your settlements.', 'costs'],
  ['The robber', 'A 7 pays nothing. Anyone holding more than 7 cards discards half, then the roller moves the robber to a new hex, blocks it, and steals a random card from a player with a building there. Knight cards do the same.', 'robber'],
  ['Winning', 'Settlements are 1 VP, cities 2, Longest Road and Largest Army 2 each, and some development cards hide a point. The first player to show 10 VP on their own turn wins.', null],
]

const SEAFARERS_BASICS = [
  ['Ships', 'A ship costs wood and sheep and goes on a sea edge next to your coastal settlement or to the end of your shipping route. Settlements may be built where a route reaches a new coast, exactly as with roads.', 'ships'],
  ['Moving a ship', 'Once per turn you may move the ship at the open end of a route to another legal edge, as long as it was not built this turn. A route closed by a settlement at both ends cannot be shortened.', 'moveShip'],
  ['The pirate', 'When you roll a 7 or play a Knight you may move the pirate instead of the robber. Nobody may build or move a ship on the edges of its hex, and you steal from a player with a ship there.', 'pirate'],
  ['Longest Trade Route', 'Roads and ships count together when a settlement or city joins them. Two VP for the longest, five or more pieces, as before.', 'route'],
  ['Gold fields', 'A gold field pays one resource of your choice to each settlement (two to a city) when its number is rolled.', 'gold'],
  ['Harbours', 'Flip the frame to its all-sea side. Shuffle the harbour tokens face down and deal them onto the marked edges as you build the map.', 'harbors'],
]

const FIVE_SIX = [
  ['Special build phase', 'With five or six players, every full turn is followed by a round in which each other player may build anything they can afford, but may not trade or play development cards. The 2023 Seafarers 5–6 rules pair players so turns stay short.', 'specialBuild'],
]

const SCENARIO_STEPS = {
  shores: [
    ['Set up', 'Build the main island like a normal game, harbours and all. The small islands outlined in the diagram keep their shapes; shuffle their hexes and numbers among themselves. Pirate on its marked sea hex, robber on the desert.', 'setup'],
    ['Start', 'Both starting settlements go on the main island. A coastal settlement may take a ship instead of a road, so you can sail at once.', 'ships'],
    ['Small islands', 'The first time you build a settlement on each small island you take 2 VP tokens and tuck them under it. Everyone can earn them on every island.', 'islandVp'],
    ['Winning', 'First to 14 VP on their own turn.', null],
  ],
  islands: [
    ['Set up', 'Lay the sea hexes as the diagram shows and shuffle every land hex and number across the islands. Forests and pastures should not end up with a 2, 3, 11 or 12. Harbours may be shuffled too.', 'setup'],
    ['Home islands', 'Place your two starting settlements on one island or split them across two. Those are your home islands; every other island is unexplored for you, so players have different home islands.', 'home'],
    ['Exploring', 'Your first settlement on each island that is not one of your home islands is worth 2 extra VP. It does not matter whether someone else got there first.', 'islandVp'],
    ['Winning', 'First to 13 VP on their own turn.', null],
  ],
  fog: [
    ['Set up', 'The two known islands are built as shown; the fog spaces stay empty. Shuffle the face-down hexes from the component list into a stack beside the board, and the face-down number discs into another.', 'fog'],
    ['Start', 'Starting settlements may go on either known island or one on each.', 'home'],
    ['Discovery', 'When you build a road or ship next to a corner that touches an empty space, draw the top hex and place it face up there. Land gets a random number disc from the stack and pays you one of its resource at once; sea pays nothing.', 'fogReveal'],
    ['Winning', 'First to 12 VP on their own turn. The variable set-up allows red numbers to touch.', null],
  ],
  desert: [
    ['Set up', 'The three deserts are fixed and cut the big island in two. Shuffle the main island hexes, numbers and harbours on one side of the desert; shuffle the rest into the strip beyond it and the small islands. No red numbers on gold.', 'desert'],
    ['Start', 'Both starting settlements go on the main part of the big island. Roads may cross the desert, which is slow, or ships can go round it.', 'setup'],
    ['Unexplored regions', 'The strip beyond the desert and each small island is an unexplored region. Your first settlement in each is worth 2 extra VP.', 'islandVp'],
    ['Winning', 'First to 14 VP on their own turn.', null],
  ],
  tribe: [
    ['Set up', 'The small islands have no numbers and are fixed. Shuffle the big island. Put the 8 VP tokens and 4 face-down development cards on their edges, and deal harbour tokens face up onto the marked edges. Robber on any desert.', 'tribeEdge'],
    ['Start', 'Both starting settlements go on the big island. You may only ever build settlements on hexes that carry a number disc, and the robber may only be moved to numbered hexes.', 'setup'],
    ['Reaching an edge', 'When one of your ships is built or moved onto an edge with a VP token, keep it (1 VP). On a development card edge, take the card as if you had just bought it.', 'tribeEdge'],
    ['Collecting harbours', 'On a harbour edge, take the token and place it next to one of your coastal settlements, keeping one empty edge between harbours. If you cannot place it yet, hold it until you can; it works as soon as it is placed.', 'harbors'],
    ['Winning', 'First to 13 VP on their own turn.', null],
  ],
  cloth: [
    ['Set up', 'Build the map as printed. The eight number discs on the four small islands are villages; stack 5 cloth tokens beside each and keep 10 as a general supply. No settlements may be built on the small islands, and Longest Route is not used.', 'village'],
    ['Three starts', 'Place two settlements as usual, taking no resources, then a third settlement with a road or ship in player order. Your starting resources come from the third settlement. Any starts may be on either large island.', 'threeStart'],
    ['Trade relations', 'When your road or ship route connects one of your buildings to a village, take 1 cloth from that village at once. Afterwards, whenever that village’s number is rolled, every player connected to it takes 1 cloth.', 'village'],
    ['Cloth is points', 'Every two cloth tokens you hold are worth 1 VP. When a village runs out of cloth, draw from the general supply; when that is empty the village is exhausted.', null],
    ['Winning', 'First to 14 VP on their own turn, counting cloth.', null],
  ],
  pirates: [
    ['Set up', 'Build the printed map; six hexes get no number. Each player starts with one settlement and one ship on the east island as marked, then places the usual two settlements there too. Four pirate fortresses (3 lair tokens under a settlement) sit on the western islands. No robber, no Longest Route, no Largest Army.', 'fortress'],
    ['The pirate fleet', 'After rolling, before anyone collects, move the pirate ship along the printed track by the lower die. If it stops next to your building it attacks with that die as its strength; your strength is your number of warships. Lose: discard a random card plus one per city. Win: take any resource.', 'pirateMove'],
    ['Sevens', 'On a 7, players over 7 cards discard half, then the roller steals one card from any player.', 'robber'],
    ['One line of ships', 'Build only one continuous, unbranched line of ships toward your own fortress, by the shortest path, from a coastal building through your beachhead marker. Ships stand upright; you may still build other routes around the home island.', 'ships'],
    ['Warships', 'Playing a Knight (or, with four players, a VP card) turns the ship nearest your starting settlement on its side: it is now a warship. The card leaves the game.', 'warships'],
    ['Attacking the fortress', 'When your line reaches your fortress, roll a die at the end of your turn. More warships than the roll: remove one lair token. Fewer: lose the two ships nearest the fortress. Equal: lose one. Remove all three tokens and the fortress becomes your settlement.', 'fortress'],
    ['Winning', 'Capture your fortress and reach 10 VP on your own turn.', null],
  ],
  wonders: [
    ['Set up', 'Deserts and small islands are fixed; shuffle the main island. Put the wonder tiles beside the board and take the marker in your colour. Robber on a desert; the pirate is not used.', 'wonderStart'],
    ['Start', 'Both starting settlements go on the large island, but not on a Great Bridge or Great Wall marker, nor on the X corners next to the bridge markers. Your first settlement on each small island is worth 1 extra VP.', 'islandVp'],
    ['Claiming a wonder', 'Meet a tile’s requirement and you may take it; nobody else can then build that wonder, and you may claim only one. Great Wall and Great Bridge need a building at their markers, the Grand Theater two cities, the Grand Castle a city and 6 VP, the Grand Monument a city at a harbour and a route of five.', 'wonderStart'],
    ['Building it', 'Pay the start cost on the tile and put your marker on space 1. Each of the four levels costs the same five resources; build as many levels per turn as you can pay for.', 'wonder'],
    ['Winning', 'Finish your wonder, or reach 10 VP with a higher wonder level than anyone else, on your own turn.', null],
  ],
  newworld: [
    ['Set up', 'Shuffle every hex, sea included, face up into the frame. Players may agree to nudge hexes to change the number or size of islands. Shuffle the number discs onto the land; if two red discs touch, swap one with a neighbour.', 'newworld'],
    ['Harbours', 'Take turns placing a random harbour token face up on an edge between land and sea or land and frame, keeping at least one edge between harbours. Then place the robber and pirate.', 'randomPorts'],
    ['Home islands', 'Place your starting settlements on one island or two. Every other island is unexplored for you, and your first settlement on each is worth 1 extra VP.', 'home'],
    ['Winning', 'First to 12 VP on their own turn.', null],
  ],
}

// ---------- component ----------

function Steps({ steps }) {
  return (
    <ol className="howto__steps">
      {steps.map(([title, text, fig], i) => (
        <li className="howto__step" key={i}>
          <div className="howto__text">
            <div className="howto__title">
              <span className="faint">{i + 1}.</span> {title}
            </div>
            <p>{text}</p>
          </div>
          {fig && <div className="howto__figwrap">{FIGS[fig]()}</div>}
        </li>
      ))}
    </ol>
  )
}

export function HowToPlay({ game, scenario, players, scenarioLabel }) {
  const [tab, setTab] = useState(game === 'seafarers' ? 'scenario' : 'base')
  const seafarers = game === 'seafarers'
  const tabs = [
    ['base', 'base game'],
    ...(seafarers ? [['seafarers', 'Seafarers basics'], ['scenario', scenarioLabel]] : []),
    ...(players === 6 ? [['five', '5–6 players']] : []),
  ]
  const active = tabs.some(([id]) => id === tab) ? tab : tabs[0][0]
  const steps =
    active === 'base'
      ? BASE_STEPS
      : active === 'seafarers'
        ? SEAFARERS_BASICS
        : active === 'five'
          ? FIVE_SIX
          : SCENARIO_STEPS[scenario] || []
  return (
    <div className="howto">
      <div className="catan__row" role="tablist" aria-label="how to play">
        <span className="catan__rowlabel">how to play</span>
        {tabs.map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            className="catan__opt"
            aria-selected={active === id}
            aria-pressed={active === id}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </div>
      <Steps steps={steps} />
      <p className="catan__note faint">
        A summary for the table, not the rulebook. Figures are schematic. The official rules are at catan.com.
      </p>
    </div>
  )
}
