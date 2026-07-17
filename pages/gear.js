import Layout from '../components/Layout'
import { useState, useMemo } from 'react'
import itemsData from '../public/data/items.json'

export async function getStaticProps() { return { props: {} } }

const SLOTS = { weapon: '武器', helm: '头盔', chest: '胸甲', shoulder: '护肩', necklace: '项链', gloves: '手套', belt: '腰带', legs: '护腿', boots: '靴子', ring: '戒指' }
// 使用每件装备的专属图标（来自 items.json 的 icon 字段）
function getIcon(item) {
  return item.icon || '/images/items/ring.png'
}
const QUALITIES = [
  { key: 'all', name: '全部', class: 'chip-common' },
  { key: 'common', name: '普通', class: 'chip-common' },
  { key: 'uncommon', name: '非凡', class: 'chip-uncommon' },
  { key: 'rare', name: '稀有', class: 'chip-rare' },
  { key: 'legendary', name: '传说', class: 'chip-legendary' },
]
const Q_NAMES = { common: '普通', uncommon: '非凡', rare: '稀有', legendary: '传说' }
const Q_BADGE_NAMES = { common: '普通', uncommon: '非凡', rare: '稀有', legendary: '传说' }

export default function GearPage() {
  const [search, setSearch] = useState('')
  const [quality, setQuality] = useState('all')
  const [slot, setSlot] = useState('all')
  const [sort, setSort] = useState('rarity')
  const [order, setOrder] = useState('desc')

  const allItems = useMemo(() => {
    const tree = itemsData.equipment_tree?.tree || itemsData.all_items || {}
    const result = []
    // 处理嵌套结构: tree[quality][slot] = [items]
    if (tree.legendary_weapons || tree.legendary_armor) {
      for (const key of Object.keys(tree)) {
        if (Array.isArray(tree[key])) {
          for (const item of tree[key]) result.push(item)
        }
      }
    } else if (typeof tree === 'object' && !Array.isArray(tree) && tree.legendary) {
      // 嵌套 quality -> slot
      for (const q of Object.keys(tree)) {
        for (const s of Object.keys(tree[q] || {})) {
          for (const item of tree[q][s] || []) result.push(item)
        }
      }
    } else if (typeof tree === 'object' && !Array.isArray(tree)) {
      // 扁平 dict: {key: item} - 转为数组
      for (const k of Object.keys(tree)) {
        const v = tree[k]
        if (v && typeof v === 'object' && v.id) result.push(v)
      }
    }
    return result
  }, [])

  const filtered = useMemo(() => {
    let result = allItems.filter(item => {
      if (quality !== 'all' && item.quality !== quality) return false
      if (slot !== 'all' && item.slot !== slot) return false
      if (search && !item.name.includes(search) && !item.nameEn?.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
    if (sort === 'rarity') {
      const order2 = { legendary: 4, rare: 3, uncommon: 2, common: 1 }
      result = result.sort((a, b) => order === 'desc' ? order2[b.quality] - order2[a.quality] : order2[a.quality] - order2[b.quality])
    } else if (sort === 'name') {
      result = result.sort((a, b) => order === 'desc' ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name))
    }
    return result
  }, [allItems, quality, slot, search, sort, order])

  return (
    <Layout title="装备图鉴 - 桌面破坏神">
      <div className="page-wrap">
        <div className="hero-card" style={{padding: '1.5rem'}}>
          <h1 className="hero-title" style={{fontSize: '2.2rem', textAlign: 'left'}}>装备数据库</h1>
          <p className="hero-subtitle" style={{textAlign: 'left', margin: 0}}>
            浏览 112 件桌面破坏神装备，含 4 品质、10 部位、词条、获取途径。
          </p>
        </div>
      </div>

      <div className="twocol">
        <div className="sidebar">
          <div className="sidebar-header">
            <span>≡ 筛选</span>
            <span style={{fontSize:'0.85rem', fontWeight:'normal'}}>{filtered.length} 件</span>
          </div>
          <div className="sidebar-section">
            <h4>🔍 搜索装备</h4>
            <div className="search-box">
              <input placeholder="长剑、护甲符、攻击速度..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <button className="filter-btn">⚡ 应用搜索</button>
          </div>
          <div className="sidebar-section">
            <h4>稀有度</h4>
            <div className="chip-group">
              {QUALITIES.map(q => (
                <span key={q.key} className={`chip ${q.class} ${quality === q.key ? 'active' : ''}`} onClick={() => setQuality(q.key)}>{q.name}</span>
              ))}
            </div>
          </div>
          <div className="sidebar-section">
            <h4>装备类型</h4>
            <div className="chip-group">
              <span className={`chip ${slot === 'all' ? 'active' : ''}`} onClick={() => setSlot('all')}>全部</span>
              {Object.entries(SLOTS).map(([k, v]) => (
                <span key={k} className={`chip ${slot === k ? 'active' : ''}`} onClick={() => setSlot(k)}>{v}</span>
              ))}
            </div>
          </div>
          <div className="sidebar-section">
            <h4>统计</h4>
            <div style={{color: 'var(--text)', fontSize: '0.85rem', lineHeight: 1.8}}>
              总装备: <span style={{color: 'var(--gold)'}}>112</span><br/>
              稀有度: <span style={{color: 'var(--gold)'}}>4</span><br/>
              品质等级: <span style={{color: 'var(--gold)'}}>90</span>
            </div>
          </div>
        </div>

        <div>
          <div className="results-bar">
            <div>显示 <span className="count">1-{filtered.length}</span> / 共 {filtered.length} 件装备</div>
            <div className="controls">
              <span>等级</span>
              <select value="all"><option>全部等级</option></select>
              <span>排序</span>
              <select value={sort} onChange={e => setSort(e.target.value)}>
                <option value="rarity">稀有度</option>
                <option value="name">名称</option>
              </select>
              <button onClick={() => setOrder(order === 'desc' ? 'asc' : 'desc')} style={{background:'var(--bg-darker)',border:'1px solid var(--border)',color:'var(--text)',padding:'0.3rem 0.5rem',borderRadius:'4px',cursor:'pointer'}}>{order === 'desc' ? '↓' : '↑'}</button>
              <button style={{background: 'var(--red)', color: '#fff', border: 'none', padding: '0.4rem 1rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem'}}>↑ 低到高</button>
            </div>
          </div>

          <div className="items-grid">
            {filtered.map(item => {
              const isJewelry = item.slot === 'necklace' || item.slot === 'ring'
              return (
                <div key={item.id} className="item-card">
                  <span className={`quality-badge q-${item.quality}`}>{Q_BADGE_NAMES[item.quality]}</span>
                  <div className="item-header">
                    <div className="item-icon">
                      <img src={getIcon(item)} alt="" style={{width:'100%',height:'100%',objectFit:'contain'}} />
                    </div>
                    <div style={{flex: 1}}>
                      <div className="item-name">{item.name}</div>
                      <div className="item-meta">等级 1 · {SLOTS[item.slot]} · {item.quality === 'weapon' ? '武器' : '防具'}</div>
                    </div>
                  </div>
                  {item.desc && <div className="item-effect">✨ {item.desc}</div>}
                  <div className="item-id">
                    <span>#{item.id.slice(-6)}</span>
                    <span className="item-action">查看掉落 ▼</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </Layout>
  )
}
