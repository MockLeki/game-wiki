import Layout from '../components/Layout'
import lootData from '../public/data/loot.json'

export async function getStaticProps() { return { props: {} } }

const QUALITY_COLORS = {
  common: 'var(--l-common)',
  uncommon: 'var(--l-uncommon)',
  rare: 'var(--l-rare)',
  legendary: 'var(--l-legendary)',
  divine: 'var(--l-divine)',
}
const Q_NAMES = { common: '普通', uncommon: '非凡', rare: '稀有', legendary: '传说', divine: '神圣' }

// 掉落向量展示
function LootVectorBar({ label, min, max, colors }) {
  return (
    <div style={{ fontSize: '0.8rem', color: 'var(--text)', padding: '0.3rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <span style={{ minWidth: 56, color: 'var(--muted)' }}>{label}</span>
      <span style={{ minWidth: 100, fontFamily: 'Cinzel, serif', color: 'var(--cyan-light)' }}>
        {min === max ? `${min}%` : `${min}% ~ ${max}%`}
      </span>
    </div>
  )
}

export default function LootPage() {
  const { blackMistChance, ancientChance, minBlackMistDifficulty, minDivineDifficulty, minSetDifficulty, runeDropChance, runeMinDropLevel, dropSettings } = lootData
  const tiers = [
    { key: 'normal', name: '普通怪物', icon: '⚔' },
    { key: 'elite', name: '精英怪', icon: '🛡' },
    { key: 'miniBoss', name: '小 Boss', icon: '👹' },
    { key: 'boss', name: 'Boss', icon: '💀' },
  ]

  return (
    <Layout title="掉落概率 - 桌面破坏神">
      <div className="page-wrap">
        <div className="hero-card" style={{ padding: '1.5rem' }}>
          <h1 className="hero-title" style={{ fontSize: '2.2rem', textAlign: 'left' }}>掉落概率</h1>
          <p className="hero-subtitle" style={{ textAlign: 'left', margin: 0 }}>
            不同怪物难度的装备掉落概率分布，数据来自游戏 LootConfig。
          </p>
        </div>

        {/* 黑雾装备高亮 */}
        <div className="panel" style={{ marginBottom: '1.2rem', borderColor: 'var(--l-divine)' }}>
          <div className="panel-title" style={{ color: 'var(--l-divine)' }}>🌫 黑雾装备</div>
          <div style={{ padding: '1rem 1.2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.8rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: 'var(--l-divine)', fontSize: '2.2rem', fontWeight: 700, fontFamily: 'Cinzel, serif', textShadow: '0 0 8px rgba(255,59,59,0.5)' }}>
                {Math.round(blackMistChance * 100)}%
              </div>
              <div style={{ color: 'var(--muted)', fontSize: '0.78rem' }}>黑雾装备掉落概率</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: 'var(--cyan-light)', fontSize: '2.2rem', fontWeight: 700, fontFamily: 'Cinzel, serif' }}>
                难度 {minBlackMistDifficulty}+
              </div>
              <div style={{ color: 'var(--muted)', fontSize: '0.78rem' }}>最低触发难度</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: 'var(--gold)', fontSize: '2.2rem', fontWeight: 700, fontFamily: 'Cinzel, serif' }}>
                {Math.round(ancientChance * 100)}%
              </div>
              <div style={{ color: 'var(--muted)', fontSize: '0.78rem' }}>古老品质概率</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: 'var(--text-bright)', fontSize: '2.2rem', fontWeight: 700, fontFamily: 'Cinzel, serif' }}>
                难度 {minDivineDifficulty}+
              </div>
              <div style={{ color: 'var(--muted)', fontSize: '0.78rem' }}>神圣/套装最低难度</div>
            </div>
          </div>
        </div>

        {/* 四档怪物掉落 */}
        {tiers.map(t => {
          const s = dropSettings?.[t.key]
          if (!s) return null
          return (
            <div key={t.key} className="panel" style={{ marginBottom: '1rem' }}>
              <div className="panel-title">{t.icon} {t.name}掉落</div>
              <div style={{ padding: '0.8rem 1.2rem' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginBottom: '0.4rem' }}>装备品质掉落概率（Min ~ Max）</div>
                <LootVectorBar label="不掉落" min={s.min?.noDrop} max={s.max?.noDrop} />
                <LootVectorBar label="普通" min={s.min?.common} max={s.max?.common} />
                <LootVectorBar label="非凡" min={s.min?.uncommon} max={s.max?.uncommon} />
                <LootVectorBar label="稀有" min={s.min?.rare} max={s.max?.rare} />
                <LootVectorBar label="传说" min={s.min?.legendary} max={s.max?.legendary} />
                <div style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border)', fontSize: '0.8rem', color: 'var(--text)' }}>
                  <span style={{ color: 'var(--l-divine)' }}>神圣：{s.divineChance ? `${(s.divineChance * 100).toFixed(2)}%` : '0'}</span>
                  <span style={{ margin: '0 1rem', color: '#4a5470' }}>·</span>
                  <span style={{ color: 'var(--l-rare)' }}>宝石：{s.gemDropChance ? `${s.gemDropChance * 100}%` : '0'}</span>
                </div>
              </div>
            </div>
          )
        })}

        {/* 符文掉落 */}
        <div className="panel" style={{ marginBottom: '1.2rem' }}>
          <div className="panel-title">🔮 符文掉落</div>
          <div style={{ padding: '0.8rem 1.2rem', display: 'flex', gap: '2rem', flexWrap: 'wrap', fontSize: '0.85rem', color: 'var(--text)' }}>
            <div>符文掉落概率：<span style={{ color: 'var(--cyan-light)', fontFamily: 'Cinzel, serif' }}>{runeDropChance * 100}%</span></div>
            <div>最低掉落等级：<span style={{ color: 'var(--cyan-light)', fontFamily: 'Cinzel, serif' }}>Lv.{runeMinDropLevel}</span></div>
            <div>稀有度权重：<span style={{ color: 'var(--text)' }}>非凡 55 / 稀有 30 / 传说 10 / 套装 5</span></div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
