import Layout from '../../components/Layout'
import Link from 'next/link'

export default function AdminIndex() {
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
          <h1 className="hero-title" style={{fontSize: '1.8rem', textAlign: 'left'}}>📝 管理后台</h1>
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
