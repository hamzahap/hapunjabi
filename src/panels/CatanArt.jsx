/** Shared SVG pieces for the Catan board and the how-to-play figures. */

// ---------- terrain art ----------

export function TerrainIcon({ terrain }) {
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

export const PIP_COUNT = { 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 8: 5, 9: 4, 10: 3, 11: 2, 12: 1 }

export function Token({ number }) {
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

export function Robber() {
  return (
    <g>
      <circle cy="-4" r="3.2" fill="#1c1c1c" />
      <path d="M-4.5,7 q0,-8 4.5,-8 q4.5,0 4.5,8 z" fill="#1c1c1c" />
    </g>
  )
}

export function Pirate() {
  return (
    <g>
      <path d="M-9,2 h18 l-4,5 h-10 z" fill="#1c1c1c" />
      <path d="M0,2 v-11 l7,7 h-7" fill="#1c1c1c" />
    </g>
  )
}

