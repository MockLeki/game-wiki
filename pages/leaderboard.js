import Layout from '../components/Layout'
import { useState, useEffect } from 'react'

export default function LeaderboardPage() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [type, setType] = useState('global')
  const [boardName, setBoardName] = useState('speedrun')
  const [userSteamId, setUserSteamId] = useState(null)

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const match = document.cookie.match(/wiki_steam_id=(\d{17})/)
      if (match) setUserSteamId(match[1])
    }
  }, [])

  const fetchLeaderboard = async () => {
    setLoading(true)
    try {
      // 第一步：查找排行榜 ID
      const findRes = await fetch(`https://deskrawl.top/api/steam/leaderboard?name=${encodeURIComponent(boardName)}&appid=4765010`)
      const findData = await findRes.json()
      if (findData.response?.leaderboards?.[0]) {
        const id = findData.response.leaderboards[0].id
        // 第二步：拉取条目
        const entriesRes = await fetch(`https://deskrawl.top/api/steam/leaderboard-entries?id=${id}&type=${type}&start=0&end=100`)
        const entriesData = await entriesRes.json()
        setEntries(entriesData.response?.entries || [])
      } else {
        setEntries([])
      }
    } catch (e) {
      console.error('排行榜加载失败:', e)
    }
    setLoading(false)
  }

  useEffect(() => { fetchLeaderboard() }, [type, boardName])

  return (
    <Layout title="在线排行榜 - 桌面破坏神">
      <div className="page-wrap">
        <div className="hero-card" style={{padding: '1.5rem'}}>
          <h1 className="hero-title" style={{fontSize: '2.2rem', textAlign: 'left'}}>在线排行榜</h1>
          <p className="hero-subtitle" style={{textAlign: 'left', margin: 0}}>
            来自 Steam 官方排行榜，自动显示玩家的 Steam 昵称和头像。
          </p>
        </div>

        <div className="twocol" style={{gridTemplateColumns: '1fr'}}>
          <div>
            <div className="results-bar">
              <div className="controls">
                <span>排行榜</span>
                <select value={boardName} onChange={e => setBoardName(e.target.value)}>
                  <option value="speedrun">速通</option>
                  <option value="HighestWave">最高波数</option>
                  <option value="TotalScore">总分</option>
                </select>
                <span>类型</span>
                <select value={type} onChange={e => setType(e.target.value)}>
                  <option value="global">全球</option>
                  <option value="friends">好友</option>
                </select>
                <button onClick={fetchLeaderboard} className="filter-btn" style={{width:'auto', padding:'0.3rem 1rem'}}>刷新</button>
              </div>
              {userSteamId ? (
                <div style={{fontSize: '0.85rem', color: 'var(--green)'}}>
                  ✓ 已登录: {userSteamId}
                </div>
              ) : (
                <a href="/api/auth/steam" className="filter-btn" style={{display:'inline-block', width:'auto', padding:'0.3rem 1rem', textDecoration:'none'}}>
                  🎮 Steam 登录查看好友榜
                </a>
              )}
            </div>

            {loading ? (
              <div style={{padding: '3rem', textAlign: 'center', color: 'var(--muted)'}}>加载中...</div>
            ) : entries.length === 0 ? (
              <div className="hero-card" style={{padding: '3rem', textAlign: 'center'}}>
                <p style={{color: 'var(--muted)'}}>暂无排行榜数据</p>
                <p style={{color: 'var(--muted)', fontSize: '0.85rem', marginTop: '0.5rem'}}>
                  排行榜名字 <code style={{color: 'var(--gold-light)'}}>{boardName}</code> 在 Steam 上不存在或还没人上榜
                </p>
                <p style={{color: 'var(--muted)', fontSize: '0.85rem', marginTop: '0.5rem'}}>
                  💡 找开发者要准确的排行榜名字
                </p>
              </div>
            ) : (
              <div className="items-grid" style={{gridTemplateColumns: '1fr'}}>
                {entries.map((e, i) => (
                  <div key={i} className="item-card" style={e.steamid === userSteamId ? {borderColor: 'var(--gold-light)', boxShadow: '0 0 8px rgba(201,165,91,0.3)'} : {}}>
                    <div className="item-header" style={{alignItems: 'center'}}>
                      <div style={{
                        width: 48, height: 48, borderRadius: 4,
                        background: i < 3 ? 'linear-gradient(135deg, #d97a25, #c9a55b)' : '#2a1e15',
                        border: '1px solid var(--border-gold)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.4rem', fontWeight: 'bold',
                        color: i < 3 ? '#1a0e08' : 'var(--gold-light)',
                        fontFamily: 'Cinzel, serif'
                      }}>#{e.rank}</div>
                      <div style={{flex: 1}}>
                        <div className="item-name" style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                          <span>{e.ugcid || e.steamid?.slice(-10) || 'Anonymous'}</span>
                          {e.steamid === userSteamId && <span style={{color: 'var(--gold-light)', fontSize: '0.75rem'}}>← 你</span>}
                        </div>
                        <div className="item-meta">SteamID: {e.steamid}</div>
                      </div>
                      <div style={{textAlign: 'right'}}>
                        <div className="item-name" style={{color: 'var(--red-glow)', fontSize: '1.4rem'}}>{e.score}</div>
                        <div className="item-meta">分</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
