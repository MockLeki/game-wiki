---
title: 数据库
---

<script setup>
import { useData } from 'vitepress'
const { frontmatter } = useData()
</script>

<style scoped>
.db-page { max-width: 1100px; margin: 0 auto; padding: 0 1rem; }
.db-header { margin: 2rem 0 1.5rem; }
.db-header h1 { font-size: 1.6rem; color: #efe6d8; margin: 0 0 0.3rem; }
.db-header .subtitle { color: #8f7f6e; font-size: 0.95rem; }

.db-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 0.8rem; }
.db-card {
  background: #181513;
  border: 1px solid #3d332b;
  border-radius: 8px;
  padding: 1.2rem;
  text-decoration: none;
  display: block;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.15s;
}
.db-card:hover {
  border-color: #c9a55b;
  box-shadow: 0 0 16px rgba(201, 165, 91, 0.12);
  transform: translateY(-2px);
}
.db-card-icon { font-size: 2rem; margin-bottom: 0.6rem; }
.db-card-title { color: #efe6d8; font-weight: bold; font-size: 1.05rem; margin-bottom: 0.3rem; }
.db-card-desc { color: #8f7f6e; font-size: 0.85rem; line-height: 1.4; }
.db-card-count { color: #c9a55b; font-size: 0.8rem; margin-top: 0.4rem; }
</style>

<div class="db-page">
<div class="db-header">
<h1>桌面破坏神 数据库</h1>
<p class="subtitle">收录所有游戏数据 · 持续更新 · 版本 Deskrawl Demo</p>
</div>

<div class="db-grid">

<a href="/items" class="db-card">
<div class="db-card-icon">⚔️</div>
<div class="db-card-title">装备图鉴</div>
<div class="db-card-desc">传说武器、防具、消耗品、材料、随从缰绳</div>
<div class="db-card-count">121 件装备 · 4 个品质</div>
</a>

<a href="/skills" class="db-card">
<div class="db-card-icon">🎯</div>
<div class="db-card-title">技能大全</div>
<div class="db-card-desc">战士 / 法师主动技能、天赋模拟器、属性系统</div>
<div class="db-card-count">10 个技能 · 29 个天赋</div>
</a>

<a href="/affixes" class="db-card">
<div class="db-card-icon">✨</div>
<div class="db-card-title">词条计算器</div>
<div class="db-card-desc">装备词缀组合模拟，自由预览整体属性</div>
<div class="db-card-count">41 种词缀 · 10 个部位</div>
</a>

<a href="/minions" class="db-card">
<div class="db-card-icon">🐺</div>
<div class="db-card-title">仆从大全</div>
<div class="db-card-desc">可捕获仆从、怪物图鉴、城镇 NPC、物种百科</div>
<div class="db-card-count">17 仆从 · 14 怪物 · 7 NPC</div>
</a>

<a href="/levels" class="db-card">
<div class="db-card-icon">🗺️</div>
<div class="db-card-title">关卡大全</div>
<div class="db-card-desc">全关卡攻略、BOSS 打法、掉落物品一览</div>
<div class="db-card-count">7 个关卡</div>
</a>

<a href="/build.html" class="db-card">
<div class="db-card-icon">⚔️</div>
<div class="db-card-title">构筑模拟器</div>
<div class="db-card-desc">装备/词条/技能自由组合，实时预览综合属性</div>
<div class="db-card-count">112 件装备 × 25 词条 × 90 技能</div>
</a>

<a href="/faq" class="db-card">
<div class="db-card-icon">❓</div>
<div class="db-card-title">常见问题</div>
<div class="db-card-desc">新手必读、常见疑问解答、游戏技巧</div>
</a>

</div>
</div>
