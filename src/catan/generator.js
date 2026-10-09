/**
 * Catan board generator: hex geometry, a scoring function per balance mode,
 * and simulated annealing over tile / number / harbour swaps.
 *
 * Everything is driven by a seeded PRNG so a seed string reproduces a board
 * exactly, which is what makes the share links work.
 */
import { getLayout, TERRAIN, RESOURCES, RESOURCE_WEIGHTS } from './layouts.js'

const SQRT3 = Math.sqrt(3)

export const PIPS = { 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 8: 5, 9: 4, 10: 3, 11: 2, 12: 1 }

const isLandTerrain = (t) => t != null && t !== 'sea' && t !== 'fog'

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

function pick(arr, rng) {
  return arr[Math.floor(rng() * arr.length)]
}

/** Remove one occurrence of each item in `taken` from `pool` (multiset difference). */
function subtract(pool, taken) {
  const left = pool.slice()
  for (const t of taken) {
    const i = left.indexOf(t)
    if (i >= 0) left.splice(i, 1)
  }
  return left
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

function makeHarbor(cells, cellVerts, id, i, type) {
  const cell = cells[id]
  const ang = ((-60 + 60 * i) * Math.PI) / 180
  return {
    cell: id,
    edge: EDGES[i],
    va: cellVerts[id][i],
    vb: cellVerts[id][(i + 1) % 6],
    x: cell.x + Math.cos(ang) * 1.5,
    y: cell.y + Math.sin(ang) * 1.5,
    angle: ang,
    fixed: type ? (type === 'any' ? { ratio: 3, resource: null } : { ratio: 2, resource: type }) : null,
  }
}

/**
 * Static structure for a layout: cells, adjacency, shared vertices, harbour
 * slots, and which cells the search may move. `setup` is 'variable' or
 * 'printed'; printed pins every cell the rulebook diagram fixes.
 */
export function buildGeometry(layoutKey, setup = 'variable') {
  const layout = getLayout(layoutKey)
  if (!layout) throw new Error(`unknown board ${layoutKey}`)
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

  const harbors = (layout.harbors || []).map(([r, c, edge, type]) =>
    makeHarbor(cells, cellVerts, byRC.get(r + ',' + c), EDGES.indexOf(edge), type)
  )
  // Printed-frame boards: every harbour type is fixed, so only the hexes move.
  const fixedHarbors = harbors.length > 0 && harbors.every((h) => h.fixed)

  // Cells the rulebook pins: fixed land (X/N/D), villages (V), plus, in the
  // printed set-up, every pool cell the diagram gives a terrain for.
  const fixedMap = layout.fixed || {}
  const printedMap = setup === 'printed' ? layout.printed || {} : {}
  const pinned = new Map() // id -> [terrain, number | number[] | null]
  for (const cell of cells) {
    const key = cell.r + ',' + cell.c
    if (fixedMap[key]) pinned.set(cell.id, fixedMap[key])
    else if (printedMap[key] && (cell.kind === 'I' || cell.kind === 'L')) pinned.set(cell.id, printedMap[key])
  }

  const mainIds = cells.filter((c) => c.kind === 'I' && !pinned.has(c.id)).map((c) => c.id)
  const isleIds = cells.filter((c) => c.kind === 'L' && !pinned.has(c.id)).map((c) => c.id)
  const villageIds = cells.filter((c) => c.kind === 'V').map((c) => c.id)
  // Land that counts for adjacency rules and pips: pools plus pinned land,
  // minus villages (no settlements there) and fog.
  const landIds = cells
    .filter((c) => c.kind !== 'S' && c.kind !== 'F' && c.kind !== 'V')
    .map((c) => c.id)

  // What the pools have left once pinned cells have taken their share.
  const pools = {}
  for (const [name, ids, poolCells] of [
    ['main', mainIds, cells.filter((c) => c.kind === 'I')],
    ['isle', isleIds, cells.filter((c) => c.kind === 'L')],
  ]) {
    const spec = layout[name]
    if (!spec || !poolCells.length) continue
    const taken = poolCells.filter((c) => pinned.has(c.id)).map((c) => pinned.get(c.id))
    pools[name] = {
      ids,
      terrain: subtract(expand(spec.terrain), taken.map((t) => t[0])),
      numbers: subtract(spec.numbers, taken.map((t) => t[1]).filter((n) => n != null)),
    }
  }

  // Vertices that touch the main pool are where opening settlements go. On a
  // fully fixed board (or one where everything shuffles) use all land.
  const anchor = mainIds.length ? new Set(mainIds) : new Set(landIds)
  const anchorCells = [...anchor]
  const cx = anchorCells.reduce((s, id) => s + cells[id].x, 0) / anchorCells.length
  const cy = anchorCells.reduce((s, id) => s + cells[id].y, 0) / anchorCells.length
  const mainVerts = []
  const sector = verts.map((v, idx) => {
    if (v.cells.some((id) => anchor.has(id))) mainVerts.push(idx)
    const a = Math.atan2(v.y - cy, v.x - cx)
    return Math.floor(((a + Math.PI) / (2 * Math.PI)) * 6) % 6
  })

  const pirate = layout.pirate ? byRC.get(layout.pirate.join(',')) : null
  const robber = layout.robber ? byRC.get(layout.robber.join(',')) : null
  const idsOf = (list) => (list || []).map((k) => byRC.get(k)).filter((id) => id != null)

  return {
    layout,
    setup,
    cells,
    nbr,
    verts,
    cellVerts,
    byRC,
    harbors,
    fixedHarbors,
    pinned,
    pools,
    mainIds,
    isleIds,
    villageIds,
    landIds,
    mainVerts,
    sector,
    pirate,
    robber,
    nored: idsOf(layout.nored),
    lowside: idsOf(layout.lowside),
    noLowOn: layout.scenario && layout.scenario.id === 'islands' ? ['forest', 'pasture'] : [],
    dynamicHarbors: !!layout.dynamicHarbors,
    tokens: layout.tokens,
    topK: landIds.length > 25 ? 12 : 8,
  }
}

// ---------- modes ----------

export const MODES = {
  beginner: {
    label: 'Beginner',
    short: 'fair and readable',
    desc:
      'Every rule of thumb, enforced: 6 and 8 kept apart, 2 and 12 kept apart, no repeated number or terrain touches itself, pips are spread evenly across resources, the strongest corners are spaced around the island, and 2:1 harbours stay away from their own resource.',
    iterations: 4000,
    w: {
      redSameRes: 40,
      goldRed: 400,
      pip: 12,
      maxSpot: 30,
      maxSpotCap: 12,
      spread: 25,
      harborStrong: 20,
      harborStrongCap: 10,
    },
  },
  advanced: {
    label: 'Advanced',
    short: 'tournament defaults',
    desc:
      'The usual competitive setup: 6 and 8 kept apart, no repeated number touching itself, resources balanced to within a few pips, same-terrain clusters capped at pairs, and a 2:1 harbour may touch its resource unless that hex carries a red number.',
    iterations: 3000,
    w: {
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
    scarce: true,
    w: {
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
      'Whatever the bag gives you. Adjacent 6 and 8, a 2 beside a 12, five forests in a row, a gold field on an 8. No rules, no rerolls, unless you pin one below.',
    iterations: 0,
    w: {},
  },
}

/**
 * Adjacency rules that can be set independently of the mode. Each is
 * 'apart' (never touch), 'free' (no opinion) or 'touch' (at least one pair
 * must touch). Modes supply defaults; the panel lets players override them.
 */
export const RULE_STATES = ['apart', 'free', 'touch']
export const DESERT_STATES = ['inland', 'free', 'coast']
export const RULE_DEFAULTS = {
  beginner: { r68: 'apart', r212: 'apart', rnum: 'apart', rter: 'apart', rharb: 'apart', rdesert: 'free' },
  advanced: { r68: 'apart', r212: 'free', rnum: 'apart', rter: 'free', rharb: 'free', rdesert: 'free' },
  strategy: { r68: 'apart', r212: 'free', rnum: 'free', rter: 'free', rharb: 'free', rdesert: 'free' },
  chaos: { r68: 'free', r212: 'free', rnum: 'free', rter: 'free', rharb: 'free', rdesert: 'free' },
}
const RULE_APART = 1000 // per offending pair
const RULE_TOUCH = 600 // when no pair touches at all

const isTwoTwelve = (x, y) => x != null && y != null && x + y === 14 && Math.abs(x - y) === 10

/** Everything the rules and the stats panel care about, counted once. */
function measure(st, g) {
  const { nbr, verts, landIds } = g
  const { terrain, number, harborTok, harbors } = st
  const isLand = terrain.map(isLandTerrain)
  const isRed = (i) => number[i] === 6 || number[i] === 8
  const movable = new Set(g.mainIds.concat(g.isleIds))
  const m = {
    red: 0,
    twoTwelve: 0,
    sameNum: 0,
    sameTerrain: 0,
    harbSame: 0,
    harbSameRed: 0,
    deserts: 0,
    desertCoast: 0,
    scenarioBad: 0,
    isLand,
  }
  for (const a of landIds) {
    if (!isLand[a]) continue
    if (terrain[a] === 'desert' && movable.has(a)) {
      m.deserts++
      if (nbr[a].length < 6 || nbr[a].some((b) => !isLand[b])) m.desertCoast++
    }
    for (const b of nbr[a]) {
      if (b <= a || !isLand[b]) continue
      if (isRed(a) && isRed(b)) m.red++
      if (isTwoTwelve(number[a], number[b])) m.twoTwelve++
      if (number[a] != null && number[a] === number[b]) m.sameNum++
      if (terrain[a] === terrain[b] && terrain[a] !== 'desert') m.sameTerrain++
    }
  }
  // Scenario constraints are variable-setup advice, so they only bind cells
  // the search is allowed to move; the printed diagram is exempt.
  for (const a of g.nored) if (movable.has(a) && isRed(a)) m.scenarioBad++
  for (const a of g.lowside) if (movable.has(a) && [5, 6, 8, 9].includes(number[a])) m.scenarioBad++
  if (g.noLowOn.length)
    for (const a of movable)
      if (g.noLowOn.includes(terrain[a]) && [2, 3, 11, 12].includes(number[a])) m.scenarioBad++
  for (let k = 0; k < harbors.length; k++) {
    const tok = harborTok[k]
    if (!tok || tok.ratio !== 2) continue
    const h = harbors[k]
    let same = false
    let sameRed = false
    for (const id of verts[h.va].cells.concat(verts[h.vb].cells)) {
      if (!isLand[id] || TERRAIN[terrain[id]].resource !== tok.resource) continue
      same = true
      if (isRed(id)) sameRed = true
    }
    if (same) m.harbSame++
    if (sameRed) m.harbSameRed++
  }
  return m
}

function rulePenalty(rule, count) {
  if (rule === 'apart') return RULE_APART * count
  if (rule === 'touch' && count === 0) return RULE_TOUCH
  return 0
}

// ---------- scoring ----------

function evaluate(st, g, W, resWeight, scarce, rules) {
  const { nbr, verts, landIds, mainVerts, sector } = g
  const { terrain, number } = st
  let s = 0
  const isRed = (i) => number[i] === 6 || number[i] === 8
  const resOf = (i) => TERRAIN[terrain[i]].resource

  const m = measure(st, g)
  const isLand = m.isLand
  const samePairs = m.sameTerrain
  s += rulePenalty(rules.r68, m.red)
  s += rulePenalty(rules.r212, m.twoTwelve)
  s += rulePenalty(rules.rnum, m.sameNum)
  s += rulePenalty(rules.rter, m.sameTerrain)
  s += rulePenalty(rules.rharb, m.harbSame)
  if (rules.rdesert === 'inland') s += RULE_APART * m.desertCoast
  else if (rules.rdesert === 'coast') s += RULE_APART * (m.deserts - m.desertCoast)
  s += RULE_APART * m.scenarioBad

  // The mode's own opinions on harbours and terrain only apply while the
  // matching rule is left free; a pinned rule replaces them.
  if (rules.rharb === 'free') {
    if (W.harborSameRed) s += W.harborSameRed * m.harbSameRed
    if (W.harborCombo) s += W.harborCombo * Math.min(m.harbSame, 2)
  }
  if (W.sameTerrain && rules.rter === 'free') s += W.sameTerrain * samePairs

  // Strategy mode wants some clustering, not a monoculture: aim for a set
  // number of same-terrain pairs and penalise straying either side of it.
  if (W.clusterPen && rules.rter === 'free')
    s += W.clusterPen * Math.abs(samePairs - Math.round(W.clusterTarget * landIds.length))

  if ((W.cluster || W.megacluster) && rules.rter !== 'apart') {
    for (const a of landIds) {
      if (!isLand[a] || terrain[a] === 'desert') continue
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
    if (wsum > 0)
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
    const strongest = vp[sorted[0]] || 0
    if (W.maxSpot) s += W.maxSpot * Math.max(0, strongest - W.maxSpotCap)
    if (W.hotspot) s += W.hotspot * Math.max(0, W.hotspotMin - strongest)
    if (W.spread || W.concentrate) {
      const sectors = new Set()
      for (const idx of sorted.slice(0, g.topK)) sectors.add(sector[idx])
      if (W.spread) s += W.spread * (6 - sectors.size)
      if (W.concentrate) s += W.concentrate * Math.max(0, sectors.size - 4)
    }
  }

  if (W.harborStrong)
    for (const h of st.harbors)
      s += W.harborStrong * Math.max(0, Math.max(vp[h.va], vp[h.vb]) - W.harborStrongCap)

  return s
}

/** True when the board honours every pinned rule and scenario constraint. */
function rulesSatisfied(st, g, rules) {
  const m = measure(st, g)
  const pair = (rule, count) => (rule === 'apart' ? count === 0 : rule === 'touch' ? count > 0 : true)
  return (
    m.scenarioBad === 0 &&
    pair(rules.r68, m.red) &&
    pair(rules.r212, m.twoTwelve) &&
    pair(rules.rnum, m.sameNum) &&
    pair(rules.rter, m.sameTerrain) &&
    pair(rules.rharb, m.harbSame) &&
    (rules.rdesert === 'inland' ? m.desertCoast === 0 : true) &&
    (rules.rdesert === 'coast' ? m.desertCoast === m.deserts : true)
  )
}

// ---------- state + moves ----------

function harborTokens(g, rng, count) {
  const tokens = []
  for (const [res, n] of Object.entries(g.tokens || {}))
    for (let i = 0; i < n; i++)
      tokens.push(res === 'any' ? { ratio: 3, resource: null } : { ratio: 2, resource: res })
  return shuffle(tokens, rng).slice(0, count)
}

function initialState(g, rng) {
  const { cells } = g
  const terrain = cells.map((c) => (c.kind === 'S' ? 'sea' : c.kind === 'F' ? 'fog' : null))
  const number = cells.map(() => null)
  const village = cells.map(() => null)
  for (const [id, [t, n]] of g.pinned) {
    terrain[id] = t
    if (Array.isArray(n)) village[id] = n
    else number[id] = n == null ? null : n
  }
  for (const pool of Object.values(g.pools)) {
    const ters = shuffle(pool.terrain, rng)
    pool.ids.forEach((id, i) => {
      terrain[id] = ters[i]
    })
    const numbered = pool.ids.filter((id) => isLandTerrain(terrain[id]) && terrain[id] !== 'desert')
    const nums = shuffle(pool.numbers, rng)
    numbered.forEach((id, i) => {
      number[id] = nums[i]
    })
  }
  const harbors = g.dynamicHarbors ? [] : g.harbors
  const harborTok = g.fixedHarbors ? harbors.map((h) => h.fixed) : harborTokens(g, rng, harbors.length)
  return { terrain, number, village, harbors, harborTok }
}

/** Apply a random move in place; returns a function that reverts it. */
function mutate(st, g, rng) {
  const groups = g.isleIds.length
    ? g.mainIds.length
      ? [g.mainIds, g.mainIds, g.mainIds, g.isleIds]
      : [g.isleIds]
    : [g.mainIds]
  const ids = pick(groups, rng)
  const roll = rng()
  const { terrain, number, harborTok } = st

  if (roll < 0.15 && harborTok.length > 1 && !g.fixedHarbors) {
    const a = Math.floor(rng() * harborTok.length)
    let b = Math.floor(rng() * harborTok.length)
    if (a === b) b = (b + 1) % harborTok.length
    swap(harborTok, a, b)
    return () => swap(harborTok, a, b)
  }
  if (ids.length < 2) return () => {}

  const a = pick(ids, rng)
  let b = pick(ids, rng)
  if (a === b) b = ids[(ids.indexOf(a) + 1) % ids.length]

  const swapTiles = () => {
    swap(terrain, a, b)
    swap(number, a, b)
  }

  if (roll < 0.55) {
    // numbers only, unless one side has none (desert, sea): then move the whole tile
    if (number[a] == null || number[b] == null) {
      swapTiles()
      return swapTiles
    }
    swap(number, a, b)
    return () => swap(number, a, b)
  }
  const bothNumbered = number[a] != null && number[b] != null
  if (roll < 0.85 && bothNumbered) {
    // terrain only, numbers stay where they are
    swap(terrain, a, b)
    return () => swap(terrain, a, b)
  }
  swapTiles()
  return swapTiles
}

function snapshot(st) {
  return { ...st, terrain: st.terrain.slice(), number: st.number.slice(), harborTok: st.harborTok.slice() }
}

function anneal(st, g, mode, resWeight, scarce, rules, N, rng) {
  const W = mode.w
  let cur = evaluate(st, g, W, resWeight, scarce, rules)
  let best = cur
  let bestSnap = snapshot(st)
  const T0 = 30
  const T1 = 0.2
  for (let it = 0; it < N; it++) {
    const T = T0 * Math.pow(T1 / T0, it / N)
    const revert = mutate(st, g, rng)
    const next = evaluate(st, g, W, resWeight, scarce, rules)
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

/**
 * New World: harbours go on random coast edges (land next to sea or the frame),
 * at least one edge apart, i.e. no two share a vertex.
 */
function placeDynamicHarbors(st, g, rng) {
  const isLand = st.terrain.map(isLandTerrain)
  const candidates = []
  for (const cell of g.cells) {
    if (!isLand[cell.id]) continue
    for (let i = 0; i < 6; i++) {
      const [nr, nc] = neighborOf(cell.r, cell.c, EDGES[i])
      const nid = g.byRC.get(nr + ',' + nc)
      if (nid == null || !isLand[nid]) candidates.push([cell.id, i])
    }
  }
  const want = Object.values(g.tokens || {}).reduce((a, b) => a + b, 0)
  const usedVerts = new Set()
  const chosen = []
  for (const [id, i] of shuffle(candidates, rng)) {
    if (chosen.length >= want) break
    const va = g.cellVerts[id][i]
    const vb = g.cellVerts[id][(i + 1) % 6]
    if (usedVerts.has(va) || usedVerts.has(vb)) continue
    usedVerts.add(va)
    usedVerts.add(vb)
    chosen.push(makeHarbor(g.cells, g.cellVerts, id, i, null))
  }
  st.harbors = chosen
  st.harborTok = harborTokens(g, rng, chosen.length)
}

// ---------- stats ----------

function computeStats(st, g) {
  const { verts, landIds, mainVerts } = g
  const { terrain, number } = st
  const pips = { wood: 0, brick: 0, sheep: 0, wheat: 0, ore: 0, gold: 0 }
  const hexes = { wood: 0, brick: 0, sheep: 0, wheat: 0, ore: 0, gold: 0 }
  const m = measure(st, g)
  const isLand = m.isLand
  for (const a of landIds) {
    const r = isLand[a] ? TERRAIN[terrain[a]].resource : null
    if (!r) continue
    hexes[r]++
    pips[r] += PIPS[number[a]] || 0
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
  return {
    pips,
    hexes,
    redAdj: m.red,
    twoTwelve: m.twoTwelve,
    sameNum: m.sameNum,
    sameTerrain: m.sameTerrain,
    harbSame: m.harbSame,
    deserts: m.deserts,
    desertCoast: m.desertCoast,
    scenarioBad: m.scenarioBad,
    spots,
    maxSpot: spots.length ? spots[0].pips : 0,
  }
}

// ---------- entry point ----------

/**
 * @param {object} o
 * @param {string} o.layoutKey   'base4', 'base6' or 'sea:<scenario>:<players>'
 * @param {keyof MODES} o.modeKey
 * @param {string} o.game   game id, used for resource weighting
 * @param {string} o.seed
 * @param {{r68?: string, r212?: string}} [o.rules]  overrides for the mode's adjacency defaults
 * @param {'variable'|'printed'} [o.setup]  'printed' pins the rulebook diagram where it gives one
 */
export function generateBoard({ layoutKey, modeKey, game, seed, rules: overrides, setup = 'variable' }) {
  const g = buildGeometry(layoutKey, setup)
  const modeName = MODES[modeKey] ? modeKey : 'advanced'
  const mode = MODES[modeName]
  const rules = { ...RULE_DEFAULTS[modeName], ...(overrides || {}) }
  const ruleKey = rules.r68 + ',' + rules.r212
  const rng = mulberry32(
    hashSeed(layoutKey + '|' + modeName + '|' + game + '|' + ruleKey + '|' + setup + '|' + seed)
  )
  const resWeight = RESOURCE_WEIGHTS[game] || {}
  const scarce = mode.scarce ? pick(RESOURCES, rng) : null

  const movable = g.mainIds.length + g.isleIds.length
  // Chaos has no scoring of its own, but a forced or forbidden adjacency
  // (or a scenario constraint) still needs a short search to satisfy it.
  const hasHardRule =
    Object.values(rules).some((v) => v !== 'free') || g.nored.length > 0 || g.lowside.length > 0 || g.noLowOn.length > 0
  const iterations = movable < 2 ? 0 : mode.iterations || (hasHardRule ? 1500 : 0)

  let result = null
  let attempts = 0
  do {
    const st = initialState(g, rng)
    result = iterations
      ? anneal(st, g, mode, resWeight, scarce, rules, iterations, rng)
      : { state: st, score: 0 }
    attempts++
  } while (movable >= 2 && hasHardRule && !rulesSatisfied(result.state, g, rules) && attempts < 8)

  const st = result.state
  if (g.dynamicHarbors) placeDynamicHarbors(st, g, rng)
  const stats = computeStats(st, g)
  const robberId =
    g.robber != null && st.terrain[g.robber] != null
      ? g.robber
      : g.cells.find((c) => st.terrain[c.id] === 'desert' && c.kind !== 'V')?.id ?? null
  return {
    geometry: g,
    layoutKey,
    modeKey: modeName,
    seed,
    rules,
    setup,
    scarce,
    score: result.score,
    attempts,
    robber: robberId,
    cells: g.cells.map((c) => ({
      ...c,
      terrain: st.terrain[c.id],
      number: st.number[c.id],
      village: st.village[c.id],
    })),
    harbors: st.harbors.map((h, k) => ({ ...h, token: st.harborTok[k] })),
    stats,
  }
}
