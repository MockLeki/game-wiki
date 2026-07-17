import Layout from '../components/Layout'
import { useState, useEffect } from 'react'

export default function LeaderboardPage() {
  const [data, setData] = useState(null)
  const [tab, setTab] = useState('players')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/leaderboard')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return (
    <Layout title="排行榜 - 桌面破坏神">
      <div className="page-wrap" style={{maxWidth:900}}>
        <div className="hero-card">
          <h1 className="hero-title" style={{fontSize:'2.2rem',marginBottom:0}}>🏆 排行榜</h1>
          <div className="hero-divider">
            <span className="hero-divider-icon">⭐</span>
          </div>

          {/* 实时在线 */}
          {data?.players > 0 && (
            <div style={{textAlign:'center',marginBottom:'1rem'}}>
              <span style={{color:'#7fffe0',fontSize:'1.1rem',textShadow:'0 0 6px #00d9ff'}}>
                🔴 {data.players} 位玩家在线
              </span>
            </div>
          )}

          {/* Tab 切换 */}
          <div className="talent-tabs" style={{marginBottom:'1rem'}}>
            <button className={`talent-tab ${tab==='players'?'active':''}`} onClick={()=>setTab('players')}>
              🎮 成就排行
            </button>
            <button className={`talent-tab ${tab==='playtime'?'active':''}`} onClick={()=>setTab('playtime')}>
              ⏱ 肝帝排行
            </button>
            <button className={`talent-tab ${tab==='builders'?'active':''}`} onClick={()=>setTab('builders')}>
              ⚔ 构筑大师
            </button>
            <button className={`talent-tab ${tab==='achievementsGlobal'?'active':''}`} onClick={()=>setTab('achievementsGlobal')}>
              📊 成就统计
            </button>
          </div>
        </div>

        {loading && <div style={{textAlign:'center',padding:'3rem',color:'#6a7290'}}>加载排行榜中...</div>}

        {/* 玩家排行 */}
        {tab === 'players' && data?.topPlayers?.length > 0 && (
          <div className="panel">
            <div className="panel-title">🎮 成就猎人 Top 20</div>
            <RankTable items={data.topPlayers} cols={[
              {key:'name', label:'玩家'},
              {key:'achievements', label:'成就数', fmt:v=>`${v} 个`},
            ]} />
          </div>
        )}
        {tab === 'players' && data?.topPlayers?.length === 0 && !loading && (
          <div className="panel" style={{textAlign:'center',padding:'3rem',color:'#6a7290'}}>
            <div style={{fontSize:'2rem',marginBottom:'1rem'}}>🏆</div>
            还没有玩家提交数据<br/>
            <span style={{fontSize:'0.85rem',color:'#4a5270'}}>Steam 登录后自动提交成就和时长</span>
          </div>
        )}

        {/* 肝帝排行 */}
        {tab === 'playtime' && data?.topPlaytime?.length > 0 && (
          <div className="panel">
            <div className="panel-title">⏱ 游戏时长 Top 20</div>
            <RankTable items={data.topPlaytime} cols={[
              {key:'name', label:'玩家'},
              {key:'playtime', label:'游戏时长', fmt:v=>`${Math.floor(v/60)}h ${v%60}m`},
            ]} />
          </div>
        )}

        {/* 构筑大师 */}
        {tab === 'builders' && data?.topBuilders?.length > 0 && (
          <div className="panel">
            <div className="panel-title">⚔ 构筑大师 Top 20</div>
            <RankTable items={data.topBuilders} cols={[
              {key:'name', label:'职业'},
              {key:'count', label:'分享数', fmt:v=>`${v} 套`},
            ]} />
          </div>
        )}

        {/* 成就统计 */}
        {tab === 'achievementsGlobal' && data?.achievements?.length > 0 && (
          <div className="panel">
            <div className="panel-title">📊 全球成就完成率</div>
            <RankTable items={data.achievements} cols={[
              {key:'name', label:'成就名称'},
              {key:'percent', label:'完成率', fmt:v=>`${v}%`},
            ]} />
          </div>
        )}
      </div>
    </Layout>
  )
}

function RankTable({ items, cols }) {
  return (
    <table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.9rem'}}>
      <thead>
        <tr style={{borderBottom:'1px solid rgba(0,217,255,0.3)',color:'#6a7290',fontSize:'0.8rem'}}>
          <th style={{padding:'0.5rem',textAlign:'left',width:'60px'}}>排名</th>
          {cols.map(c => <th key={c.key} style={{padding:'0.5rem',textAlign:'left'}}>{c.label}</th>)}
        </tr>
      </thead>
      <tbody>
        {items.map((item, i) => (
          <tr key={i} style={{borderBottom:'1px solid rgba(0,217,255,0.1)',transition:'all 0.2s'}}
            onMouseEnter={e => e.currentTarget.style.background='rgba(0,217,255,0.05)'}
            onMouseLeave={e => e.currentTarget.style.background=''}>
            <td style={{padding:'0.6rem 0.5rem',fontWeight:700}}>
              <RankBadge rank={i+1} />
            </td>
            {cols.map(c => (
              <td key={c.key} style={{padding:'0.6rem 0.5rem'}}>
                {c.key==='name' && item.avatar ? (
                  <span style={{display:'flex',alignItems:'center',gap:'0.5rem'}}>
                    <img src={item.avatar} alt="" style={{width:28,height:28,borderRadius:'50%',border:'1px solid rgba(0,217,255,0.3)'}} />
                    {item.name || item.steamid?.slice(-8)}
                  </span>
                ) : c.fmt ? c.fmt(item[c.key]) : item[c.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function RankBadge({ rank }) {
  if (rank === 1) return <span style={{fontSize:'1.3rem'}}>🥇</span>
  if (rank === 2) return <span style={{fontSize:'1.3rem'}}>🥈</span>
  if (rank === 3) return <span style={{fontSize:'1.3rem'}}>🥉</span>
  return <span style={{color:'#6a7290',fontWeight:500}}>{rank}</span>
}
