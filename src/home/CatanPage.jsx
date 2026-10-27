import { CatanGenerator, parseCatanArgs } from '../panels/CatanPanel.jsx'

/**
 * The full Catan generator, in the page column: the same component as the
 * terminal's `catan`, dressed in home.css. Home.jsx loads this file only when
 * #play/catan opens, so the homepage doesn't carry every Seafarers layout on
 * first load. A shared board arrives as #play/catan/seafarers/4/strategy/k3x9pq.
 */
export default function CatanPage({ args }) {
  return (
    <article className="hc v-in">
      <header className="ar-head">
        <p className="e-meta">Tool · seeded, shareable</p>
        <h3 className="ar-title">Catan board generator</h3>
        <p className="ar-dek">
          The base game, all nine Seafarers scenarios, Cities &amp; Knights and Traders &amp;
          Barbarians, for 3 to 6 players. Pick how fair the board should be, and send the link to
          the table.
        </p>
      </header>
      <CatanGenerator
        initial={parseCatanArgs(args)}
        linkBase={`${window.location.origin}/#play/catan/`}
      />
    </article>
  )
}
