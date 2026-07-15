import Layout from '../components/Layout'
import Link from 'next/link'

export default function Home() {
  const stats = [
    { icon: '⚔️', name: '装备', num: 112 },
    { icon: '🛡️', name: '仆从', num: 36 },
    { icon: '🗺️', name: '关卡', num: 12 },
    { icon: '🎯', name: '技能', num: 90 },
    { icon: '✨', name: '词条', num: 41 },
    { icon: '💎', name: '材料', num: 12 },
    { icon: '🐺', name: '被动', num: 32 },
    { icon: '📜', name: '新闻', num: 5 },
  ]
  const sections = [
    { icon: '🗡️', name: '装备图鉴', num: 112, desc: '4 品质 × 10 部位，含传说特效', link: '/gear' },
    { icon: '🔮', name: '技能大全', num: 90, desc: '战士/法师技能，完整效果冷却', link: '/skills' },
    { icon: '✨', name: '词条计算器', num: 41, desc: '实时属性汇总，模拟配装', link: '/affixes' },
    { icon: '🐺', name: '仆从大全', num: 36, desc: '品质/物种/捕获地点', link: '/minions' },
  ]
  const tools = [
    { icon: '💰', name: '刷金/经验优化', desc: '查找最适合刷取的关卡' },
    { icon: '📦', name: '掉落查询', desc: '查看物品从哪里掉落' },
    { icon: '⚔️', name: 'BD 规划器', desc: '规划你的英雄养成方案' },
  ]
  return (
    <Layout>
      <div className="page-wrap">
        <div className="hero-card">
          <h1 className="hero-title">桌面破坏神 Wiki</h1>
          <p className="hero-subtitle">
            浏览桌面破坏神·挂机ARPG的装备、材料、关卡宝箱、掉落表、仆从、词条和刷取数据，
            整合成玩家随时可用的 Wiki。
          </p>
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

        <div className="hero-card" style={{background: 'var(--bg-card)'}}>
          <h2 style={{color: 'var(--gold)', fontSize: '1.4rem', marginBottom: '1rem', textAlign: 'center'}}>
            📊 桌面破坏神·挂机ARPG 数据库
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

        <div className="hero-card" style={{background: 'var(--bg-card)'}}>
          <h2 style={{color: 'var(--gold)', fontSize: '1.4rem', marginBottom: '1rem', textAlign: 'center'}}>
            🛠️ 桌面破坏神·刷取与掉落工具
          </h2>
          <div className="hero-stats-grid" style={{gridTemplateColumns: 'repeat(3, 1fr)'}}>
            {tools.map(t => (
              <div className="hero-stat" key={t.name}>
                <div className="hero-stat-icon">{t.icon}</div>
                <div className="hero-stat-text">
                  <div className="hero-stat-name">{t.name}</div>
                  <div className="hero-stat-num" style={{fontSize: '0.9rem', color: 'var(--text)'}}>{t.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
