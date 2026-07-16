import Layout from '../../components/Layout'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export async function getStaticPaths() {
  return {
    paths: [
      { params: { file: 'items' } },
      { params: { file: 'talents' } },
      { params: { file: 'minions' } },
      { params: { file: 'levels' } },
      { params: { file: 'affixes' } },
      { params: { file: 'skills' } },
    ],
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  return { props: { file: params.file } }
}

const FILE_LABELS = {
  items: '装备数据 items.json',
  talents: '天赋数据 talents.json',
  minions: '仆从数据 minions.json',
  levels: '关卡数据 levels.json',
  affixes: '词条数据 affixes.json',
  skills: '技能数据 skills.json'
}

export default function AdminEdit({ file }) {
  const router = useRouter()
  const [content, setContent] = useState('')
  const [original, setOriginal] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    fetch('https://deskrawl.top/api/admin/check', { credentials: 'include' })
      .then(r => r.json())
      .then(d => { if (d.admin) setIsAdmin(true); else setMsg('❌ 你不是管理员') })
    fetch(`https://deskrawl.top/api/data/${file}.json`)
      .then(r => r.ok ? r.text() : '{}')
      .then(t => {
        try {
          const obj = JSON.parse(t)
          const formatted = JSON.stringify(obj, null, 2)
          setContent(formatted)
          setOriginal(formatted)
        } catch {
          setContent(t)
          setOriginal(t)
        }
        setLoading(false)
      })
  }, [file])

  const handleSave = async () => {
    setSaving(true)
    setMsg('保存中...')
    try {
      const parsed = JSON.parse(content)
      const res = await fetch('https://deskrawl.top/api/admin/save', {
        method: 'POST', credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ file: `${file}.json`, content: parsed })
      })
      const d = await res.json()
      if (d.ok) {
        setMsg('✅ 已保存！正在部署（1-2 分钟）')
        setOriginal(content)
      } else {
        setMsg('❌ ' + (d.error || '保存失败'))
      }
    } catch (e) {
      setMsg('❌ JSON 格式错误: ' + e.message)
    }
    setSaving(false)
  }

  if (!isAdmin && msg.includes('不是管理员')) {
    return (
      <Layout title="无权访问">
        <div className="page-wrap" style={{maxWidth: 600, textAlign: 'center', paddingTop: '3rem'}}>
          <h1 style={{color: '#c9a96a', fontSize: '2rem', marginBottom: '1rem'}}>🔒 无权访问</h1>
          <p style={{color: '#706858', marginBottom: '1.5rem'}}>你不是管理员。请联系噜总把你的 Steam ID 加到 ADMIN_STEAM_IDS。</p>
          <a href="/" style={{color: '#c9a96a'}}>← 返回 Wiki</a>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title={`编辑 ${FILE_LABELS[file] || file}`}>
      <div className="admin-fullpage">
        <div className="admin-page-header">
          <h1>📝 编辑 {FILE_LABELS[file] || file}</h1>
          <div className="admin-page-actions">
            <button
              onClick={handleSave}
              disabled={saving || content === original}
              className="admin-btn-save"
            >
              {saving ? '保存中...' : '💾 保存 + 部署'}
            </button>
            <button
              onClick={() => { setContent(original); setMsg('已撤销') }}
              disabled={content === original}
              className="admin-btn-reset"
            >
              ↩ 撤销
            </button>
            <a href="/" className="admin-btn-back">← 返回 Wiki</a>
            <a href="/admin/" className="admin-btn-switch">切换文件</a>
          </div>
        </div>

        {msg && <div className={`admin-msg ${msg.includes('✅') ? 'ok' : msg.includes('❌') ? 'err' : 'info'}`}>{msg}</div>}

        <div className="admin-toolbar">
          <span style={{color: '#706858', fontSize: '0.8rem'}}>
            文件: <code>public/data/{file}.json</code> · 字节数: {content.length}
          </span>
          <span style={{color: '#706858', fontSize: '0.8rem'}}>
            {content === original ? '✓ 未修改' : '● 有未保存的修改'}
          </span>
        </div>

        {loading ? (
          <div style={{color: '#706858', textAlign: 'center', padding: '3rem'}}>加载中...</div>
        ) : (
          <textarea
            className="admin-textarea-full"
            value={content}
            onChange={e => setContent(e.target.value)}
            spellCheck={false}
          />
        )}

        <div className="admin-help">
          <strong>使用说明:</strong> 直接编辑 JSON，保存会自动部署到 Cloudflare Pages。Ctrl+S 也能保存。
        </div>
      </div>
    </Layout>
  )
}
