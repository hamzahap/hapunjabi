import { useState, useEffect, useRef, useCallback } from 'react'
import { Panel, Out } from './Panel.jsx'
import { projects } from '../data/projects.js'

const ROUND_SECONDS = 30
const HISCORE_KEY = 'hap-rocks-hiscore'

/**
 * The rock shooter from the 2023 version of this site, rebuilt.
 *
 * Same idea — rocks appear, you shoot them — but the original keyed rocks by
 * array index while removing from the middle of the array, so destroying a rock
 * made the ones after it jump. Rocks now carry stable ids, and each is a real
 * <button> so the game is playable from the keyboard.
 */
function RockShooter() {
  const [rocks, setRocks] = useState([])
  const [score, setScore] = useState(0)
  const [misses, setMisses] = useState(0)
  const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS)
  const [phase, setPhase] = useState('idle') // idle | playing | over
  const [hiscore, setHiscore] = useState(0)
  const idRef = useRef(0)

  useEffect(() => {
    try {
      setHiscore(Number(localStorage.getItem(HISCORE_KEY)) || 0)
    } catch {
      /* private mode */
    }
  }, [])

  const start = () => {
    setRocks([])
    setScore(0)
    setMisses(0)
    setTimeLeft(ROUND_SECONDS)
    setPhase('playing')
  }

  const finish = useCallback(
    (finalScore) => {
      setPhase('over')
      setRocks([])
      if (finalScore > hiscore) {
        setHiscore(finalScore)
        try {
          localStorage.setItem(HISCORE_KEY, String(finalScore))
        } catch {
          /* private mode */
        }
      }
    },
    [hiscore]
  )

  // spawn loop — speeds up as the round progresses
  useEffect(() => {
    if (phase !== 'playing') return undefined
    const spawnEvery = Math.max(320, 1000 - (ROUND_SECONDS - timeLeft) * 22)
    const t = setInterval(() => {
      setRocks((rs) => {
        const next = [
          ...rs,
          {
            id: ++idRef.current,
            x: 4 + Math.random() * 82,
            y: 6 + Math.random() * 76,
            born: Date.now(),
          },
        ]
        return next.slice(-14)
      })
    }, spawnEvery)
    return () => clearInterval(t)
  }, [phase, timeLeft])

  // rocks expire after 2.2s and count as a miss
  useEffect(() => {
    if (phase !== 'playing') return undefined
    const t = setInterval(() => {
      const cutoff = Date.now() - 2200
      setRocks((rs) => {
        const alive = rs.filter((r) => r.born > cutoff)
        const expired = rs.length - alive.length
        if (expired > 0) setMisses((m) => m + expired)
        return alive
      })
    }, 200)
    return () => clearInterval(t)
  }, [phase])

  // countdown
  useEffect(() => {
    if (phase !== 'playing') return undefined
    if (timeLeft <= 0) {
      finish(score)
      return undefined
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [phase, timeLeft, score, finish])

  const shoot = (id) => {
    setRocks((rs) => rs.filter((r) => r.id !== id))
    setScore((s) => s + 1)
  }

  return (
    <div className="rocks">
      <div className="rocks__hud">
        <span>
          score <b className="accent">{score}</b>
        </span>
        <span>
          missed <b className="danger">{misses}</b>
        </span>
        <span>
          time <b className={timeLeft <= 5 && phase === 'playing' ? 'danger' : 'accent'}>{timeLeft}s</b>
        </span>
        <span className="faint">best {hiscore}</span>
        <button type="button" className="btnlink" onClick={start}>
          {phase === 'playing' ? 'restart' : phase === 'over' ? 'again' : 'start'}
        </button>
      </div>

      <div className="rocks__field">
        {phase === 'idle' && (
          <p className="rocks__msg">
            Rocks appear. Shoot them before they drift off.
            <br />
            <span className="faint">Click them, or Tab + Enter if you are a purist.</span>
          </p>
        )}
        {phase === 'over' && (
          <p className="rocks__msg">
            Round over — <b className="accent">{score}</b> destroyed, {misses} missed.
            {score >= hiscore && score > 0 && <span className="accent"> new best.</span>}
          </p>
        )}
        {rocks.map((r) => (
          <button
            key={r.id}
            type="button"
            className="rocks__rock"
            style={{ left: `${r.x}%`, top: `${r.y}%` }}
            onClick={() => shoot(r.id)}
            aria-label="Shoot rock"
          />
        ))}
      </div>
      <p className="faint rocks__note">
        Preserved from the 2023 version of this site, where it existed for no reason. It still
        exists for no reason.
      </p>
    </div>
  )
}

export function ArcadePanel() {
  const games = projects.filter((p) => p.category === 'games' && p.links.length > 0)
  return (
    <Panel title="ARCADE" sub="things that are meant to be played">
      <div className="detail__label">Shipped</div>
      <div className="arcade__list">
        {games.map((g) => (
          <div className="arcade__item" key={g.slug}>
            <div>
              <span className="bold">{g.name}</span>
              <span className="faint"> — {g.tagline}</span>
            </div>
            <div className="arcade__links">
              {g.links.map((l) => (
                <a
                  key={l.url}
                  className="btnlink"
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {l.label} ↗
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="detail__label" style={{ marginTop: 'var(--sp-5)' }}>
        Playable here
      </div>
      <RockShooter />

      <Out>
        <span className="faint">
          Breakline and EdgeBloom are mobile builds, so they are not embeddable — the links go to
          their pages.
        </span>
      </Out>
    </Panel>
  )
}
