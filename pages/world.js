import Layout from '../components/Layout'
import { useState } from 'react'

export async function getStaticProps() { return { props: {} } }

// 根据真实游戏内世界地图位置调整坐标
// 图片 3072x2309，左上角为 0,0
const MAP_PINS = [
  // 中部主岛 (主城 + 森林)
  { key: 'MainTown', cn: '奥尔登里奇之城', en: 'City of Aldenreach', x: 60, y: 40, icon: 'capital', difficulty: '安全', color: '#4caf50', desc: '王国首都·最后安全港' },
  { key: 'Forest', cn: '国王森林', en: 'Kings Woods', x: 65, y: 50, icon: 'forest', difficulty: '普通', color: '#2196f3', desc: '中部森林' },
  { key: 'CorruptForest', cn: '国王森林南部', en: 'Kings Woods South', x: 65, y: 60, icon: 'forest', difficulty: '普通', color: '#2196f3', desc: '腐败森林' },
  // 北部山脉 (火山 + 墓穴)
  { key: 'MythicDungeon', cn: '神话裂隙', en: 'Mythic Rift', x: 38, y: 12, icon: 'mythic', difficulty: '地狱', color: '#9c27b0', desc: '北部红色山脉·神话领域' },
  { key: 'Dungeon', cn: '北山地穴', en: 'Northhill Crypt', x: 18, y: 22, icon: 'dungeon', difficulty: '困难', color: '#ff9800', desc: '北部雪山·墓穴' },
  { key: 'DungeonL', cn: '北山地穴下层', en: 'Northhill Crypt Lower', x: 22, y: 32, icon: 'dungeon', difficulty: '极难', color: '#e53935', desc: '更深层墓穴' },
  // 北部冰城 + 中部北岛
  { key: 'ColdTown', cn: '维尔达克之城', en: 'City of Veldak', x: 13, y: 55, icon: 'capital', difficulty: '安全', color: '#4caf50', desc: '西部冰城' },
  // 南部主岛 (沙漠城)
  { key: 'DesertTown', cn: '塔赞之城', en: 'City of Tazan', x: 60, y: 85, icon: 'capital', difficulty: '安全', color: '#4caf50', desc: '南方小岛' },
  // 南部沙漠
  { key: 'Desert', cn: '塔赞荒漠', en: 'Tazan Wastes', x: 55, y: 80, icon: 'desert', difficulty: '困难', color: '#ff9800', desc: '塔赞荒漠' },
  { key: 'RedDesert', cn: '贫瘠之地', en: 'The Barrens', x: 50, y: 90, icon: 'desert', difficulty: '困难', color: '#ff9800', desc: '红土荒原' },
  // 特殊
  { key: 'LockedMap', cn: '封锁区域', en: 'Locked Area', x: 88, y: 8, icon: 'locked', difficulty: '未知', color: '#757575', desc: '未解锁' },
  { key: 'World1', cn: '阿瑟隆王国', en: 'Kingdom of Atheron', x: 50, y: 5, icon: 'world', difficulty: '世界', color: '#c9a55b', desc: '整片王国' },
]

export default function WorldMapPage() {
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? MAP_PINS : MAP_PINS.filter(m => m.difficulty === filter)

  return (
    <Layout title="世界地图 - 桌面破坏神">
      <div className="page-wrap" style={{maxWidth: 1400}}>
        <div className="hero-card" style={{padding: '1.5rem'}}>
          <h1 className="hero-title" style={{fontSize: '2.2rem', textAlign: 'left'}}>世界地图</h1>
          <p className="hero-subtitle" style={{textAlign: 'left', margin: 0}}>
            阿瑟隆王国的完整地图 · 12 处可探索区域 · 点击标记查看详情
          </p>
        </div>

        <div className="results-bar" style={{marginTop: '1rem'}}>
          <div className="controls">
            <span>筛选</span>
            <select value={filter} onChange={e => setFilter(e.target.value)}>
              <option value="all">全部</option>
              <option value="安全">🟢 安全</option>
              <option value="普通">🔵 普通</option>
              <option value="困难">🟠 困难</option>
              <option value="极难">🔴 极难</option>
              <option value="地狱">🟣 地狱</option>
            </select>
            <span style={{color: 'var(--muted)', fontSize: '0.8rem', marginLeft: '1rem'}}>
              显示 <span style={{color: 'var(--gold-light)'}}>{filtered.length}</span> 处地点
            </span>
          </div>
          {selected && (
            <div style={{color: 'var(--gold-light)', fontSize: '0.9rem'}}>
              📍 已选择: <strong>{selected.cn}</strong>
            </div>
          )}
        </div>

        <div className="world-map-container">
          <div className="world-map-title">世界地图 · World Map</div>
          <div className="world-map" style={{aspectRatio: '3072/2309', position: 'relative'}}>
            <img src="/images/world-map.png" alt="阿瑟隆王国世界地图" className="world-map-image" />
            {filtered.map(p => (
              <button
                key={p.key}
                className={`map-pin map-pin-${p.icon} ${selected?.key === p.key ? 'selected' : ''}`}
                style={{left: `${p.x}%`, top: `${p.y}%`, '--pin-color': p.color}}
                onClick={(e) => { e.stopPropagation(); setSelected(p) }}
                title={p.cn}
              >
                <span className="pin-icon">
                  {p.icon === 'capital' ? '🏰' :
                   p.icon === 'forest' ? '🌲' :
                   p.icon === 'dungeon' ? '⚔️' :
                   p.icon === 'desert' ? '🏜️' :
                   p.icon === 'mythic' ? '✨' :
                   p.icon === 'locked' ? '🔒' : '🗺️'}
                </span>
                <span className="pin-label">{p.cn}</span>
              </button>
            ))}
          </div>
        </div>

        {selected && (
          <div className="map-detail-card">
            <button className="map-detail-close" onClick={() => setSelected(null)}>✕</button>
            <h2 style={{color: 'var(--gold-light)', fontSize: '1.6rem', marginBottom: '0.3rem', textShadow: '0 0 8px rgba(201,165,91,0.3)'}}>
              {selected.cn}
            </h2>
            <p style={{color: 'var(--muted)', fontStyle: 'italic', marginBottom: '1rem'}}>{selected.en}</p>
            <div style={{display: 'flex', gap: '0.8rem', marginBottom: '1rem', flexWrap: 'wrap'}}>
              <span className="world-difficulty" style={{color: selected.color, fontSize: '0.9rem'}}>📍 {selected.difficulty}</span>
              <span style={{color: 'var(--muted)', fontSize: '0.85rem'}}>{selected.desc}</span>
            </div>
            <div className="map-detail-actions">
              <a href={`/world#${selected.key}`} className="map-detail-btn">📋 查看关卡详情</a>
              <a href={`/minions?map=${selected.key}`} className="map-detail-btn">👹 查看地图怪物</a>
            </div>
          </div>
        )}

        <div className="world-grid" style={{marginTop: '2rem'}}>
          <h2 style={{color: 'var(--gold-light)', fontSize: '1.4rem', textAlign: 'center', gridColumn: '1 / -1', margin: '0 0 1rem', textShadow: '0 0 8px rgba(201,165,91,0.3)'}}>
            全部关卡
          </h2>
          {MAP_PINS.filter(m => m.key !== 'World1' && m.key !== 'LockedMap').map(m => (
            <div key={m.key} className="world-card" style={{borderLeftColor: m.color}}>
              <div className="world-card-header">
                <div className="world-card-icon">
                  {m.icon === 'capital' ? '🏰' : m.icon === 'forest' ? '🌲' : m.icon === 'dungeon' ? '⚔️' : m.icon === 'desert' ? '🏜️' : m.icon === 'mythic' ? '✨' : '🗺️'}
                </div>
                <div className="world-card-titles">
                  <div className="world-card-cn">{m.cn}</div>
                  <div className="world-card-en">{m.en}</div>
                </div>
              </div>
              <div className="world-card-meta">
                <span className="world-difficulty" style={{color: m.color}}>📍 {m.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
