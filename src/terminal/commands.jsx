import { projects, findProject, CATEGORIES } from '../data/projects.js'
import { profile } from '../data/profile.js'
import { stackEntries } from '../data/site.js'
import { fortunes, manPages, train, teapot } from '../data/flavor.js'
import { ProjectDetail } from '../panels/ProjectPanels.jsx'
import { ProcessTable } from '../panels/ProcessTable.jsx'
import { ArcadePanel } from '../panels/Arcade.jsx'
import { StackPanel, UsesPanel, LogsPanel } from '../panels/SectionPanels.jsx'
import { ArchDiagram } from '../panels/ArchDiagram.jsx'
import { Panel, Out } from '../panels/Panel.jsx'
import {
  WorkPanel,
  EducationPanel,
  SkillsPanel,
  ContactPanel,
  NeofetchPanel,
  AboutPanel,
  HelpPanel,
} from '../panels/InfoPanels.jsx'

export const THEMES = ['matrix', 'amber', 'ice', 'paper']

/** Virtual filesystem backing `ls` and `cat`. Null-prototype so that
 *  `cat constructor` / `cat __proto__` cannot reach inherited Object keys. */
const FILES = Object.assign(Object.create(null), {
  'about.txt': 'about',
  'work.txt': 'work',
  'skills.txt': 'skills',
  'contact.txt': 'contact',
  'education.txt': 'edu',
  'architecture.svg': 'arch',
  'uses.txt': 'uses',
  'logs.txt': 'logs',
  'resume.pdf': 'resume',
})

function ResumePanel() {
  return (
    <Panel
      title="RESUME"
      sub="one page, kept current"
      links={[{ label: 'Download PDF', url: profile.resumePath }]}
    >
      <Out tone="plain">
        The PDF is generated from LaTeX — source lives at{' '}
        <a href="https://github.com/hamzahap/Resume" target="_blank" rel="noopener noreferrer">
          github.com/hamzahap/Resume
        </a>
        .
      </Out>
      <div style={{ marginTop: 'var(--sp-3)', display: 'flex', gap: 'var(--sp-2)', flexWrap: 'wrap' }}>
        <a className="btnlink" href={profile.resumePath} target="_blank" rel="noopener noreferrer">
          resume.pdf ↗
        </a>
        <a
          className="btnlink"
          href={profile.transcriptPath}
          target="_blank"
          rel="noopener noreferrer"
        >
          transcript.pdf ↗
        </a>
      </div>
    </Panel>
  )
}

function NotFound({ what, hint }) {
  return (
    <Out tone="err">
      {what}
      {hint && (
        <>
          {'\n'}
          <span className="faint">{hint}</span>
        </>
      )}
    </Out>
  )
}

export function buildRegistry() {
  const commands = [
    // ---------- start here ----------
    {
      name: 'help',
      group: 'Start here',
      desc: 'Everything this shell can do',
      run: () => <HelpPanel groups={groupedForHelp()} />,
    },
    {
      name: 'whoami',
      aliases: ['about'],
      group: 'Start here',
      desc: 'The short version',
      run: () => <AboutPanel />,
    },
    {
      name: 'neofetch',
      group: 'Start here',
      desc: 'System info, the way you expect it',
      run: () => <NeofetchPanel projectCount={projects.length} />,
    },

    // ---------- content ----------
    {
      name: 'ps',
      aliases: ['projects'],
      usage: 'ps [category]',
      group: 'The work',
      desc: `Everything I've built, as a process table. Categories: ${CATEGORIES.join(', ')}`,
      complete: (p) => CATEGORIES.filter((c) => c.startsWith(p)),
      run: (args, ctx) => {
        const filter = args[0]?.replace(/^--/, '')
        let list = projects
        let heading = 'ps aux --projects'
        if (filter) {
          if (!CATEGORIES.includes(filter)) {
            return (
              <NotFound
                what={`ps: unknown category '${filter}'`}
                hint={`Try one of: ${CATEGORIES.join(', ')}`}
              />
            )
          }
          list = projects.filter((p) => p.category === filter)
          heading = `ps aux --projects --category=${filter}`
        }
        return <ProcessTable projects={list} heading={heading} onOpen={ctx.openProject} />
      },
    },
    {
      name: 'open',
      usage: 'open <project>',
      group: 'The work',
      desc: 'Full breakdown of one project',
      complete: (p) => projects.map((x) => x.slug).filter((s) => s.startsWith(p)),
      run: (args) => {
        if (!args[0]) {
          return (
            <NotFound
              what="open: needs a project name"
              hint="Run `projects` to see what's available, then `open <name>`."
            />
          )
        }
        const p = findProject(args.join(' '))
        if (!p) {
          return (
            <NotFound
              what={`open: no project matching '${args.join(' ')}'`}
              hint="Run `projects` for the full list."
            />
          )
        }
        return <ProjectDetail project={p} />
      },
    },
    {
      name: 'work',
      aliases: ['experience', 'xp'],
      group: 'The work',
      desc: 'Where I have worked and what I shipped',
      run: () => <WorkPanel />,
    },
    {
      name: 'games',
      group: 'The work',
      desc: 'Games I have shipped, published under hkinggames',
      run: (_args, ctx) => (
        <ProcessTable
          projects={projects.filter((p) => p.category === 'games')}
          heading="ps aux --projects --category=games"
          onOpen={ctx.openProject}
        />
      ),
    },
    {
      name: 'arcade',
      aliases: ['play'],
      group: 'The work',
      desc: 'Playable things, including one that makes no sense',
      run: () => <ArcadePanel />,
    },
    {
      name: 'stack',
      usage: 'stack [topic]',
      group: 'The work',
      desc: 'Long-form writeups on how these systems actually work',
      complete: (p) => stackEntries.map((e) => e.slug).filter((s) => s.startsWith(p)),
      run: (args) => <StackPanel slug={args[0]} />,
    },
    {
      name: 'uses',
      group: 'The work',
      desc: 'Machine, editors, and what I run day to day',
      run: () => <UsesPanel />,
    },
    {
      name: 'logs',
      aliases: ['blog', 'notes'],
      group: 'The work',
      desc: 'Dated notes, newest first',
      run: () => <LogsPanel />,
    },
    {
      name: 'arch',
      group: 'The work',
      desc: 'Architecture of the rugby platform I maintain',
      run: () => <ArchDiagram />,
    },
    {
      name: 'skills',
      group: 'The work',
      desc: 'Languages, frameworks, and tools',
      run: () => <SkillsPanel />,
    },
    {
      name: 'edu',
      aliases: ['education', 'certs'],
      group: 'The work',
      desc: 'Degree and certifications',
      run: () => <EducationPanel />,
    },
    {
      name: 'resume',
      aliases: ['cv'],
      group: 'The work',
      desc: 'Download the PDF',
      run: () => <ResumePanel />,
    },
    {
      name: 'contact',
      aliases: ['email', 'hire'],
      group: 'The work',
      desc: 'How to reach me',
      run: () => <ContactPanel />,
    },

    // ---------- filesystem ----------
    {
      name: 'ls',
      usage: 'ls [dir]',
      group: 'Filesystem',
      desc: 'List files. Try `ls projects`',
      complete: (p) => ['projects'].filter((s) => s.startsWith(p)),
      run: (args, ctx) => {
        if (args[0]?.replace(/\/$/, '') === 'projects') {
          return (
            <div className="lsgrid">
              {projects.map((p) => (
                <button
                  key={p.slug}
                  type="button"
                  className="lsgrid__item"
                  onClick={() => ctx.openProject(p.slug)}
                >
                  {p.slug}
                </button>
              ))}
            </div>
          )
        }
        if (args[0]) {
          return <NotFound what={`ls: cannot access '${args[0]}': No such directory`} />
        }
        return (
          <div className="lsgrid">
            <button
              type="button"
              className="lsgrid__item lsgrid__item--dir"
              onClick={() => ctx.runCommand('ls projects')}
            >
              projects/
            </button>
            {Object.keys(FILES).map((f) => (
              <button
                key={f}
                type="button"
                className="lsgrid__item"
                onClick={() => ctx.runCommand(`cat ${f}`)}
              >
                {f}
              </button>
            ))}
          </div>
        )
      },
    },
    {
      name: 'cat',
      usage: 'cat <file>',
      group: 'Filesystem',
      desc: 'Read a file',
      complete: (p) => Object.keys(FILES).filter((f) => f.startsWith(p)),
      run: (args, ctx) => {
        const f = args[0]
        if (!f) return <NotFound what="cat: missing operand" hint="Run `ls` to see files." />
        if (FILES[f]) return ctx.dispatch(FILES[f])
        // Exact match only. findProject's fuzzy fallbacks are right for `open`,
        // where the user named a project, but here they would turn `cat x` into
        // a silent wrong page and make "no such file" unreachable.
        const stripped = f.replace(/\.(txt|md)$/, '').toLowerCase()
        const p = projects.find(
          (x) => x.slug === stripped || x.name.toLowerCase() === stripped
        )
        if (p) return <ProjectDetail project={p} />
        return <NotFound what={`cat: ${f}: No such file or directory`} hint="Run `ls` to see files." />
      },
    },

    // ---------- shell ----------
    {
      name: 'theme',
      usage: 'theme [name]',
      group: 'Shell',
      desc: `Switch palette: ${THEMES.join(' · ')}`,
      complete: (p) => THEMES.filter((t) => t.startsWith(p)),
      run: (args, ctx) => {
        if (!args[0]) {
          return (
            <Out>
              <span className="faint">current: </span>
              <span className="accent">{ctx.theme}</span>
              {'\n'}
              <span className="faint">available: </span>
              {THEMES.join(', ')}
            </Out>
          )
        }
        if (!THEMES.includes(args[0])) {
          return (
            <NotFound
              what={`theme: '${args[0]}' is not a theme`}
              hint={`Available: ${THEMES.join(', ')}`}
            />
          )
        }
        ctx.setTheme(args[0])
        return (
          <Out>
            theme set to <span className="accent">{args[0]}</span>
          </Out>
        )
      },
    },
    {
      name: 'clear',
      aliases: ['cls'],
      group: 'Shell',
      desc: 'Clear the screen',
      run: (_a, ctx) => {
        ctx.clear()
        return null
      },
    },
    {
      name: 'history',
      group: 'Shell',
      desc: 'Commands you have run',
      run: (_a, ctx) => {
        if (!ctx.history.length) return <Out>No history yet.</Out>
        return (
          <Out>
            {ctx.history.map((h, i) => `${String(i + 1).padStart(3)}  ${h}`).join('\n')}
          </Out>
        )
      },
    },
    {
      name: 'echo',
      usage: 'echo <text>',
      group: 'Shell',
      desc: 'Say something back',
      run: (args) => <Out tone="plain">{args.join(' ')}</Out>,
    },

    // ---------- hidden ----------
    {
      name: 'man',
      usage: 'man <command>',
      group: 'Shell',
      desc: 'Read the manual for a command',
      complete: (p) => Object.keys(manPages).filter((m) => m.startsWith(p)),
      run: (args) => {
        if (!args[0]) return <NotFound what="What manual page do you want?" hint="Try `man ps`." />
        const key = args[0].toLowerCase()
        if (key === 'man') {
          return (
            <Out tone="plain">
              {manPages.man}
              {'\n\n'}
              <span className="faint">You did it anyway. Respect.</span>
            </Out>
          )
        }
        if (!manPages[key]) {
          return (
            <NotFound
              what={`No manual entry for ${args[0]}`}
              hint={`Documented: ${Object.keys(manPages).join(', ')}`}
            />
          )
        }
        return (
          <Panel title={`MAN — ${key.toUpperCase()}`} sub="manual page">
            <Out tone="plain">{manPages[key]}</Out>
          </Panel>
        )
      },
    },
    {
      name: 'fortune',
      group: 'Shell',
      desc: 'An opinion, formed the expensive way',
      run: () => (
        <Out tone="plain">
          {fortunes[Math.floor(Math.random() * fortunes.length)]}
        </Out>
      ),
    },
    {
      name: 'uptime',
      hidden: true,
      run: () => (
        <Out tone="plain">
          {' up 5 years, 2 jobs, 1 continent change'}
          {'\n'}
          <span className="faint"> load average: 0.94, 0.61, 0.15</span>
        </Out>
      ),
    },
    {
      name: 'sl',
      hidden: true,
      run: () => (
        <Out>
          <span className="accent">{train}</span>
          {'\n'}
          <span className="faint">You typed `sl`. You meant `ls`. This is your punishment.</span>
        </Out>
      ),
    },
    {
      name: 'coffee',
      aliases: ['tea', 'brew'],
      hidden: true,
      run: () => (
        <Out>
          <span className="accent">{teapot}</span>
          {'\n'}
          <span className="warn">418 I&apos;m a teapot.</span>
          <span className="faint"> The request was well-formed but I am, regrettably, a teapot.</span>
        </Out>
      ),
    },
    {
      name: 'kill',
      usage: 'kill <pid>',
      hidden: true,
      complete: (p) => projects.map((x) => String(x.pid)).filter((s) => s.startsWith(p)),
      run: (args) => {
        const pid = Number(args[0])
        const p = projects.find((x) => x.pid === pid)
        if (!args[0]) return <NotFound what="kill: usage: kill <pid>" hint="Run `ps` for the list." />
        if (!p) return <NotFound what={`kill: (${args[0]}) - No such process`} />
        if (p.stat === 'Z') {
          return (
            <Out tone="err">
              {`kill: (${pid}) - ${p.slug} is already a zombie.`}
              {'\n'}
              <span className="faint">You cannot kill what is already dead. That is the joke.</span>
            </Out>
          )
        }
        if (p.pid === 1) {
          return (
            <Out tone="err">
              {'kill: (1) - Operation not permitted'}
              {'\n'}
              <span className="faint">That one pays the bills.</span>
            </Out>
          )
        }
        return (
          <Out>
            {`kill: (${pid}) - signal sent to ${p.slug}`}
            {'\n'}
            <span className="faint">
              It ignored it. Everything here is unkillable; it is a portfolio.
            </span>
          </Out>
        )
      },
    },
    {
      name: 'sudo',
      hidden: true,
      run: (args) => (
        <Out tone="err">
          {`hamzah is not in the sudoers file. This incident has been reported.`}
          {'\n'}
          <span className="faint">
            (it has not been reported. {args[0] ? `also, no, you may not ${args.join(' ')}.` : ''})
          </span>
        </Out>
      ),
    },
    {
      name: 'rm',
      hidden: true,
      run: () => (
        <Out tone="err">
          rm: this is a portfolio, not a filesystem. Nice try though.
        </Out>
      ),
    },
    {
      name: 'vim',
      aliases: ['vi', 'nano', 'emacs'],
      hidden: true,
      run: () => (
        <Out>
          You are already trapped in someone else&apos;s text editor. Type{' '}
          <span className="accent">help</span> to escape.
        </Out>
      ),
    },
    {
      name: 'exit',
      aliases: ['quit', 'logout'],
      hidden: true,
      run: () => (
        <Out>
          There is no exit. There is only <span className="accent">contact</span>.
        </Out>
      ),
    },
    {
      name: 'pwd',
      hidden: true,
      run: () => <Out tone="plain">/home/hamzah</Out>,
    },
    {
      name: 'date',
      hidden: true,
      run: () => <Out tone="plain">{new Date().toString()}</Out>,
    },
  ]

  // index by name + alias for O(1) lookup
  const byName = new Map()
  for (const c of commands) {
    byName.set(c.name, c)
    for (const a of c.aliases ?? []) byName.set(a, c)
  }

  function groupedForHelp() {
    const order = ['Start here', 'The work', 'Filesystem', 'Shell']
    return order.map((label) => ({
      label,
      commands: commands.filter((c) => c.group === label && !c.hidden),
    }))
  }

  const completions = [...byName.keys()].sort()

  return { commands, byName, completions }
}
