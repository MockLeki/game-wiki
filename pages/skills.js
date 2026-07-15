import Layout from '../components/Layout'
import { useState } from 'react'
import talents from '../public/data/talents.json'

export async function getStaticProps() {
  return { props: {} }
}

function getClassIcon(cls) {
  const icons = { Warrior: '⚔️', Sorcerer: '🔮', Ranger: '🏹', Paladin: '🛡️', Monk: '👊', Assassin: '🗡️', Shaman: '⚡', Necromancer: '💀', Bard: '🎵', Warden: '🪓', Druid: '🌿', Priest: '✨' }
  return icons[cls] || '⚔️'
}

// 每个天赋的等级上限 — 按游戏内实际数据
function getMaxLevel(cls, idx) {
  if (idx < 8) return 3  // 基础天赋 0-7: 最多3级
  if (idx < 16) return 5 // 进阶天赋 8-15: 最多5级
  if (idx < 24) return 5 // 高级天赋 16-23: 最多5级
  return 3 // 传奇天赋 24+: 最多3级
}

function getRarityLabel(cls, idx) {
  if (idx < 8) return '基础'
  if (idx < 16) return '进阶'
  if (idx < 24) return '高级'
  return '传奇'
}

// 模拟每级数值（待游戏截图替换）—— 先设为占位，等用户提供截屏
function getTalentValue(talent, level) {
  // 暂时使用 {value} 占位——等用户截图填具体数字
  return talent.value || '{value}'
}

export default function SkillsPage() {
  const classes = Object.entries(talents.classes).map(([key, list]) => ({
    key,
    name: talents.names[key] || key,
    icon: getClassIcon(key),
    talents: list.filter(t => t && t.name).map((t, idx) => ({
      ...t,
      value: '{value}',
      maxLevel: getMaxLevel(key, idx),
      rarity: getRarityLabel(key, idx)
    }))
  }))

  // 每个职业独立的点数状态
  const [points, setPoints] = useState({})
  const [allocated, setAllocated] = useState({})
  const [selectedTal, setSelectedTal] = useState(null)

  const getPts = (cls) => points[cls] || 0
  const setPts = (cls, v) => setPoints(prev => ({ ...prev, [cls]: v }))

  const getAlloc = (cls, idx) => (allocated[cls] || {})[idx] || 0
  const setAlloc = (cls, idx, v) => {
    setAllocated(prev => ({ ...prev, [cls]: { ...(prev[cls] || {}), [idx]: v } }))
  }

  const handleAllocate = (cls, idx, maxLevel) => {
    const cur = getAlloc(cls, idx)
    const pt = getPts(cls)
    if (cur >= maxLevel) {
      setAlloc(cls, idx, 0)
      setPts(cls, pt + cur)
    } else if (pt > 0) {
      setAlloc(cls, idx, cur + 1)
      setPts(cls, pt - 1)
    }
  }

  const resetClass = (cls) => {
    setAlloc(cls, null, null)
    setPts(cls, 59) // 初始点数
  }

  // 初始化点数
  const initPts = (cls) => {
    if (points[cls] === undefined) {
      setPts(cls, 59)
    }
  }

  return (
    <Layout title="技能大全 - 桌面破坏神">
      <div className="page-wrap">
        <div className="hero-card" style={{padding: '1.5rem'}}>
          <h1 className="hero-title" style={{fontSize: '2.2rem', textAlign: 'left'}}>技能大全</h1>
          <p className="hero-subtitle" style={{textAlign: 'left', margin: 0}}>
            {classes.length} 个职业 · {classes.reduce((s, c) => s + c.talents.length, 0)} 项天赋 · 交互式加点模拟
          </p>
        </div>
      </div>

      <div className="page-wrap" style={{maxWidth: 1400}}>
        {classes.map((cls, ci) => {
          initPts(cls.key)
          const pt = getPts(cls.key)
          const used = cls.talents.reduce((s, _, i) => s + getAlloc(cls.key, i), 0)

          // 按稀有度分组（基础/进阶/高级/传奇）
          const tiers = ['基础', '进阶', '高级', '传奇']
          const grouped = {}
          tiers.forEach(t => { grouped[t] = [] })
          cls.talents.forEach((t, idx) => {
            grouped[t.rarity].push({ ...t, idx })
          })

          return (
            <div key={cls.key} className="class-section" style={{marginBottom: '2.5rem'}}>
              {/* 职业标题 + 点数条 */}
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '0.6rem', borderBottom: '2px solid var(--border-gold)', flexWrap: 'wrap', gap: '0.5rem'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.8rem'}}>
                  <span style={{fontSize: '1.8rem', filter: 'drop-shadow(0 0 6px var(--red-glow))'}}>{cls.icon}</span>
                  <h2 style={{color: 'var(--gold-light)', fontSize: '1.6rem', textShadow: '0 0 8px rgba(201,165,91,0.3)'}}>{cls.name}</h2>
                  <span style={{color: 'var(--muted)', fontSize: '0.85rem'}}>天梯 ({cls.talents.length})</span>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.6rem'}}>
                  <div style={{fontSize: '0.9rem', color: 'var(--gold-light)', fontFamily: 'Cinzel, serif'}}>
                    技能点 <span style={{fontWeight:'bold', fontSize:'1.2rem', color: pt > 0 ? 'var(--gold-light)' : 'var(--red-glow)'}}>{pt}</span>
                    / <span style={{color:'var(--muted)'}}>{59}</span>
                  </div>
                  <button className="talent-reset-btn" onClick={() => resetClass(cls.key)}>重置</button>
                </div>
              </div>

              {/* 4 列分层网格 */}
              {tiers.map(tier => (
                grouped[tier].length > 0 && (
                  <div key={tier} style={{marginBottom: '1.2rem'}}>
                    <h3 style={{
                      color: 'var(--gold-light)', fontSize: '1rem', marginBottom: '0.5rem',
                      fontFamily: 'Cinzel, serif', textTransform: 'uppercase',
                      borderLeft: `3px solid ${
                        tier === '基础' ? '#b0b0b0' :
                        tier === '进阶' ? '#4caf50' :
                        tier === '高级' ? '#2196f3' : '#c9a55b'
                      }`, paddingLeft: '0.6rem'
                    }}>{tier} 天赋</h3>
                    <div className="talent-grid">
                      {grouped[tier].map(t => {
                        const cur = getAlloc(cls.key, t.idx)
                        const max = t.maxLevel
                        const isFull = cur >= max
                        return (
                          <div
                            key={t.idx}
                            className={`talent-node ${cur > 0 ? 'talent-active' : ''} ${isFull ? 'talent-full' : ''}`}
                            style={{ '--rarity-color':
                              tier === '基础' ? '#b0b0b0' :
                              tier === '进阶' ? '#4caf50' :
                              tier === '高级' ? '#2196f3' : '#c9a55b'
                            }}
                            onClick={() => handleAllocate(cls.key, t.idx, max)}
                          >
                            {cur > 0 && (
                              <span className="talent-level-badge" style={{background: `var(--rarity-color)`}}>
                                {cur}/{max}
                              </span>
                            )}
                            <div className="talent-icon">
                              {cls.icon}
                            </div>
                            <div className="talent-name-cn">{t.name}</div>
                            <div className="talent-name-en">{t.nameEn}</div>
                            {cur > 0 ? (
                              <div className="talent-value">+{getTalentValue(t, cur)}</div>
                            ) : (
                              <div className="talent-value-placeholder">点击加点</div>
                            )}
                            <div className="talent-desc" style={{marginTop: 'auto', paddingTop: '0.3rem'}}>
                              {t.desc ? t.desc.replace(/\{[a-zA-Z]+\}/g, '___') : ''}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              ))}
            </div>
          )
        })}
      </div>
    </Layout>
  )
}
