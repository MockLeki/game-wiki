import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

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
          <Link href="/faq" style={{fontSize:'0.85rem',color:'var(--text)'}}>常见问题</Link>
          <a href="https://deskrawl.freeflarum.com" target="_blank" rel="noopener" style={{fontSize:'0.85rem'}}>论坛</a>
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
