import Layout from '../components/Layout'
import Link from 'next/link'

export default function Home() {
  const stats = [
    { icon: '⚔️', name: '装备', num: 112 },
    { icon: '🐺', name: '仆从', num: 36 },
    { icon: '🗺️', name: '关卡', num: 12 },
    { icon: '🎯', name: '技能', num: 90 },
    { icon: '✨', name: '词条', num: 41 },
    { icon: '💎', name: '材料', num: 12 },
    { icon: '🔥', name: '被动', num: 32 },
    { icon: '📜', name: '新闻', num: 5 },
  ]
  const sections = [
    { icon: '⚔️', name: '装备图鉴', num: 112, desc: '4 品质 × 10 部位', link: '/gear' },
    { icon: '🔮', name: '技能大全', num: 90, desc: '战士/法师技能', link: '/skills' },
    { icon: '✨', name: '词条计算器', num: 41, desc: '实时属性汇总', link: '/affixes' },
    { icon: '🐺', name: '仆从大全', num: 36, desc: '品质/物种/捕获', link: '/minions' },
  ]
  return (
    <Layout>
      <div className="page-wrap">
        <div className="hero-card">
          <h1 className="hero-title">桌面破坏神 · Wiki</h1>
          <p className="hero-subtitle">
            浏览桌面破坏神·挂机ARPG的装备、材料、关卡宝箱、掉落表、仆从、词条和刷取数据，
            整合成玩家随时可用的 Wiki。
          </p>
          <div className="hero-divider">
            <span className="hero-divider-icon">⚔</span>
          </div>
          <div className="hero-stats-grid">
            {stats.map(s => (
              <div className="hero-stat" key={s.name}>
                <div className="hero-stat-icon">{s.icon}</div>
                <div className="hero-stat-text">
                  <div className="hero-stat-name">{s.name}</div>
                  <div className="hero-stat-num">{s.num}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="steam-bar">
          <div className="steam-stat-live"><span className="steam-dot"></span><span>在线</span><strong id="steam-count">-</strong></div>
          <div className="steam-stat-live"><span>⭐</span><span>好评</span><strong id="steam-review">-</strong></div>
          <div className="steam-stat-live"><span>💰</span><span>价格</span><strong id="steam-price">-</strong></div>
        </div>

        <div className="hero-card" style={{padding: '2rem'}}>
          <h2 style={{color: 'var(--gold-light)', fontSize: '1.5rem', marginBottom: '1.5rem', textAlign: 'center', textShadow: '0 0 12px rgba(201,165,91,0.4)'}}>
            塔斯克巴 · 英雄数据库
          </h2>
          <div className="hero-stats-grid">
            {sections.map(s => (
              <Link href={s.link} key={s.name} className="hero-stat" style={{textDecoration:'none'}}>
                <div className="hero-stat-icon">{s.icon}</div>
                <div className="hero-stat-text">
                  <div className="hero-stat-name">{s.name}</div>
                  <div className="hero-stat-num">{s.num}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
