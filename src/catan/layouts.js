/**
 * Physical board definitions.
 *
 * Coordinates are "odd-r" offset hexes, pointy-top, odd rows shifted half a hex
 * to the right. Each row string has one character per column:
 *   '.'  no hex here
 *   'I'  main-island land slot (terrain and number are generated)
 *   'S'  fixed sea (Seafarers)
 *   'L'  small-island land slot (Seafarers; the island shapes are fixed by the
 *        scenario, only terrain and numbers shuffle)
 *
 * Harbours are [row, col, edge, type] on the hex they belong to, listed
 * clockwise from the top-left corner. A type ('any' or a resource) means the
 * harbour is printed on the frame and never moves; a missing type means the
 * scenario places shuffled harbour tokens there (Seafarers flips the frame to
 * its all-sea side).
 *
 * The base-game frame was read off the physical pieces. The six long pieces
 * are numbered 1-6 and join clockwise as 1 → 6 → 5 → 4 → 3 → 2 → 1; the two
 * ends of each joint carry the same number ("the 5-5 joint"). Each long piece
 * covers five coast edges: two-harbour pieces have harbours on their first and
 * fourth edges, single-harbour pieces on the middle edge. The 5-6 extension's
 * four small pieces each cover the two outer edges of one corner hex, with the
 * harbour on the second edge, and the rulebook places them at the 2-2 (sea),
 * 3-3 (2:1 wool), 5-5 (3:1) and 6-6 (sea) joints.
 */

import { SCENARIO_BOARDS } from './scenarios.js'

export const TERRAIN = {
  forest: { label: 'forest', resource: 'wood', color: '#2f7a45' },
  pasture: { label: 'pasture', resource: 'sheep', color: '#8dc63f' },
  fields: { label: 'fields', resource: 'wheat', color: '#e8b73a' },
  hills: { label: 'hills', resource: 'brick', color: '#c4622d' },
  mountains: { label: 'mountains', resource: 'ore', color: '#8b93a1' },
  desert: { label: 'desert', resource: null, color: '#dcc794' },
  gold: { label: 'gold field', resource: 'gold', color: '#f5c542' },
  sea: { label: 'sea', resource: null, color: '#3b82c4' },
  fog: { label: 'unexplored', resource: null, color: '#d8dde3' },
}

export const RESOURCES = ['wood', 'brick', 'sheep', 'wheat', 'ore']

export const RESOURCE_COLOR = {
  wood: TERRAIN.forest.color,
  brick: TERRAIN.hills.color,
  sheep: TERRAIN.pasture.color,
  wheat: TERRAIN.fields.color,
  ore: TERRAIN.mountains.color,
  gold: TERRAIN.gold.color,
}

const BASE_34 = {
  terrain: { forest: 4, pasture: 4, fields: 4, hills: 3, mountains: 3, desert: 1 },
  numbers: [2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12],
  harbors: { any: 4, wood: 1, brick: 1, sheep: 1, wheat: 1, ore: 1 },
}

const BASE_56 = {
  terrain: { forest: 6, pasture: 6, fields: 6, hills: 5, mountains: 5, desert: 2 },
  numbers: [
    2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 8, 8, 8, 9, 9, 9, 10, 10, 10, 11, 11, 11, 12, 12,
  ],
  harbors: { any: 5, wood: 1, brick: 1, sheep: 2, wheat: 1, ore: 1 },
}

// Printed frame, 3-4 players. Piece 3 (3:1, wheat) along the top, then 2 (ore),
// 1 (3:1, wool), 6 (3:1), 5 (3:1, brick), 4 (wood).
const FRAME_34 = [
  [0, 2, 'NW', 'any'],
  [0, 3, 'NE', 'wheat'],
  [1, 4, 'NE', 'ore'],
  [2, 5, 'E', 'any'],
  [3, 4, 'SE', 'sheep'],
  [4, 3, 'SE', 'any'],
  [4, 2, 'SW', 'any'],
  [3, 1, 'W', 'brick'],
  [1, 1, 'W', 'wood'],
]

// Printed frame, 5-6 players: the same six long pieces in the same order, with
// the small pieces inserted at the top-right (3-3, wool), right (2-2, sea),
// bottom-left (6-6, sea) and left (5-5, 3:1) corners.
const FRAME_56 = [
  [0, 3, 'NW', 'any'],
  [0, 4, 'NE', 'wheat'],
  [0, 5, 'E', 'sheep'],
  [2, 6, 'NE', 'ore'],
  [4, 6, 'E', 'any'],
  [5, 5, 'SE', 'sheep'],
  [6, 4, 'SE', 'any'],
  [5, 2, 'SW', 'any'],
  [4, 2, 'W', 'brick'],
  [3, 1, 'NW', 'any'],
  [1, 2, 'W', 'wood'],
]

export const LAYOUTS = {
  base4: {
    title: '3–4 players · 19 hexes',
    rows: ['..III', '.IIII', '.IIIII', '.IIII', '..III'],
    harbors: FRAME_34,
    main: BASE_34,
    isle: null,
    pirate: null,
    frameNote: 'Harbours are the ones printed on the frame, pieces joined 1 → 6 → 5 → 4 → 3 → 2.',
  },
  base6: {
    title: '5–6 players · 30 hexes',
    rows: ['...III', '..IIII', '..IIIII', '.IIIIII', '..IIIII', '..IIII', '...III'],
    harbors: FRAME_56,
    main: BASE_56,
    isle: null,
    pirate: null,
    frameNote:
      'Harbours are the ones printed on the frame. Long pieces joined 1 → 6 → 5 → 4 → 3 → 2, small pieces at the 3-3 joint (2:1 wool), 2-2 (sea), 6-6 (sea) and 5-5 (3:1).',
  },
}

export const GAMES = [
  {
    id: 'base',
    label: 'Base game',
    board: 'base',
    note: 'The standard island. Robber starts in the desert.',
  },
  {
    id: 'seafarers',
    label: 'Seafarers',
    board: 'sea',
    note:
      'All nine scenarios from the 2025 rulebooks. The frame is flipped to its all-sea side and the harbour tokens from the Seafarers box are shuffled onto the marked edges. Gold fields produce a resource of your choice, so they never get a 6 or 8 outside chaos mode.',
  },
  {
    id: 'cities',
    label: 'Cities & Knights',
    board: 'base',
    note:
      'Plays on the standard island. Ore, wheat and sheep are weighted a little higher when balancing, because cities and commodities depend on them.',
  },
  {
    id: 'traders',
    label: 'Traders & Barbarians',
    board: 'base',
    note:
      'The scenarios play on the standard island with their own pieces placed on top (rivers, castle, glassworks, quarry), so this is the base layout.',
  },
  {
    id: 'explorers',
    label: 'Explorers & Pirates',
    board: null,
    disabled: true,
    note:
      'Explorers & Pirates uses a fixed home island and face-down discovery tiles, so there is nothing to randomise.',
  },
]

/** Per-resource weighting of pip targets. Cities & Knights leans on ore/wheat/sheep. */
export const RESOURCE_WEIGHTS = {
  cities: { wood: 0.9, brick: 0.85, sheep: 1.05, wheat: 1.1, ore: 1.15 },
}

/**
 * Seafarers scenarios, in rulebook order. `boards` holds one layout per player
 * count that has its own diagram (3, 4 and 6; scenarios without a 3-player map
 * reuse the 4-player one). `variable` is the rulebook's own advice for the
 * variable set-up; `extra` lists scenario constraints the generator enforces.
 */
export const SCENARIOS = [
  {
    id: 'shores',
    label: 'Heading for New Shores',
    vp: 14,
    note: 'The standard island plus small islands worth 2 VP for your first settlement on each. Start on the main island.',
    variable: 'Main island shuffled like the base game; the small islands keep their shapes and shuffle their own hexes and numbers.',
  },
  {
    id: 'islands',
    label: 'The Four Islands',
    vp: 13,
    note: 'Four (or six) islands. Settle one or two as home; each other island is worth 2 VP for your first settlement.',
    variable: 'All land hexes and numbers shuffle across the islands; forests and pastures never get a 2, 3, 11 or 12.',
  },
  {
    id: 'fog',
    label: 'The Fog Island',
    vp: 12,
    note: 'Two known islands and a bank of fog. Building toward an empty space reveals a hex from the face-down stack, and a land hex pays out immediately.',
    variable: 'The face-up islands shuffle; the fog spaces stay empty. Red numbers may touch here.',
  },
  {
    id: 'desert',
    label: 'Through the Desert',
    vp: 14,
    note: 'A desert splits the big island. Start on the main part; the strip beyond the desert and the small islands are worth 2 VP each for a first settlement.',
    variable: 'Deserts stay put. Main island and unexplored regions shuffle separately. No red numbers on gold.',
  },
  {
    id: 'tribe',
    label: 'The Forgotten Tribe',
    vp: 13,
    note: 'One big island ringed by small ones with no numbers. Ships that reach the marked edges pick up VP tokens, development cards and harbours.',
    variable: 'Only the big island shuffles. Its three east-coast hexes never get a 5, 6, 8 or 9.',
  },
  {
    id: 'cloth',
    label: 'Cloth for Catan',
    vp: null,
    note: 'Two large islands and four villages that produce cloth. Three starting settlements; no settlements on the small islands; no Longest Route.',
    variable: 'Fixed set-up only. The rulebook gives no variable version.',
  },
  {
    id: 'pirates',
    label: 'The Pirate Islands',
    vp: 10,
    note: 'Start on the east island and build one line of ships to your pirate fortress. Six hexes carry no number. Win with 10 VP and a captured fortress.',
    variable: 'Fixed set-up only; the rulebook recommends no variations.',
  },
  {
    id: 'wonders',
    label: 'The Wonders of Catan',
    vp: 10,
    note: 'Race to finish a Wonder. Small islands give 1 VP for a first settlement. No pirate.',
    variable: 'Main island shuffles; the two hexes beside the desert never get a 6 or 8. Deserts and small islands stay put.',
  },
  {
    id: 'newworld',
    label: 'New World',
    vp: 12,
    note: 'No printed map. Every tile including the sea is shuffled into the frame, then harbours go on random coast edges at least one edge apart.',
    variable: 'Everything shuffles. Unexplored islands give 1 VP for a first settlement.',
  },
]

const BASE_TOKENS = { any: 4, wood: 1, brick: 1, sheep: 1, wheat: 1, ore: 1 }

/** Resolve a layout key: 'base4', 'base6', or 'sea:<scenario>:<players>'. */
export function getLayout(key) {
  if (LAYOUTS[key]) return { ...LAYOUTS[key], tokens: LAYOUTS[key].main.harbors || BASE_TOKENS }
  const m = /^sea:(\w+):(\d)$/.exec(key)
  if (!m) return null
  const scen = SCENARIOS.find((s) => s.id === m[1])
  const boards = SCENARIO_BOARDS[m[1]]
  if (!scen || !boards) return null
  const players = m[2]
  const board = boards[players] || boards['4'] || boards['6']
  const who = boards[players] ? (players === '6' ? '5–6 players' : `${players} players`) : '3–4 players'
  return {
    ...board,
    scenario: scen,
    title: `Seafarers · ${scen.label} · ${who}`,
    main: board.main,
    isle: board.isle,
    pirate: board.pirate || null,
  }
}
