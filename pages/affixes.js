import Layout from '../components/Layout'
import affixData from '../public/data/affixes.json'

export async function getStaticProps() { return { props: {} } }

const SLOTS = { weapon:'武器', helm:'头盔', chest:'胸甲', shoulder:'护肩', necklace:'项链', gloves:'手套', belt:'腰带', legs:'护腿', boots:'靴子', ring:'戒指' }

export default function AffixesPage() {
  const affixes = affixData.affixes || {}
  const slotAffixes = affixData.slotAffixes || {}
  const affixList = Object.values(affixes)

  return (
    <Layout title="词条计算器 - 桌面破坏神">
      <div className="page-header"><h1>✨ 词条计算器</h1></div>
      <div className="page-wrap" style={{maxWidth:1200}}>
        <h2 style={{color:'var(--gold)',marginBottom:'1rem'}}>已选属性</h2>
        <div className="items-grid" style={{gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))'}}>
          {affixList.map(a => (
            <div key={a.id} className="item-card">
              <div className="item-name">{a.name}</div>
              <div className="item-meta">{a.type === 'flat' ? `+${a.min}~${a.max} ${a.unit}` : `+${a.min}%~${a.max}%`}</div>
              <div className="item-en" style={{fontSize:'0.75rem'}}>{a.desc?.replace('{value}', a.min + '~' + a.max)}</div>
            </div>
          ))}
        </div>
        <h2 style={{color:'var(--gold)',marginBottom:'1rem',marginTop:'2rem'}}>各部位词条池</h2>
        {Object.entries(slotAffixes).map(([slot, pool]) => (
          <div key={slot} style={{marginBottom:'1rem'}}>
            <h3 style={{color:'var(--muted)',fontSize:'0.85rem',marginBottom:'0.3rem'}}>{SLOTS[slot] || slot}</h3>
            <div className="filter-chips">
              {(pool.prefix || []).slice(0,20).map(a => (
                <span key={a} className="chip active">{affixes[a]?.name || a}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}
