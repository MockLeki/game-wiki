import Layout from '../components/Layout'
import LeaderboardPanel from '../components/LeaderboardPanel'

export default function LeaderboardPage() {
  return (
    <Layout title="排行榜 - 桌面破坏神">
      <div className="page-wrap" style={{maxWidth:900}}>
        <div className="hero-card">
          <h1 className="hero-title" style={{fontSize:'2.2rem',marginBottom:0}}>🏆 排行榜</h1>
          <div className="hero-divider">
            <span className="hero-divider-icon">⭐</span>
          </div>
          <LeaderboardPanel />
        </div>
      </div>
    </Layout>
  )
}
