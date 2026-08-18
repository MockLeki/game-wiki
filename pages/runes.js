import Layout from '../components/Layout'
import { useState } from 'react'
import runesData from '../public/data/runes.json'

export async function getStaticProps() { return { props: {} } }

const SKILL_NAMES = {
  BasicAttack: '普通攻击', HeavyAttack: '重击', Special: '特殊技能',
  StrongAttack: '强力攻击', RageShout: '怒吼', RageShield: '怒盾',
}

export default function RunesPage() {
  const [tab, setTab] = useState('rare') // rare | uncommon | set

  const heroes = runesData.heroes || {}
  const uncommon = runesData.uncommon || []
  const rare = runesData.rare || []
  const setRune = runesData.set || {}

  // 稀有符文按英雄分组
  const rareByHero = {}
  for (const r of rare) {
    const h = r.hero || 'Other'
    if (!rareByHero[h]) rareByHero[h] = []
    rareByHero[h].push(r)
  }

  return (
    <Layout title="符文图鉴 - 桌面破坏神">
      <div className="page-wrap">
        <div className="hero-card" style={{ padding: '1.5rem' }}>
          <h1 className="hero-title" style={{ fontSize: '2.2rem', textAlign: 'left' }}>符文图鉴</h1>
          <p className="hero-subtitle" style={{ textAlign: 'left', margin: 0 }}>
            符文可镶嵌于技能，强化对应技能效果。含普通符文 {uncommon.length} 种、稀有符文 {rare.length} 种、套装符文 1 套。
          </p>
        </div>

        {/* Tab 切换 */}
        <div className="talent-tabs" style={{ marginBottom: '1rem' }}>
          <button className={`talent-tab ${tab === 'rare' ? 'active' : ''}`} onClick={() => setTab('rare')}>⚔ 稀有符文</button>
          <button className={`talent-tab ${tab === 'uncommon' ? 'active' : ''}`} onClick={() => setTab('uncommon')}>✨ 普通符文</button>
          <button className={`talent-tab ${tab === 'set' ? 'active' : ''}`} onClick={() => setTab('set')}>🛡 套装符文</button>
        </div>

        {/* 稀有符文：按英雄分组 */}
        {tab === 'rare' && Object.entries(heroes).map(([heroKey, heroName]) => {
          const heroRunes = (rareByHero[heroKey] || []).sort((a, b) => a.id.localeCompare(b.id))
          if (!heroRunes.length) return null
          // 按技能分组
          const bySkill = {}
          for (const r of heroRunes) {
            const s = r.skill || 'Other'
            if (!bySkill[s]) bySkill[s] = []
            bySkill[s].push(r)
          }
          return (
            <div key={heroKey} className="panel" style={{ marginBottom: '1.2rem' }}>
              <div className="panel-title">⚔ {heroName} <span style={{ fontSize: '0.75rem', opacity: 0.6, marginLeft: '0.5rem' }}>{heroKey}</span></div>
              {Object.entries(bySkill).map(([skill, runes]) => (
                <div key={skill} style={{ padding: '0.5rem 1rem' }}>
                  <div style={{ color: 'var(--muted)', fontSize: '0.78rem', margin: '0.5rem 0 0.4rem', letterSpacing: '0.05em' }}>
                    — {SKILL_NAMES[skill] || skill} —
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '0.6rem' }}>
                    {runes.map(r => (
                      <div key={r.id} className="item-card" style={{ padding: '0.7rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                          <span style={{
                            width: 22, height: 22, flexShrink: 0,
                            background: 'linear-gradient(135deg, #4a90d9 0%, #1a1a1a 140%)',
                            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#fff', fontSize: '0.6rem', fontWeight: 700,
                          }}>{r.tier}</span>
                          <div style={{ flex: 1 }}>
                            <div className="item-name" style={{ fontSize: '0.88rem' }}>{r.name}</div>
                            <div style={{ color: 'var(--muted)', fontSize: '0.68rem' }}>{r.nameEn}</div>
                          </div>
                        </div>
                        {/* 属性加成 */}
                        {r.attributes?.length > 0 && (
                          <div style={{ fontSize: '0.75rem', color: 'var(--text)', lineHeight: 1.5, padding: '0.3rem 0' }}>
                            {r.attributes.map((a, i) => (
                              <div key={i} style={{ color: 'var(--cyan-light)' }}>{a.text}</div>
                            ))}
                          </div>
                        )}
                        {/* 技能等级强化 */}
                        {r.abilityLevels && (
                          <div style={{ fontSize: '0.7rem', color: 'var(--muted)', marginTop: '0.3rem', paddingTop: '0.3rem', borderTop: '1px solid var(--border)' }}>
                            技能等级 +{r.abilityLevels}（每 {r.everyNRuneLevels} 符文等级）
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )
        })}

        {/* 普通符文 */}
        {tab === 'uncommon' && (
          <div className="panel">
            <div className="panel-title">✨ 普通符文</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.7rem', padding: '1rem' }}>
              {uncommon.map(r => (
                <div key={r.id} className="item-card q-uncommon" style={{ padding: '0.8rem' }}>
                  <div className="item-name" style={{ fontSize: '0.92rem' }}>{r.name}</div>
                  <div style={{ color: 'var(--muted)', fontSize: '0.7rem', marginTop: '0.2rem' }}>{r.nameEn}</div>
                  {r.attributes?.length > 0 && (
                    <div style={{ fontSize: '0.75rem', color: 'var(--cyan-light)', lineHeight: 1.5, marginTop: '0.4rem' }}>
                      {r.attributes.map((a, i) => <div key={i}>{a.text}</div>)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 套装符文 */}
        {tab === 'set' && setRune.name && (
          <div className="panel">
            <div className="panel-title">🛡 套装符文 · {setRune.name}</div>
            <div style={{ padding: '1rem' }}>
              <div style={{ color: 'var(--muted)', fontSize: '0.8rem', marginBottom: '0.8rem' }}>{setRune.nameEn}</div>
              {/* 6 件 */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.6rem', marginBottom: '1rem' }}>
                {(setRune.pieces || []).map(p => (
                  <div key={p.id} className="item-card q-legendary" style={{ padding: '0.7rem', textAlign: 'center' }}>
                    <div className="item-name" style={{ fontSize: '0.85rem' }}>{p.name}</div>
                  </div>
                ))}
              </div>
              {/* 套装效果 */}
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '0.8rem' }}>
                <div style={{ color: 'var(--cyan-light)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>套装效果</div>
                {(setRune.effects || []).map((e, i) => (
                  <div key={i} style={{ color: 'var(--text)', fontSize: '0.85rem', padding: '0.3rem 0', borderBottom: '1px dashed var(--border)' }}>
                    <span style={{ color: 'var(--gold)', marginRight: '0.4rem' }}>{['2件套', '4件套', '6件套'][i] || `${i + 1}件套`}</span>
                    {e}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
