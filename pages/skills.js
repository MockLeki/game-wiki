import Layout from '../components/Layout'
import talents from '../public/data/talents.json'

export async function getStaticProps() {
  const classes = Object.entries(talents.classes).map(([key, list]) => ({
    key,
    name: talents.names[key] || key,
    icon: getClassIcon(key),
    talents: list.filter(t => t && t.name).map(t => ({ ...t, value: '{value}' }))
  }))
  return { props: { classes } }
}

function getClassIcon(cls) {
  const icons = {
    Warrior: '⚔️', Sorcerer: '🔮', Ranger: '🏹', Paladin: '🛡️',
    Monk: '👊', Assassin: '🗡️', Shaman: '⚡', Necromancer: '💀',
    Bard: '🎵', Warden: '🪓', Druid: '🌿', Priest: '✨',
  }
  return icons[cls] || '⚔️'
}

function getRarity(cls, idx) {
  // 简单按索引分稀有度（早期基础天赋 -> 后期传奇天赋）
  if (idx < 8) return 'common'
  if (idx < 16) return 'uncommon'
  if (idx < 24) return 'rare'
  return 'legendary'
}

const RARITY_LABEL = { common: '基础', uncommon: '进阶', rare: '高级', legendary: '传奇' }

export default function SkillsPage({ classes }) {
  return (
    <Layout title="技能大全 - 桌面破坏神">
      <div className="page-wrap">
        <div className="hero-card" style={{padding: '1.5rem'}}>
          <h1 className="hero-title" style={{fontSize: '2.2rem', textAlign: 'left'}}>技能大全</h1>
          <p className="hero-subtitle" style={{textAlign: 'left', margin: 0}}>
            {classes.length} 个职业 · {classes.reduce((s, c) => s + c.talents.length, 0)} 项天赋 · 来自游戏实际数据
          </p>
        </div>
      </div>

      <div className="page-wrap" style={{maxWidth: 1300}}>
        {classes.map(cls => (
          <div key={cls.key} className="class-section" style={{marginBottom: '2.5rem'}}>
            {/* 职业标题 */}
            <div style={{display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem', paddingBottom: '0.6rem', borderBottom: '2px solid var(--border-gold)'}}>
              <span style={{fontSize: '1.8rem', filter: 'drop-shadow(0 0 6px var(--red-glow))'}}>{cls.icon}</span>
              <h2 style={{color: 'var(--gold-light)', fontSize: '1.6rem', textShadow: '0 0 8px rgba(201,165,91,0.3)'}}>
                {cls.name}
              </h2>
              <span style={{color: 'var(--muted)', fontSize: '0.85rem'}}>天梯 ({cls.talents.length})</span>
            </div>

            {/* 4 列天赋网格 */}
            <div className="talent-grid">
              {cls.talents.map((t, idx) => {
                const rarity = getRarity(cls.key, idx)
                return (
                  <div key={idx} className={`talent-card talent-${rarity}`}>
                    <span className={`talent-rarity talent-rarity-${rarity}`}>{RARITY_LABEL[rarity]}</span>
                    <div className="talent-name-cn">{t.name}</div>
                    <div className="talent-name-en">{t.nameEn}</div>
                    <div className="talent-value">
                      +{t.value}
                      {t.desc && t.desc.includes('Strength') && ' 力量'}
                      {t.desc && t.desc.includes('Max HP') && ' 最大生命值'}
                      {t.desc && t.desc.includes('Armor') && !t.desc.includes('Magic') && ' 护甲'}
                      {t.desc && t.desc.includes('Attack Speed') && ' 攻击速度'}
                      {t.desc && t.desc.includes('Critical Hit Chance') && ' 暴击几率'}
                      {t.desc && t.desc.includes('Critical Hit Damage') && ' 暴击伤害'}
                      {t.desc && t.desc.includes('Thorn') && !t.desc.includes('Boost') && ' 荆棘'}
                      {t.desc && t.desc.includes('Life Regen') && ' 生命恢复'}
                      {t.desc && t.desc.includes('Injured') && ' 对受伤目标伤害'}
                      {t.desc && t.desc.includes('Vulnerable') && !t.desc.includes('Reduce') && ' 对易伤目标伤害'}
                      {t.desc && t.desc.includes('Mana') && t.desc.includes('Cost') && ' 法力消耗'}
                      {t.desc && t.desc.includes('HP drop below 50%') && ' 紧急治疗'}
                    </div>
                    {t.desc && (
                      <div className="talent-desc">
                        {cleanDesc(t.desc)}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        {classes.length === 0 && (
          <div className="hero-card" style={{padding: '3rem', textAlign: 'center'}}>
            <p style={{color: 'var(--muted)'}}>暂无技能数据</p>
          </div>
        )}
      </div>
    </Layout>
  )
}

function cleanDesc(desc) {
  // 移除 {value} 标记
  return desc.replace(/\{[a-zA-Z]+\}/g, '___')
}
