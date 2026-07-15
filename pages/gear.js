import Layout from '../components/Layout'
import { useState, useMemo } from 'react'
import itemsData from '../public/data/items.json'

export async function getStaticProps() {
  return { props: {} }
}

const SLOTS = { weapon: '武器', helm: '头盔', chest: '胸甲', shoulder: '护肩', necklace: '项链', gloves: '手套', belt: '腰带', legs: '护腿', boots: '靴子', ring: '戒指' }
const QUALITIES = ['common', 'uncommon', 'rare', 'legendary']
const Q_NAMES = { common: '普通', uncommon: '非凡', rare: '稀有', legendary: '传说' }

export default function GearPage() {
  const [search, setSearch] = useState('')
  const [quality, setQuality] = useState('all')
  const [slot, setSlot] = useState('all')

  const allItems = useMemo(() => {
    const tree = itemsData.equipment_tree?.tree || itemsData.all_items || {}
    const result = []
    for (const q of QUALITIES) {
      for (const s of Object.keys(tree?.[q] || {})) {
        for (const item of tree[q][s] || []) {
          result.push(item)
        }
      }
    }
    return result
  }, [])

  const filtered = useMemo(() => {
    return allItems.filter(item => {
      if (quality !== 'all' && item.quality !== quality) return false
      if (slot !== 'all' && item.slot !== slot) return false
      if (search && !item.name.includes(search) && !item.nameEn?.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
  }, [allItems, quality, slot, search])

  return (
    <Layout title="装备图鉴 - 桌面破坏神">
      <div className="page-header"><h1>⚔️ 装备图鉴</h1></div>
      <div className="twocol">
        <div className="sidebar">
          <h3>筛选</h3>
          <div className="search-box">
            <input placeholder="搜索装备名称..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="filter-group">
            <label>品质</label>
            <div className="filter-chips">
              <span className={`chip ${quality === 'all' ? 'active' : ''}`} onClick={() => setQuality('all')}>全部</span>
              {QUALITIES.map(q => (
                <span key={q} className={`chip ${quality === q ? 'active' : ''}`} onClick={() => setQuality(q)}>{Q_NAMES[q]}</span>
              ))}
            </div>
          </div>
          <div className="filter-group">
            <label>部位</label>
            <div className="filter-chips">
              <span className={`chip ${slot === 'all' ? 'active' : ''}`} onClick={() => setSlot('all')}>全部</span>
              {Object.entries(SLOTS).map(([k, v]) => (
                <span key={k} className={`chip ${slot === k ? 'active' : ''}`} onClick={() => setSlot(k)}>{v}</span>
              ))}
            </div>
          </div>
          <p style={{color:'var(--muted)',fontSize:'0.8rem',marginTop:'1rem'}}>
            共 {filtered.length} 件装备
          </p>
        </div>
        <div className="items-grid">
          {filtered.map(item => (
            <div key={item.id} className="item-card">
              <div className="item-header">
                <div className="item-icon">{['⚔️','⛑️','🛡️','🦾','📿','🧤','🪢','👖','🥾','💍'][Object.keys(SLOTS).indexOf(item.slot)] || '⚔️'}</div>
                <div>
                  <div className="item-name">{item.name}</div>
                  <div className="item-en">{item.nameEn}</div>
                </div>
              </div>
              <div className="item-meta">
                <span className={`quality q-${item.quality}`}>{Q_NAMES[item.quality]}</span>
                <span>{SLOTS[item.slot]}</span>
              </div>
              {item.desc && <div className="item-effect">✨ {item.desc}</div>}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
