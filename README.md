# hapunjabi — personal site

My personal site, at **https://hamzahap.dev**. Two pages over the same data:

- **`/`** — the homepage. One screen, editorial: a cover on the left, and a page on the right that the contents list switches between the things I make, the day job, two pocket games, writing, and the longer version of me.
- **`/terminal/`** — the original site. It boots as a shell, and the commands render real interactive panels rather than dumping text.

```console
$ help          # every command
$ whoami        # the short version
$ ps            # everything I've built, as a process table
$ open block-arena
$ arch          # architecture of the rugby platform I maintain
$ catan seafarers fog 6 strategy   # seeded Catan board generator, all Seafarers scenarios
$ theme amber   # matrix · amber · ice · paper
$ cd /          # back to the homepage
```

Tab completes. `↑`/`↓` walks history. `Ctrl+L` clears. Anything after the `#` in the URL runs as a command on load, so <https://hamzahap.dev/terminal/#open/breakline> deep-links straight to a project. The homepage uses hashes too (`/#play`, `/#make/edgebloom`, `/#writing/majlis`, `/#play/catan`), so every section can be linked and the back button works. Projects, essays and the full Catan generator open inside the homepage; it never hands you over to the terminal for the rest.

## Why it's built this way

A terminal is a genuinely good navigation model for a portfolio: it's fast, it's keyboard-first, and it rewards poking around. The trick is that it can't only be a gimmick — so commands here return React nodes, not strings. `arch` renders an SVG diagram. `ps` renders a sortable process table. `ls` renders a real directory listing whose entries run commands when you click them.

Clicking and typing go through the same path — a row's `onClick` calls `runCommand('open <slug>')` — so mouse users and keyboard users see identical history.

Not everyone wants a shell, though, which is what the homepage is for. It reads the same `src/data/` files, so the two can't drift apart on the facts.

## Stack

React 18 + Vite, as a two-page build. No UI framework, no CSS library, no state manager. React is split into its own chunk that both pages share; the homepage's own code is about 15 kB gzipped, and the Catan generator loads only when someone opens it.

## Layout

```
index.html           homepage entry
terminal/index.html  terminal entry
src/
  home/              homepage: layout and routing, sections, pocket games, pixel sprites
  terminal/
    Terminal.jsx     shell: input, history, tab completion, boot sequence
    commands.jsx     command registry — name, aliases, completions, run()
  panels/            what commands render (project cards, timelines, SVG diagram)
  catan/             the board generator behind `catan` and the homepage's /#play/catan
  data/              projects, work history, skills, profile, homepage copy
  styles/            terminal design system + four themes as CSS custom properties
public/              copied as-is: résumé, share images, 404 page, _headers
wrangler.jsonc       Cloudflare config for hamzahap.dev
deploy/              www redirect Worker, and the page that redirects the old GitHub Pages URL
```

Adding a command means adding one object to the registry in `commands.jsx`. It gets tab completion and `help` listing for free.

Dated things live in `src/data/releases.js`. A release flips from "out Nov 6" to "out now" on its own when the date passes, so launch day doesn't need a deploy.

## Local development

```bash
npm install
npm run dev
```

Then open http://localhost:5173/ for the homepage and http://localhost:5173/terminal/ for the shell.

To check the production build the way Cloudflare will serve it (trailing-slash redirects, the 404 page, `_headers`), run it through Wrangler locally. It builds first:

```bash
npx wrangler dev
```

## Deploying

Hosted on Cloudflare as static assets, no server code. **Every push to `main` deploys.** Cloudflare's Workers Builds watches the repo, installs, and runs `npx wrangler deploy`, which builds to `dist/` first (`build.command` in `wrangler.jsonc`) and uploads the result. Build logs are on the `hamzahap-dev` Worker's page in the Cloudflare dashboard.

To deploy from your own machine instead, log in once with `npx wrangler login`, then:

```bash
npm run deploy
```

Two one-time extras, both already done:

- `npm run deploy:www` deploys a tiny Worker that sends `www.hamzahap.dev` to `hamzahap.dev`.
- `npm run deploy:old-url` replaces the old GitHub Pages site at `hamzahap.github.io/hapunjabi/` with a redirect to hamzahap.dev that keeps deep links working (`#open/breakline` lands on `/terminal/#open/breakline`). Run it only once hamzahap.dev is live. The root of `hamzahap.github.io` is the hkinggames developer site and is not touched.

## Accessibility and rendering notes

- The homepage's animations, and the terminal's boot sequence, are skipped under `prefers-reduced-motion`.
- On a phone, picking a section from the homepage's contents scrolls to it, and opening a project moves focus to its heading.
- Wide content in the terminal (the architecture SVG, the hint bar) scrolls inside its own container; neither page scrolls horizontally.
- The terminal's `paper` theme is a light, high-contrast palette for anyone who'd rather not read green-on-black.
- Both pages have a `<noscript>` block with the essentials for anyone without JavaScript.

## License

MIT.
