/**
 * Catan board generator: hex geometry, a scoring function per balance mode,
 * and simulated annealing over tile / number / harbour swaps.
 *
 * Everything is driven by a seeded PRNG so a seed string reproduces a board
 * exactly, which is what makes the share links work.
 */
import { LAYOUTS, TERRAIN, RESOURCES, RESOURCE_WEIGHTS } from './layouts.js'

const SQRT3 = Math.sqrt(3)

export const PIPS = { 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 8: 5, 9: 4, 10: 3, 11: 2, 12: 1 }

// ---------- PRNG ----------

/** cyrb53-style string hash folded to 32 bits. */
export function hashSeed(str) {
  let h1 = 0xdeadbeef
  let h2 = 0x41c6ce57
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i)
    h1 = Math.imul(h1 ^ ch, 2654435761)
    h2 = Math.imul(h2 ^ ch, 1597334677)
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507)
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909)
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507)
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909)
  return (h1 ^ h2) >>> 0
}

export function mulberry32(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function randomSeed() {
  const alphabet = 'abcdefghjkmnpqrstuvwxyz23456789'
  let s = ''
  for (let i = 0; i < 6; i++) s += alphabet[Math.floor(Math.random() * alphabet.length)]
  return s
}

function shuffle(arr, rng) {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    const t = a[i]
    a[i] = a[j]
    a[j] = t
  }
  return a
}

function expand(counts) {
  const out = []
  for (const [k, n] of Object.entries(counts)) for (let i = 0; i < n; i++) out.push(k)
  return out
}

function swap(arr, a, b) {
  const t = arr[a]
  arr[a] = arr[b]
  arr[b] = t
}

// ---------- geometry ----------

/** Edge i joins vertex i and i+1; vertex i sits at angle -90 + 60i degrees. */
export const EDGES = ['NE', 'E', 'SE', 'SW', 'W', 'NW']
const VX = [0, 1, 1, 0, -1, -1] // vertex x offset, units of sqrt3/2
const VY = [-2, -1, 1, 2, 1, -1] // vertex y offset, units of 1/2

function neighborOf(r, c, edge) {
  const odd = r & 1
  switch (edge) {
    case 'NE':
      return [r - 1, odd ? c + 1 : c]
    case 'E':
      return [r, c + 1]
    case 'SE':
      return [r + 1, odd ? c + 1 : c]
    case 'SW':
      return [r + 1, odd ? c : c - 1]
    case 'W':
      return [r, c - 1]
    default:
      return [r - 1, odd ? c : c - 1]
  }
}

/** Static structure for a layout: cells, adjacency, shared vertices, harbour slots. */
export function buildGeometry(layoutKey) {
  const layout = LAYOUTS[layoutKey]
  const cells = []
  const byRC = new Map()
  layout.rows.forEach((row, r) => {
    Array.from(row).forEach((ch, c) => {
      if (ch === '.') return
      const id = cells.length
      cells.push({ id, r, c, kind: ch, x: SQRT3 * (c + (r & 1) / 2), y: 1.5 * r })
      byRC.set(r + ',' + c, id)
    })
  })

  const nbr = cells.map((cell) =>
    EDGES.map((e) => byRC.get(neighborOf(cell.r, cell.c, e).join(','))).filter((id) => id != null)
  )

  const verts = []
  const vertIndex = new Map()
  const cellVerts = cells.map((cell) => {
    const out = []
    for (let i = 0; i < 6; i++) {
      const key = 2 * cell.c + (cell.r & 1) + VX[i] + ',' + (3 * cell.r + VY[i])
      let idx = vertIndex.get(key)
      if (idx == null) {
        idx = verts.length
        vertIndex.set(key, idx)
        verts.push({
          x: cell.x + (SQRT3 / 2) * VX[i],
          y: cell.y + 0.5 * VY[i],
          cells: [],
        })
      }
      verts[idx].cells.push(cell.id)
      out.push(idx)
    }
    return out
  })

  const harbors = layout.harbors.map(([r, c, edge]) => {
    const id = byRC.get(r + ',' + c)
    const i = EDGES.indexOf(edge)
    const cell = cells[id]
    const ang = ((-60 + 60 * i) * Math.PI) / 180
    return {
      cell: id,
      edge,
      va: cellVerts[id][i],
      vb: cellVerts[id][(i + 1) % 6],
      x: cell.x + Math.cos(ang) * 1.5,
      y: cell.y + Math.sin(ang) * 1.5,
      angle: ang,
    }
  })

  const isLand = cells.map((c) => c.kind === 'I' || c.kind === 'L')
  const mainIds = cells.filter((c) => c.kind === 'I').map((c) => c.id)
  const isleIds = cells.filter((c) => c.kind === 'L').map((c) => c.id)
  const landIds = mainIds.concat(isleIds)

  // Vertices that touch the main island are where opening settlements go.
  const cx = mainIds.reduce((s, id) => s + cells[id].x, 0) / mainIds.length
  const cy = mainIds.reduce((s, id) => s + cells[id].y, 0) / mainIds.length
  const mainVerts = []
  const sector = verts.map((v, idx) => {
    if (v.cells.some((id) => cells[id].kind === 'I')) mainVerts.push(idx)
    const a = Math.atan2(v.y - cy, v.x - cx)
    return Math.floor(((a + Math.PI) / (2 * Math.PI)) * 6) % 6
  })

  const pirate = layout.pirate ? byRC.get(layout.pirate.join(',')) : null

  return {
    layout,
    cells,
    nbr,
    verts,
    cellVerts,
    harbors,
    isLand,
    mainIds,
    isleIds,
    landIds,
    mainVerts,
    sector,
    pirate,
    topK: mainIds.length > 19 ? 12 : 8,
  }
}

// ---------- modes ----------

export const MODES = {
  beginner: {
    label: 'Beginner',
    short: 'fair and readable',
    desc:
      'Every rule of thumb, enforced: 6 and 8 never touch, no repeated number or terrain touches itself, pips are spread evenly across resources, the strongest corners are spaced around the island, and 2:1 harbours stay away from their own resource.',
    iterations: 4000,
    strict: true,
    w: {
      redAdj: 1000,
      sameNum: 60,
      twoTwelve: 15,
      sameTerrain: 40,
      redSameRes: 40,
      goldRed: 400,
      pip: 12,
      maxSpot: 30,
      maxSpotCap: 12,
      spread: 25,
      harborSame: 80,
      harborStrong: 20,
      harborStrongCap: 10,
    },
  },
  advanced: {
    label: 'Advanced',
    short: 'tournament defaults',
    desc:
      'The usual competitive setup: 6 and 8 never touch, resources balanced to within a few pips, same-terrain clusters capped at pairs, and a 2:1 harbour may touch its resource unless that hex carries a red number.',
    iterations: 3000,
    strict: true,
    w: {
      redAdj: 1000,
      sameNum: 20,
      sameTerrain: 6,
      cluster: 40,
      redSameRes: 15,
      goldRed: 300,
      pip: 6,
      maxSpot: 20,
      maxSpotCap: 13,
      spread: 10,
      harborSameRed: 60,
    },
  },
  strategy: {
    label: 'Strategy',
    short: 'uneven on purpose',
    desc:
      'Deliberately lopsided. One resource is scarce, same-terrain clusters are allowed so the good land is contested, a 2:1 harbour may sit beside its own resource, and there is at least one dominant corner worth fighting over. 6 and 8 still never touch.',
    iterations: 3000,
    strict: true,
    scarce: true,
    w: {
      redAdj: 1000,
      clusterTarget: 0.3,
      clusterPen: 8,
      megacluster: 40,
      pip: 10,
      hotspot: 25,
      hotspotMin: 12,
      concentrate: 15,
      harborCombo: -20,
    },
  },
  chaos: {
    label: 'Chaos',
    short: 'straight shuffle',
    desc:
      'Whatever the bag gives you. Adjacent 6 and 8, a 2 beside a 12, five forests in a row, a gold field on an 8. No rules, no rerolls.',
    iterations: 0,
    strict: false,
    w: {},
  },
}

// ---------- scoring ----------

function evaluate(st, g, W, resWeight, scarce) {
  const { nbr, verts, harbors, landIds, isLand, mainVerts, sector } = g
  const { terrain, number, harborTok } = st
  let s = 0
  const isRed = (i) => number[i] === 6 || number[i] === 8
  const resOf = (i) => TERRAIN[terrain[i]].resource

  let samePairs = 0
  for (const a of landIds) {
    for (const b of nbr[a]) {
      if (b <= a || !isLand[b]) continue
      if (terrain[a] === terrain[b] && terrain[a] !== 'desert') samePairs++
      if (W.redAdj && isRed(a) && isRed(b)) s += W.redAdj
      if (W.sameNum && number[a] != null && number[a] === number[b]) s += W.sameNum
      if (
        W.twoTwelve &&
        number[a] != null &&
        number[b] != null &&
        number[a] + number[b] === 14 &&
        Math.abs(number[a] - number[b]) === 10
      )
        s += W.twoTwelve
      if (W.sameTerrain && terrain[a] === terrain[b] && terrain[a] !== 'desert') s += W.sameTerrain
    }
  }

  // Strategy mode wants some clustering, not a monoculture: aim for a set
  // number of same-terrain pairs and penalise straying either side of it.
  if (W.clusterPen) s += W.clusterPen * Math.abs(samePairs - Math.round(W.clusterTarget * landIds.length))

  if (W.cluster || W.megacluster) {
    for (const a of landIds) {
      if (terrain[a] === 'desert') continue
      let k = 0
      for (const b of nbr[a]) if (isLand[b] && terrain[b] === terrain[a]) k++
      if (W.cluster && k >= 2) s += W.cluster * (k - 1)
      if (W.megacluster && k >= 3) s += W.megacluster * (k - 2)
    }
  }

  if (W.redSameRes) {
    const cnt = {}
    for (const a of landIds) if (isRed(a)) cnt[terrain[a]] = (cnt[terrain[a]] || 0) + 1
    for (const v of Object.values(cnt)) if (v > 1) s += W.redSameRes * (v - 1)
  }

  if (W.goldRed) for (const a of landIds) if (terrain[a] === 'gold' && isRed(a)) s += W.goldRed

  if (W.pip) {
    const pips = {}
    const count = {}
    let totalP = 0
    for (const a of landIds) {
      const r = resOf(a)
      if (!r || r === 'gold') continue
      count[r] = (count[r] || 0) + 1
      const p = PIPS[number[a]] || 0
      pips[r] = (pips[r] || 0) + p
      totalP += p
    }
    const weightOf = (r) => (count[r] || 0) * (resWeight[r] || 1) * (scarce === r ? 0.5 : 1)
    let wsum = 0
    for (const r of RESOURCES) wsum += weightOf(r)
    for (const r of RESOURCES) {
      const target = (totalP * weightOf(r)) / wsum
      const dev = Math.abs((pips[r] || 0) - target)
      s += W.pip * Math.max(0, dev - 1)
    }
  }

  const vp = verts.map((v) => {
    let p = 0
    for (const id of v.cells) {
      if (!isLand[id] || number[id] == null) continue
      p += PIPS[number[id]] * (terrain[id] === 'gold' ? 1.3 : 1)
    }
    return p
  })

  if (W.maxSpot || W.hotspot || W.spread || W.concentrate) {
    const sorted = mainVerts.slice().sort((a, b) => vp[b] - vp[a])
    const strongest = vp[sorted[0]]
    if (W.maxSpot) s += W.maxSpot * Math.max(0, strongest - W.maxSpotCap)
    if (W.hotspot) s += W.hotspot * Math.max(0, W.hotspotMin - strongest)
    if (W.spread || W.concentrate) {
      const sectors = new Set()
      for (const idx of sorted.slice(0, g.topK)) sectors.add(sector[idx])
      if (W.spread) s += W.spread * (6 - sectors.size)
      if (W.concentrate) s += W.concentrate * Math.max(0, sectors.size - 4)
    }
  }

  let combos = 0
  for (let k = 0; k < harbors.length; k++) {
    const h = harbors[k]
    const tok = harborTok[k]
    if (W.harborStrong)
      s += W.harborStrong * Math.max(0, Math.max(vp[h.va], vp[h.vb]) - W.harborStrongCap)
    if (tok.ratio !== 2) continue
    const seen = new Set()
    for (const id of verts[h.va].cells.concat(verts[h.vb].cells)) {
      if (seen.has(id) || !isLand[id]) continue
      seen.add(id)
      if (resOf(id) !== tok.resource) continue
      if (W.harborSame) s += W.harborSame
      if (W.harborSameRed && isRed(id)) s += W.harborSameRed
      combos++
    }
  }
  // Strategy mode rewards a couple of harbour-on-its-own-resource combos, not all of them.
  if (W.harborCombo) s += W.harborCombo * Math.min(combos, 2)

  return s
}

function countRedAdjacent(st, g) {
  let n = 0
  const red = (i) => st.number[i] === 6 || st.number[i] === 8
  for (const a of g.landIds) for (const b of g.nbr[a]) if (b > a && g.isLand[b] && red(a) && red(b)) n++
  return n
}

// ---------- state + moves ----------

function initialState(g, rng) {
  const { layout, cells, mainIds, isleIds, harbors } = g
  const terrain = cells.map((c) => (c.kind === 'S' ? 'sea' : null))
  const number = cells.map(() => null)
  const place = (ids, spec) => {
    const ters = shuffle(expand(spec.terrain), rng)
    ids.forEach((id, i) => {
      terrain[id] = ters[i]
    })
    const numbered = ids.filter((id) => terrain[id] !== 'desert')
    const nums = shuffle(spec.numbers, rng)
    numbered.forEach((id, i) => {
      number[id] = nums[i]
    })
  }
  place(mainIds, layout.main)
  if (layout.isle) place(isleIds, layout.isle)
  const tokens = []
  for (const [res, n] of Object.entries(layout.main.harbors))
    for (let i = 0; i < n; i++)
      tokens.push(res === 'any' ? { ratio: 3, resource: null } : { ratio: 2, resource: res })
  const harborTok = shuffle(tokens, rng).slice(0, harbors.length)
  return { terrain, number, harborTok }
}

function pick(arr, rng) {
  return arr[Math.floor(rng() * arr.length)]
}

/** Apply a random move in place; returns a function that reverts it. */
function mutate(st, g, rng) {
  const groups = g.isleIds.length ? [g.mainIds, g.mainIds, g.mainIds, g.isleIds] : [g.mainIds]
  const ids = pick(groups, rng)
  const roll = rng()
  const { terrain, number, harborTok } = st

  if (roll < 0.15 && harborTok.length > 1) {
    const a = Math.floor(rng() * harborTok.length)
    let b = Math.floor(rng() * harborTok.length)
    if (a === b) b = (b + 1) % harborTok.length
    swap(harborTok, a, b)
    return () => swap(harborTok, a, b)
  }

  const a = pick(ids, rng)
  let b = pick(ids, rng)
  if (a === b) b = ids[(ids.indexOf(a) + 1) % ids.length]

  const swapTiles = () => {
    swap(terrain, a, b)
    swap(number, a, b)
  }

  if (roll < 0.55) {
    // numbers only, unless one side is the desert (then move the whole tile)
    if (number[a] == null || number[b] == null) {
      swapTiles()
      return swapTiles
    }
    swap(number, a, b)
    return () => swap(number, a, b)
  }
  if (roll < 0.85 && terrain[a] !== 'desert' && terrain[b] !== 'desert') {
    // terrain only, numbers stay where they are
    swap(terrain, a, b)
    return () => swap(terrain, a, b)
  }
  swapTiles()
  return swapTiles
}

function snapshot(st) {
  return { terrain: st.terrain.slice(), number: st.number.slice(), harborTok: st.harborTok.slice() }
}

function anneal(st, g, mode, resWeight, scarce, rng) {
  const W = mode.w
  const N = mode.iterations
  let cur = evaluate(st, g, W, resWeight, scarce)
  let best = cur
  let bestSnap = snapshot(st)
  const T0 = 30
  const T1 = 0.2
  for (let it = 0; it < N; it++) {
    const T = T0 * Math.pow(T1 / T0, it / N)
    const revert = mutate(st, g, rng)
    const next = evaluate(st, g, W, resWeight, scarce)
    const delta = next - cur
    if (delta <= 0 || rng() < Math.exp(-delta / T)) {
      cur = next
      if (cur < best) {
        best = cur
        bestSnap = snapshot(st)
      }
      if (best <= 0 && !W.harborCombo) break
    } else {
      revert()
    }
  }
  return { state: bestSnap, score: best }
}

// ---------- stats ----------

function computeStats(st, g) {
  const { nbr, verts, landIds, isLand, mainVerts } = g
  const { terrain, number } = st
  const pips = { wood: 0, brick: 0, sheep: 0, wheat: 0, ore: 0, gold: 0 }
  const hexes = { wood: 0, brick: 0, sheep: 0, wheat: 0, ore: 0, gold: 0 }
  for (const a of landIds) {
    const r = TERRAIN[terrain[a]].resource
    if (!r) continue
    hexes[r]++
    pips[r] += PIPS[number[a]] || 0
  }
  let redAdj = 0
  let sameNum = 0
  let sameTerrain = 0
  for (const a of landIds)
    for (const b of nbr[a]) {
      if (b <= a || !isLand[b]) continue
      const ra = number[a] === 6 || number[a] === 8
      const rb = number[b] === 6 || number[b] === 8
      if (ra && rb) redAdj++
      if (number[a] != null && number[a] === number[b]) sameNum++
      if (terrain[a] === terrain[b] && terrain[a] !== 'desert') sameTerrain++
    }
  const vp = verts.map((v) => {
    let p = 0
    for (const id of v.cells) if (isLand[id] && number[id] != null) p += PIPS[number[id]]
    return p
  })
  const spots = mainVerts
    .slice()
    .sort((a, b) => vp[b] - vp[a])
    .slice(0, 5)
    .map((idx) => ({
      x: verts[idx].x,
      y: verts[idx].y,
      pips: vp[idx],
      hexes: verts[idx].cells
        .filter((id) => isLand[id] && number[id] != null)
        .map((id) => ({
          number: number[id],
          terrain: terrain[id],
          resource: TERRAIN[terrain[id]].resource,
        })),
    }))
  return { pips, hexes, redAdj, sameNum, sameTerrain, spots, maxSpot: spots.length ? spots[0].pips : 0 }
}

// ---------- entry point ----------

/**
 * @param {object} o
 * @param {'base4'|'base6'|'sea4'|'sea6'} o.layoutKey
 * @param {keyof MODES} o.modeKey
 * @param {string} o.game   game id, used for resource weighting
 * @param {string} o.seed
 */
export function generateBoard({ layoutKey, modeKey, game, seed }) {
  const g = buildGeometry(layoutKey)
  const mode = MODES[modeKey] || MODES.advanced
  const rng = mulberry32(hashSeed(layoutKey + '|' + modeKey + '|' + game + '|' + seed))
  const resWeight = RESOURCE_WEIGHTS[game] || {}
  const scarce = mode.scarce ? pick(RESOURCES, rng) : null

  let result = null
  let attempts = 0
  do {
    const st = initialState(g, rng)
    result = mode.iterations ? anneal(st, g, mode, resWeight, scarce, rng) : { state: st, score: 0 }
    attempts++
  } while (mode.strict && countRedAdjacent(result.state, g) > 0 && attempts < 8)

  const st = result.state
  const stats = computeStats(st, g)
  return {
    geometry: g,
    layoutKey,
    modeKey,
    seed,
    scarce,
    score: result.score,
    attempts,
    cells: g.cells.map((c) => ({ ...c, terrain: st.terrain[c.id], number: st.number[c.id] })),
    harbors: g.harbors.map((h, k) => ({ ...h, token: st.harborTok[k] })),
    stats,
  }
}
