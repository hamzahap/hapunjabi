/**
 * Logic for the two pocket games on the homepage. Plain functions with no
 * React in them, so they can be exercised outside a browser.
 */

// ---------------------------------------------------------------- EdgeBloom
// Square EdgeBloom on a 3 × 3 board: 4 × 4 dots, 12 horizontal and 12
// vertical lines. h[r * 3 + c] is the top edge of row r (r runs 0–3), and
// v[r * 4 + c] is the left edge of column c (c runs 0–3) in box row r.

export function newGame() {
  return {
    h: Array(12).fill(null),
    v: Array(12).fill(null),
    boxes: Array(9).fill(null),
    turn: 'you',
  }
}

/** How many of a box's four lines are drawn. */
function sides(g, box) {
  const r = Math.floor(box / 3)
  const c = box % 3
  return [g.h[r * 3 + c], g.h[(r + 1) * 3 + c], g.v[r * 4 + c], g.v[r * 4 + c + 1]].filter(
    Boolean
  ).length
}

/** The one or two boxes a line borders. */
function touching(kind, i) {
  const out = []
  if (kind === 'h') {
    const r = Math.floor(i / 3)
    const c = i % 3
    if (r > 0) out.push((r - 1) * 3 + c)
    if (r < 3) out.push(r * 3 + c)
  } else {
    const r = Math.floor(i / 4)
    const c = i % 4
    if (c > 0) out.push(r * 3 + c - 1)
    if (c < 3) out.push(r * 3 + c)
  }
  return out
}

export function freeLines(g) {
  const out = []
  g.h.forEach((x, i) => {
    if (!x) out.push(['h', i])
  })
  g.v.forEach((x, i) => {
    if (!x) out.push(['v', i])
  })
  return out
}

/** Draw a line. Closing a box claims it and keeps the turn. */
export function play(g, kind, i, who) {
  const next = { h: g.h.slice(), v: g.v.slice(), boxes: g.boxes.slice(), turn: g.turn }
  next[kind][i] = who
  let scored = false
  for (const box of touching(kind, i)) {
    if (!next.boxes[box] && sides(next, box) === 4) {
      next.boxes[box] = who
      scored = true
    }
  }
  next.turn = scored ? who : who === 'you' ? 'ai' : 'you'
  return next
}

/**
 * Pulse AI, pocket edition: take any box on offer, otherwise draw a line that
 * hands nothing over, otherwise anything. Greedy, but it punishes carelessness.
 */
export function aiPick(g, rand = Math.random) {
  const moves = freeLines(g)
  const scoring = moves.find(([k, i]) =>
    touching(k, i).some((box) => !g.boxes[box] && sides(g, box) === 3)
  )
  if (scoring) return scoring
  const safe = moves.filter(([k, i]) => touching(k, i).every((box) => sides(g, box) < 2))
  const pool = safe.length ? safe : moves
  return pool[Math.floor(rand() * pool.length)]
}

export function score(g) {
  return {
    you: g.boxes.filter((x) => x === 'you').length,
    ai: g.boxes.filter((x) => x === 'ai').length,
  }
}

// ---------------------------------------------------------------- Catan
// A base-game board: 19 land hexes in axial coordinates (q, r), radius 2.

/** Same small seeded PRNG the full generator uses (src/catan/generator.js). */
function mulberry32(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function shuffled(list, rand) {
  const a = list.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const TERRAIN = [
  ...Array(4).fill('wood'),
  ...Array(4).fill('sheep'),
  ...Array(4).fill('wheat'),
  ...Array(3).fill('brick'),
  ...Array(3).fill('ore'),
  'desert',
]
const NUMBERS = [2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12]
const NEIGHBOURS = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
]

const CELLS = []
for (let r = -2; r <= 2; r++) {
  for (let q = Math.max(-2, -r - 2); q <= Math.min(2, -r + 2); q++) CELLS.push({ q, r })
}

export const randomSeed = () => Math.floor(Math.random() * 1e9) + 1

/**
 * Shuffle terrain, then deal number tokens until no 6 or 8 sits next to
 * another 6 or 8. Valid deals are common, so this settles in a few tries.
 */
export function catanBoard(seed) {
  const index = new Map(CELLS.map((c, i) => [`${c.q},${c.r}`, i]))
  const near = (c) =>
    NEIGHBOURS.map(([dq, dr]) => index.get(`${c.q + dq},${c.r + dr}`)).filter(
      (j) => j !== undefined
    )
  const rand = mulberry32(seed)
  const terrain = shuffled(TERRAIN, rand)
  const hot = (n) => n === 6 || n === 8
  let nums = []
  for (let tries = 0; tries < 500; tries++) {
    const pool = shuffled(NUMBERS, rand)
    let k = 0
    nums = terrain.map((t) => (t === 'desert' ? 0 : pool[k++]))
    if (CELLS.every((c, i) => !hot(nums[i]) || near(c).every((j) => !hot(nums[j])))) break
  }
  return CELLS.map((c, i) => ({ q: c.q, r: c.r, terrain: terrain[i], num: nums[i] }))
}
