import Layout from '../components/Layout'
import { useState } from 'react'
import gemsData from '../public/data/gems.json'

export async function getStaticProps() { return { props: {} } }

const TIER_NAMES = ['粗糙', '碎裂', '粗砺', '抛光', '无瑕', '璀璨']
const TIER_SHAPES = ['球', '泪滴', '方块', '菱形', '六边形', '八边形']

export default function GemsPage() {
  const [filter, setFilter] = useState('all') // all | 类型

  const gemTypes = gemsData.gemTypes || {}
  const gems = gemsData.gems || []

  // 按类型分组
  const groups = {}
  for (const g of gems) {
    if (!groups[g.type]) groups[g.type] = []
    groups[g.type].push(g)
  }

  const filteredGroups = filter === 'all'
    ? Object.keys(gemTypes)
    : [filter]

  return (
    <Layout title="宝石图鉴 - 桌面破坏神">
      <div className="page-wrap">
        <div className="hero-card" style={{ padding: '1.5rem' }}>
          <h1 className="hero-title" style={{ fontSize: '2.2rem', textAlign: 'left' }}>宝石图鉴</h1>
          <p className="hero-subtitle" style={{ textAlign: 'left', margin: 0 }}>
            6 种宝石 × 6 个等级，共 36 颗。宝石可用于镶嵌强化装备。
          </p>
        </div>

        {/* 类型筛选 */}
        <div className="chip-group" style={{ marginBottom: '1rem' }}>
          <span className={`chip ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>全部</span>
          {Object.entries(gemTypes).map(([k, v]) => (
            <span key={k} className={`chip ${filter === k ? 'active' : ''}`} onClick={() => setFilter(k)} style={{ borderColor: '#c9a227' }}>
              {v}
            </span>
          ))}
        </div>

        {filteredGroups.map(type => {
          const typeGems = (groups[type] || []).sort((a, b) => a.tier - b.tier)
          if (!typeGems.length) return null
          return (
            <div key={type} className="panel" style={{ marginBottom: '1.2rem' }}>
              <div className="panel-title">
                <span style={{ marginRight: '0.5rem' }}>◆</span>
                {gemTypes[type]}
                <span style={{ fontSize: '0.75rem', opacity: 0.6, marginLeft: '0.6rem' }}>{type}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: '0.7rem', padding: '1rem' }}>
                {typeGems.map(g => {
                  const c = g.color || '#c9a227'
                  return (
                    <div key={g.id} className="item-card" style={{ borderLeft: `3px solid ${c}`, textAlign: 'left' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                        {/* 游戏内实拍宝石图标 + 等级角标 */}
                        <div style={{ position: 'relative', width: 48, height: 48, flexShrink: 0 }}>
                          {g.icon ? (
                            <img src={g.icon} alt={g.name} style={{ width: 48, height: 48, objectFit: 'contain', filter: 'drop-shadow(0 0 6px rgba(0,0,0,0.7))' }} />
                          ) : (
                            <div style={{
                              width: 48, height: 48,
                              background: `linear-gradient(135deg, ${c} 0%, #1a1a1a 140%)`,
                              clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                              boxShadow: `0 0 12px ${c}88, inset 0 0 8px rgba(255,255,255,0.25)`,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                              <span style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 700, textShadow: '0 0 4px #000' }}>T{g.tier}</span>
                            </div>
                          )}
                          <span style={{
                            position: 'absolute', right: -4, bottom: -4,
                            background: '#0a0605', border: `1px solid ${c}`,
                            color: c, fontSize: '0.58rem', fontWeight: 700,
                            padding: '0 0.25rem', lineHeight: 1.4,
                          }}>T{g.tier}</span>
                        </div>
                        <div>
                          <div style={{ color: '#8a8a8a', fontSize: '0.66rem', letterSpacing: '0.08em' }}>{TIER_NAMES[g.tier - 1]} · {TIER_SHAPES[g.tier - 1]}</div>
                          <div className="item-name" style={{ fontSize: '0.9rem' }}>{g.name}</div>
                          <div style={{ color: 'var(--muted)', fontSize: '0.66rem' }}>{g.nameEn}</div>
                        </div>
                      </div>
                      {/* 三套加成 */}
                      {g.armorBonus?.length > 0 && (
                        <div style={{ fontSize: '0.75rem', color: 'var(--text)', padding: '0.25rem 0' }}>
                          <span style={{ color: 'var(--muted)' }}>防具：</span>
                          {g.armorBonus.map(b => b.text).join('、')}
                        </div>
                      )}
                      {g.accessoryBonus?.length > 0 && (
                        <div style={{ fontSize: '0.75rem', color: 'var(--text)', padding: '0.25rem 0' }}>
                          <span style={{ color: 'var(--muted)' }}>首饰：</span>
                          {g.accessoryBonus.map(b => b.text).join('、')}
                        </div>
                      )}
                      {g.weaponBonus?.length > 0 && (
                        <div style={{ fontSize: '0.75rem', color: 'var(--text)', padding: '0.25rem 0' }}>
                          <span style={{ color: 'var(--muted)' }}>武器：</span>
                          {g.weaponBonus.map(b => b.text).join('、')}
                        </div>
                      )}
                      <div style={{ marginTop: '0.4rem', paddingTop: '0.4rem', borderTop: '1px solid var(--border)', fontSize: '0.7rem', color: 'var(--muted)', display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--gold)' }}>💰 {g.sellPrice?.toLocaleString()}</span>
                        <span>Lv.{g.minDropLevel}{g.maxDropLevel && g.maxDropLevel > g.minDropLevel ? `-${g.maxDropLevel}` : '+'}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}
