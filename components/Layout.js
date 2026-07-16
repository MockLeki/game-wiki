import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState, useRef } from 'react'

function SteamLogin() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [showCard, setShowCard] = useState(false)
  const [showEditor, setShowEditor] = useState(false)
  const [editFile, setEditFile] = useState('')
  const [editContent, setEditContent] = useState('')
  const [editMsg, setEditMsg] = useState('')
  const cardRef = useRef(null)

  useEffect(() => {
    fetch('https://deskrawl.top/api/auth/status', { credentials: 'include' })
      .then(r => r.json())
      .then(d => { if (d.loggedIn) setUser(d); setLoading(false) })
      .catch(() => setLoading(false))
    fetch('https://deskrawl.top/api/admin/check', { credentials: 'include' })
      .then(r => r.json())
      .then(d => { if (d.admin) setIsAdmin(true) })
      .catch(() => {})
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
          <div style={{display: 'flex', alignItems: 'center', gap: '0.4rem'}}>
            <span className="steam-name">{user.name}</span>
            {(user.playtime || 0) > 0 && <span className="steam-playtime">已玩 {hours} 小时</span>}
          </div>
          <a href="/api/auth/steam" className="steam-logout" title="切换 Steam 账号" onClick={e => e.stopPropagation()}>🔄</a>
          {isAdmin && (
            <span className="admin-gear" title="管理员数据编辑" onClick={e => { e.stopPropagation()
              const files = ['items.json', 'talents.json', 'minions.json', 'levels.json', 'affixes.json', 'skills.json']
              const choice = prompt('选择要编辑的文件:\n' + files.map((f, i) => `${i+1}. ${f}`).join('\n') + '\n\n输入 1-6:')
              if (choice) {
                const idx = parseInt(choice) - 1
                if (idx >= 0 && idx < files.length) {
                  setEditFile(files[idx])
                  fetch(`https://deskrawl.top/api/data/${files[idx]}`)
                    .then(r => r.text())
                    .then(t => { setEditContent(t); setShowEditor(true) })
                    .catch(() => {
                      // 回退从 GitHub 加载
                      fetch(`https://raw.githubusercontent.com/MockLeki/game-wiki/main/public/data/${files[idx]}`)
                        .then(r => r.text())
                        .then(t => { setEditContent(t); setShowEditor(true) })
                        .catch(() => { setEditContent('{}'); setShowEditor(true) })
                    })
                  setEditMsg('')
                }
              }
            }}>⚙️</span>
          )}
        </div>
        {showCard && user.steamId && (
          <div className="steam-popup-card">
            <steam-user steamid={user.steamId} size="184" showLogin="false" showProfileUrl="true"></steam-user>
          </div>
        )}
        {/* 管理员编辑浮窗 */}
        {showEditor && (
          <>
            <div className="admin-overlay" onClick={() => setShowEditor(false)} />
            <div className="admin-editor">
              <h3 style={{color: '#c9a96a', marginBottom: '0.6rem'}}>编辑数据: {editFile}</h3>
              <textarea value={editContent} onChange={e => setEditContent(e.target.value)}
                style={{width:'100%', height:'60vh', background:'#0a0806', color:'#c0b8a8',
                  border:'1px solid #6b5230', padding:'0.8rem', fontSize:'0.85rem',
                  fontFamily:'monospace', resize:'vertical'}} />
              <div style={{marginTop:'0.8rem', display:'flex', gap:'0.5rem'}}>
                <button onClick={async () => {
                  try {
                    const parsed = JSON.parse(editContent)
                    setEditMsg('保存中...')
                    const res = await fetch('https://deskrawl.top/api/admin/save', {
                      method: 'POST', credentials: 'include',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ file: editFile, content: parsed })
                    })
                    const d = await res.json()
                    if (d.ok) { setEditMsg('✅ 已保存！1-2 分钟自动更新到 wiki'); setShowEditor(false) }
                    else setEditMsg('❌ ' + (d.error || '保存失败'))
                  } catch(e) { setEditMsg('❌ JSON 格式错误: ' + e.message) }
                }} style={{background:'#4a2020', border:'1px solid #998055', color:'#c9a96a',
                  padding:'0.5rem 1rem', cursor:'pointer', fontSize:'0.9rem'}}>
                  保存 + 部署
                </button>
                <button onClick={() => { setShowEditor(false); setEditMsg('') }}
                  style={{background:'none', border:'1px solid #6b5230', color:'#706858',
                    padding:'0.5rem 1rem', cursor:'pointer', fontSize:'0.9rem'}}>取消</button>
                <span style={{color: editMsg.includes('✅') ? '#c9a96a' : '#b83030', fontSize:'0.85rem', alignSelf:'center'}}>{editMsg}</span>
              </div>
            </div>
          </>
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
