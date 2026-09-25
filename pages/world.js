import Layout from '../components/Layout'
import { useState } from 'react'

export async function getStaticProps() { return { props: {} } }

// 根据真实游戏内世界地图位置调整坐标（地图来源：游戏纹理 world_map_v0，正式版）
// 图片 3072x2309，左上角为 0,0
const MAP_PINS = [
  // 中部主岛 (主城 + 森林)
  { key: 'MainTown', cn: '奥尔登里奇之城', en: 'City of Aldenreach', x: 20, y: 55, icon: 'capital', difficulty: '安全', color: '#4caf50', desc: '王国首都·最后安全港' },
  { key: 'Forest', cn: '国王森林', en: 'Kings Woods', x: 33, y: 35, icon: 'forest', difficulty: '普通', color: '#2196f3', desc: '中部森林' },
  { key: 'CorruptForest', cn: '国王森林南部', en: 'Kings Woods South', x: 35, y: 47, icon: 'forest', difficulty: '普通', color: '#2196f3', desc: '森林南部·腐化之地' },
  { key: 'TreasureForest', cn: '梦幻国王森林', en: 'Dreamy Kings Woods', x: 40, y: 42, icon: 'treasure', difficulty: '困难', color: '#b94aff', desc: '森林上空的梦幻蜃景·宝物' },
  // 北部山脉 (火山 + 墓穴)
  { key: 'MythicDungeon', cn: '神话裂隙', en: 'Mythic Rift', x: 38, y: 12, icon: 'mythic', difficulty: '地狱', color: '#9c27b0', desc: '终局挑战·神话领域' },
  { key: 'Dungeon', cn: '尖塔山丘墓穴', en: 'Spire Hill Crypt', x: 18, y: 22, icon: 'dungeon', difficulty: '困难', color: '#ff9800', desc: '北部雪山·墓穴' },
  { key: 'DungeonL', cn: '尖塔山丘墓穴下层', en: 'Spire Hill Crypt Lower', x: 22, y: 32, icon: 'dungeon', difficulty: '极难', color: '#e53935', desc: '更深层墓穴' },
  // 北部冰城 + 雪域 (正式版新区域)
  { key: 'SnowTown', cn: '维尔达克之城', en: 'City of Veldak', x: 16, y: 34, icon: 'capital', difficulty: '安全', color: '#4caf50', desc: '冰封之城·神话裂隙入口' },
  { key: 'SnowHill', cn: '维尔达克高地', en: 'Veldak Highlands', x: 12, y: 15, icon: 'snow', difficulty: '极难', color: '#7ec8e3', desc: '正式版新区域 · Lv.52+' },
  { key: 'DefiledKeep', cn: '污秽要塞', en: 'The Defiled Keep', x: 26, y: 10, icon: 'dungeon', difficulty: '极难', color: '#e53935', desc: '正式版新区域 · Lv.58+' },
  { key: 'Volcano', cn: '灰烬之冠', en: 'The Cinder Crown', x: 38, y: 6, icon: 'volcano', difficulty: '地狱', color: '#ff5722', desc: '正式版新区域 · Lv.65+' },
  // 南部主岛 (沙漠城)
  { key: 'DesertTown', cn: '塔赞之城', en: 'City of Tazan', x: 63, y: 50, icon: 'capital', difficulty: '安全', color: '#4caf50', desc: '沙漠绿洲之城' },
  // 南部沙漠
  { key: 'Desert', cn: '塔赞荒漠', en: 'Tazan Wastes', x: 48, y: 70, icon: 'desert', difficulty: '困难', color: '#ff9800', desc: '无尽黄沙' },
  { key: 'RedDesert', cn: '贫瘠之地', en: 'The Barrens', x: 75, y: 55, icon: 'desert', difficulty: '极难', color: '#e53935', desc: '焦土荒原' },
  { key: 'RedForest', cn: '绯红山谷', en: 'The Crimson Vale', x: 89, y: 50, icon: 'forest', difficulty: '极难', color: '#e53935', desc: '猩红浸染的山谷' },
  { key: 'TreasureBarrens', cn: '梦幻贫瘠之地', en: 'Dreamy Barrens', x: 82, y: 42, icon: 'treasure', difficulty: '困难', color: '#b94aff', desc: '荒漠上空的梦幻蜃景·宝物' },
  { key: 'TreasureKeep', cn: '梦幻要塞', en: 'Dreamy Keep', x: 78, y: 64, icon: 'treasure', difficulty: '极难', color: '#b94aff', desc: '要塞深处的梦幻之地·宝物' },
  // 钓鱼点 (正式版新增 2 处)
  { key: 'Fishing-Beach', cn: '塔赞渔滩', en: 'Tazan Fishing Beach', x: 40, y: 88, icon: 'fishing', difficulty: '安全', color: '#00bcd4', desc: '南部小岛·垂钓' },
  { key: 'Fishing-SnowLake', cn: '维尔达克天池', en: 'Veldak Sky Lake', x: 7, y: 10, icon: 'fishing', difficulty: '安全', color: '#00bcd4', desc: '正式版新钓点·雪境天池' },
  { key: 'Fishing-VolcanoLake', cn: '灰烬湖', en: 'Cinder Lake', x: 33, y: 22, icon: 'fishing', difficulty: '安全', color: '#00bcd4', desc: '正式版新钓点·火山脚下' },
  // 特殊
  { key: 'LockedMap', cn: '封锁区域', en: 'Locked Area', x: 88, y: 8, icon: 'locked', difficulty: '未知', color: '#757575', desc: '未解锁' },
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
            游戏内真实世界地图（正式版提取） · {MAP_PINS.length} 处可探索区域 · 点击标记查看详情
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
            <img src="/images/world_map.jpg" alt="阿瑟隆王国世界地图" className="world-map-image" />
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
                   p.icon === 'snow' ? '❄️' :
                   p.icon === 'volcano' ? '🌋' :
                   p.icon === 'fishing' ? '🎣' :
                   p.icon === 'treasure' ? '💎' :
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
              <a href={`/levels`} className="map-detail-btn">📋 查看关卡详情</a>
              <a href={`/minions?map=${selected.key}`} className="map-detail-btn">👹 查看地图怪物</a>
            </div>
          </div>
        )}

        <div className="world-grid" style={{marginTop: '2rem'}}>
          <h2 style={{color: 'var(--gold-light)', fontSize: '1.4rem', textAlign: 'center', gridColumn: '1 / -1', margin: '0 0 1rem', textShadow: '0 0 8px rgba(201,165,91,0.3)'}}>
            全部关卡
          </h2>
          {MAP_PINS.filter(m => m.key !== 'LockedMap').map(m => (
            <div key={m.key} className="world-card" style={{borderLeftColor: m.color}}>
              <div className="world-card-header">
                <div className="world-card-icon">
                  {m.icon === 'capital' ? '🏰' : m.icon === 'forest' ? '🌲' : m.icon === 'dungeon' ? '⚔️' : m.icon === 'desert' ? '🏜️' : m.icon === 'mythic' ? '✨' : m.icon === 'snow' ? '❄️' : m.icon === 'volcano' ? '🌋' : m.icon === 'fishing' ? '🎣' : m.icon === 'treasure' ? '💎' : '🗺️'}
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
