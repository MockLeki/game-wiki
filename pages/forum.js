import Layout from '../components/Layout'
import { useEffect, useState } from 'react'

export async function getStaticProps() { return { props: {} } }

const API = 'https://deskrawl.top/api/forum'

function timeAgo(ts) {
  const s = (Date.now() - ts) / 1000
  if (s < 60) return '刚刚'
  if (s < 3600) return Math.floor(s/60) + ' 分钟前'
  if (s < 86400) return Math.floor(s/3600) + ' 小时前'
  if (s < 604800) return Math.floor(s/86400) + ' 天前'
  return new Date(ts).toLocaleDateString('zh-CN')
}

export default function Forum() {
  const [user, setUser] = useState(null)
  const [threads, setThreads] = useState([])
  const [active, setActive] = useState(null)  // 单个主题
  const [loading, setLoading] = useState(true)
  const [newTitle, setNewTitle] = useState('')
  const [newContent, setNewContent] = useState('')
  const [showNew, setShowNew] = useState(false)
  const [reply, setReply] = useState('')
  const [error, setError] = useState('')

  // 检查登录
  useEffect(() => {
    fetch('https://deskrawl.top/api/auth/status', { credentials: 'include' })
      .then(r => r.json()).then(d => setUser(d.loggedIn ? d : null))
  }, [])

  // 加载主题列表
  const loadThreads = () => {
    fetch(`${API}/threads`)
      .then(r => r.json()).then(d => { setThreads(d.threads || []); setLoading(false) })
      .catch(() => setLoading(false))
  }
  useEffect(() => { loadThreads() }, [])

  // 打开主题
  const openThread = (id) => {
    fetch(`${API}/thread/${id}`)
      .then(r => r.json())
      .then(d => { setActive(d); setReply('') })
  }

  // 创建主题
  const createThread = async () => {
    setError('')
    if (!newTitle.trim() || !newContent.trim()) {
      setError('标题和内容不能为空'); return
    }
    const res = await fetch(`${API}/threads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ title: newTitle, content: newContent })
    })
    const d = await res.json()
    if (d.error) { setError(d.error); return }
    setNewTitle(''); setNewContent(''); setShowNew(false)
    loadThreads()
    openThread(d.id)
  }

  // 回复
  const sendReply = async () => {
    if (!reply.trim()) return
    const res = await fetch(`${API}/thread/${active._id || active.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ content: reply })
    })
    const d = await res.json()
    if (d.error) { setError(d.error); return }
    setReply('')
    openThread(active._id || active.id)
  }

  return (
    <Layout title="玩家社区 - 桌面破坏神">
      <div className="page-wrap">
        <div className="hero-card" style={{padding: '1.5rem'}}>
          <h1 className="hero-title" style={{fontSize: '2rem', textAlign: 'left', margin: 0}}>💬 玩家社区</h1>
          <p className="hero-subtitle" style={{textAlign: 'left', margin: '0.5rem 0 0'}}>
            讨论攻略 · 交换情报 · 寻找队友
            {user && <span style={{color: 'var(--gold-light)', marginLeft: '0.6rem'}}>· 欢迎, {user.name}</span>}
          </p>
        </div>
      </div>

      <div className="page-wrap" style={{maxWidth: 1100}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem'}}>
          <div style={{color: 'var(--muted)', fontSize: '0.85rem'}}>
            {loading ? '加载中...' : `共 ${threads.length} 个主题`}
          </div>
          {!active && (
            user ? (
              <button onClick={() => setShowNew(!showNew)} className="talent-reset-btn" style={{background: 'rgba(184, 28, 28, 0.3)', borderColor: 'var(--red)'}}>
                {showNew ? '× 取消' : '+ 发表新主题'}
              </button>
            ) : (
              <a href="https://deskrawl.top/api/auth/steam" className="talent-reset-btn" style={{background: 'rgba(184, 28, 28, 0.3)', borderColor: 'var(--red)', textDecoration: 'none'}}>
                🎮 Steam 登录后发帖
              </a>
            )
          )}
          {active && (
            <button onClick={() => { setActive(null); setError('') }} className="talent-reset-btn">
              ← 返回主题列表
            </button>
          )}
        </div>

        {error && <div style={{color: '#ff3020', background: 'rgba(184, 28, 28, 0.15)', border: '1px solid var(--red)', borderRadius: 4, padding: '0.7rem 1rem', marginBottom: '1rem'}}>⚠️ {error}</div>}

        {/* 新主题表单 */}
        {showNew && !active && (
          <div className="forum-form">
            <h3 style={{color: 'var(--gold-light)', marginBottom: '0.8rem'}}>发表新主题</h3>
            <input
              type="text" placeholder="标题..." value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              className="forum-input"
            />
            <textarea
              placeholder="内容（支持换行）..." value={newContent}
              onChange={e => setNewContent(e.target.value)}
              className="forum-textarea" rows={6}
            />
            <div style={{display: 'flex', gap: '0.5rem', marginTop: '0.5rem'}}>
              <button onClick={createThread} className="talent-reset-btn" style={{background: 'rgba(184, 28, 28, 0.3)', borderColor: 'var(--red)'}}>发布</button>
              <button onClick={() => { setShowNew(false); setError('') }} className="talent-reset-btn">取消</button>
            </div>
          </div>
        )}

        {/* 主题列表 / 单主题视图 */}
        {!active ? (
          <div className="forum-list">
            {loading ? (
              <div style={{color: 'var(--muted)', textAlign: 'center', padding: '2rem'}}>加载中...</div>
            ) : threads.length === 0 ? (
              <div style={{color: 'var(--muted)', textAlign: 'center', padding: '3rem 1rem', border: '1px dashed var(--border)', borderRadius: 4}}>
                <div style={{fontSize: '2rem', marginBottom: '0.5rem'}}>📭</div>
                <div>还没有主题。{user ? '快来发第一个！' : '登录后可以发帖。'}</div>
              </div>
            ) : threads.map(t => (
              <div key={t.id} className="forum-thread-item" onClick={() => openThread(t.id)}>
                <div className="forum-thread-main">
                  <div className="forum-thread-title">{t.title}</div>
                  <div className="forum-thread-meta">
                    <span>👤 {t.authorName}</span>
                    <span>💬 {t.replyCount} 回复</span>
                    <span>🕐 {timeAgo(t.createdAt)}</span>
                  </div>
                </div>
                <div className="forum-thread-arrow">→</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="forum-thread-view">
            <h2 className="forum-thread-header">{active.title}</h2>
            <div className="forum-posts">
              {(active.posts || []).map((p, i) => (
                <div key={i} className={`forum-post ${i === 0 ? 'is-op' : ''}`}>
                  <div className="forum-post-header">
                    <span className="forum-post-author">{p.authorName}{i === 0 && <span style={{color: 'var(--gold-light)', fontSize: '0.7rem', marginLeft: '0.3rem'}}>楼主</span>}</span>
                    <span className="forum-post-time">{timeAgo(p.createdAt)}</span>
                  </div>
                  <div className="forum-post-content">{p.content}</div>
                </div>
              ))}
            </div>
            {user ? (
              <div className="forum-form" style={{marginTop: '1rem'}}>
                <h4 style={{color: 'var(--gold-light)', marginBottom: '0.5rem'}}>发表回复</h4>
                <textarea
                  placeholder="回复内容..." value={reply}
                  onChange={e => setReply(e.target.value)}
                  className="forum-textarea" rows={3}
                />
                <button onClick={sendReply} className="talent-reset-btn" style={{background: 'rgba(184, 28, 28, 0.3)', borderColor: 'var(--red)', marginTop: '0.5rem'}}>回复</button>
              </div>
            ) : (
              <div style={{textAlign: 'center', padding: '1.5rem', color: 'var(--muted)', border: '1px dashed var(--border)', borderRadius: 4, marginTop: '1rem'}}>
                <a href="https://deskrawl.top/api/auth/steam" style={{color: 'var(--red-glow)'}}>🎮 Steam 登录</a> 后可以回复
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  )
}
