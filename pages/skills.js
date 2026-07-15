import Layout from '../components/Layout'
import skillsData from '../public/data/skills.json'

export async function getStaticProps() { return { props: {} } }

export default function SkillsPage() {
  const talents = skillsData.classes?.warrior?.talents || []
  const abilities = skillsData.classes?.warrior?.abilities || []
  const CLASS_NAMES = { warrior: '战士', sorcerer: '法师' }

  return (
    <Layout title="技能大全 - 桌面破坏神">
      <div className="page-header"><h1>🎯 技能大全</h1></div>
      <div className="page-wrap" style={{maxWidth:1000}}>
        <h2 style={{color:'var(--gold)',marginBottom:'1rem'}}>⚔️ 战士</h2>
        {talents.length > 0 && (
          <>
            <h3 style={{color:'var(--muted)',fontSize:'0.9rem',marginBottom:'0.5rem'}}>天赋 ({talents.length})</h3>
            <div className="items-grid" style={{gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))'}}>
              {talents.slice(0, 30).map((t, i) => (
                <div key={i} className="item-card">
                  <div className="item-name">{t.name}</div>
                  <div className="item-en" style={{fontSize:'0.75rem'}}>{t.nameEn}</div>
                  {t.desc && <div className="item-effect" style={{fontSize:'0.75rem'}}>{t.desc}</div>}
                </div>
              ))}
            </div>
          </>
        )}
        <h3 style={{color:'var(--muted)',fontSize:'0.9rem',marginBottom:'0.5rem',marginTop:'1.5rem'}}>技能 ({abilities.length})</h3>
        <div className="items-grid" style={{gridTemplateColumns:'repeat(auto-fill, minmax(240px, 1fr))'}}>
          {abilities.map((a, i) => (
            <div key={i} className="item-card">
              <div className="item-name">{a.name}</div>
              <div className="item-en" style={{fontSize:'0.75rem'}}>{a.nameEn}</div>
              {a.desc && <div className="item-effect" style={{fontSize:'0.78rem'}}>{a.desc}</div>}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
