import Layout from '../components/Layout'

const faqs = [
  { q: '这是什么游戏？', a: '桌面破坏神（Deskrawl: Idle ARPG）是一款桌面放置 ARPG 游戏，由 2 人工作室 First Day Games 开发。你可以在游戏里刷装备、抓仆从、提升城镇。', },
  { q: 'Demo 和正式版有什么区别？', a: 'Demo 仅开放战士职业、等级上限 20、奥尔登里奇周边区域。正式版将包含更多职业、更高等级和神话裂隙。', },
  { q: '仆从怎么获取？', a: '在关卡中击败怪物后有小概率掉落缰绳。缰绳可在马厩管理员处解锁对应仆从。高难度关卡掉率更高。', },
  { q: '装备品质有什么区别？', a: '普通（灰）→ 非凡（绿）→ 稀有（蓝）→ 传说（橙）。传说装备有独特特效，大幅改变玩法。', },
  { q: '怎么提高刷装效率？', a: '优先刷困难/极难难度，佩戴满传说装备，选择适合你流派的技能搭配。', },
  { q: 'Steam 市场什么时候开？', a: '开发商表示将在正式版发布后开放交易。届时可在 Steam 市场上买卖装备、材料和仆从。', },
  { q: 'Wiki 数据哪里来的？', a: '所有数据从游戏本体文件中提取（TextAsset CSV 格式），与游戏内 1:1 对应。', },
]

export default function FaqPage() {
  return (
    <Layout title="常见问题 - 桌面破坏神">
      <div className="page-header"><h1>❓ 常见问题</h1></div>
      <div className="page-wrap" style={{maxWidth:800}}>
        {faqs.map((f, i) => (
          <div key={i} className="item-card" style={{marginBottom:'1rem'}}>
            <h3 style={{color:'var(--gold)',marginBottom:'0.5rem'}}>{f.q}</h3>
            <p style={{color:'var(--text)',fontSize:'0.9rem'}}>{f.a}</p>
          </div>
        ))}
      </div>
    </Layout>
  )
}
