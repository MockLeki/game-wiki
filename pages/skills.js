import Layout from '../components/Layout'
import { useState, useEffect } from 'react'
import talents from '../public/data/talents.json'

export async function getStaticProps() { return { props: {} } }

// 天赋树布局：5列 × 7层
// 每列是一条独立路径，列内有依赖关系
const TREE_LAYOUT = {
  Warrior: [
    // 第0层 (顶部)
    { col: 0, tier: 0, talentIdx: 0, maxPoints: 3 }, // 力量
    { col: 1, tier: 0, talentIdx: 1, maxPoints: 5 }, // 活力
    { col: 2, tier: 0, talentIdx: 3, maxPoints: 5 }, // 攻击速度
    { col: 3, tier: 0, talentIdx: 2, maxPoints: 3 }, // 护甲
    { col: 4, tier: 0, talentIdx: 7, maxPoints: 5 }, // 生命恢复
    // 第1层
    { col: 0, tier: 1, talentIdx: 4, maxPoints: 3 }, // 暴击几率
    { col: 1, tier: 1, talentIdx: 5, maxPoints: 3 }, // 暴击伤害
    { col: 2, tier: 1, talentIdx: 6, maxPoints: 3 }, // 荆棘
    { col: 3, tier: 1, talentIdx: 20, maxPoints: 3 }, // 防御姿态
    { col: 4, tier: 1, talentIdx: 21, maxPoints: 1 }, // 击杀回蓝
    // 第2层
    { col: 0, tier: 2, talentIdx: 8, maxPoints: 5 }, // 残暴
    { col: 1, tier: 2, talentIdx: 9, maxPoints: 5 }, // 凶猛
    { col: 2, tier: 2, talentIdx: 13, maxPoints: 5 }, // 荆棘强化
    { col: 3, tier: 2, talentIdx: 24, maxPoints: 5 }, // 猛攻
    { col: 4, tier: 2, talentIdx: 22, maxPoints: 1 }, // 重整旗鼓
    // 第3层
    { col: 0, tier: 3, talentIdx: 12, maxPoints: 5 }, // 重击
    { col: 1, tier: 3, talentIdx: 11, maxPoints: 1 }, // 战斗激励
    { col: 2, tier: 3, talentIdx: 17, maxPoints: 1 }, // 怒火导引
    { col: 3, tier: 3, talentIdx: 18, maxPoints: 1 }, // [野兽] 强化
    { col: 4, tier: 3, talentIdx: 19, maxPoints: 1 }, // [人形] 强化
    // 第4层
    { col: 0, tier: 4, talentIdx: 10, maxPoints: 3 }, // 劈砍狂怒
    { col: 1, tier: 4, talentIdx: 14, maxPoints: 5 }, // 强化强力攻击
    { col: 2, tier: 4, talentIdx: 15, maxPoints: 3 }, // 怒火注入
    { col: 3, tier: 4, talentIdx: 28, maxPoints: 1 }, // 强化烈焰打击
    { col: 4, tier: 4, talentIdx: 23, maxPoints: 3 }, // 专注
    // 第5层
    { col: 0, tier: 5, talentIdx: 16, maxPoints: 1 }, // 强化战吼
    { col: 1, tier: 5, talentIdx: 25, maxPoints: 1 }, // 强化英勇打击
    { col: 2, tier: 5, talentIdx: 26, maxPoints: 1 }, // [不死族] 强化
    { col: 3, tier: 5, talentIdx: 29, maxPoints: 1 }, // 溢血
    { col: 4, tier: 5, talentIdx: 27, maxPoints: 1 }, // 凶狠荆棘
    // 第6层 (底部锁定)
    { col: 0, tier: 6, talentIdx: -1, maxPoints: 1, locked: true },
    { col: 1, tier: 6, talentIdx: -1, maxPoints: 1, locked: true },
    { col: 2, tier: 6, talentIdx: -1, maxPoints: 1, locked: true },
    { col: 3, tier: 6, talentIdx: -1, maxPoints: 1, locked: true },
    { col: 4, tier: 6, talentIdx: -1, maxPoints: 1, locked: true },
  ],
  Sorcerer: [
    { col: 0, tier: 0, talentIdx: 0, maxPoints: 3 },
    { col: 1, tier: 0, talentIdx: 1, maxPoints: 5 },
    { col: 2, tier: 0, talentIdx: 2, maxPoints: 5 },
    { col: 3, tier: 0, talentIdx: 3, maxPoints: 3 },
    { col: 4, tier: 0, talentIdx: 4, maxPoints: 5 },
    { col: 0, tier: 1, talentIdx: 5, maxPoints: 3 },
    { col: 1, tier: 1, talentIdx: 6, maxPoints: 3 },
    { col: 2, tier: 1, talentIdx: 7, maxPoints: 3 },
    { col: 3, tier: 1, talentIdx: 8, maxPoints: 3 },
    { col: 4, tier: 1, talentIdx: 9, maxPoints: 1 },
    { col: 0, tier: 2, talentIdx: 10, maxPoints: 5 },
    { col: 1, tier: 2, talentIdx: 11, maxPoints: 5 },
    { col: 2, tier: 2, talentIdx: 12, maxPoints: 5 },
    { col: 3, tier: 2, talentIdx: 13, maxPoints: 5 },
    { col: 4, tier: 2, talentIdx: 14, maxPoints: 1 },
    { col: 0, tier: 3, talentIdx: 15, maxPoints: 5 },
    { col: 1, tier: 3, talentIdx: 16, maxPoints: 1 },
    { col: 2, tier: 3, talentIdx: 17, maxPoints: 1 },
    { col: 3, tier: 3, talentIdx: 18, maxPoints: 1 },
    { col: 4, tier: 3, talentIdx: 19, maxPoints: 1 },
    { col: 0, tier: 4, talentIdx: 20, maxPoints: 3 },
    { col: 1, tier: 4, talentIdx: 21, maxPoints: 5 },
    { col: 2, tier: 4, talentIdx: 22, maxPoints: 3 },
    { col: 3, tier: 4, talentIdx: 23, maxPoints: 3 },
    { col: 4, tier: 4, talentIdx: 24, maxPoints: 3 },
    { col: 0, tier: 5, talentIdx: 25, maxPoints: 1 },
    { col: 1, tier: 5, talentIdx: 26, maxPoints: 1 },
    { col: 2, tier: 5, talentIdx: 27, maxPoints: 1 },
    { col: 3, tier: 5, talentIdx: 28, maxPoints: 1 },
  ],
}

const TOTAL_POINTS = 32
const CLASS_NAMES = { Warrior: '战士', Sorcerer: '法师' }
const CLASS_ICONS = { Warrior: '⚔️', Sorcerer: '🔮' }

// 解析天赋描述为加成类型
function parseBonus(talent) {
  if (!talent || !talent.desc) return { stat: null, perPoint: 0 }
  const desc = talent.desc
  let stat = '综合'
  if (desc.includes('Strength')) stat = '力量'
  else if (desc.includes('Max HP')) stat = '最大生命值'
  else if (desc.includes('Armor') && desc.includes('Magic Resist')) stat = '护甲+魔抗'
  else if (desc.includes('Attack Speed')) stat = '攻击速度'
  else if (desc.includes('Critical Hit Chance')) stat = '暴击几率'
  else if (desc.includes('Critical Hit Damage')) stat = '暴击伤害'
  else if (desc.includes('Thorn') && !desc.includes('Boost')) stat = '荆棘'
  else if (desc.includes('Life Regen')) stat = '生命恢复'
  else if (desc.includes('Injured')) stat = '对受伤目标'
  else if (desc.includes('Vulnerable')) stat = '对易伤目标'
  else if (desc.includes('Mana') && desc.includes('Cost')) stat = '法力消耗'
  return { stat, perPoint: 0 }  // 数值待游戏内截图
}

export default function SkillsPage() {
  const classes = Object.entries(talents.classes).map(([key, list]) => ({
    key, name: CLASS_NAMES[key] || key, icon: CLASS_ICONS[key] || '⚔️',
    talents: list.filter(t => t && t.name)
  }))

  const [activeClass, setActiveClass] = useState('Warrior')
  const [alloc, setAlloc] = useState({})  // {Warrior: {talentIdx: points}}
  const [hoveredTalent, setHoveredTalent] = useState(null)  // 悬停天赋弹窗
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // 初始化每个职业点数
  useEffect(() => {
    const init = {}
    classes.forEach(c => { init[c.key] = 0 })
    setAlloc(prev => Object.keys(prev).length ? prev : init)
  }, [])

  const getAlloc = (cls, idx) => (alloc[cls] || {})[idx] || 0

  const setAllocFor = (cls, idx, val) => {
    setAlloc(prev => ({ ...prev, [cls]: { ...(prev[cls] || {}), [idx]: val } }))
  }

  const totalAlloc = classes.reduce((s, c) => s + c.talents.reduce((ss, _, i) => ss + getAlloc(c.key, i), 0), 0)
  const totalPoints = (TOTAL_POINTS - totalAlloc) // 剩余点数

  const handleNodeClick = (cls, talentIdx, maxPoints) => {
    const cur = getAlloc(cls, talentIdx)
    if (cur >= maxPoints) {
      // 撤点
      setAllocFor(cls, talentIdx, 0)
    } else if (totalPoints > 0) {
      // 加点
      setAllocFor(cls, talentIdx, cur + 1)
    }
  }

  const resetClass = (cls) => {
    const reset = { ...alloc }
    reset[cls] = {}
    setAlloc(reset)
  }

  const currentClass = classes.find(c => c.key === activeClass)
  const layout = TREE_LAYOUT[activeClass] || []
  const currentTalents = currentClass?.talents || []

  // 按 tier 分组
  const byTier = {}
  layout.forEach(node => {
    if (!byTier[node.tier]) byTier[node.tier] = []
    byTier[node.tier].push(node)
  })

  // 计算每列的连接线（连线）
  const getColumnConnections = (col) => {
    const colNodes = layout.filter(n => n.col === col && n.talentIdx >= 0).sort((a, b) => a.tier - b.tier)
    const lines = []
    for (let i = 0; i < colNodes.length - 1; i++) {
      const upper = colNodes[i], lower = colNodes[i + 1]
      const upperFull = getAlloc(activeClass, upper.talentIdx) >= upper.maxPoints
      lines.push({ from: upper, to: lower, active: upperFull })
    }
    return lines
  }

  // 计算总加成 (按 stat 分组)
  const bonusSummary = {}
  if (currentClass) {
    layout.forEach(node => {
      if (node.talentIdx < 0 || node.locked) return
      const cur = getAlloc(activeClass, node.talentIdx)
      if (cur === 0) return
      const t = currentTalents[node.talentIdx]
      if (!t) return
      const { stat } = parseBonus(t)
      const perPoint = t.perPoint || 1
      if (!bonusSummary[stat]) bonusSummary[stat] = { points: 0, talents: [] }
      bonusSummary[stat].points += cur * perPoint
      bonusSummary[stat].talents.push({ name: t.name, value: cur, max: node.maxPoints, perPoint, unit: t.unit || '' })
    })
  }

  return (
    <Layout title="天赋树 - 桌面破坏神">
      <div className="page-wrap">
        <div className="hero-card" style={{padding: '1rem 1.5rem'}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem'}}>
            <h1 className="hero-title" style={{fontSize: '1.8rem', textAlign: 'left', margin: 0}}>
              天赋树模拟器
            </h1>
            {/* 职业切换 */}
            <div style={{display: 'flex', gap: '0.4rem'}}>
              {classes.map(c => (
                <button
                  key={c.key}
                  onClick={() => setActiveClass(c.key)}
                  className={`talent-reset-btn ${activeClass === c.key ? 'talent-class-active' : ''}`}
                >
                  {c.icon} {c.name}
                </button>
              ))}
            </div>
            {/* 点数 */}
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
              <div style={{fontSize: '0.85rem', color: 'var(--muted)'}}>已分配 / 剩余</div>
              <div style={{
                fontSize: '1.2rem', fontFamily: 'Cinzel, serif',
                color: totalPoints > 0 ? 'var(--gold-light)' : 'var(--red-glow)',
                fontWeight: 'bold', textShadow: '0 0 6px rgba(201,165,91,0.4)'
              }}>
                {totalAlloc} / {TOTAL_POINTS}
              </div>
              <button className="talent-reset-btn" onClick={() => resetClass(activeClass)}>重置</button>
            </div>
          </div>
        </div>
      </div>

      <div className="page-wrap" style={{maxWidth: 1400}}>
        {/* Tab 切换 */}
        <div style={{display: 'flex', gap: '0', marginBottom: '0.5rem', borderBottom: '2px solid var(--border-gold)'}}>
          <button className="talent-tab active">⚔️ 战斗天赋</button>
        </div>

        <div className="talent-tree-container">
          {/* 左侧等级条 */}
          <div className="talent-level-rail">
            <div className="level-rail-marker"><span>1</span></div>
            <div className="level-rail-section"></div>
            <div className="level-rail-marker"><span>5</span></div>
            <div className="level-rail-section"></div>
            <div className="level-rail-marker"><span>10</span></div>
            <div className="level-rail-section"></div>
            <div className="level-rail-marker"><span>15</span></div>
            <div className="level-rail-section"></div>
            <div className="level-rail-marker"><span>20</span></div>
            <div className="level-rail-section"></div>
            <div className="level-rail-marker"><span>25</span></div>
            <div className="level-rail-section"></div>
            <div className="level-rail-marker"><span>30</span></div>
            <div className="level-rail-section"></div>
            <div className="level-rail-marker"><span>40</span></div>
          </div>
          {/* 主天赋网格 + 连接线 SVG */}
          <div className="talent-tree">
            {/* SVG 连线层 */}
            <svg className="talent-connector" viewBox="0 0 500 600" preserveAspectRatio="none">
              {layout.map(node => {
                if (node.talentIdx < 0) return null
                const colNodes = layout.filter(n => n.col === node.col && n.talentIdx >= 0)
                const idx = colNodes.findIndex(n => n.tier === node.tier)
                if (idx < 0 || idx >= colNodes.length - 1) return null
                const next = colNodes[idx + 1]
                const fromX = (node.col + 0.5) / 5 * 100
                const toX = (next.col + 0.5) / 5 * 100
                const fromY = (node.tier + 0.5) / 7 * 100
                const toY = (next.tier + 0.5) / 7 * 100
                const active = getAlloc(activeClass, node.talentIdx) >= node.maxPoints
                return (
                  <line
                    key={`l-${node.col}-${node.tier}`}
                    x1={`${fromX}%`} y1={`${fromY}%`}
                    x2={`${toX}%`} y2={`${toY}%`}
                    stroke={active ? '#c9a55b' : 'rgba(201, 165, 91, 0.25)'}
                    strokeWidth={active ? '3' : '2'}
                  />
                )
              })}
            </svg>

            {/* 节点网格 */}
            {layout.map(node => {
              const isLocked = node.locked
              const talent = node.talentIdx >= 0 ? currentTalents[node.talentIdx] : null
              const cur = talent ? getAlloc(activeClass, node.talentIdx) : 0
              const isMax = cur >= node.maxPoints
              return (
                <div
                  key={`n-${node.col}-${node.tier}`}
                  className={`talent-node-tree ${isLocked ? 'is-locked' : ''} ${cur > 0 ? 'is-active' : ''} ${isMax ? 'is-full' : ''}`}
                  style={{
                    gridColumn: node.col + 1,
                    gridRow: node.tier + 1
                  }}
                  onClick={() => !isLocked && talent && handleNodeClick(activeClass, node.talentIdx, node.maxPoints)}
                  onMouseEnter={(e) => { if (!isLocked && talent) { setMousePos({ x: e.clientX, y: e.clientY }); setHoveredTalent({ ...talent, idx: node.talentIdx, col: node.col, tier: node.tier, cur, max: node.maxPoints, desc: talent.desc || '点击分配点数提升效果' }) } }}
                  onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
                  onMouseLeave={() => setHoveredTalent(null)}
                >
                  {isLocked ? (
                    <div className="talent-locked">🔒</div>
                  ) : (
                    <>
                      <div className="talent-icon-frame">
                        <img src={`/images/icons/Warriorskill_${String(Math.min(node.talentIdx + 1, 37)).padStart(2, '0')}.png`}
                             onError={(e) => { e.target.style.display='none'; e.target.parentElement.innerHTML=`<span style="font-size:1.4rem;filter:grayscale(0)">${currentClass?.icon}</span>` }}
                             alt="" />
                      </div>
                      <div className="talent-counter">
                        {cur}/{node.maxPoints}
                      </div>
                    </>
                  )}
                </div>
              )
            })}

            {/* 鼠标跟随 tooltip */}
            {hoveredTalent && (() => {
              const liveCur = getAlloc(activeClass, hoveredTalent.idx)
              const pp = hoveredTalent.perPoint || 1
              const unit = hoveredTalent.unit || ''
              const liveDesc = (hoveredTalent.desc || '').replace(/\{value\}/g, liveCur * pp).replace(/\{value1\}/g, liveCur * pp).replace(/\{value2\}/g, liveCur * pp)
              return (
              <div className="talent-tooltip-follow"
                style={{ left: mousePos.x + 16, top: mousePos.y - 10 }}
                key={`tt-${hoveredTalent.idx}-${liveCur}`}
              >
                <div className="tt-follow-header">
                  <img src={`/images/icons/passives/Skill_${String(hoveredTalent.idx + 1).padStart(3, '0')}.png`}
                       onError={(e) => { e.target.style.display='none' }} alt="" className="tt-follow-icon" />
                  <div>
                    <div className="tt-follow-name">{hoveredTalent.name}</div>
                    <div className="tt-follow-tag">{currentClass?.icon} {currentClass?.name} · 等级 {hoveredTalent.tier + 1}</div>
                  </div>
                </div>
                <div className="tt-follow-desc">{liveDesc || '点击分配点数提升效果'}</div>
                <div className="tt-follow-stats">
                  <div className="tt-stat-row"><span className="tt-stat-label">当前</span><span className="tt-stat-val">+{liveCur * pp}{unit}</span></div>
                  <div className="tt-stat-row"><span className="tt-stat-label">最大</span><span className="tt-stat-val">+{hoveredTalent.max * pp}{unit}</span></div>
                  <div className="tt-stat-row"><span className="tt-stat-label">剩余</span><span className="tt-stat-val">{(hoveredTalent.max - liveCur) * pp}{unit}</span></div>
                </div>
                <div className="tt-follow-hint">⚡ 点击节点分配/取消点数</div>
              </div>
              )
            })()}
          </div>

          {/* 右侧总加成面板 */}
          <div className="talent-summary-panel">
            <div className="summary-title">📊 总天赋加成</div>
            <div className="summary-class">{currentClass?.icon} {currentClass?.name}</div>
            <div className="summary-points">
              <span style={{color: 'var(--gold-light)'}}>{totalAlloc}</span>
              <span style={{color: 'var(--muted)'}}> / {TOTAL_POINTS}</span>
            </div>
            <div className="summary-list">
              {Object.keys(bonusSummary).length === 0 ? (
                <div style={{color: 'var(--muted)', textAlign: 'center', padding: '1.5rem 0', fontSize: '0.85rem'}}>
                  点击节点分配点数
                </div>
              ) : (
                Object.entries(bonusSummary).map(([stat, info]) => {
                  const unit = info.talents[0]?.unit || ''
                  return (
                    <div key={stat} className="summary-row">
                      <span className="summary-stat">{stat}</span>
                      <span className="summary-value">+{info.points}{unit}</span>
                    </div>
                  )
                })
              )}
            </div>
            <div className="summary-divider"></div>
            <div style={{fontSize: '0.75rem', color: 'var(--muted)', textAlign: 'center'}}>
              总分配 <span style={{color: 'var(--gold-light)'}}>{totalAlloc}</span> 点 ·
              剩余 <span style={{color: totalPoints > 0 ? 'var(--gold-light)' : 'var(--red-glow)'}}>{totalPoints}</span> 点
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
