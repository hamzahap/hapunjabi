import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { buildRegistry, THEMES } from './commands.jsx'
import { bootLines, banner, profile } from '../data/profile.js'
import { motd } from '../data/flavor.js'
import { Out } from '../panels/Panel.jsx'

const PROMPT_USER = 'hamzah@hap-os'
const PROMPT_PATH = '~'
const THEME_KEY = 'hap-theme'
const QUICK = ['whoami', 'ps', 'work', 'stack', 'arcade', 'uses', 'logs', 'resume', 'contact']

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  )
}

function longestCommonPrefix(strings) {
  if (!strings.length) return ''
  let prefix = strings[0]
  for (const s of strings.slice(1)) {
    while (!s.startsWith(prefix)) {
      prefix = prefix.slice(0, -1)
      if (!prefix) return ''
    }
  }
  return prefix
}

/** The static prompt shown in front of an already-executed command. */
function PromptEcho({ cmd }) {
  return (
    <div className="prompt">
      <span className="prompt__user">{PROMPT_USER}</span>
      <span className="prompt__path">{PROMPT_PATH}</span>
      <span className="prompt__sigil">$</span>
      <span className="prompt__cmd">{cmd}</span>
    </div>
  )
}

/** Renders the first `count` boot lines, colouring the trailing status token. */
function BootLines({ count }) {
  return (
    <div>
      {bootLines.slice(0, count).map((l, i) => {
        for (const [token, cls] of [
          [' ok', 'boot__ok'],
          [' failed', 'danger'],
          [' 2 disagree', 'warn'],
        ]) {
          const idx = l.text.lastIndexOf(token)
          if (idx !== -1) {
            return (
              <div className="boot__line" key={i}>
                {l.text.slice(0, idx)}
                <span className={cls}>{token}</span>
              </div>
            )
          }
        }
        return (
          <div className="boot__line" key={i}>
            {l.text}
          </div>
        )
      })}
    </div>
  )
}

function BootSequence({ onDone }) {
  const [shown, setShown] = useState(() => (prefersReducedMotion() ? bootLines.length : 0))
  const doneRef = useRef(false)

  useEffect(() => {
    if (shown >= bootLines.length) {
      if (!doneRef.current) {
        // Flag is set when the timer FIRES, not when it is scheduled. Under
        // StrictMode the mount effect runs setup -> cleanup -> setup; setting it
        // at schedule time meant the cleanup cancelled the timer and the second
        // setup short-circuited, so onDone never ran and the shell never booted.
        const t = setTimeout(
          () => {
            doneRef.current = true
            onDone()
          },
          prefersReducedMotion() ? 0 : 180
        )
        return () => clearTimeout(t)
      }
      return undefined
    }
    const t = setTimeout(() => setShown((n) => n + 1), bootLines[shown].delay)
    return () => clearTimeout(t)
  }, [shown, onDone])

  return <BootLines count={shown} />
}

function Welcome() {
  return (
    <div>
      {/* aria-label on a <pre> is ignored by most screen readers, which then read
          the ASCII art glyph by glyph. The real <h1> lives in the shell chrome so
          that `clear` cannot wipe the document's only heading. */}
      <pre className="boot__banner" aria-hidden="true">
        {banner}
      </pre>
      <Out tone="plain">
        {profile.role} · {profile.location}
      </Out>
      <Out>
        <span className="faint">{motd[Math.floor(Math.random() * motd.length)]}</span>
      </Out>
      <Out>
        <span className="faint">Type </span>
        <span className="accent">help</span>
        <span className="faint"> for commands, </span>
        <span className="accent">ps</span>
        <span className="faint"> for the work, or </span>
        <span className="accent">whoami</span>
        <span className="faint"> if you like being introduced properly. Tab completes.</span>
      </Out>
    </div>
  )
}

export default function Terminal() {
  const registry = useMemo(() => buildRegistry(), [])
  const [blocks, setBlocks] = useState([])
  const [value, setValue] = useState('')
  const [caretPos, setCaretPos] = useState(0)
  const [history, setHistory] = useState([])
  const [histIdx, setHistIdx] = useState(-1)
  const [booted, setBooted] = useState(false)
  const [focused, setFocused] = useState(true)
  const [theme, setThemeState] = useState('matrix')

  const inputRef = useRef(null)
  const screenRef = useRef(null)
  const idRef = useRef(0)
  const historyRef = useRef([])
  const nextId = () => ++idRef.current

  // ---------- theme ----------
  const setTheme = useCallback((t) => {
    setThemeState(t)
    document.documentElement.dataset.theme = t
    // keep mobile browser chrome in sync with the palette
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) {
      const bg = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim()
      if (bg) meta.setAttribute('content', bg)
    }
    try {
      localStorage.setItem(THEME_KEY, t)
    } catch {
      /* private mode — theme just won't persist */
    }
  }, [])

  useEffect(() => {
    let saved = null
    try {
      saved = localStorage.getItem(THEME_KEY)
    } catch {
      /* ignore */
    }
    if (saved && THEMES.includes(saved)) setTheme(saved)
  }, [setTheme])

  // ---------- output ----------
  const push = useCallback((node, kind = 'node') => {
    setBlocks((b) => [...b, { id: nextId(), kind, node }])
  }, [])

  const clear = useCallback(() => setBlocks([]), [])

  // ctx is rebuilt per-run so commands always see fresh history/theme
  const ctxRef = useRef({})

  const runCommand = useCallback(
    (raw) => {
      const line = raw.trim()
      push(<PromptEcho cmd={raw} />, 'echo')
      // Programmatic callers (hint chips, project rows, ls entries) leave focus
      // on the button they were activated from, which swallows subsequent typing
      // and makes Enter re-fire that button. Put the caret back in the shell.
      inputRef.current?.focus()
      if (!line) return

      // Update the ref synchronously so a command run in this same tick — such
      // as `history` — sees itself, rather than lagging one command behind.
      if (historyRef.current[historyRef.current.length - 1] !== line) {
        historyRef.current = [...historyRef.current, line]
      }
      setHistory(historyRef.current)
      setHistIdx(-1)

      const tokens = line.split(/\s+/)
      const name = tokens[0].toLowerCase()
      const args = tokens.slice(1)
      const cmd = registry.byName.get(name)

      if (!cmd) {
        const near = registry.completions.filter(
          (c) => c.startsWith(name.slice(0, 2)) || name.startsWith(c.slice(0, 2))
        )
        push(
          <Out tone="err">
            {`${name}: command not found`}
            {'\n'}
            <span className="faint">
              {near.length
                ? `Did you mean: ${near.slice(0, 4).join(', ')}? `
                : 'Nothing close to that, either. '}
              Type `help` for the full list.
            </span>
          </Out>
        )
        return
      }

      let node
      try {
        node = cmd.run(args, ctxRef.current)
      } catch (err) {
        node = <Out tone="err">{`${name}: ${err?.message ?? 'something broke'}`}</Out>
      }
      if (node) push(node)
    },
    [push, registry]
  )

  ctxRef.current = {
    runCommand,
    openProject: (slug) => runCommand(`open ${slug}`),
    dispatch: (name) => {
      const c = registry.byName.get(name)
      return c ? c.run([], ctxRef.current) : null
    },
    clear,
    setTheme,
    theme,
    history: historyRef.current,
  }

  // ---------- boot ----------
  const handleBootDone = useCallback(() => {
    setBooted(true)
    // Keep the boot output in scrollback the way a real terminal would, instead
    // of having it vanish the moment the shell is ready.
    push(<BootLines count={bootLines.length} />)
    push(<Welcome />)
    // deep link: #open/orbitdesk -> `open orbitdesk`
    const hash = window.location.hash.replace(/^#\/?/, '')
    if (hash) {
      const cmd = decodeURIComponent(hash).replace(/\//g, ' ').trim()
      if (/^[\w\s.-]{1,60}$/.test(cmd)) runCommand(cmd)
    }
  }, [push, runCommand])

  // ---------- autoscroll ----------
  useEffect(() => {
    const el = screenRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [blocks])

  // ---------- idle nudge ----------
  // If someone lands, reads the banner and then stalls, give them a way in.
  // Twice, at most, then leave them alone.
  const nudgeRef = useRef(0)
  useEffect(() => {
    if (!booted || nudgeRef.current >= 2) return undefined
    const t = setTimeout(() => {
      nudgeRef.current += 1
      push(
        <Out>
          <span className="faint">
            {nudgeRef.current === 1
              ? 'Still there? '
              : 'Last suggestion, then I will stop: '}
          </span>
          <span className="accent">{nudgeRef.current === 1 ? 'ps' : 'stack'}</span>
          <span className="faint">
            {nudgeRef.current === 1
              ? ' lists everything I have built.'
              : ' is the long version, if you have the time.'}
          </span>
        </Out>
      )
    }, 38000)
    return () => clearTimeout(t)
  }, [booted, blocks, push])

  // ---------- konami ----------
  useEffect(() => {
    const SEQ = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a',
    ]
    let pos = 0
    const onKey = (e) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key
      pos = k === SEQ[pos] ? pos + 1 : k === SEQ[0] ? 1 : 0
      if (pos === SEQ.length) {
        pos = 0
        setTheme('amber')
        push(
          <Out>
            <span className="accent">↑ ↑ ↓ ↓ ← → ← → B A</span>
            {'\n'}
            <span className="faint">
              30 extra lives granted. Non-transferable, non-redeemable, and of no use whatsoever on
              a personal website. Palette switched to amber as a consolation prize.
            </span>
          </Out>
        )
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [push, setTheme])

  // ---------- completion ----------
  const ghost = useMemo(() => {
    if (!value || value.endsWith(' ')) return ''
    const tokens = value.split(/\s+/)
    if (tokens.length === 1) {
      const m = registry.completions.filter((c) => c.startsWith(tokens[0]) && c !== tokens[0])
      return m.length === 1 ? m[0].slice(tokens[0].length) : ''
    }
    const cmd = registry.byName.get(tokens[0].toLowerCase())
    if (!cmd?.complete) return ''
    const partial = tokens[tokens.length - 1]
    const m = cmd.complete(partial, ctxRef.current).filter((c) => c !== partial)
    return m.length === 1 ? m[0].slice(partial.length) : ''
  }, [value, registry])

  const doComplete = useCallback(() => {
    const tokens = value.split(/\s+/)
    const trailingSpace = value.endsWith(' ')
    let options = []
    let partial = ''

    if (tokens.length === 1 && !trailingSpace) {
      partial = tokens[0]
      options = registry.completions.filter((c) => c.startsWith(partial))
    } else {
      const cmd = registry.byName.get(tokens[0].toLowerCase())
      if (!cmd?.complete) return
      partial = trailingSpace ? '' : tokens[tokens.length - 1]
      options = cmd.complete(partial, ctxRef.current)
    }

    if (!options.length) return

    const common = longestCommonPrefix(options)
    if (common.length > partial.length) {
      const head = trailingSpace ? value : value.slice(0, value.length - partial.length)
      const next = head + common + (options.length === 1 ? ' ' : '')
      setValue(next)
      setCaretPos(next.length)
      return
    }
    if (options.length > 1) {
      push(<Out>{options.join('   ')}</Out>)
    }
  }, [value, registry, push])

  // ---------- key handling ----------
  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const v = value
      setValue('')
      setCaretPos(0)
      runCommand(v)
      return
    }
    // Forward Tab completes; Shift+Tab is deliberately left alone so keyboard
    // users can escape the input instead of being trapped in it (WCAG 2.1.2).
    if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault()
      doComplete()
      return
    }
    if (e.key === 'Escape') {
      e.preventDefault()
      inputRef.current?.blur()
      return
    }
    if (e.key === 'ArrowRight' && ghost && caretPos === value.length) {
      e.preventDefault()
      const next = value + ghost
      setValue(next)
      setCaretPos(next.length)
      return
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (!history.length) return
      const idx = histIdx === -1 ? history.length - 1 : Math.max(0, histIdx - 1)
      setHistIdx(idx)
      setValue(history[idx])
      setCaretPos(history[idx].length)
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (histIdx === -1) return
      const idx = histIdx + 1
      if (idx >= history.length) {
        setHistIdx(-1)
        setValue('')
        setCaretPos(0)
      } else {
        setHistIdx(idx)
        setValue(history[idx])
        setCaretPos(history[idx].length)
      }
      return
    }
    if (e.ctrlKey && (e.key === 'l' || e.key === 'L')) {
      e.preventDefault()
      clear()
      return
    }
    if (e.ctrlKey && (e.key === 'c' || e.key === 'C')) {
      if (window.getSelection()?.toString()) return // let copy work
      e.preventDefault()
      push(<PromptEcho cmd={`${value}^C`} />, 'echo')
      setValue('')
      setCaretPos(0)
    }
  }

  const syncCaret = (e) => setCaretPos(e.target.selectionStart ?? 0)

  const focusInput = (e) => {
    if (window.getSelection()?.toString()) return
    if (e.target.closest('a, button')) return
    inputRef.current?.focus()
  }

  return (
    <div className="shell">
      <h1 className="sr-only">
        {profile.name} — {profile.role}, {profile.location}
      </h1>
      <div className="titlebar">
        <div className="titlebar__dots" aria-hidden="true">
          <span className="titlebar__dot titlebar__dot--r" />
          <span className="titlebar__dot titlebar__dot--y" />
          <span className="titlebar__dot titlebar__dot--g" />
        </div>
        <div className="titlebar__title">
          {PROMPT_USER}: {PROMPT_PATH} — {profile.name}
        </div>
        <div className="titlebar__actions">
          {THEMES.map((t) => (
            <button
              key={t}
              type="button"
              className="titlebar__btn"
              aria-pressed={theme === t}
              onClick={() => setTheme(t)}
              title={`${t} theme`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <main className="screen" ref={screenRef} onMouseUp={focusInput}>
        <div
          className="screen__inner"
          role="log"
          aria-live="polite"
          aria-atomic="false"
          aria-label="Terminal output"
        >
          {!booted && <BootSequence onDone={handleBootDone} />}

          {blocks.map((b) => (
            <div className={b.kind === 'echo' ? 'block block--echo' : 'block'} key={b.id}>
              {b.node}
            </div>
          ))}

          {booted && (
            <div className="inputline">
              <span className="prompt__user">{PROMPT_USER}</span>
              <span className="prompt__path">{PROMPT_PATH}</span>
              <span className="prompt__sigil">$</span>
              <div className="inputline__field">
                <label className="sr-only" htmlFor="term-input">
                  Terminal input — type a command such as help, ps, or work. Press Escape to
                  leave the input, or Shift+Tab to move back to the page controls.
                </label>
                <input
                  id="term-input"
                  ref={inputRef}
                  className="inputline__input"
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value)
                    syncCaret(e)
                  }}
                  onKeyDown={onKeyDown}
                  onKeyUp={syncCaret}
                  onSelect={syncCaret}
                  onClick={syncCaret}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  // eslint-disable-next-line jsx-a11y/no-autofocus
                  autoFocus
                />
                <div className="inputline__mirror" aria-hidden="true">
                  {value.slice(0, caretPos)}
                  <span className={focused ? 'caret' : 'caret caret--idle'} />
                  {value.slice(caretPos)}
                  <span className="ghost">{ghost}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <div className="hintbar">
        <span className="hintbar__label">try</span>
        <div className="hintbar__chips">
          {QUICK.map((q) => (
            <button key={q} type="button" className="chip" onClick={() => runCommand(q)}>
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
