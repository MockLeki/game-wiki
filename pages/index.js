import Layout from '../components/Layout'
import Link from 'next/link'
import LeaderboardPanel from '../components/LeaderboardPanel'

export default function Home() {
  const stats = [
    { icon: '⚔️', name: '装备', num: 112, link: '/gear' },
    { icon: '🐺', name: '仆从', num: 36, link: '/minions' },
    { icon: '🗺️', name: '关卡', num: 12, link: '/world' },
    { icon: '🎯', name: '技能', num: 90, link: '/skills' },
    { icon: '✨', name: '词条', num: 41, link: '/affixes' },
    { icon: '📜', name: '构筑', num: 0, link: '/build' },
  ]
  return (
    <Layout>
      <div className="page-wrap">
        <div className="hero-card">
          <div className="corner-deco tl"></div>
          <div className="corner-deco tr"></div>
          <div className="corner-deco bl"></div>
          <div className="corner-deco br"></div>
          <h1 className="hero-title">桌面破坏神 · Wiki</h1>
          <p className="hero-subtitle">
            浏览桌面破坏神·挂机ARPG的装备、材料、关卡宝箱、掉落表、仆从、词条和刷取数据，
            整合成玩家随时可用的 Wiki。
          </p>
          <div className="site-disclaimer">
            本网站由噜总制作，无官方认证。如果觉得画风/风格做得不好，请您另寻其他网站。
            如果害怕信息泄露，右上角 Steam 可不进行登录。感谢配合！
          </div>
          <div className="hero-divider">
            <span className="hero-divider-icon">⚔</span>
          </div>
          <div className="hero-stats-grid">
            {stats.map(s => (
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

        {/* QQ 玩家交流群入口 */}
        <a
          href="http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=tTr3PtGD-sn0ITvzpY4klDQwfNFri5q2&authKey=k62xg20XR6coL4RfYlizMm2Q8hh2abDXqnFAE1qxOARsHdgrza9zGkiY1Sh5IXUW&noverify=0&group_code=737018935"
          target="_blank"
          rel="noopener noreferrer"
          className="forum-cta"
          style={{borderColor:'rgba(201,165,91,0.45)'}}
        >
          <div className="forum-cta-bg" />
          <div className="forum-cta-content">
            <div className="forum-cta-icon">💬</div>
            <div className="forum-cta-text">
              <div className="forum-cta-title">加入玩家 QQ 交流群</div>
              <div className="forum-cta-subtitle">
                群号
                <strong style={{
                  color:'#c9a96a', fontFamily:'monospace', fontSize:'1.05rem',
                  letterSpacing:'0.1em', margin:'0 0.4rem',
                  textShadow:'0 0 6px rgba(201,165,91,0.5)'
                }}>737018935</strong>
                · 讨论攻略 · 交流构筑 · 找队友
              </div>
            </div>
            <div className="forum-cta-arrow" style={{
              fontFamily:'monospace', fontSize:'1.05rem', letterSpacing:'0.1em',
              color:'#c9a96a', textShadow:'0 0 6px rgba(201,165,91,0.6)'
            }}>737018935</div>
          </div>
        </a>

        {/* 实时排行榜 */}
        <LeaderboardPanel compact />

        {/* 玩家社区论坛 - 跳转到 freeflarum */}
        <a
          href="https://deskrawl.freeflarum.com"
          target="_blank"
          rel="noopener noreferrer"
          className="forum-cta"
        >
          <div className="forum-cta-bg" />
          <div className="forum-cta-content">
            <div className="forum-cta-icon">💬</div>
            <div className="forum-cta-text">
              <div className="forum-cta-title">玩家社区论坛</div>
              <div className="forum-cta-subtitle">讨论攻略 · 交换情报 · 寻找队友</div>
            </div>
            <div className="forum-cta-arrow">↗</div>
          </div>
        </a>
      </div>
    </Layout>
  )
}
