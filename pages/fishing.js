import Layout from '../components/Layout'
import fishingData from '../public/data/fishing.json'

export async function getStaticProps() { return { props: {} } }

const QUALITY_COLORS = {
  common: 'var(--l-common)',
  uncommon: 'var(--l-uncommon)',
  rare: 'var(--l-rare)',
}
const TIER_COLORS = {
  good_gold: 'var(--cyan)',
  handsomely: 'var(--gold)',
  small_fortune: 'var(--magenta)',
}

export default function FishingPage() {
  const { beach, priceTiers, fish, stats } = fishingData

  // 按品质 + 价格档分组
  const grouped = {}
  for (const f of fish) {
    if (!grouped[f.quality]) grouped[f.quality] = []
    grouped[f.quality].push(f)
  }
  // 出货图：按价格档聚合
  const tierStats = Object.entries(priceTiers).map(([k, v]) => {
    const items = fish.filter(f => f.priceTier === k)
    return { key: k, label: v.cn, labelEn: v.en, rank: v.rank, count: items.length }
  })

  return (
    <Layout title="钓鱼出货图 - 桌面破坏神">
      <div className="page-wrap">
        <div className="hero-card" style={{ padding: '1.5rem' }}>
          <h1 className="hero-title" style={{ fontSize: '2.2rem', textAlign: 'left' }}>🎣 钓鱼出货图</h1>
          <p className="hero-subtitle" style={{ textAlign: 'left', margin: 0 }}>
            {beach.name}（{beach.nameEn}）— 共 {stats.total} 种可钓上钩的鱼。
          </p>
          <div style={{ color: 'var(--text)', fontSize: '0.85rem', marginTop: '0.8rem', padding: '0.6rem 1rem', background: 'rgba(0,0,0,0.3)', borderLeft: '3px solid var(--gold)' }}>
            {beach.desc}
          </div>
        </div>

        {/* 出货价值图 */}
        <div className="panel" style={{ marginBottom: '1.2rem' }}>
          <div className="panel-title">📊 出货价值分布</div>
          <div style={{ padding: '1.2rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2rem', height: 200, marginBottom: '0.5rem' }}>
              {tierStats.map(t => (
                <div key={t.key} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ color: 'var(--text)', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                    <strong style={{ color: TIER_COLORS[t.key], fontFamily: 'Cinzel, serif', fontSize: '1.4rem' }}>{t.count}</strong>
                    <div style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>种</div>
                  </div>
                  <div style={{
                    width: '100%', maxWidth: 120,
                    height: `${(t.rank / 8) * 100}%`,
                    minHeight: 30,
                    background: `linear-gradient(180deg, ${TIER_COLORS[t.key]} 0%, #1a1a1a 130%)`,
                    boxShadow: `0 0 12px ${TIER_COLORS[t.key]}88, inset 0 0 8px rgba(255,255,255,0.15)`,
                    borderTop: `2px solid ${TIER_COLORS[t.key]}`,
                  }} />
                  <div style={{ marginTop: '0.5rem', textAlign: 'center' }}>
                    <div style={{ color: TIER_COLORS[t.key], fontSize: '0.95rem', fontWeight: 600 }}>{t.label}</div>
                    <div style={{ color: 'var(--muted)', fontSize: '0.75rem' }}>{t.labelEn}</div>
                    <div style={{ color: 'var(--muted)', fontSize: '0.7rem', marginTop: '0.2rem' }}>价值档位 ×{t.rank}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--muted)', textAlign: 'center', paddingTop: '0.8rem', borderTop: '1px solid var(--border)' }}>
              价值档位基于游戏内"商人愿意付的价格"描述：好价钱 → 丰厚金币 → 一笔小财富（相对倍数估算）
            </div>
          </div>
        </div>

        {/* 鱼类卡片 */}
        {['rare', 'uncommon', 'common'].map(q => {
          if (!grouped[q] || !grouped[q].length) return null
          return (
            <div key={q} className="panel" style={{ marginBottom: '1rem' }}>
              <div className="panel-title">
                <span style={{
                  display: 'inline-block', padding: '0.15rem 0.6rem', marginRight: '0.6rem',
                  background: QUALITY_COLORS[q], color: q === 'common' ? '#000' : '#fff',
                  fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em'
                }}>{q}</span>
                {q === 'rare' ? '稀有 / 药效鱼（4 种）' : q === 'uncommon' ? '非凡鱼（2 种）' : '普通鱼（2 种）'}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0.7rem', padding: '1rem' }}>
                {grouped[q].map(f => (
                  <div key={f.id} className={`item-card q-${f.quality}`} style={{ padding: '0.9rem' }}>
                    <div className="item-name" style={{ fontSize: '0.95rem' }}>{f.name}</div>
                    <div style={{ color: 'var(--muted)', fontSize: '0.7rem', marginBottom: '0.5rem' }}>{f.nameEn}</div>
                    <div style={{ color: 'var(--text)', fontSize: '0.82rem', lineHeight: 1.5 }}>{f.desc}</div>
                    {f.effect && (
                      <div style={{ marginTop: '0.5rem', padding: '0.3rem 0.6rem', background: 'rgba(201,162,39,0.1)', border: '1px solid var(--border)', fontSize: '0.78rem', color: 'var(--gold)' }}>
                        ⚗ {f.effect}
                      </div>
                    )}
                    <div style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border)', fontSize: '0.78rem', color: TIER_COLORS[f.priceTier] }}>
                      💰 售价：{priceTiers[f.priceTier].cn} <span style={{ color: 'var(--muted)' }}>(×{priceTiers[f.priceTier].rank})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}