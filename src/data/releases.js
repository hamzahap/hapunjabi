/**
 * Dated releases.
 *
 * Anything that says "out on <date>" checks the date at page load and flips to
 * "out now" by itself, so launch day does not need a redeploy.
 */

export const blockArena = {
  name: "Hking's Block Arena",
  steam: 'https://store.steampowered.com/app/3149210/Hkings_Block_Arena/',
  label: 'Nov 6',
  date: '6 Nov 2026',
  // Steam unlocks at 10am Pacific unless told otherwise: 18:00 UTC in
  // November, which is 21:00 in Doha.
  at: Date.parse('2026-11-06T18:00:00Z'),
}

export const isOut = (release) => Date.now() >= release.at
