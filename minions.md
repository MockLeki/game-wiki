<script setup>
import { ref, computed, onMounted } from 'vue'

const minionData = ref(null)
const loading = ref(true)
const activeTab = ref('companions')
const speciesFilter = ref('')
const qualityFilter = ref('')

onMounted(async () => {
  try {
    const response = await fetch('/data/minions.json')
    minionData.value = await response.json()
  } catch (e) {
    console.error('加载失败:', e)
  } finally {
    loading.value = false
  }
})

const filteredCompanions = computed(() => {
  if (!minionData.value) return []
  let list = minionData.value.companions
  if (speciesFilter.value) list = list.filter(c => c.species === speciesFilter.value)
  if (qualityFilter.value) list = list.filter(c => c.quality === qualityFilter.value)
  return list
})

const qualityColor = (q) => {
  const colors = { common: '#9e9e9e', uncommon: '#4caf50', rare: '#2196f3', legendary: '#ff9800' }
  return colors[q] || '#9e9e9e'
}

const qualityName = (q) => {
  const names = { common: '普通', uncommon: '非凡', rare: '稀有', legendary: '传说' }
  return names[q] || q
}

const speciesIcon = (s) => {
  if (!minionData.value) return '❓'
  const sp = minionData.value.species.find(x => x.key === s)
  return sp ? sp.icon : '❓'
}

const getCompanionsBySpecies = (speciesKey) => {
  if (!minionData.value) return []
  return minionData.value.companions.filter(c => c.species === speciesKey)
}
</script>

# 仆从大全

<div class="tip-box">
  <strong>数据来源</strong>
  <p>仆从数据从游戏本体 Deskrawl Demo 的 Unity 资源中提取。击败怪物获得缰绳后前往商人处解锁，每个仆从提供独特的被动加成，部分高稀有度仆从还拥有主动技能。</p>
</div>

<p v-if="loading">加载中...</p>

<div v-if="!loading && minionData" class="minion-container">

<!-- Tab -->
<div class="tabs">
<button :class="['tab', { active: activeTab==='companions' }]" @click="activeTab='companions'">🐾 可捕获仆从</button>
<button :class="['tab', { active: activeTab==='npcs' }]" @click="activeTab='npcs'">🏛️ 城镇NPC</button>
<button :class="['tab', { active: activeTab==='enemies' }]" @click="activeTab='enemies'">👹 怪物图鉴</button>
<button :class="['tab', { active: activeTab==='species' }]" @click="activeTab='species'">🔬 物种百科</button>
</div>

<!-- 仆从列表 -->
<div v-if="activeTab==='companions'" class="tab-content">
<div class="filters">
<div class="filter-group">
<label>物种:</label>
<select v-model="speciesFilter">
<option value="">全部</option>
<option v-for="sp in minionData.species" :key="sp.key" :value="sp.key">{{ sp.name }}</option>
</select>
</div>
<div class="filter-group">
<label>品质:</label>
<select v-model="qualityFilter">
<option value="">全部</option>
<option value="common">普通</option>
<option value="uncommon">非凡</option>
<option value="rare">稀有</option>
<option value="legendary">传说</option>
</select>
</div>
<button class="reset-btn" @click="speciesFilter=''; qualityFilter=''">重置</button>
</div>

<p v-if="filteredCompanions.length === 0" class="no-data">没有找到匹配的仆从</p>
<p v-else class="result-count">共找到 <strong>{{ filteredCompanions.length }}</strong> 个仆从</p>

<div class="companions-grid">
<div v-for="comp in filteredCompanions" :key="comp.id" class="companion-card" :style="{ borderColor: qualityColor(comp.quality) }">
<div class="comp-header" :style="{ backgroundColor: qualityColor(comp.quality) }">
<div class="comp-title">
<img v-if="comp.image" :src="comp.image" class="comp-img" alt="">
<span v-else class="species-icon">{{ speciesIcon(comp.species) }}</span>
<div>
<span class="comp-name">{{ comp.name }}</span>
<span class="comp-name-en">{{ comp.nameEn }}</span>
</div>
</div>
<div class="comp-badges">
<span class="quality-badge" :style="{ backgroundColor: qualityColor(comp.quality) }">{{ qualityName(comp.quality) }}</span>
<span class="species-badge">{{ comp.speciesName }}</span>
</div>
</div>
<div class="comp-body">
<div class="comp-info">
<div class="info-row"><span class="info-label">等级要求</span><span class="info-value">Lv.{{ comp.level }}</span></div>
<div class="info-row"><span class="info-label">负重</span><span class="info-value">{{ comp.weight }}</span></div>
<div class="info-row"><span class="info-label">出没地点</span><span class="info-value">{{ comp.location }}</span></div>
</div>
<div v-if="comp.activeSkill" class="comp-active-skill">
<div class="skill-label">⚡ 主动技能</div>
<div class="skill-name">{{ comp.activeSkill.name }} <span class="skill-name-en">({{ comp.activeSkill.nameEn }})</span></div>
<p class="skill-desc">{{ comp.activeSkill.desc }}</p>
</div>
<div class="comp-passives">
<div class="skill-label">📋 被动加成</div>
<div v-for="p in comp.passives" :key="p.name" class="passive-item">
<span class="passive-name">{{ p.name }}</span>
<span class="passive-desc">{{ p.desc }}</span>
</div>
</div>
</div>
</div>
</div>
</div>

<!-- NPC -->
<div v-if="activeTab==='npcs'" class="tab-content">
<div class="npc-grid">
<div v-for="npc in minionData.npcs" :key="npc.id" class="npc-card">
<div class="npc-header">
<span class="npc-name">{{ npc.name }}</span>
<span class="npc-name-en">{{ npc.nameEn }}</span>
</div>
<div class="npc-body">
<p>{{ npc.desc }}</p>
</div>
</div>
</div>
</div>

<!-- 怪物图鉴 -->
<div v-if="activeTab==='enemies'" class="tab-content">
<div class="enemy-grid">
<div v-for="enemy in minionData.enemies" :key="enemy.name" class="enemy-item">
<span class="enemy-name">{{ enemy.name }}</span>
<span class="enemy-name-en">{{ enemy.nameEn }}</span>
</div>
</div>
</div>

<!-- 物种百科 -->
<div v-if="activeTab==='species'" class="tab-content">
<div class="species-grid">
<div v-for="sp in minionData.species" :key="sp.key" class="species-card">
<div class="species-icon-large">{{ speciesIcon(sp.key) }}</div>
<div class="species-name">{{ sp.name }}</div>
<div class="species-name-en">{{ sp.nameEn }}</div>
<div class="species-companions">
<span v-for="comp in getCompanionsBySpecies(sp.key)" :key="comp.id" class="species-comp-tag" :style="{ borderColor: qualityColor(comp.quality) }">
{{ comp.name }}
</span>
</div>
</div>
</div>
</div>
</div>

<style scoped>
.tip-box {
  background: #1a1a2e;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  color: #ccc;
  border-left: 4px solid #9c27b0;
}
.tip-box strong { color: #9c27b0; display: block; margin-bottom: 0.3rem; }
.tabs { display: flex; gap: 0.5rem; margin-bottom: 1.5rem; flex-wrap: wrap; }
.tab {
  background: #1a1a2e;
  color: #888;
  border: 1px solid #333;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: all 0.2s;
}
.tab:hover { border-color: #555; color: #ccc; }
.tab.active { background: rgba(156, 39, 176, 0.15); border-color: #9c27b0; color: #fff; }
.tab-content { animation: fadeIn 0.3s; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
.filters {
  background: #1a1a2e;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
}
.filter-group { display: flex; align-items: center; gap: 0.5rem; }
.filter-group label { color: #888; font-size: 0.9rem; }
.filter-group select {
  background: #2d2d44;
  color: #fff;
  border: 1px solid #444;
  border-radius: 4px;
  padding: 0.4rem 0.6rem;
}
.reset-btn {
  background: #4a4a6a;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
}
.reset-btn:hover { background: #5a5a8a; }
.no-data { color: #666; text-align: center; padding: 2rem; }
.result-count { color: #888; font-size: 0.9rem; margin-bottom: 0.5rem; }
.result-count strong { color: #9c27b0; }
.companions-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 1rem; }
.companion-card {
  background: #1a1a2e;
  border: 2px solid;
  border-radius: 10px;
  overflow: hidden;
}
.comp-header {
  padding: 0.7rem 1rem;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.comp-title { display: flex; align-items: center; gap: 0.5rem; }
.comp-img {
  width: 48px;
  height: 48px;
  object-fit: contain;
  border-radius: 50%;
  background: #2d2d44;
  border: 2px solid rgba(255,255,255,0.3);
  flex-shrink: 0;
}
.species-icon { font-size: 1.5rem; }
.comp-name { font-weight: bold; font-size: 1.05rem; display: block; }
.comp-name-en { font-size: 0.75rem; color: rgba(255,255,255,0.6); display: block; }
.comp-badges { display: flex; gap: 0.3rem; flex-direction: column; align-items: flex-end; }
.quality-badge {
  font-size: 0.7rem;
  padding: 0.1rem 0.4rem;
  border-radius: 3px;
  color: #fff;
}
.species-badge {
  font-size: 0.7rem;
  padding: 0.1rem 0.4rem;
  border-radius: 3px;
  background: rgba(255,255,255,0.15);
  color: rgba(255,255,255,0.7);
}
.comp-body { padding: 0.8rem 1rem; }
.comp-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.4rem;
  padding: 0.6rem;
  background: #2d2d44;
  border-radius: 6px;
  margin-bottom: 0.8rem;
}
.info-row { display: flex; justify-content: space-between; font-size: 0.85rem; }
.info-label { color: #888; }
.info-value { color: #fff; }
.comp-active-skill {
  background: rgba(255, 152, 0, 0.08);
  border-left: 3px solid #ff9800;
  padding: 0.6rem 0.8rem;
  border-radius: 0 6px 6px 0;
  margin-bottom: 0.6rem;
}
.skill-label { font-size: 0.75rem; color: #ff9800; font-weight: bold; margin-bottom: 0.2rem; }
.skill-name { color: #fff; font-size: 0.9rem; font-weight: bold; }
.skill-name-en { color: #666; font-size: 0.8rem; }
.skill-desc { color: #aaa; font-size: 0.85rem; margin: 0.3rem 0 0 0; }
.comp-passives { margin-top: 0.3rem; }
.passive-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem 0;
  border-bottom: 1px solid #2d2d44;
}
.passive-item:last-child { border-bottom: none; }
.passive-name { color: #4caf50; font-size: 0.85rem; font-weight: bold; }
.passive-desc { color: #aaa; font-size: 0.8rem; }
.npc-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 0.8rem; }
.npc-card {
  background: #1a1a2e;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #333;
}
.npc-header {
  background: #2d2d44;
  padding: 0.6rem 1rem;
}
.npc-name { color: #fff; font-weight: bold; font-size: 0.95rem; }
.npc-name-en { color: #666; font-size: 0.8rem; display: block; }
.npc-body { padding: 0.7rem 1rem; }
.npc-body p { color: #aaa; font-size: 0.9rem; line-height: 1.5; margin: 0; }
.enemy-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 0.5rem; }
.enemy-item {
  background: #1a1a2e;
  border: 1px solid #333;
  border-radius: 6px;
  padding: 0.6rem 0.8rem;
  text-align: center;
}
.enemy-name { color: #fff; font-size: 0.9rem; display: block; }
.enemy-name-en { color: #666; font-size: 0.75rem; }
.species-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1rem; }
.species-card {
  background: #1a1a2e;
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
  border: 1px solid #333;
}
.species-icon-large { font-size: 2.5rem; margin-bottom: 0.5rem; }
.species-name { color: #fff; font-weight: bold; font-size: 1.1rem; }
.species-name-en { color: #666; font-size: 0.85rem; margin-bottom: 0.8rem; }
.species-companions { display: flex; flex-wrap: wrap; gap: 0.3rem; justify-content: center; }
.species-comp-tag {
  font-size: 0.75rem;
  padding: 0.15rem 0.4rem;
  border: 1px solid;
  border-radius: 4px;
  color: #aaa;
}
</style>
