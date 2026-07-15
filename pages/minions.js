import Layout from '../components/Layout'
import { useState, useMemo } from 'react'
import minionData from '../public/data/minions.json'

export async function getStaticProps() { return { props: {} } }

const QUALITIES = [
  { key: 'all', name: '全部', class: 'chip-common' },
  { key: 'common', name: '普通', class: 'chip-common' },
  { key: 'uncommon', name: '非凡', class: 'chip-uncommon' },
  { key: 'rare', name: '稀有', class: 'chip-rare' },
  { key: 'excellent', name: '优秀', class: 'chip-excellent' },
  { key: 'legendary', name: '传说', class: 'chip-legendary' },
]
const Q_NAMES = { common: '普通', uncommon: '非凡', rare: '稀有', excellent: '优秀', legendary: '传说' }
const SPECIES_ICON = {
  兽类: '/images/minions/wolf_icon.png',
  人类: '/images/minions/werewolf_icon.png',
  精灵: '/images/minions/dragon_firebreath.png',
  死灵: '/images/minions/zombie_wolf.png',
  龙类: '/images/minions/gray_63_dragon.png',
  自然: '/images/minions/forest_spider_king_icon.png',
  元素: '/images/minions/gray_63_dragon.png',
}
function getMinionIcon(m) {
  if (m.name?.includes('黑龙') || m.name?.includes('Dragon')) return '/images/minions/gray_63_dragon.png'
  if (m.name?.includes('狼人') || m.name?.includes('Werewolf')) return '/images/minions/werewolf_icon.png'
  if (m.name?.includes('蜘蛛') || m.name?.includes('Spider')) return '/images/minions/spider_icon.png'
  if (m.name?.includes('狼') || m.name?.includes('Wolf')) return '/images/minions/wolf_icon.png'
  return SPECIES_ICON[m.speciesName] || '/images/minions/wolf_icon.png'
}

const SPECIES = { 兽类: '🐺', 人类: '👹', 精灵: '🧝', 死灵: '💀', 龙类: '🐉', 自然: '⛰️', 元素: '✨' }

export default function MinionsPage() {
  const companions = minionData.companions || []
  const [search, setSearch] = useState('')
  const [quality, setQuality] = useState('all')
  const [species, setSpecies] = useState('all')

  const filtered = useMemo(() => {
    return companions.filter(m => {
      if (quality !== 'all' && m.quality !== quality) return false
      if (species !== 'all' && m.speciesName !== species) return false
      if (search && !m.name.includes(search) && !m.nameEn?.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
  }, [companions, quality, species, search])

  const allSpecies = useMemo(() => {
    return [...new Set(companions.map(m => m.speciesName).filter(Boolean))]
  }, [companions])

  return (
    <Layout title="仆从大全 - 桌面破坏神">
      <div className="page-wrap">
        <div className="hero-card" style={{padding: '1.5rem'}}>
          <h1 className="hero-title" style={{fontSize: '2.2rem', textAlign: 'left'}}>仆从数据库</h1>
          <p className="hero-subtitle" style={{textAlign: 'left', margin: 0}}>
            浏览 {companions.length} 只仆从的捕获地点、品质、被动技能，帮你打造最强战队。
          </p>
        </div>
      </div>

      <div className="twocol">
        <div className="sidebar">
          <div className="sidebar-header">
            <span>≡ 筛选</span>
            <span style={{fontSize:'0.85rem', fontWeight:'normal'}}>{filtered.length} 只</span>
          </div>
          <div className="sidebar-section">
            <h4>🔍 搜索仆从</h4>
            <div className="search-box">
              <input placeholder="狼蛛、奥尔登..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <button className="filter-btn">⚡ 应用搜索</button>
          </div>
          <div className="sidebar-section">
            <h4>品质</h4>
            <div className="chip-group">
              {QUALITIES.map(q => (
                <span key={q.key} className={`chip ${q.class} ${quality === q.key ? 'active' : ''}`} onClick={() => setQuality(q.key)}>{q.name}</span>
              ))}
            </div>
          </div>
          <div className="sidebar-section">
            <h4>物种</h4>
            <div className="chip-group">
              <span className={`chip ${species === 'all' ? 'active' : ''}`} onClick={() => setSpecies('all')}>全部</span>
              {allSpecies.map(s => (
                <span key={s} className={`chip ${species === s ? 'active' : ''}`} onClick={() => setSpecies(s)}>{SPECIES[s] || ''} {s}</span>
              ))}
            </div>
          </div>
          <div className="sidebar-section">
            <h4>统计</h4>
            <div style={{color: 'var(--text)', fontSize: '0.85rem', lineHeight: 1.8}}>
              总仆从: <span style={{color: 'var(--gold-light)'}}>{companions.length}</span><br/>
              物种: <span style={{color: 'var(--gold-light)'}}>{allSpecies.length}</span><br/>
              传说: <span style={{color: 'var(--gold-light)'}}>{companions.filter(m => m.quality === 'legendary').length}</span>
            </div>
          </div>
        </div>

        <div>
          <div className="results-bar">
            <div>显示 <span className="count">1-{filtered.length}</span> / 共 {filtered.length} 只仆从</div>
            <div className="controls">
              <span>排序</span>
              <select><option>稀有度</option></select>
            </div>
          </div>
          <div className="items-grid">
            {filtered.map(m => (
              <div key={m.id} className={`item-card q-${m.quality}`}>
                <span className={`quality-badge q-${m.quality}`}>{Q_NAMES[m.quality]}</span>
                <div className="item-header">
                  <div className="item-icon">
                    <img src={getMinionIcon(m)} alt="" style={{width:'100%',height:'100%',objectFit:'contain'}} />
                  </div>
                  <div style={{flex: 1}}>
                    <div className="item-name">{m.name}</div>
                    <div className="item-meta">{m.speciesName} · {Q_NAMES[m.quality]}</div>
                    {m.location && <div className="item-stat gold">📍 {m.location}</div>}
                  </div>
                </div>
                {/* 召唤量 / 捕获量 */}
                {(m.summonAmount || m.captureAmount) && (
                  <div style={{display:'flex', gap:'0.5rem', fontSize:'0.75rem', color:'var(--muted)', marginBottom:'0.3rem'}}>
                    {m.summonAmount && <span style={{color:'var(--gold-light)'}}>召唤量: +{m.summonAmount}</span>}
                    {m.captureAmount && <span style={{color:'var(--gold-light)'}}>捕获量: +{m.captureAmount}</span>}
                  </div>
                )}
                {/* 被动技能 (来自游戏截图数据) */}
                {m.passive?.name && (
                  <div className="item-effect" style={{borderTop:'1px solid var(--border)', paddingTop:'0.4rem', marginTop:'0.2rem'}}>
                    <div style={{color:'var(--red-glow)', fontSize:'0.8rem', fontWeight:600}}>📋 {m.passive.name}</div>
                    <div style={{color:'var(--text)', fontSize:'0.78rem', marginTop:'0.15rem'}}>{m.passive.value}</div>
                  </div>
                )}
                <div className="item-id">
                  <span>#{String(m.id || '').slice(-6) || '000000'}</span>
                  <span className="item-action">查看捕获 ▼</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
