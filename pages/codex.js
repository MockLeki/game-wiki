import Layout from '../components/Layout'
import { useState } from 'react'
import enemies from '../public/data/enemies.json'
import recipes from '../public/data/recipes.json'
import lifeskills from '../public/data/lifeskills.json'

export async function getStaticProps() { return { props: {} } }

const STAT_CN = {
  BaseMaxHealth: '最大生命', BaseDamage: '伤害', BaseMoveSpeed: '移速',
  BaseCritChance: '暴击率', BaseCritDamage: '暴击伤害', BaseAttackSpeed: '攻速',
  BaseDodgeChance: '闪避', BaseMaxMana: '最大法力',
}
const STAT_ORDER = ['BaseMaxHealth', 'BaseDamage', 'BaseCritChance', 'BaseCritDamage', 'BaseAttackSpeed', 'BaseMoveSpeed', 'BaseDodgeChance', 'BaseMaxMana']

function fmtPct(v) {
  if (v == null) return '0%'
  const p = v * 100
  if (p >= 10) return `${Math.round(p)}%`
  if (p >= 1) return `${p.toFixed(1)}%`
  if (p > 0) return `${p.toFixed(2)}%`
  return '0%'
}

export default function CodexPage() {
  const [tab, setTab] = useState('enemies')

  return (
    <Layout title="图鉴 - 桌面破坏神">
      <div className="page-wrap">
        <div className="hero-card" style={{ padding: '1rem 1.5rem' }}>
          <h1 className="hero-title" style={{ fontSize: '1.8rem', textAlign: 'left', margin: 0 }}>📖 冒险图鉴</h1>
          <p className="hero-subtitle" style={{ textAlign: 'left', margin: '0.4rem 0 0' }}>
            敌人 {enemies.length} · 制作配方 {recipes.length} · 生活技能 {lifeskills.length}
          </p>
        </div>
      </div>

      <div className="page-wrap" style={{ maxWidth: 1400 }}>
        <div style={{ display: 'flex', gap: '0', marginBottom: '0.8rem', borderBottom: '2px solid var(--border-gold)' }}>
          {[['enemies', `👹 敌人图鉴（${enemies.length}）`], ['recipes', `⚗️ 制作配方（${recipes.length}）`], ['lifeskills', `🌿 生活技能（${lifeskills.length}）`]].map(([k, label]) => (
            <button key={k} className={`talent-tab ${tab === k ? 'active' : ''}`} onClick={() => setTab(k)}>{label}</button>
          ))}
        </div>

        {/* 敌人 */}
        {tab === 'enemies' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '0.7rem' }}>
            {enemies.map(e => (
              <div key={e.key} className="item-card" style={{ padding: '0.8rem 0.9rem', borderLeft: '3px solid var(--red-glow, #b3181f)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div className="item-name" style={{ fontSize: '0.95rem' }}>{e.cn}</div>
                  {e.boss && <span style={{ color: 'var(--l-divine)', fontSize: '0.68rem', fontWeight: 600 }}>BOSS</span>}
                </div>
                <div style={{ color: 'var(--muted)', fontSize: '0.7rem' }}>{e.en}</div>
                <div style={{ marginTop: '0.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.2rem 0.6rem' }}>
                  {STAT_ORDER.filter(s => e.stats && e.stats[s] != null).map(s => (
                    <div key={s} style={{ fontSize: '0.75rem', color: 'var(--text)' }}>
                      <span style={{ color: 'var(--muted)' }}>{STAT_CN[s]}</span>{' '}
                      <span style={{ color: 'var(--gold-light)', fontFamily: 'monospace' }}>
                        {s.includes('Chance') || s.includes('Dodge') ? fmtPct(e.stats[s]) : e.stats[s]}
                      </span>
                    </div>
                  ))}
                </div>
                {e.drops && e.drops.length > 0 && (
                  <div style={{ marginTop: '0.4rem', fontSize: '0.7rem', color: 'var(--muted)' }}>
                    掉落：{e.drops.map(d => <span key={d.item} style={{ color: 'var(--cyan-light)' }}>{d.item} {fmtPct(d.chance)}</span>).reduce((a, b) => a === null ? [b] : [...a, ' · ', b], null)}
                  </div>
                )}
                {e.loc && e.loc.length > 0 && (
                  <div style={{ marginTop: '0.3rem', fontSize: '0.68rem', color: 'var(--muted)' }}>
                    出没：<span style={{ color: 'var(--text)' }}>{e.loc.join('、')}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* 配方 */}
        {tab === 'recipes' && (
          <div>
            <div style={{ color: 'var(--muted)', fontSize: '0.8rem', marginBottom: '0.8rem' }}>
              宝石升级：6 种宝石 × 5 级，每级用 10 个低一级宝石合成；药水配方：植物 + 首领材料。
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.7rem' }}>
              {recipes.map(r => (
                <div key={r.key} className="item-card" style={{ padding: '0.7rem 0.9rem', borderLeft: '3px solid var(--gold)' }}>
                  <div className="item-name" style={{ fontSize: '0.9rem' }}>{r.cn}</div>
                  <div style={{ color: 'var(--muted)', fontSize: '0.68rem', marginTop: '0.15rem' }}>{r.type === 'Gem' ? '宝石升级' : '药水炼制'}</div>
                  <div style={{ marginTop: '0.45rem', fontSize: '0.78rem', lineHeight: 1.7 }}>
                    <div><span style={{ color: 'var(--muted)' }}>产出：</span><span style={{ color: 'var(--gold-light)' }}>{r.output} ×{r.outQty}</span></div>
                    <div><span style={{ color: 'var(--muted)' }}>材料：</span>
                      {r.ing.map(i => <span key={i.item} style={{ color: 'var(--text)' }}>{i.item} ×{i.amt}</span>).reduce((a, b) => a === null ? [b] : [...a, '，', b], null)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 生活技能 */}
        {tab === 'lifeskills' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '0.7rem' }}>
            {lifeskills.map(l => (
              <div key={l.key} className="item-card" style={{ padding: '0.7rem 0.9rem', borderLeft: '3px solid var(--l-rare)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div className="item-name" style={{ fontSize: '0.9rem' }}>{l.cn}</div>
                  <span style={{ color: 'var(--muted)', fontSize: '0.68rem' }}>{l.key.replace('LifeSkill', 'Lv.')}</span>
                </div>
                <div style={{ color: 'var(--muted)', fontSize: '0.68rem' }}>{l.en}</div>
                {l.desc && <div style={{ color: 'var(--text)', fontSize: '0.78rem', marginTop: '0.35rem', lineHeight: 1.6 }}>{l.desc}</div>}
                {l.prereq && <div style={{ color: 'var(--muted)', fontSize: '0.68rem', marginTop: '0.3rem' }}>前置：{l.prereq}</div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}
