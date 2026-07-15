import Layout from '../components/Layout'
import levelsData from '../public/data/levels.json'

export async function getStaticProps() { return { props: {} } }

const DIFFICULTY_COLORS = { '安全': '#4caf50', '简单': '#4caf50', '普通': '#2196f3', '困难': '#ff9800', '极难': '#f44336', '地狱': '#c9a55b' }

export default function LevelsPage() {
  const levels = levelsData || []
  return (
    <Layout title="关卡大全 - 桌面破坏神">
      <div className="page-header"><h1>🗺️ 关卡大全</h1></div>
      <div className="page-wrap" style={{maxWidth:1000}}>
        <div className="items-grid" style={{gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))'}}>
          {levels.map((l, i) => (
            <div key={i} className="item-card" style={{borderLeft: `3px solid ${DIFFICULTY_COLORS[l.difficulty] || 'var(--border)'}`}}>
              <div className="item-header">
                <div className="item-icon">🗺️</div>
                <div>
                  <div className="item-name">{l.name}</div>
                  <div className="item-en">{l.nameEn}</div>
                </div>
              </div>
              <div className="item-meta">
                <span>📍 {l.area}</span>
                <span style={{color: DIFFICULTY_COLORS[l.difficulty]}}>{l.difficulty}</span>
              </div>
              {l.boss && <div className="item-effect">👑 Boss: {l.boss}</div>}
              {l.drops?.length > 0 && <div className="item-effect" style={{fontSize:'0.75rem'}}>📦 掉落: {l.drops.join(' / ')}</div>}
              {l.enemies?.length > 0 && <div style={{color:'var(--muted)',fontSize:'0.75rem',marginTop:'0.3rem'}}>👹 怪物: {l.enemies.join(', ')}</div>}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
