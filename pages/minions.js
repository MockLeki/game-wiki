import Layout from '../components/Layout'
import minionData from '../public/data/minions.json'

export async function getStaticProps() { return { props: {} } }

const Q_NAMES = { common: '普通', uncommon: '非凡', rare: '稀有', legendary: '传说', divine: '神圣' }

export default function MinionsPage() {
  const companions = minionData.companions || []
  return (
    <Layout title="仆从大全 - 桌面破坏神">
      <div className="page-header"><h1>🐺 仆从大全</h1></div>
      <div className="page-wrap" style={{maxWidth:1200}}>
        <p style={{color:'var(--muted)',textAlign:'center',marginBottom:'1.5rem'}}>共 {companions.length} 只可捕获仆从</p>
        <div className="items-grid" style={{gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))'}}>
          {companions.map(c => (
            <div key={c.id} className={`item-card`} style={{borderLeft: `3px solid var(--l-${c.quality})`}}>
              <div className="item-header">
                <div className="item-icon">{'🐺🐴👹🧝💀🐉⛰️'.charAt(Math.floor(Math.random()*8))}</div>
                <div>
                  <div className="item-name">{c.name}</div>
                  <div className="item-en">{c.nameEn}</div>
                </div>
              </div>
              <div className="item-meta">
                <span className={`quality q-${c.quality}`}>{c.qualityName}</span>
                <span>{c.speciesName}</span>
                {c.location && <span>📍 {c.location}</span>}
              </div>
              {c.passives?.length > 0 && c.passives.map((p, i) => (
                <div key={i} className="item-effect" style={{fontSize:'0.78rem'}}>📋 {p.name}: {p.desc?.slice(0,80)}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
