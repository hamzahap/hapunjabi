# hapunjabi — personal site

My portfolio. It boots as a terminal, and the commands render real interactive panels rather than dumping text.

**Live:** https://hamzahap.github.io/hapunjabi/

```console
$ help          # every command
$ whoami        # the short version
$ projects      # browse everything, filter by category
$ open orbitdesk
$ arch          # architecture of the rugby platform I maintain
$ theme amber   # matrix · amber · ice · paper
```

Tab completes. `↑`/`↓` walks history. `Ctrl+L` clears. Anything after the `#` in the URL runs as a command on load, so <https://hamzahap.github.io/hapunjabi/#open/breakline> deep-links straight to a project.

## Why it's built this way

A terminal is a genuinely good navigation model for a portfolio: it's fast, it's keyboard-first, and it rewards poking around. The trick is that it can't only be a gimmick — so commands here return React nodes, not strings. `arch` renders an SVG diagram. `projects` renders a clickable card grid. `ls` renders a real directory listing whose entries run commands when you click them.

Clicking and typing go through the same path — a card's `onClick` calls `runCommand('open <slug>')` — so mouse users and keyboard users see identical history.

## Stack

React 18 + Vite. No UI framework, no CSS library, no state manager — the whole thing is about 190 kB of JS (63 kB gzipped) and one dependency tree shallow enough to read.

## Layout

```
src/
  terminal/
    Terminal.jsx     shell: input, history, tab completion, boot sequence
    commands.jsx     command registry — name, aliases, completions, run()
  panels/            what commands render (project cards, timelines, SVG diagram)
  data/              projects, work history, skills, profile
  styles/            design system + four themes as CSS custom properties
```

Adding a command means adding one object to the registry in `commands.jsx`. It gets tab completion and `help` listing for free.

## Local development

```bash
npm install
npm run dev
```

Then open http://localhost:5173/hapunjabi/ — note the `/hapunjabi/` path. The dev server honours the same `base` as production, because the root of `hamzahap.github.io` is reserved for the hkinggames developer site and its AdMob compliance files.

## Deploying

```bash
npm run deploy
```

That builds to `dist/` and pushes it to the `gh-pages` branch via the `gh-pages` package. It is a **manual** step — pushing to `main` does not deploy on its own.

## Accessibility and rendering notes

- The boot animation is skipped entirely under `prefers-reduced-motion`.
- Wide content (the architecture SVG, the hint bar) scrolls inside its own container; the page body never scrolls horizontally.
- The `paper` theme is a light, high-contrast palette for anyone who'd rather not read green-on-black.
- There's a `<noscript>` block with the essentials for anyone without JavaScript.

## License

MIT.
