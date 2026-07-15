import Head from 'next/head'
import Link from 'next/link'

export default function Layout({ children, title = '桌面破坏神 Wiki' }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="桌面破坏神 Deskrawl 最全游戏资料站" />
        <link rel="icon" href="/logo.png" />
        <script src="/steam-widget.js" defer></script>
      </Head>
      <nav className="topnav">
        <Link href="/" className="logo">⚔️ 桌面破坏神 Wiki</Link>
        <div className="nav-links">
          <Link href="/gear">装备图鉴</Link>
          <Link href="/skills">技能大全</Link>
          <Link href="/affixes">词条计算器</Link>
          <Link href="/minions">仆从大全</Link>
          <Link href="/levels">关卡大全</Link>
          <Link href="/build">构筑模拟器</Link>
          <Link href="/faq">常见问题</Link>
        </div>
        <div className="nav-right">
          <a href="https://deskrawl.freeflarum.com" target="_blank" rel="noopener">💬 论坛</a>
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
