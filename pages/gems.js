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
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: '0.7rem', padding: '1rem' }}>
                {typeGems.map(g => {
                  const c = g.color || '#c9a227'
                  return (
                    <div key={g.id} className="item-card" style={{ borderLeft: `3px solid ${c}`, textAlign: 'center' }}>
                      {/* 宝石菱形图标 */}
                      <div style={{
                        width: 56, height: 56, margin: '0 auto 0.6rem',
                        background: `linear-gradient(135deg, ${c} 0%, #1a1a1a 140%)`,
                        clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                        boxShadow: `0 0 12px ${c}88, inset 0 0 8px rgba(255,255,255,0.25)`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <span style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 700, textShadow: '0 0 4px #000' }}>T{g.tier}</span>
                      </div>
                      <div style={{ color: '#8a8a8a', fontSize: '0.68rem', letterSpacing: '0.08em' }}>{TIER_NAMES[g.tier - 1]} · {TIER_SHAPES[g.tier - 1]}</div>
                      <div className="item-name" style={{ fontSize: '0.92rem', marginTop: '0.2rem' }}>{g.name}</div>
                      <div style={{ color: 'var(--muted)', fontSize: '0.7rem', marginTop: '0.15rem' }}>{g.nameEn}</div>
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
