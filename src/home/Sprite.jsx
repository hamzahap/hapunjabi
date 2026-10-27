import { useMemo } from 'react'

const PALETTE = {
  w: '#1c1c1a',
  a: '#0b6e3f',
  b: '#0b5cad',
  g: '#3d8b5f',
  r: '#b42318',
  d: '#b5b1a7',
}

/**
 * A 9 × 9 pixel sprite drawn as box-shadows on a single element: no images,
 * no canvas. Each pixel is one shadow, offset by its grid position.
 */
function spriteShadow(rows, px) {
  const out = []
  rows.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const colour = PALETTE[row[x]]
      if (colour) out.push(`${(x + 1) * px}px ${(y + 1) * px}px 0 0 ${colour}`)
    }
  })
  return out.join(', ')
}

export function Sprite({ rows, large = false }) {
  const shadow = useMemo(() => spriteShadow(rows, large ? 12 : 3), [rows, large])
  return (
    <span className={large ? 'spr-wrap spr-wrap--lg' : 'spr-wrap'} aria-hidden="true">
      <span className="spr" style={{ boxShadow: shadow }} />
    </span>
  )
}
