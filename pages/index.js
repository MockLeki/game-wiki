import Layout from '../components/Layout'
import Link from 'next/link'

export default function Home() {
  const stats = [
    { num: 112, label: '装备' },
    { num: 36, label: '仆从' },
    { num: 12, label: '关卡' },
    { num: 90, label: '技能' },
    { num: 41, label: '词条' },
    { num: 12, label: '材料' },
  ]
  const cards = [
    { icon: '⚔️', title: '装备图鉴', desc: '112 件装备 × 4 品质 × 10 部位，含传说特效', link: '/gear' },
    { icon: '🎯', title: '技能大全', desc: '战士/法师 90 条技能，完整效果与冷却', link: '/skills' },
    { icon: '✨', title: '词条计算器', desc: '10 部位 × 41 词缀，实时属性汇总', link: '/affixes' },
    { icon: '🐺', title: '仆从大全', desc: '36 只可捕获仆从，品质/物种/被动一览', link: '/minions' },
    { icon: '🗺️', title: '关卡攻略', desc: '12 个区域，Boss 打法＋掉落物品一览', link: '/levels' },
    { icon: '⚔️', title: 'BD 构筑模拟器', desc: '112 件装备 × 41 词条 × 90 技能，自由配装', link: '/build' },
    { icon: '👥', title: '玩家社区', desc: '论坛讨论、新手问答、BD 分享', link: 'https://deskrawl.freeflarum.com' },
    { icon: '❓', title: '常见问题', desc: '新手入门、游戏技巧、疑难解答', link: '/faq' },
  ]
  return (
    <Layout>
      <div className="hero">
        <h1>桌面破坏神 Wiki</h1>
        <p className="tagline">噜总本人的游戏攻略与全图鉴预览 · QQ 玩家交流群 737018935</p>
        <div className="hero-stats">
          {stats.map(s => (
            <div className="hero-stat" key={s.label}>
              <div className="stat-num">{s.num}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="steam-bar">
          <div className="steam-bar-inner">
            <div className="steam-stat-live"><span className="steam-dot"></span><span>在线</span><strong id="steam-count">-</strong></div>
            <div className="steam-stat-live"><span>⭐</span><span>好评</span><strong id="steam-review">-</strong></div>
            <div className="steam-stat-live"><span>💰</span><span>价格</span><strong id="steam-price">-</strong></div>
          </div>
        </div>
      </div>
      <div className="cards-grid" style={{maxWidth: 1200, margin: '0 auto'}}>
        {cards.map(c => (
          c.link.startsWith('http') ? (
            <a key={c.title} href={c.link} target="_blank" rel="noopener" className="card">
              <div className="card-icon">{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </a>
          ) : (
            <Link key={c.title} href={c.link} className="card">
              <div className="card-icon">{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </Link>
          )
        ))}
      </div>
    </Layout>
  )
}
