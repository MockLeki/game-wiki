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

const groupedCompanions = computed(() => {
  const list = filteredCompanions.value
  const groups = []
  let currentQuality = null
  const qualityNames = { common: '普通', uncommon: '非凡', rare: '稀有', legendary: '传说', divine: '神圣' }
  for (const c of list) {
    if (c.quality !== currentQuality) {
      currentQuality = c.quality
      groups.push({ type: 'header', quality: c.quality, label: qualityNames[c.quality] || c.quality, count: list.filter(x => x.quality === c.quality).length })
    }
    groups.push({ type: 'item', data: c })
  }
  return groups
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
<div class="tabs">
<button :class="['tab', { active: activeTab==='companions' }]" @click="activeTab='companions'">🐾 可捕获仆从</button>
<button :class="['tab', { active: activeTab==='npcs' }]" @click="activeTab='npcs'">🏛️ 城镇NPC</button>
</div>
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
<template v-for="entry in groupedCompanions" :key="entry.type === 'header' ? 'h-' + entry.quality : entry.data.id">
<div v-if="entry.type === 'header'" class="quality-section-header" :style="{ backgroundColor: qualityColor(entry.quality), borderColor: qualityColor(entry.quality) }">
<span class="quality-section-title">{{ entry.label }}品质</span>
<span class="quality-section-count">{{ entry.count }} 个仆从</span>
</div>
<div v-else class="companion-card" :style="{ borderColor: qualityColor(entry.data.quality) }">
<div class="comp-header" :style="{ backgroundColor: qualityColor(entry.data.quality) }">
<div class="comp-title">
<div class="comp-icon-wrap">
<img v-if="entry.data.icon" :src="entry.data.icon" class="comp-icon-img" alt="">
<span v-else class="species-icon">{{ speciesIcon(entry.data.species) }}</span>
</div>
<div>
<span class="comp-name">{{ entry.data.name }}</span>
<span class="comp-name-en">{{ entry.data.nameEn }}</span>
</div>
</div>
<div class="comp-badges">
<span class="quality-badge" :style="{ backgroundColor: qualityColor(entry.data.quality) }">{{ qualityName(entry.data.quality) }}</span>
<span class="species-badge">{{ entry.data.speciesName }}</span>
</div>
</div>
<div class="comp-body">
<div class="comp-info">
<div class="info-row"><span class="info-label">等级要求</span><span class="info-value">Lv.{{ entry.data.level }}</span></div>
<div class="info-row"><span class="info-label">负重</span><span class="info-value">{{ entry.data.weight }}</span></div>
<div class="info-row"><span class="info-label">出没地点</span><span class="info-value">{{ entry.data.location }}</span></div>
</div>
<div v-if="entry.data.activeSkill" class="comp-active-skill">
<div class="skill-label">⚡ 主动技能</div>
<div class="skill-name">{{ entry.data.activeSkill.name }} <span class="skill-name-en">({{ entry.data.activeSkill.nameEn }})</span></div>
<p class="skill-desc">{{ entry.data.activeSkill.desc }}</p>
</div>
<div class="comp-passives">
<div class="skill-label">📋 被动加成</div>
<div v-for="p in entry.data.passives" :key="p.name" class="passive-item">
<span class="passive-name">{{ p.name }}</span>
<span class="passive-desc">{{ p.desc }}</span>
</div>
</div>
</div>
</div>
</template>
</div>
</div>
<div v-if="activeTab==='npcs'" class="tab-content">
<div class="npc-grid">
<div v-for="npc in minionData.npcs" :key="npc.id" class="npc-card">
<div class="npc-header">
<div class="npc-icon-wrap">
<img v-if="npc.icon" :src="npc.icon" class="npc-icon-img" alt="">
</div>
<div>
<span class="npc-name">{{ npc.name }}</span>
<span class="npc-name-en">{{ npc.nameEn }}</span>
</div>
</div>
<div class="npc-body">
<p>{{ npc.desc }}</p>
</div>
</div>
</div>
</div>
</div>

<style scoped>
.tip-box {
  background: #181513;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  color: #c7b8a3;
  border-left: 4px solid #c9a55b;
}
.tip-box strong { color: #c9a55b; display: block; margin-bottom: 0.3rem; }
.tabs { display: flex; gap: 0.5rem; margin-bottom: 1.5rem; flex-wrap: wrap; }
.tab {
  background: #181513;
  color: #8f7f6e;
  border: 1px solid #3d332b;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: all 0.2s;
}
.tab:hover { border-color: #6b5d50; color: #c7b8a3; }
.tab.active { background: rgba(201, 165, 91, 0.15); border-color: #c9a55b; color: #efe6d8; }
.tab-content { animation: fadeIn 0.3s; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
.filters {
  background: #181513;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
}
.filter-group { display: flex; align-items: center; gap: 0.5rem; }
.filter-group label { color: #8f7f6e; font-size: 0.9rem; }
.filter-group select {
  background: #2d2723;
  color: #efe6d8;
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
.no-data { color: #8f7f6e; text-align: center; padding: 2rem; }
.result-count { color: #8f7f6e; font-size: 0.9rem; margin-bottom: 0.5rem; }
.result-count strong { color: #c9a55b; }
.companions-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 1rem; }
.companion-card {
  background: #181513;
  border: 2px solid;
  border-radius: 10px;
  overflow: hidden;
}
.comp-header {
  padding: 0.7rem 1rem;
  color: #efe6d8;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.comp-title { display: flex; align-items: center; gap: 0.5rem; }
.comp-icon-wrap {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #2d2723;
  border: 2px solid rgba(255,255,255,0.3);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.comp-icon-img { width: 44px; height: 44px; object-fit: contain; }
.species-icon { font-size: 1.5rem; }
.comp-name { font-weight: bold; font-size: 1.05rem; display: block; }
.comp-name-en { font-size: 0.75rem; color: rgba(255,255,255,0.6); display: block; }
.comp-badges { display: flex; gap: 0.3rem; flex-direction: column; align-items: flex-end; }
.quality-badge {
  font-size: 0.7rem;
  padding: 0.1rem 0.4rem;
  border-radius: 3px;
  color: #efe6d8;
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
  background: #2d2723;
  border-radius: 6px;
  margin-bottom: 0.8rem;
}
.info-row { display: flex; justify-content: space-between; font-size: 0.85rem; }
.info-label { color: #8f7f6e; }
.info-value { color: #efe6d8; }
.comp-active-skill {
  background: rgba(255, 152, 0, 0.08);
  border-left: 3px solid #ff9800;
  padding: 0.6rem 0.8rem;
  border-radius: 0 6px 6px 0;
  margin-bottom: 0.6rem;
}
.skill-label { font-size: 0.75rem; color: #ff9800; font-weight: bold; margin-bottom: 0.2rem; }
.skill-name { color: #efe6d8; font-size: 0.9rem; font-weight: bold; }
.skill-name-en { color: #8f7f6e; font-size: 0.8rem; }
.skill-desc { color: #c7b8a3; font-size: 0.85rem; margin: 0.3rem 0 0 0; }
.comp-passives { margin-top: 0.3rem; }
.passive-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem 0;
  border-bottom: 1px solid #2d2723;
}
.passive-item:last-child { border-bottom: none; }
.passive-name { color: #4caf50; font-size: 0.85rem; font-weight: bold; }
.passive-desc { color: #c7b8a3; font-size: 0.8rem; }
.quality-section-header {
  grid-column: 1 / -1;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  border: 2px solid;
  margin: 1rem 0 0.5rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.quality-section-header:first-of-type { margin-top: 0; }
.quality-section-title { color: #efe6d8; font-weight: bold; font-size: 1rem; }
.quality-section-count { color: rgba(255,255,255,0.6); font-size: 0.85rem; }
.npc-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 0.8rem; }
.npc-card {
  background: #181513;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #3d332b;
}
.npc-header {
  background: #2d2723;
  padding: 0.6rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
.npc-icon-wrap {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #181513;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
}
.npc-icon-img { width: 36px; height: 36px; object-fit: contain; }
.npc-name { color: #efe6d8; font-weight: bold; font-size: 0.95rem; display: block; }
.npc-name-en { color: #8f7f6e; font-size: 0.8rem; display: block; }
.npc-body { padding: 0.7rem 1rem; }
.npc-body p { color: #c7b8a3; font-size: 0.9rem; line-height: 1.5; margin: 0; }
.enemy-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 0.8rem; }
.enemy-item {
  background: #181513;
  border: 1px solid #3d332b;
  border-radius: 8px;
  padding: 0.8rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
}
.enemy-icon-wrap {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #2d2723;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-bottom: 0.3rem;
}
.enemy-icon-img { width: 56px; height: 56px; object-fit: contain; }
.enemy-name { color: #efe6d8; font-size: 0.9rem; display: block; }
.enemy-name-en { color: #8f7f6e; font-size: 0.75rem; }
.species-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1rem; }
.species-card {
  background: #181513;
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
  border: 1px solid #3d332b;
}
.species-icon-large { font-size: 2.5rem; margin-bottom: 0.5rem; }
.species-name { color: #efe6d8; font-weight: bold; font-size: 1.1rem; }
.species-name-en { color: #8f7f6e; font-size: 0.85rem; margin-bottom: 0.8rem; }
.species-companions { display: flex; flex-wrap: wrap; gap: 0.3rem; justify-content: center; }
.species-comp-tag {
  font-size: 0.75rem;
  padding: 0.15rem 0.4rem;
  border: 1px solid;
  border-radius: 4px;
  color: #c7b8a3;
}
</style>
