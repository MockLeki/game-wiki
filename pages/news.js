import Layout from '../components/Layout'
import newsData from '../public/data/news.json'

export async function getStaticProps() { return { props: {} } }

export default function NewsPage() {
  return (
    <Layout title="更新记录 - 桌面破坏神">
      <div className="page-header"><h1>更新记录</h1></div>
      <div className="page-wrap" style={{ maxWidth: 880 }}>
        <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: '1.2rem' }}>
          数据同步至 2026-10-29 · 当前版本 1.0.3
        </p>
        {newsData.map((n, i) => (
          <a
            key={i}
            href={n.url}
            target="_blank"
            rel="noopener noreferrer"
            className="item-card"
            style={{ display: 'block', marginBottom: '0.75rem', textDecoration: 'none' }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', flexWrap: 'wrap' }}>
              <span style={{ color: 'var(--gold)', fontFamily: 'monospace', fontSize: '0.82rem' }}>{n.version}</span>
              <span className="item-name" style={{ fontSize: '1rem' }}>{n.title}</span>
              <span style={{ color: 'var(--muted)', fontSize: '0.75rem', marginLeft: 'auto' }}>{n.date}</span>
            </div>
            <div style={{ color: 'var(--muted)', fontSize: '0.82rem', marginTop: '0.35rem' }}>{n.summary}</div>
          </a>
        ))}
        <p style={{ color: 'var(--muted)', fontSize: '0.75rem', marginTop: '1rem' }}>
          版本公告原文见 Steam 社区，本站仅作索引。
        </p>
      </div>
    </Layout>
  )
}
