import { useState, useEffect } from 'react'

export default function SiteStats() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    let alive = true

    async function load() {
      try {
        // 每次进入 wiki 都 +1（不做设备去重）
        const p = await fetch('/api/stats', { method: 'POST' })
        const d = await p.json()
        if (alive) setStats(d)
      } catch (e) {
        // API 未部署时静默失败
      }
    }
    load()
    return () => { alive = false }
  }, [])

  if (!stats) return null

  const cells = [
    { label: '总访问量', value: stats.total, highlight: true },
    { label: '今日访问', value: stats.today || 0 },
    { label: '昨日访问', value: stats.yesterday || 0 },
    { label: '最高单日', value: stats.peak || 0 },
  ]

  return (
    <div className="panel" style={{ marginTop: '1.5rem' }}>
      <div className="panel-title">📊 站点数据</div>
      <div className="site-stats-grid" style={{ padding: '1rem 1.2rem' }}>
        {cells.map((c, i) => (
          <div key={c.label} style={{
            textAlign: 'center',
            borderLeft: i > 0 ? '1px solid var(--border)' : 'none',
          }}>
            <div style={{ color: 'var(--muted)', fontSize: '0.78rem', letterSpacing: '0.05em' }}>{c.label}</div>
            <div style={{
              color: c.highlight ? 'var(--cyan-light)' : 'var(--text-bright)',
              fontSize: '1.9rem', fontWeight: 700, fontFamily: 'Cinzel, serif',
              textShadow: c.highlight ? '0 0 6px rgba(201,162,39,0.4)' : 'none',
            }}>
              {c.value.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: '0 1.2rem 0.9rem', fontSize: '0.75rem', color: 'var(--muted)', textAlign: 'center' }}>
        自 Wiki 建站以来的累计访问量 · 每次进入 +1
      </div>
    </div>
  )
}
