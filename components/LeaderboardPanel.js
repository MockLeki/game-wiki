import { useState, useEffect } from 'react'
import Link from 'next/link'

function StatCard({ label, value, unit }) {
  return (
    <div style={{
      background: 'linear-gradient(135deg,rgba(15,20,50,0.7) 0%,rgba(25,30,65,0.5) 100%)',
      border: '1px solid rgba(0,217,255,0.3)',
      padding: '1rem', textAlign: 'center'
    }}>
      <div style={{fontSize:'0.8rem',color:'#6a7290',marginBottom:'0.5rem',letterSpacing:'0.05em'}}>{label}</div>
      <div style={{
        fontSize:'1.8rem', color:'#7fffe0', fontWeight:700,
        fontFamily:'Orbitron, monospace', textShadow:'0 0 6px #00d9ff'
      }}>
        {typeof value === 'number' ? value.toLocaleString() : value}
        <span style={{fontSize:'0.9rem',color:'#a0a8c0',marginLeft:4,fontFamily:'Inter, sans-serif'}}>{unit}</span>
      </div>
    </div>
  )
}

function HourlyChart({ data }) {
  const max = Math.max(...Object.values(data).map(Number), 1)
  return (
    <div style={{display:'flex',alignItems:'flex-end',gap:'2px',height:120}}>
      {Array.from({length:24}, (_, h) => {
        const v = data[h] || 0
        const h2 = (v / max) * 100
        return (
          <div key={h} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
            <div title={`${h}:00 - ${v}人`} style={{
              width:'100%', height:`${Math.max(4, h2)}%`,
              background:'linear-gradient(180deg, #7fffe0 0%, #00d9ff 100%)',
              boxShadow:'0 0 4px rgba(0,217,255,0.5)', borderRadius:'2px 2px 0 0', minHeight:4
            }} />
            <span style={{fontSize:'0.65rem',color:'#6a7290'}}>{h}</span>
          </div>
        )
      })}
    </div>
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

export default function LeaderboardPanel({ compact = false }) {
  const [data, setData] = useState(null)
  const [tab, setTab] = useState('global')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/leaderboard')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  // ============ 紧凑版：主界面用 ============
  if (compact) {
    return (
      <div className="panel" style={{marginTop:'1.5rem'}}>
        <div className="panel-title" style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <span>🏆 实时排行榜</span>
          <Link href="/leaderboard" style={{fontSize:'0.8rem',color:'#7fffe0',textDecoration:'none',fontWeight:500}}>
            查看完整榜 →
          </Link>
        </div>
        <div style={{padding:'1rem'}}>
          {loading && <div style={{textAlign:'center',padding:'2rem',color:'#6a7290'}}>加载中...</div>}
          {!loading && data && (
            <>
              {/* 顶部"当前总在线" */}
              <div style={{textAlign:'center',marginBottom:'1rem'}}>
                <div style={{color:'#7fffe0',fontSize:'1rem',textShadow:'0 0 6px #00d9ff'}}>
                  🔴 当前总在线：
                  <strong style={{fontSize:'1.4rem',color:'#ffd700',margin:'0 0.3rem'}}>
                    {data.players?.toLocaleString() || 0}
                  </strong>人
                </div>
                {(data.playersFull != null || data.playersDemo != null) && (
                  <div style={{fontSize:'0.78rem',color:'#a0a8c0',marginTop:'0.3rem'}}>
                    正式版 <strong style={{color:'#7fffe0'}}>{data.playersFull || 0}</strong>
                    <span style={{margin:'0 0.4rem',color:'#4a5470'}}>·</span>
                    Demo <strong style={{color:'#7fffe0'}}>{data.playersDemo || 0}</strong>
                  </div>
                )}
              </div>
              {/* 4 卡片 */}
              <div style={{display:'grid',gridTemplateColumns:'repeat(4, 1fr)',gap:'0.8rem'}}>
                <StatCard label="Demo 当前在线" value={data.players || 0} unit="人" />
                <StatCard label="全球累计时长" value={data.totalPlaytime || 0} unit="小时" />
                <StatCard
                  label="完成至少 1 成就"
                  value={data.achievements?.length ? Math.round(data.achievements[0]?.percent || 0) : 0}
                  unit="%"
                />
                <StatCard label="Wiki 注册玩家" value={data.wikiPlayerCount || 0} unit="人" />
              </div>
            </>
          )}
        </div>
      </div>
    )
  }

  // ============ 完整版：排行榜页用 ============
  return (
    <>
      {/* 实时在线 */}
      {data?.players != null && (
        <div style={{textAlign:'center',marginBottom:'1rem'}}>
          <div style={{color:'#7fffe0',fontSize:'1.05rem',textShadow:'0 0 6px #00d9ff'}}>
            🔴 当前总在线: <strong style={{fontSize:'1.4rem',color:'#ffd700'}}>{data.players.toLocaleString()}</strong> 人
          </div>
          {(data.playersFull != null || data.playersDemo != null) && (
            <div style={{fontSize:'0.8rem',color:'#a0a8c0',marginTop:'0.4rem'}}>
              正式版: <strong style={{color:'#7fffe0'}}>{data.playersFull || 0}</strong> · 
              Demo: <strong style={{color:'#7fffe0'}}>{data.playersDemo || 0}</strong>
              {data.totalPlaytime > 0 && <span style={{marginLeft:'0.8rem'}}>· 全球累计: <strong style={{color:'#7fffe0'}}>{data.totalPlaytime.toLocaleString()}</strong> 小时</span>}
            </div>
          )}
        </div>
      )}

      {/* Tab 切换 */}
      <div className="talent-tabs" style={{marginBottom:'1rem',flexWrap:'wrap'}}>
        <button className={`talent-tab ${tab==='global'?'active':''}`} onClick={()=>setTab('global')}>🌍 全球热度</button>
        <button className={`talent-tab ${tab==='rare'?'active':''}`} onClick={()=>setTab('rare')}>🎯 稀有成就</button>
        <button className={`talent-tab ${tab==='hourly'?'active':''}`} onClick={()=>setTab('hourly')}>📅 24h 在线分布</button>
        <button className={`talent-tab ${tab==='builders'?'active':''}`} onClick={()=>setTab('builders')}>⚔ 构筑大师</button>
        <button className={`talent-tab ${tab==='players'?'active':''}`} onClick={()=>setTab('players')}>
          🎮 Wiki 玩家
          {data?.wikiPlayerCount ? <span style={{marginLeft:4,opacity:0.7}}>({data.wikiPlayerCount})</span> : null}
        </button>
      </div>

      {loading && <div style={{textAlign:'center',padding:'3rem',color:'#6a7290'}}>加载排行榜中...</div>}

      {!loading && tab === 'global' && (
        <div className="panel">
          <div className="panel-title">🌍 全球热度</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(2, 1fr)',gap:'1rem',padding:'1rem'}}>
            <StatCard label="Demo 当前在线" value={data?.players || 0} unit="人" />
            <StatCard label="全球累计时长" value={data?.totalPlaytime || 0} unit="小时" />
            <StatCard
              label="完成至少 1 成就"
              value={data?.achievements?.length ? Math.round(data.achievements[0]?.percent || 0) : 0}
              unit="%"
            />
            <StatCard label="Wiki 注册玩家" value={data?.wikiPlayerCount || 0} unit="人" />
          </div>
          <div style={{padding:'0 1rem 1rem',fontSize:'0.8rem',color:'#6a7290',textAlign:'center'}}>
            数据来自 Steam 全局 API + Wiki KV · 10 分钟缓存
          </div>
        </div>
      )}

      {!loading && tab === 'rare' && data?.achievements?.length > 0 && (
        <div className="panel">
          <div className="panel-title">🎯 全球成就完成率（最稀有 → 最普通）</div>
          <div style={{padding:'0.5rem'}}>
            {data.achievements.slice(0, 30).map((a, i) => (
              <div key={a.name} style={{display:'flex',alignItems:'center',gap:'0.6rem',padding:'0.4rem',borderBottom:'1px solid rgba(0,217,255,0.1)'}}>
                <span style={{minWidth:30,color:'#6a7290',fontSize:'0.8rem',textAlign:'right'}}>#{i+1}</span>
                <span style={{flex:1,color:'#d0d8f0'}}>{a.name}</span>
                <div style={{width:200,height:8,background:'rgba(0,0,0,0.4)',borderRadius:4,overflow:'hidden'}}>
                  <div style={{
                    width:`${Math.min(100, a.percent)}%`, height:'100%',
                    background:parseFloat(a.percent) < 10 ? '#ff6ec7' : parseFloat(a.percent) < 30 ? '#ffd700' : '#00d9ff',
                    boxShadow:`0 0 6px ${parseFloat(a.percent) < 10 ? '#ff6ec7' : '#00d9ff'}`
                  }} />
                </div>
                <span style={{
                  minWidth:60, textAlign:'right',
                  color:parseFloat(a.percent) < 10 ? '#ff6ec7' : parseFloat(a.percent) < 30 ? '#ffd700' : '#7fffe0',
                  fontWeight:600, fontFamily:'monospace'
                }}>{a.percent}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {!loading && tab === 'rare' && data?.achievements?.length === 0 && (
        <div className="panel" style={{textAlign:'center',padding:'2rem',color:'#6a7290'}}>
          暂无成就数据（游戏可能还没配置成就）
        </div>
      )}

      {!loading && tab === 'hourly' && data?.hourly && (
        <div className="panel">
          <div className="panel-title">📅 24h 在线分布（历史峰值）</div>
          <div style={{padding:'1rem'}}>
            <HourlyChart data={data.hourly} />
          </div>
          <div style={{fontSize:'0.75rem',color:'#6a7290',textAlign:'center',paddingBottom:'1rem'}}>
            数据来源：维基每 10 分钟采样的在线数峰值
          </div>
        </div>
      )}

      {!loading && tab === 'builders' && (
        <div className="panel">
          <div className="panel-title">⚔ 构筑大师 Top 20</div>
          {data?.topBuilders?.length > 0 ? (
            <RankTable items={data.topBuilders} cols={[
              {key:'name', label:'职业'},
              {key:'count', label:'分享数', fmt:v=>`${v} 套`},
            ]} />
          ) : (
            <div style={{textAlign:'center',padding:'2rem',color:'#6a7290'}}>
              还没有分享的构筑（去 /build 模拟器分享你的第一套）
            </div>
          )}
        </div>
      )}

      {!loading && tab === 'players' && (
        <div className="panel">
          <div className="panel-title">🎮 Wiki 注册玩家（成就 + 时长）</div>
          {(data?.topPlayers?.length || 0) + (data?.topPlaytime?.length || 0) > 0 ? (
            <>
              <div style={{fontSize:'0.8rem',color:'#6a7290',padding:'0 1rem 0.5rem'}}>成就数 Top 5</div>
              <RankTable items={data.topPlayers?.slice(0, 5) || []} cols={[
                {key:'name', label:'玩家'},
                {key:'achievements', label:'成就数', fmt:v=>`${v} 个`},
              ]} />
              <div style={{fontSize:'0.8rem',color:'#6a7290',padding:'1rem 1rem 0.5rem'}}>游戏时长 Top 5</div>
              <RankTable items={data.topPlaytime?.slice(0, 5) || []} cols={[
                {key:'name', label:'玩家'},
                {key:'playtime', label:'时长', fmt:v=>`${Math.floor(v/60)}h ${v%60}m`},
              ]} />
            </>
          ) : (
            <div style={{textAlign:'center',padding:'2rem',color:'#6a7290'}}>
              <div style={{fontSize:'2rem',marginBottom:'0.5rem'}}>🎮</div>
              还没有 Wiki 玩家提交数据<br/>
              <span style={{fontSize:'0.8rem'}}>Steam 登录后会自动提交你的成就和时长</span>
            </div>
          )}
        </div>
      )}
    </>
  )
}
