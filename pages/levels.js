import Layout from '../components/Layout'
import levelsData from '../public/data/levels.json'
import worldData from '../public/data/world_regions.json'

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

        <h2 style={{margin:'2.5rem 0 1rem', fontSize:'1.35rem'}}>分区域关卡明细</h2>
        <p style={{color:'var(--muted)', fontSize:'0.85rem', marginBottom:'1rem'}}>
          11 个区域共 70 张关卡。噩梦与炼狱难度下所有地图敌人均为 70 级。
        </p>

        {worldData.map((rg, i) => (
          <div key={i} className="item-card" style={{marginBottom:'0.9rem'}}>
            <div className="item-header">
              <div className="item-icon">🗺️</div>
              <div>
                <div className="item-name">{rg.name}</div>
                <div className="item-en">{rg.levelCount} 个关卡 · 敌人等级 {rg.levelFrom}–{rg.levelTo}</div>
              </div>
            </div>
            <div style={{marginTop:'0.5rem'}}>
              {rg.levels.map(lv => (
                <div key={lv.index} style={{
                  display:'grid',
                  gridTemplateColumns:'1.6fr 1fr 0.8fr 1fr',
                  gap:'0.5rem',
                  alignItems:'center',
                  padding:'0.4rem 0',
                  borderTop:'1px solid var(--border)',
                  fontSize:'0.8rem'
                }}>
                  <span>{lv.name}{lv.boss ? ' 👑' : ''}</span>
                  <span style={{color:'var(--muted)'}}>Lv.{lv.levelFrom}–{lv.levelTo}</span>
                  <span style={{color:'var(--muted)'}}>{lv.waves} 波</span>
                  <span style={{color: lv.eliteChance ? '#c9a55b' : 'var(--muted)'}}>
                    {lv.eliteChance ? `精英 ${lv.eliteChance}%` : '—'}
                  </span>
                </div>
              ))}
            </div>
            {rg.levels.some(l => l.encounters.length > 0) && (
              <div style={{color:'var(--muted)', fontSize:'0.72rem', marginTop:'0.5rem'}}>
                👹 {[...new Set(rg.levels.flatMap(l => l.encounters.map(e => e.name)))].join(' / ')}
              </div>
            )}
          </div>
        ))}
      </div>
    </Layout>
  )
}
