import { useEffect, useMemo, useState } from 'react'
import { newGame, freeLines, play, aiPick, score, catanBoard, randomSeed } from './pocket.js'

// ---------------------------------------------------------------- EdgeBloom

const BOX = 72 // distance between dots
const PAD = 12 // board edge to the first dot

function lineGeometry(kind, i) {
  if (kind === 'h') {
    const r = Math.floor(i / 3)
    const c = i % 3
    return {
      left: PAD + c * BOX + 9,
      top: PAD + r * BOX - 11,
      width: BOX - 18,
      height: 22,
      label: `Line between dots ${r * 4 + c + 1} and ${r * 4 + c + 2}`,
    }
  }
  const r = Math.floor(i / 4)
  const c = i % 4
  return {
    left: PAD + c * BOX - 11,
    top: PAD + r * BOX + 9,
    width: 22,
    height: BOX - 18,
    label: `Line between dots ${r * 4 + c + 1} and ${(r + 1) * 4 + c + 1}`,
  }
}

const LINES = [
  ...Array.from({ length: 12 }, (_, i) => ['h', i]),
  ...Array.from({ length: 12 }, (_, i) => ['v', i]),
].map(([kind, i]) => ({ kind, i, ...lineGeometry(kind, i) }))

const DOTS = Array.from({ length: 16 }, (_, n) => ({
  left: PAD + (n % 4) * BOX,
  top: PAD + Math.floor(n / 4) * BOX,
}))

function PocketEdgeBloom() {
  const [g, setG] = useState(newGame)
  const left = freeLines(g).length

  // Pulse AI moves after a beat, and keeps moving for as long as it keeps
  // closing boxes, because the effect re-runs on every board it produces.
  useEffect(() => {
    if (g.turn !== 'ai' || left === 0) return undefined
    const t = setTimeout(() => {
      const [kind, i] = aiPick(g)
      setG(play(g, kind, i, 'ai'))
    }, 550)
    return () => clearTimeout(t)
  }, [g, left])

  const yourTurn = g.turn === 'you' && left > 0
  const { you, ai } = score(g)
  let message = 'Pulse AI is thinking…'
  if (left === 0) {
    message =
      you > ai
        ? `You win ${you}–${ai}. Pulse AI would like a rematch.`
        : `Pulse AI wins ${ai}–${you}. It does not go easy on anyone.`
  } else if (yourTurn) {
    message = 'Your move. Close a box and you go again.'
  }

  return (
    <figure className="fig">
      <p className="pl-h">Pocket EdgeBloom</p>
      <p className="pl-sub">
        Draw a line between two dots. Close a box to score and go again. You&apos;re green; the
        Pulse AI is blue.
      </p>
      <div className="ht-board" role="group" aria-label="Pocket EdgeBloom board">
        {g.boxes.map((who, box) => (
          <span
            key={box}
            className={who ? `ht-cell by-${who}` : 'ht-cell'}
            style={{
              left: PAD + (box % 3) * BOX + 8,
              top: PAD + Math.floor(box / 3) * BOX + 8,
              width: BOX - 16,
              height: BOX - 16,
            }}
          >
            {who === 'you' ? 'YOU' : who === 'ai' ? 'AI' : ''}
          </span>
        ))}
        {LINES.map((line) => {
          const who = g[line.kind][line.i]
          return (
            <button
              key={line.kind + line.i}
              type="button"
              className={`ht-edge ht-${line.kind}${who ? ` by-${who}` : yourTurn ? ' free' : ''}`}
              style={{ left: line.left, top: line.top, width: line.width, height: line.height }}
              aria-label={line.label}
              disabled={!!who || !yourTurn}
              onClick={() =>
                setG((cur) =>
                  cur.turn === 'you' && !cur[line.kind][line.i]
                    ? play(cur, line.kind, line.i, 'you')
                    : cur
                )
              }
            />
          )
        })}
        {DOTS.map((d, n) => (
          <span key={n} className="ht-dot" aria-hidden="true" style={d} />
        ))}
      </div>
      <p className="ht-score">
        <small className="ht-you">You</small>
        {you}
        <span className="ht-dash">–</span>
        {ai}
        <small className="ht-ai">Pulse AI</small>
      </p>
      <p className="ht-msg" aria-live="polite">
        {message}
      </p>
      <div className="pl-row">
        <button type="button" className="e-play" onClick={() => setG(newGame())}>
          New match
        </button>
        <a
          className="e-link"
          href="https://hamzahap.github.io/edgebloom/"
          target="_blank"
          rel="noopener noreferrer"
        >
          The full game ↗
        </a>
      </div>
      <figcaption className="e-cap">Fig. A — EdgeBloom, pocket edition</figcaption>
    </figure>
  )
}

// ---------------------------------------------------------------- Catan

const FILL = {
  wood: '#3b6e46',
  brick: '#b0603f',
  sheep: '#8db86b',
  wheat: '#e2b54a',
  ore: '#8d939b',
  desert: '#dccba4',
}
const HEX_W = 42
const HEX_H = 48.5
const round1 = (n) => Math.round(n * 10) / 10

function PocketCatan() {
  // A fixed first board, so the page looks the same on every visit until
  // someone presses Shuffle.
  const [seed, setSeed] = useState(20261026)
  const hexes = useMemo(
    () =>
      catanBoard(seed).map((h) => ({
        ...h,
        left: round1(110 + HEX_W * (h.q + h.r / 2) - 20),
        top: round1(100 + 0.75 * HEX_H * h.r - 23),
      })),
    [seed]
  )

  return (
    <figure className="fig">
      <p className="pl-h">Pocket Catan</p>
      <p className="pl-sub">
        A fresh base-game board on every shuffle, and the 6s and 8s never touch.
      </p>
      <div className="cb" role="img" aria-label="A shuffled Catan base-game board with 19 tiles">
        {hexes.map((h) => (
          <span
            key={`${h.q},${h.r}`}
            className="hx"
            style={{ left: h.left, top: h.top, backgroundColor: FILL[h.terrain] }}
          >
            {h.num > 0 && (
              <span className={h.num === 6 || h.num === 8 ? 'tok hot' : 'tok'}>{h.num}</span>
            )}
          </span>
        ))}
      </div>
      <p className="cb-key">
        {['wood', 'brick', 'sheep', 'wheat', 'ore'].map((t) => (
          <span key={t}>
            <i style={{ background: FILL[t] }} />
            {t}
          </span>
        ))}
      </p>
      <div className="pl-row">
        <button type="button" className="e-play" onClick={() => setSeed(randomSeed())}>
          Shuffle
        </button>
        <a className="e-link" href="#play/catan">
          The full generator →
        </a>
      </div>
      <figcaption className="e-cap">Fig. B — Catan, pocket edition</figcaption>
    </figure>
  )
}

export function Play() {
  return (
    <div className="pl v-in">
      <PocketEdgeBloom />
      <PocketCatan />
    </div>
  )
}
