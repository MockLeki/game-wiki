import Layout from '../components/Layout'
import { useState, useMemo } from 'react'
import minionData from '../public/data/minions.json'

export async function getStaticProps() { return { props: {} } }

const QUALITIES = [
  { key: 'all', name: '全部', class: 'chip-common' },
  { key: 'common', name: '普通', class: 'chip-common' },
  { key: 'uncommon', name: '非凡', class: 'chip-uncommon' },
  { key: 'rare', name: '稀有', class: 'chip-rare' },
  { key: 'legendary', name: '传说', class: 'chip-legendary' },
]
const Q_NAMES = { common: '普通', uncommon: '非凡', rare: '稀有', legendary: '传说' }
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
                  <div className="item-icon">{SPECIES[m.speciesName] || '🐺'}</div>
                  <div style={{flex: 1}}>
                    <div className="item-name">{m.name}</div>
                    <div className="item-meta">{m.speciesName} · {m.quality === 'legendary' ? '传说' : m.quality === 'rare' ? '稀有' : m.quality === 'uncommon' ? '非凡' : '普通'}</div>
                    {m.location && <div className="item-stat gold">📍 {m.location}</div>}
                  </div>
                </div>
                {m.passives?.length > 0 && m.passives.slice(0, 1).map((p, i) => (
                  <div key={i} className="item-effect">📋 {p.name}: {p.desc?.slice(0, 50)}...</div>
                ))}
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
