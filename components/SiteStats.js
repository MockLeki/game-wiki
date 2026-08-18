import { useState, useEffect } from 'react'

export default function SiteStats() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    let alive = true
    const today = new Date().toISOString().slice(0, 10)
    const visitedKey = `wiki_visited_${today}`

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

  return (
    <div className="panel" style={{ marginTop: '1.5rem' }}>
      <div className="panel-title">📊 站点数据</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.8rem', padding: '1rem 1.2rem' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: 'var(--muted)', fontSize: '0.78rem', letterSpacing: '0.05em' }}>总访问量</div>
          <div style={{ color: 'var(--cyan-light)', fontSize: '1.9rem', fontWeight: 700, fontFamily: 'Cinzel, serif', textShadow: '0 0 6px rgba(201,162,39,0.4)' }}>
            {stats.total.toLocaleString()}
          </div>
        </div>
        <div style={{ textAlign: 'center', borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)' }}>
          <div style={{ color: 'var(--muted)', fontSize: '0.78rem', letterSpacing: '0.05em' }}>今日访问</div>
          <div style={{ color: 'var(--text-bright)', fontSize: '1.9rem', fontWeight: 700, fontFamily: 'Cinzel, serif' }}>
            {stats.today.toLocaleString()}
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: 'var(--muted)', fontSize: '0.78rem', letterSpacing: '0.05em' }}>数据起点</div>
          <div style={{ color: 'var(--text-bright)', fontSize: '1.9rem', fontWeight: 700, fontFamily: 'Cinzel, serif' }}>
            {stats.start.toLocaleString()}
          </div>
        </div>
      </div>
      <div style={{ padding: '0 1.2rem 0.9rem', fontSize: '0.75rem', color: 'var(--muted)', textAlign: 'center' }}>
        自 Wiki 建站以来的累计访问量 · 同一设备当天仅计一次
      </div>
    </div>
  )
}
