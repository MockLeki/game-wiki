import Layout from '../components/Layout'
import { useState } from 'react'
import itemsData from '../public/data/items_data.json'

export async function getStaticProps() { return { props: {} } }

const RARITY_COLOR = { 0: 'var(--l-common)', 1: 'var(--l-uncommon)', 2: 'var(--l-rare)', 3: 'var(--l-legendary)', 4: 'var(--l-divine)' }

function fmtChest(it) {
  if (it.ChestMinDrops == null) return null
  const rows = [
    `开出 ${it.ChestMinDrops}~${it.ChestMaxDrops} 件物品`,
    it.ChestCommonChance != null ? `普通 ${it.ChestCommonChance}%` : null,
    it.ChestUncommonChance != null ? `非凡 ${it.ChestUncommonChance}%` : null,
    it.ChestRareChance != null ? `稀有 ${it.ChestRareChance}%` : null,
    it.ChestLegendaryChance ? `传说 ${it.ChestLegendaryChance}%` : null,
    it.ChestDivineChance ? `神圣 ${it.ChestDivineChance}%` : null,
    it.ChestGemChance ? `宝石 ${it.ChestGemChance * 100}%` : null,
  ].filter(Boolean)
  return rows.join(' · ')
}

export default function ItemsPage() {
  const groups = itemsData.groups || []
  const [tab, setTab] = useState('all')
  const total = groups.reduce((n, g) => n + g.items.length, 0)
  const shown = tab === 'all' ? groups : groups.filter(g => g.id === tab)

  return (
    <Layout title="物品图鉴 - 桌面破坏神">
      <div className="page-wrap">
        <div className="hero-card" style={{ padding: '1.5rem' }}>
          <h1 className="hero-title" style={{ fontSize: '2.2rem', textAlign: 'left' }}>物品图鉴</h1>
          <p className="hero-subtitle" style={{ textAlign: 'left', margin: 0 }}>
            材料、药水、宝箱与随从缰绳 —— 共 {total} 件物品，{groups.length} 大分类。
          </p>
        </div>

        {/* 分类切换 */}
        <div className="talent-tabs" style={{ marginBottom: '1rem', flexWrap: 'wrap' }}>
          <button className={`talent-tab ${tab === 'all' ? 'active' : ''}`} onClick={() => setTab('all')}>
            全部（{total}）
          </button>
          {groups.map(g => (
            <button key={g.id} className={`talent-tab ${tab === g.id ? 'active' : ''}`} onClick={() => setTab(g.id)}>
              {g.icon} {g.name}（{g.items.length}）
            </button>
          ))}
        </div>

        {shown.map(g => (
          <div key={g.id} className="panel" style={{ marginBottom: '1.2rem' }}>
            <div className="panel-title">{g.icon} {g.name} <span style={{ fontSize: '0.75rem', opacity: 0.6, marginLeft: '0.5rem' }}>{g.items.length} 件</span></div>

            {/* 缰绳用紧凑网格 */}
            {g.id === 'rein' ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.5rem', padding: '1rem' }}>
                {g.items.map(it => (
                  <div key={it.id} className="item-card" style={{ padding: '0.55rem 0.7rem', borderLeft: `3px solid ${RARITY_COLOR[it.rarity]}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '0.4rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', minWidth: 0 }}>
                        {it.icon && <img src={it.icon} alt="" style={{ width: 26, height: 26, objectFit: 'contain', flexShrink: 0 }} />}
                        <span className="item-name" style={{ fontSize: '0.85rem' }}>{it.name}</span>
                      </span>
                      <span style={{ color: RARITY_COLOR[it.rarity], fontSize: '0.68rem', flexShrink: 0 }}>{it.rarityName}</span>
                    </div>
                    <div style={{ color: 'var(--muted)', fontSize: '0.68rem' }}>{it.nameEn}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '0.7rem', padding: '1rem' }}>
                {g.items.map(it => {
                  const chest = fmtChest(it)
                  return (
                    <div key={it.id} className="item-card" style={{ padding: '0.85rem', borderLeft: `3px solid ${RARITY_COLOR[it.rarity]}` }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', minWidth: 0 }}>
                          {it.icon && <img src={it.icon} alt="" style={{ width: 40, height: 40, objectFit: 'contain', flexShrink: 0, filter: 'drop-shadow(0 0 4px rgba(0,0,0,0.6))' }} />}
                          <span style={{ minWidth: 0 }}>
                            <span className="item-name" style={{ fontSize: '0.95rem', display: 'block' }}>{it.name}</span>
                            <span style={{ color: 'var(--muted)', fontSize: '0.7rem' }}>{it.nameEn}</span>
                          </span>
                        </span>
                        <span style={{ color: RARITY_COLOR[it.rarity], fontSize: '0.7rem', flexShrink: 0 }}>{it.rarityName}</span>
                      </div>
                      {it.desc && <div style={{ color: 'var(--text)', fontSize: '0.8rem', lineHeight: 1.55 }}>{it.desc}</div>}
                      {it.InstantHealAmount != null && (
                        <div style={{ color: 'var(--cyan-light)', fontSize: '0.78rem', marginTop: '0.35rem' }}>立即恢复 {it.InstantHealAmount} 点生命</div>
                      )}
                      {chest && (
                        <div style={{ color: 'var(--muted)', fontSize: '0.74rem', marginTop: '0.4rem', padding: '0.3rem 0.5rem', background: 'rgba(201,162,39,0.08)', borderLeft: '2px solid var(--gold)' }}>
                          {chest}
                        </div>
                      )}
                      {it.sellPrice != null && it.sellPrice > 1 && (
                        <div style={{ marginTop: '0.45rem', paddingTop: '0.4rem', borderTop: '1px solid var(--border)', fontSize: '0.75rem', color: 'var(--gold)' }}>
                          💰 售价 {it.sellPrice.toLocaleString()} 金币
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </Layout>
  )
}
