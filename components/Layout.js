import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState, useRef } from 'react'

function SteamLogin() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showCard, setShowCard] = useState(false)
  const cardRef = useRef(null)

  useEffect(() => {
    fetch('https://deskrawl.top/api/auth/status', { credentials: 'include' })
      .then(r => r.json())
      .then(d => { if (d.loggedIn) setUser(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (showCard && user?.steamId) {
      // 给 <steam-user> 加载时间
      const timer = setTimeout(() => {
        const el = document.querySelector('steam-user')
        if (el) {
          // 删除旧的
          el.querySelectorAll('steam-user-card, steam-profile-card').forEach(c => {
            if (c.shadowRoot) c.shadowRoot.querySelector('style')?.remove()
          })
        }
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [showCard, user])

  // 点击外部关闭
  useEffect(() => {
    if (!showCard) return
    const handler = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) setShowCard(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [showCard])

  if (loading) return null

  if (user) {
    const hours = Math.floor((user.playtime || 0) / 60)
    return (
      <div ref={cardRef} className="steam-card-wrapper">
        <div className="steam-login-user" onClick={() => setShowCard(!showCard)} style={{cursor: 'pointer'}}>
          <img src={user.avatar} alt="" className="steam-avatar" />
          <div style={{lineHeight: 1.3}}>
            <span className="steam-name">{user.name}</span>
            {(user.playtime || 0) > 0 && <span className="steam-playtime">已玩 {hours} 小时</span>}
          </div>
          <span className="steam-dropdown-arrow">{showCard ? '▴' : '▾'}</span>
        </div>
        {showCard && user.steamId && (
          <div className="steam-popup-card">
            <steam-user steamid={user.steamId} size="184" showLogin="false" showProfileUrl="true"></steam-user>
          </div>
        )}
      </div>
    )
  }

  return (
    <a href="https://deskrawl.top/api/auth/steam" className="steam-login-btn">
      🎮 Steam 登录
    </a>
  )
}

export default function Layout({ children, title = '桌面破坏神 Wiki' }) {
  const router = useRouter()
  const isActive = (path) => router.pathname === path ? 'active' : ''
  const navItems = [
    { path: '/gear', label: '装备' },
    { path: '/skills', label: '技能' },
    { path: '/minions', label: '仆从' },
    { path: '/levels', label: '关卡' },
    { path: '/affixes', label: '词条' },
    { path: '/build', label: '构筑' },
  ]
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="桌面破坏神 Deskrawl 最全游戏资料站" />
        <link rel="icon" href="/logo.png" />
        <script src="/steam-widget.js" defer></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </Head>
      <nav className="topnav">
        <Link href="/" className="logo">
          <span className="logo-icon">⚔</span>
          桌面破坏神 Wiki
        </Link>
        <div className="nav-links">
          {navItems.map(n => (
            <Link key={n.path} href={n.path} className={isActive(n.path)}>{n.label}</Link>
          ))}
        </div>
        <div className="nav-right">
          <SteamLogin />
          <Link href="/faq" style={{fontSize:'0.85rem',color:'var(--text)'}}>常见问题</Link>
          <Link href="/forum" style={{fontSize:'0.85rem'}}>论坛</Link>
        </div>
      </nav>
      <main>{children}</main>
      <footer className="footer">
        <p>噜总制作 · QQ:1224325275 · 非官方 Wiki</p>
        <p className="footer-sub">QQ 官方群 1048729821 · 玩家交流群 737018935</p>
      </footer>
    </>
  )
}
