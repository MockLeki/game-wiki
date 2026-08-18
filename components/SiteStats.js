import { useState, useEffect } from 'react'

// 本地时区日期字符串（避免 UTC 偏移）
function localDateStr(d) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export default function SiteStats() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    let alive = true
    const visitedKey = `wiki_visited_${localDateStr(new Date())}`

    async function load() {
      try {
        // 先读当前数据
        const r = await fetch('/api/stats')
        const d = await r.json()
        if (!alive) return
        setStats(d)

        // 同一浏览器当天只计一次，避免刷新重复计数
        if (!localStorage.getItem(visitedKey)) {
          localStorage.setItem(visitedKey, '1')
          const p = await fetch('/api/stats', { method: 'POST' })
          const pd = await p.json()
          if (alive) setStats(pd)
        }
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
        自 Wiki 建站以来的累计访问量（起点 {stats.start ? stats.start.toLocaleString() : '15,000'}）· 同一设备当天仅计一次
      </div>
    </div>
  )
}
