import Layout from '../components/Layout'
import Link from 'next/link'

export async function getStaticProps() { return { props: {} } }

const SYSTEMS = [
  {
    id: 'difficulty',
    icon: '⚔',
    title: '难度系统',
    tag: '正式版核心',
    desc: '通关「普通」难度后解锁「噩梦」，再通关解锁「炼狱」。更高难度的敌人更致命，但会掉落更丰厚的奖励——传说、神圣与套装品质装备。难度只能在城镇中切换。',
    details: [
      '普通 → 噩梦 → 炼狱，三档难度逐级解锁',
      '炼狱难度提升全部伤害（All Damage）、伤害减免等新词条随之生效',
      '噩梦/炼狱难度的银色首领掉落「噩梦头骨 / 炼狱头骨」，是进入该难度黄金首领关卡与神话裂隙的钥匙',
    ],
  },
  {
    id: 'mythic',
    icon: '🌀',
    title: '神话裂隙',
    tag: '终局内容',
    desc: '维尔达克之城外的巨龙雕像可以开启通往神话裂隙的传送门。裂隙分多个层级，层级越高敌人越强、奖励越好——神话宝箱有几率开出传说甚至神圣品质装备。',
    details: [
      '入口：维尔达克（雪城）的巨龙雕像 / 神话裂隙入口',
      '需消耗对应难度的头骨（噩梦头骨 / 炼狱头骨）进入',
      '神话宝箱：开出强力物品，有几率掉落传说或神圣品质装备',
      '皇家宝藏钥匙（炼狱）/ 黄金宝藏钥匙（噩梦）由怪物极低概率掉落，用于进入梦幻领域',
    ],
  },
  {
    id: 'auction',
    icon: '🏛',
    title: '拍卖行',
    tag: '在线模式',
    desc: '基于 Steam 库存的玩家交易系统。放入可交易物品即可上架，其他玩家购买后通过 Steam 库存流转，取回的物品会寄到游戏内邮箱。',
    details: [
      '只有在线模式角色可以交易',
      '上架后物品从背包移出，等待 Steam 确认',
      '收到物品需到拍卖行领取',
      '注意：添加宝石孔会让物品永久无法交易',
    ],
  },
  {
    id: 'gems',
    icon: '💎',
    title: '宝石孔系统',
    tag: '装备强化',
    desc: '装备可以添加宝石孔并镶嵌宝石。宝石按部位提供不同加成（防具/首饰/武器三套数值），移除宝石时宝石会被销毁。',
    details: [
      '铁匠处付费添加宝石孔',
      '添加宝石孔后该物品永久无法交易',
      '从宝石孔移除宝石会销毁宝石（不可逆）',
      '36 种宝石详见宝石图鉴',
    ],
    link: { href: '/gems', label: '查看宝石图鉴 →' },
  },
  {
    id: 'consumables',
    icon: '⚗',
    title: '消耗品自动使用',
    tag: '战斗 QoL',
    desc: '战斗药水、辅助药水、食物三种类型各有一个自动使用槽位。把消耗品从背包拖进槽位，战斗中一旦对应增益未生效就会自动从背包使用。',
    details: [
      '每种类型同时只能保持一个增益',
      '拖拽分配，左键点击槽位清除',
      '食物、辅助药水槽需通过生活技能解锁',
    ],
    link: { href: '/items', label: '查看药水与食物 →' },
  },
  {
    id: 'rerun',
    icon: '🔁',
    title: '自动重开',
    tag: '挂机 QoL',
    desc: '开启后，通关结算界面会在短暂倒计时后自动再次开始同一地图，挂机刷图无需手动点击。',
    details: ['结算界面倒计时后自动重进同一地图', '配合自动使用消耗品可实现全自动挂机循环'],
  },
  {
    id: 'capstone',
    icon: '🌟',
    title: '核心天赋',
    tag: '天赋系统',
    desc: '角色等级达到 10 / 30 / 60 级时，各解锁一个核心天赋（Capstone Talent I / II / III），构筑强度质变的关键节点。',
    details: ['10 级：核心天赋 I', '30 级：核心天赋 II', '60 级：核心天赋 III', '正式版天赋树大幅扩充（猎人 43 个、武僧 34 个天赋节点）'],
  },
  {
    id: 'wheel',
    icon: '🎡',
    title: '幸运轮盘',
    tag: '赌一把',
    desc: '塔赞之城的赌徒「扎希尔」经营着幸运轮盘，转动命运转盘即可赢取奖励。',
    details: ['位置：塔赞之城 · 扎希尔的幸运轮盘', '对话选择「试试手气」开始'],
  },
  {
    id: 'world',
    icon: '🗺',
    title: '新区域：雪境与火山',
    tag: '世界扩展',
    desc: '正式版新增三大区域：维尔达克高地（雪境 Lv.52+）、污秽要塞（Lv.58+）、灰烬之冠（Lv.65+），以及梦幻贫瘠之地、梦幻要塞两个宝物区。沙漠与雪域均有完整的城镇 NPC（铁匠/商人/牧师/宝石专家/炼金术士）。',
    details: [
      '维尔达克高地 Lv.52+ · 维尔达克之城（雪城，神话裂隙入口）',
      '污秽要塞 Lv.58+（不死斧师 / 污秽古龙 / 白骨死神等新敌人）',
      '灰烬之冠 Lv.65+（炼狱卫士 / 熔岩魔像 / 灰烬之主）',
      '新增两个钓鱼点：维尔达克天池、灰烬湖',
    ],
    link: { href: '/levels', label: '查看关卡大全 →' },
  },
  {
    id: 'lifeskills',
    icon: '📜',
    title: '生活技能扩展',
    tag: '钓鱼/采集',
    desc: '生活技能新增 II 级节点与大量钓鱼强化：迅捷抛竿（缩短垂钓时间）、垂钓直觉（提升钓鱼成功率）、灵魂圣匣（提升灵魂碎片携带上限）等。',
    details: [
      '钓鱼：迅捷抛竿 I~III、垂钓直觉 I~II',
      '采集：材料发现 II、载重 II、金币发现 II、物品发现 II',
      '通用：经验获取 II、药水发现 II、远征补给 II（离线上限）、复活冷却缩减 II',
    ],
    link: { href: '/fishing', label: '查看钓鱼出货图 →' },
  },
]

export default function SystemsPage() {
  return (
    <Layout title="新系统一览 - 桌面破坏神">
      <div className="page-wrap">
        <div className="hero-card" style={{ padding: '1.5rem' }}>
          <h1 className="hero-title" style={{ fontSize: '2.2rem', textAlign: 'left' }}>正式版新系统一览</h1>
          <p className="hero-subtitle" style={{ textAlign: 'left', margin: 0 }}>
            游戏正式版（2026-09 更新）新增与重做的系统机制汇总，共 {SYSTEMS.length} 项。数据提取自游戏本地化文件与反编译配置。
          </p>
        </div>

        {SYSTEMS.map(s => (
          <div key={s.id} className="panel" style={{ marginBottom: '1.1rem' }}>
            <div className="panel-title" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span>{s.icon}</span>
              <span>{s.title}</span>
              <span style={{
                fontSize: '0.68rem', padding: '0.12rem 0.55rem', fontWeight: 400,
                background: 'rgba(201,162,39,0.12)', border: '1px solid rgba(201,162,39,0.4)',
                color: 'var(--gold)', letterSpacing: '0.05em',
              }}>{s.tag}</span>
            </div>
            <div style={{ padding: '0.9rem 1.2rem 1rem' }}>
              <div style={{ color: 'var(--text)', fontSize: '0.88rem', lineHeight: 1.7 }}>{s.desc}</div>
              <div style={{ marginTop: '0.6rem', display: 'grid', gap: '0.3rem' }}>
                {s.details.map((d, i) => (
                  <div key={i} style={{ color: 'var(--muted)', fontSize: '0.8rem', lineHeight: 1.6, paddingLeft: '1rem', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: 'var(--gold)' }}>▪</span>{d}
                  </div>
                ))}
              </div>
              {s.link && (
                <div style={{ marginTop: '0.7rem', fontSize: '0.82rem' }}>
                  <Link href={s.link.href} style={{ color: 'var(--cyan-light)' }}>{s.link.label}</Link>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}
