import Layout from '../components/Layout'
import { useState } from 'react'
import achievements from '../public/data/achievements.json'

export async function getStaticProps() { return { props: {} } }

const rateNum = (r) => parseFloat(String(r).replace('%', '')) || 0

export default function AchievementsPage() {
  const [q, setQ] = useState('')
  const [rareFirst, setRareFirst] = useState(true)

  const list = achievements
    .filter(a => !q || a.name.includes(q) || a.desc.includes(q) ||
      (a.tags || []).some(t => t.includes(q)))
    .slice()
    .sort((a, b) => rareFirst ? rateNum(a.rate) - rateNum(b.rate) : rateNum(b.rate) - rateNum(a.rate))

  return (
    <Layout title="Steam 成就 - 桌面破坏神">
      <div className="page-header">
        <h1>Steam 成就</h1>
        <p>共 {achievements.length} 个成就 · 全球达成率取自 Steam 公开统计</p>
      </div>

      <div className="page-wrap">
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '1.2rem', alignItems: 'center' }}>
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="搜索成就名称、描述或首领…"
            style={{
              flex: '1 1 240px', minWidth: 200, padding: '0.55rem 0.8rem',
              background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-cyan)',
              color: 'var(--text-bright)', fontSize: '0.85rem', outline: 'none',
            }}
          />
          <button
            onClick={() => setRareFirst(v => !v)}
            style={{
              padding: '0.55rem 0.9rem', background: 'rgba(201,162,39,0.08)',
              border: '1px solid var(--border-cyan)', color: 'var(--cyan-light)',
              fontSize: '0.82rem', cursor: 'pointer',
            }}
          >
            {rareFirst ? '最稀有优先' : '最常见优先'}
          </button>
          <span style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>显示 {list.length} / {achievements.length}</span>
        </div>

        <div className="items-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
          {list.map(a => (
            <div key={a.name} className="item-card">
              <div className="item-header">
                <div className="item-icon">🏆</div>
                <div>
                  <div className="item-name">{a.name}</div>
                  <div className="item-meta">{(a.tags || []).join(' · ') || '成就'}</div>
                </div>
              </div>
              <div className="item-effect">{a.desc}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '0.6rem' }}>
                <div style={{ flex: 1, height: 3, background: 'rgba(255,255,255,0.07)' }}>
                  <div style={{ width: a.rate, height: 3, background: 'var(--gold)' }} />
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--cyan-light)', fontFamily: 'monospace', minWidth: 46, textAlign: 'right' }}>
                  {a.rate}
                </span>
              </div>
            </div>
          ))}
        </div>

        {list.length === 0 && (
          <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>没有匹配的成就。</p>
        )}
      </div>
    </Layout>
  )
}
