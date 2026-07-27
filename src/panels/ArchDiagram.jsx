import { Panel, Out } from './Panel.jsx'

function Box({ x, y, w = 200, h = 54, title, sub, accent = false }) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="4"
        className={accent ? 'arch-box arch-box--accent' : 'arch-box'}
      />
      <text x={x + w / 2} y={y + (sub ? 22 : 31)} textAnchor="middle" className="arch-title" fontSize="12">
        {title}
      </text>
      {sub && (
        <text x={x + w / 2} y={y + 38} textAnchor="middle" className="arch-label">
          {sub}
        </text>
      )}
    </g>
  )
}

/**
 * The All Things Rugby data path, drawn the way I'd draw it on a whiteboard.
 * Deliberately simplified — it shows where the two AI services sit relative
 * to the ingest pipeline, which is the part people always ask about.
 */
export function ArchDiagram() {
  return (
    <Panel title="ATR DATA PATH" sub="how a scoreline gets from a provider to a phone">
      <div className="arch">
        <svg viewBox="0 0 700 470" role="img" aria-label="All Things Rugby architecture diagram">
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
            </marker>
          </defs>

          <g className="arch-line" markerEnd="url(#arrow)" strokeWidth="1.5">
            <line x1="350" y1="70" x2="350" y2="92" />
            <line x1="350" y1="150" x2="350" y2="172" />
            <line x1="350" y1="230" x2="350" y2="252" />
          </g>

          <Box x={250} y={16} title="Provider APIs" sub="multiple third-party feeds" />
          <Box x={250} y={96} title="Feed checks" sub="shape + match-state validation" accent />
          <Box x={250} y={176} title="Store + Cache" sub="SQL · in-memory aggregation" />
          <Box x={250} y={256} title="REST API" sub=".NET · concurrency-safe refresh" />

          {/* side services feeding the API layer */}
          <Box x={20} y={256} w={190} h={54} title="CRM / Admin" sub="role-based overrides" />
          <Box x={490} y={256} w={190} h={54} title="OpenClaw" sub="briefs + weekend alerts" accent />

          <g className="arch-line" markerEnd="url(#arrow)" strokeWidth="1.5">
            <line x1="210" y1="283" x2="248" y2="283" />
            <line x1="490" y1="283" x2="452" y2="283" />
          </g>

          {/* fan out to clients */}
          <g className="arch-line" markerEnd="url(#arrow)" strokeWidth="1.5">
            <path d="M 350 310 L 350 340 L 175 340 L 175 380" />
            <path d="M 350 310 L 350 340 L 525 340 L 525 380" />
          </g>

          <Box x={90} y={384} w={170} title="Next.js Web" sub="allthingsrugby.com" />
          <Box x={440} y={384} w={170} title="Flutter App" sub="The Rugby App · 50k+" />
        </svg>
      </div>
      <Out>
        <span className="faint">
          Feed checks sit deliberately upstream of the cache — bad provider data gets caught before
          it can be aggregated and served, not after someone reports a wrong scoreline. OpenClaw, an
          open-source assistant I run rather than wrote, handles the daily brief and raises the
          weekend alerts.
        </span>
      </Out>
    </Panel>
  )
}
