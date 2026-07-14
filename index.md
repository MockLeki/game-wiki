---
layout: home
hero:
  name: "桌面破坏神"
  text: "游戏百科全书"
  tagline: "噜总本人的游戏攻略与全图鉴预览 更新日期7.13 | QQ玩家交流群: 737018935"
  image:
    src: /66666.jpg
    alt: 桌面破坏神
  actions:
    - theme: brand
      text: 进入数据库
      link: /database
    - theme: brand
      text: 👥 玩家社区
      link: https://deskrawl.freeflarum.com

features:
  - icon: ⚔️
    title: 装备图鉴
    details: 121件装备 + 4品质 + 传说特效，完整数据树
    link: /items
  - icon: 🎯
    title: 技能天赋
    details: 战士/法师技能 + 29天赋模拟器，自由加点预览
    link: /skills
  - icon: ✨
    title: 词条模拟器
    details: 10部位 × 41词缀，随机组合查看属性总览
    link: /affixes
  - icon: 🐺
    title: 仆从图鉴
    details: 17只可捕获仆从 + 14种怪物 + NPC数据
    link: /minions
  - icon: 🗺️
    title: 关卡攻略
    details: 7个区域，BOSS打法＋掉落物品一览
    link: /levels
  - icon: ❓
    title: 常见问题
    details: 新手入门、游戏技巧、疑难解答
    link: /faq
---

<div class="steam-bar">
  <div class="steam-bar-inner">
    <div class="steam-stat-live">
      <span class="steam-dot"></span>
      <span class="steam-label">Steam 在线玩家</span>
      <strong id="steam-count">-</strong>
    </div>
    <div class="steam-stat-live">
      <span>⭐</span>
      <span class="steam-label">好评</span>
      <strong id="steam-review">-</strong>
    </div>
    <div class="steam-stat-live">
      <span>💰</span>
      <span class="steam-label">价格</span>
      <strong id="steam-price">-</strong>
    </div>
  </div>
</div>

<style>
.steam-bar {
  max-width: 600px; margin: 0 auto 2rem; padding: 0 1rem;
}
.steam-bar-inner {
  display: flex; justify-content: center; gap: 2rem;
  background: rgba(201,165,91,0.06); border: 1px solid rgba(201,165,91,0.15);
  border-radius: 12px; padding: 0.8rem 1.5rem;
}
.steam-stat-live { display: flex; align-items: center; gap: 0.4rem; font-size: 0.9rem; color: #c7b8a3; }
.steam-dot { width: 8px; height: 8px; border-radius: 50%; background: #4caf50; animation: pulse 2s infinite; }
@keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
.steam-label { margin-right: 0.2rem; }
.steam-stat-live strong { color: #c9a55b; }
</style>
