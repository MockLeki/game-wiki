import Layout from '../../components/Layout'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function AdminIndex() {
  const [mode, setMode] = useState('?')
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    fetch('https://deskrawl.top/api/admin/check', { credentials: 'include' })
      .then(r => r.json()).then(d => setIsAdmin(d.admin))
    fetch('https://deskrawl.top/api/data/sys:maintenance_mode', { credentials: 'include' })
      .then(r => r.ok ? r.text() : 'off')
      .then(t => setMode(t.replace(/"/g, '').trim() === 'on' ? 'on' : 'off'))
      .catch(() => setMode('off'))
  }, [])

  const toggle = async () => {
    const res = await fetch('https://deskrawl.top/api/admin/toggle-maintenance', { credentials: 'include' })
    const d = await res.json()
    if (d.status) setMode(d.status)
  }
  const files = [
    { name: '装备数据', path: 'items', desc: '所有装备、属性、品质' },
    { name: '天赋数据', path: 'talents', desc: '战士/法师被动天赋' },
    { name: '仆从数据', path: 'minions', desc: '仆从、物种、被动' },
    { name: '关卡数据', path: 'levels', desc: '关卡信息' },
    { name: '词条数据', path: 'affixes', desc: '词条属性' },
    { name: '技能数据', path: 'skills', desc: '技能列表' },
  ]

  return (
    <Layout title="管理后台">
      <div className="page-wrap" style={{maxWidth: 800}}>
        <div className="hero-card" style={{padding: '2rem'}}>
          <h1 className="hero-title" style={{fontSize: '1.8rem', textAlign: 'left'}}>📝 管理后台
            {isAdmin && (
              <button onClick={toggle} className="admin-maintenance-toggle"
                style={{
                  marginLeft: '1rem', fontSize: '0.8rem',
                  background: mode === 'on' ? 'rgba(184,48,48,0.2)' : 'rgba(76,160,80,0.15)',
                  border: mode === 'on' ? '1px solid #b83030' : '1px solid #4ca050',
                  color: mode === 'on' ? '#b83030' : '#4ca050',
                  padding: '0.35rem 0.8rem', cursor: 'pointer', fontFamily: 'Cinzel, serif'
                }}>
                {mode === 'on' ? '🛡️ 维护中' : '✅ 已开放'}
              </button>
            )}
          </h1>
          <p className="hero-subtitle" style={{textAlign: 'left', margin: '0.5rem 0 1.5rem'}}>
            选择要编辑的 JSON 文件
          </p>
          <div className="admin-file-grid">
            {files.map(f => (
              <Link key={f.path} href={`/admin/${f.path}`} className="admin-file-card">
                <div className="admin-file-icon">📄</div>
                <div>
                  <div style={{color: '#c9a96a', fontFamily: 'Cinzel, serif', fontSize: '1.05rem', fontWeight: 600}}>{f.name}</div>
                  <div style={{color: '#706858', fontSize: '0.8rem'}}>public/data/{f.path}.json · {f.desc}</div>
                </div>
                <div style={{color: '#c9a96a', fontSize: '1.4rem', fontFamily: 'Cinzel, serif'}}>→</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
