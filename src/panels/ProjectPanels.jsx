import { Panel, Tags, Section, Bullets } from './Panel.jsx'

const CATEGORY_LABEL = {
  'ai-tooling': 'AI tooling',
  games: 'Games',
  professional: 'Professional',
  data: 'Data / ML',
  tools: 'Tools',
  academic: 'Academic',
}

/** Full detail view for one project. Reached from `open`, `cat`, or a ps row. */
export function ProjectDetail({ project }) {
  const p = project
  return (
    <Panel
      title={p.name}
      sub={`${CATEGORY_LABEL[p.category] ?? p.category} · ${p.year}${p.status ? ` · ${p.status}` : ''}`}
      links={p.links}
    >
      <p className="detail__lede">{p.description}</p>

      {p.highlights?.length > 0 && (
        <Section label="What's interesting">
          <Bullets items={p.highlights} />
        </Section>
      )}

      <Section label="Built with">
        <Tags items={p.tech} accent />
      </Section>
    </Panel>
  )
}
