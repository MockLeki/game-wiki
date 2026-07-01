---
title: 词条计算器
---

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const data = ref(null)
const loading = ref(true)
const view = ref('encyclopedia')
const currentSlot = ref('weapon')
const currentQuality = ref('rare')
const selectedAffixes = ref([])

onMounted(async () => {
  try {
    const res = await fetch('/data/affixes.json')
    data.value = await res.json()
  } catch (e) {
    console.error('加载词条数据失败:', e)
  } finally {
    loading.value = false
  }
})

watch(currentSlot, () => {
  selectedAffixes.value = []
})

watch(currentQuality, () => {
  const max = data.value?.qualities?.[currentQuality.value]?.maxAffixes || 5
  if (selectedAffixes.value.length > max) {
    selectedAffixes.value = selectedAffixes.value.slice(0, max)
  }
})

const slotOrder = ['weapon', 'helm', 'shoulder', 'chest', 'gloves', 'belt', 'legs', 'boots', 'necklace', 'ring']

const slotIcons = {
  weapon: '/images/icons/ui/icon_bg_weapon.png',
  helm: '/images/icons/ui/icon_bg_helm.png',
  chest: '/images/icons/ui/icon_bg_chest.png',
  shoulder: '/images/icons/ui/icon_bg_shoulder.png',
  necklace: '/images/icons/ui/icon_bg_neck.png',
  gloves: '/images/icons/ui/icon_bg_gloves.png',
  belt: '/images/icons/ui/icon_bg_belt.png',
  legs: '/images/icons/ui/icon_bg_pants.png',
  boots: '/images/icons/ui/icon_bg_boots.png',
  ring: '/images/icons/ui/icon_bg_ring.png'
}

const qualityOrder = ['common', 'uncommon', 'rare', 'legendary']

const qualityColors = {
  common: '#9e9e9e',
  uncommon: '#4caf50',
  rare: '#2196f3',
  legendary: '#ff9800'
}

const categoryNames = {
  attribute: '属性',
  offense: '攻击',
  defense: '防御',
  resource: '资源',
  recovery: '恢复',
  utility: '实用'
}

const affixCategories = {
  strength: 'attribute',
  damage: 'offense',
  attackSpeed: 'offense',
  critDamage: 'offense',
  critChance: 'offense',
  elementalDamage: 'offense',
  eliteDamage: 'offense',
  fullHealthDamage: 'offense',
  injuredDamage: 'offense',
  slowDamage: 'offense',
  stunDamage: 'offense',
  vulnerableDamage: 'offense',
  basicDamage: 'offense',
  powerDamage: 'offense',
  maxHealth: 'defense',
  maxHealthPercent: 'defense',
  maxMana: 'resource',
  armorPercent: 'defense',
  magicResist: 'defense',
  dodgeChance: 'defense',
  cooldownReduction: 'resource',
  thorns: 'defense',
  manaCostReduction: 'resource',
  extraPotion: 'resource',
  lifeRegen: 'recovery',
  moveSpeed: 'utility',
  lifeOnHit: 'recovery',
  lifeOnKill: 'recovery',
  manaOnKill: 'resource',
  goldFind: 'utility',
  magicFind: 'utility',
  potionFind: 'utility',
  experience: 'utility'
}

const maxAffixes = computed(() => {
  return data.value?.qualities?.[currentQuality.value]?.maxAffixes || 5
})

const availableAffixes = computed(() => {
  if (!data.value) return []
  const slotData = data.value.slotAffixes[currentSlot.value] || { prefix: [], suffix: [] }
  const all = [
    ...slotData.prefix.map(id => ({ id, isSuffix: false, kind: '前缀' })),
    ...slotData.suffix.map(id => ({ id, isSuffix: true, kind: '后缀' }))
  ]
  return all.filter(a => !selectedAffixes.value.some(s => s.id === a.id))
})

const availableByKind = computed(() => {
  return {
    prefix: availableAffixes.value.filter(a => !a.isSuffix),
    suffix: availableAffixes.value.filter(a => a.isSuffix)
  }
})

function defaultValue(affixId) {
  const affix = data.value.affixes[affixId]
  const mid = Math.round(((affix.min + affix.max) / 2) / affix.step) * affix.step
  return Math.min(affix.max, Math.max(affix.min, mid))
}

function addAffix(id, isSuffix) {
  if (selectedAffixes.value.length >= maxAffixes.value) return
  if (selectedAffixes.value.some(s => s.id === id)) return
  selectedAffixes.value.push({ id, value: defaultValue(id), isSuffix })
}

function removeAffix(index) {
  selectedAffixes.value.splice(index, 1)
}

function randomize() {
  const pool = [...availableAffixes.value]
  selectedAffixes.value = []
  const count = Math.min(maxAffixes.value, pool.length)
  for (let i = 0; i < count; i++) {
    const idx = Math.floor(Math.random() * pool.length)
    const { id, isSuffix } = pool[idx]
    pool.splice(idx, 1)
    const affix = data.value.affixes[id]
    const raw = affix.min + Math.random() * (affix.max - affix.min)
    const value = Math.round(raw / affix.step) * affix.step
    selectedAffixes.value.push({ id, value: Math.min(affix.max, Math.max(affix.min, value)), isSuffix })
  }
}

function reset() {
  selectedAffixes.value = []
}

const totalStats = computed(() => {
  if (!data.value) return []
  const stats = {}
  selectedAffixes.value.forEach(sel => {
    const affix = data.value.affixes[sel.id]
    if (!stats[affix.id]) {
      stats[affix.id] = { ...affix, total: 0, count: 0, isSuffix: sel.isSuffix }
    }
    stats[affix.id].total += sel.value
    stats[affix.id].count += 1
  })
  return Object.values(stats)
})

const groupedStats = computed(() => {
  const groups = {}
  totalStats.value.forEach(stat => {
    const cat = affixCategories[stat.id] || 'utility'
    if (!groups[cat]) groups[cat] = []
    groups[cat].push(stat)
  })
  return groups
})

const groupedSlots = computed(() => {
  if (!data.value) return []
  return slotOrder.map(key => ({
    key,
    name: data.value.slots[key],
    icon: slotIcons[key],
    prefix: data.value.slotAffixes[key].prefix,
    suffix: data.value.slotAffixes[key].suffix
  }))
})

function formatDesc(affix, value) {
  return affix.desc.replace('{value}', value)
}
</script>

<div class="affix-page">
<div class="page-header">
<h1>装备词条大全</h1>
<p class="page-subtitle">基于游戏内词缀表整理，支持在词条模拟器中自由组合预览属性。</p>
</div>
<div class="view-tabs">
<div @click="view = 'encyclopedia'" :class="['view-tab', { active: view === 'encyclopedia' }]">词条百科</div>
<div @click="view = 'calculator'" :class="['view-tab', { active: view === 'calculator' }]">词条模拟器</div>
</div>
<div v-if="loading" class="loading">加载词条数据中...</div>
<div v-else-if="!data" class="error">加载失败，请刷新重试。</div>
<div v-else>
<!-- 词条百科 -->
<div v-if="view === 'encyclopedia'" class="view-panel">
<div class="ency-grid">
<div v-for="slot in groupedSlots" :key="slot.key" class="ency-card">
<div class="ency-header">
<img :src="slot.icon" class="ency-slot-icon" alt="">
<div class="ency-title">{{ slot.name }}</div>
<div class="ency-count">{{ slot.prefix.length + slot.suffix.length }} 条</div>
</div>
<div class="ency-section">
<div class="ency-section-title">前缀</div>
<div class="ency-list">
<div v-for="id in slot.prefix" :key="id" class="ency-tag prefix">{{ data.affixes[id].name }}</div>
</div>
</div>
<div class="ency-section">
<div class="ency-section-title">后缀</div>
<div class="ency-list">
<div v-for="id in slot.suffix" :key="id" class="ency-tag suffix">{{ data.affixes[id].name }}</div>
</div>
</div>
</div>
</div>
</div>
<!-- 词条模拟器 -->
<div v-if="view === 'calculator'" class="view-panel">
<div class="calc-layout">
<div class="calc-left">
<div class="panel">
<div class="panel-title">选择装备</div>
<div class="form-row">
<label>装备部位</label>
<div class="slot-grid">
<div v-for="key in slotOrder" :key="key" @click="currentSlot = key" :class="['slot-btn', { active: currentSlot === key }]">
<img :src="slotIcons[key]" class="slot-btn-icon" alt="">
<span>{{ data.slots[key] }}</span>
</div>
</div>
</div>
<div class="form-row">
<label>装备品质</label>
<div class="quality-row">
<div v-for="q in qualityOrder" :key="q" @click="currentQuality = q" :class="['quality-btn', { active: currentQuality === q }]">
<span class="quality-dot" :style="{ background: qualityColors[q] }"></span>
<span>{{ data.qualities[q].name }}</span>
</div>
</div>
</div>
<div class="form-row">
<label>已选词条 <span class="affix-counter">{{ selectedAffixes.length }}/{{ maxAffixes }}</span></label>
<div class="selected-list">
<div v-for="(sel, idx) in selectedAffixes" :key="idx" class="selected-row">
<div class="selected-info">
<span class="selected-kind">{{ sel.isSuffix ? '后缀' : '前缀' }}</span>
<span class="selected-name">{{ data.affixes[sel.id].name }}</span>
</div>
<div class="selected-value">{{ sel.value }}{{ data.affixes[sel.id].unit }}</div>
<button class="remove-btn" @click="removeAffix(idx)">×</button>
</div>
<div v-if="selectedAffixes.length === 0" class="empty-hint">点击下方词条进行添加</div>
</div>
</div>
<div class="action-row">
<button class="action-btn primary" @click="randomize" :disabled="availableAffixes.length === 0">随机词条</button>
<button class="action-btn" @click="reset">重置</button>
</div>
</div>
<div class="panel">
<div class="panel-title">可添加词条</div>
<div class="add-section">
<div class="add-section-title">前缀</div>
<div class="add-list">
<div v-for="a in availableByKind.prefix" :key="a.id" @click="addAffix(a.id, a.isSuffix)" class="add-tag" :class="{ disabled: selectedAffixes.length >= maxAffixes }">{{ data.affixes[a.id].name }}</div>
</div>
<div v-if="availableByKind.prefix.length === 0" class="empty-hint">该部位无更多可用前缀</div>
</div>
<div class="add-section">
<div class="add-section-title">后缀</div>
<div class="add-list">
<div v-for="a in availableByKind.suffix" :key="a.id" @click="addAffix(a.id, a.isSuffix)" class="add-tag suffix" :class="{ disabled: selectedAffixes.length >= maxAffixes }">{{ data.affixes[a.id].name }}</div>
</div>
<div v-if="availableByKind.suffix.length === 0" class="empty-hint">该部位无更多可用后缀</div>
</div>
</div>
</div>
<div class="calc-right">
<div class="panel stats-panel">
<div class="panel-title">属性预览</div>
<div class="stats-summary">
<div class="summary-row">
<span class="summary-label">装备部位</span>
<span class="summary-value">{{ data.slots[currentSlot] }}</span>
</div>
<div class="summary-row">
<span class="summary-label">品质</span>
<span class="summary-value" :style="{ color: qualityColors[currentQuality] }">{{ data.qualities[currentQuality].name }}</span>
</div>
<div class="summary-row">
<span class="summary-label">词条数量</span>
<span class="summary-value">{{ selectedAffixes.length }}/{{ maxAffixes }}</span>
</div>
</div>
<div v-for="(cat, key) in groupedStats" :key="key" class="stats-group">
<div class="stats-group-title">{{ categoryNames[key] }}</div>
<div v-for="stat in cat" :key="stat.id" class="stat-row">
<span class="stat-name">{{ stat.name }} <span v-if="stat.count > 1" class="stat-count">×{{ stat.count }}</span></span>
<span class="stat-value">+{{ stat.total }}{{ stat.unit }}</span>
</div>
</div>
<div v-if="totalStats.length === 0" class="empty-hint">未选择任何词条</div>
</div>
</div>
</div>
</div>
</div>
</div>

<style scoped>
.affix-page { color: #efe6d8; }
.page-header { margin-bottom: 1.5rem; }
.page-header h1 { color: #c9a55b; margin: 0 0 0.5rem 0; text-shadow: 0 0 10px rgba(201, 165, 91, 0.2); }
.page-subtitle { color: #a89a86; margin: 0; }
.view-tabs { display: flex; gap: 0.6rem; margin-bottom: 1.5rem; flex-wrap: wrap; }
.view-tab { background: rgba(24, 20, 17, 0.75); border: 1px solid #3d332b; color: #a89a86; padding: 0.6rem 1.4rem; border-radius: 6px; cursor: pointer; transition: all 0.2s; font-weight: 500; }
.view-tab:hover { border-color: #c9a55b; color: #d6c4a8; }
.view-tab.active { background: rgba(201, 165, 91, 0.15); border-color: #c9a55b; color: #c9a55b; box-shadow: 0 0 12px rgba(201, 165, 91, 0.15); }
.view-panel { animation: fadeIn 0.3s; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
.loading, .error { padding: 2rem; text-align: center; color: #a89a86; background: rgba(24, 20, 17, 0.6); border: 1px solid #3d332b; border-radius: 8px; }

/* Encyclopedia */
.ency-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1rem; }
.ency-card { background: rgba(24, 20, 17, 0.75); border: 1px solid #3d332b; border-radius: 8px; padding: 1rem; box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.03), 0 4px 16px rgba(0, 0, 0, 0.4); transition: border-color 0.2s; }
.ency-card:hover { border-color: #5a4b3d; }
.ency-header { display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.8rem; padding-bottom: 0.6rem; border-bottom: 1px solid #322b24; }
.ency-slot-icon { width: 32px; height: 32px; object-fit: contain; }
.ency-title { font-size: 1.1rem; font-weight: 700; color: #c9a55b; flex: 1; }
.ency-count { font-size: 0.85rem; color: #8f7f6e; }
.ency-section { margin-bottom: 0.8rem; }
.ency-section:last-child { margin-bottom: 0; }
.ency-section-title { font-size: 0.85rem; color: #8f7f6e; margin-bottom: 0.4rem; }
.ency-list { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.ency-tag { background: rgba(201, 165, 91, 0.1); border: 1px solid #5a4b3d; color: #d6c4a8; padding: 0.25rem 0.6rem; border-radius: 4px; font-size: 0.85rem; }
.ency-tag.suffix { background: rgba(139, 0, 0, 0.1); border-color: #5a2b2b; color: #d6a8a8; }

/* Calculator */
.calc-layout { display: grid; grid-template-columns: 1fr 340px; gap: 1rem; }
@media (max-width: 920px) { .calc-layout { grid-template-columns: 1fr; } }
.panel { background: rgba(24, 20, 17, 0.75); border: 1px solid #3d332b; border-radius: 8px; padding: 1rem; margin-bottom: 1rem; box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.03), 0 4px 16px rgba(0, 0, 0, 0.4); }
.panel-title { font-size: 1rem; font-weight: 700; color: #c9a55b; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid #322b24; }
.form-row { margin-bottom: 1rem; }
.form-row label { display: block; color: #a89a86; font-size: 0.9rem; margin-bottom: 0.5rem; font-weight: 500; }

.slot-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(90px, 1fr)); gap: 0.4rem; }
.slot-btn { display: flex; flex-direction: column; align-items: center; gap: 0.3rem; background: rgba(16, 13, 11, 0.8); border: 1px solid #3d332b; border-radius: 6px; padding: 0.5rem 0.3rem; cursor: pointer; transition: all 0.2s; }
.slot-btn:hover { border-color: #5a4b3d; }
.slot-btn.active { background: rgba(201, 165, 91, 0.15); border-color: #c9a55b; color: #c9a55b; }
.slot-btn-icon { width: 28px; height: 28px; object-fit: contain; }
.slot-btn span { font-size: 0.8rem; }

.quality-row { display: flex; gap: 0.5rem; flex-wrap: wrap; }
.quality-btn { display: flex; align-items: center; gap: 0.4rem; background: rgba(16, 13, 11, 0.8); border: 1px solid #3d332b; border-radius: 6px; padding: 0.45rem 0.8rem; cursor: pointer; transition: all 0.2s; }
.quality-btn:hover { border-color: #5a4b3d; }
.quality-btn.active { border-color: #c9a55b; background: rgba(201, 165, 91, 0.1); }
.quality-dot { width: 10px; height: 10px; border-radius: 50%; }

.affix-counter { color: #c9a55b; font-weight: 700; }
.selected-list { display: flex; flex-direction: column; gap: 0.4rem; }
.selected-row { display: flex; align-items: center; gap: 0.5rem; background: rgba(16, 13, 11, 0.8); border: 1px solid #3d332b; border-radius: 6px; padding: 0.4rem 0.6rem; }
.selected-info { flex: 1; display: flex; gap: 0.4rem; align-items: center; }
.selected-kind { font-size: 0.75rem; color: #8f7f6e; background: #322b24; padding: 0.1rem 0.35rem; border-radius: 3px; }
.selected-name { color: #d6c4a8; font-size: 0.9rem; }
.selected-value { color: #c9a55b; font-weight: 700; font-size: 0.9rem; min-width: 50px; text-align: right; }
.remove-btn { background: transparent; border: none; color: #b53b3b; font-size: 1.2rem; cursor: pointer; padding: 0 0.3rem; line-height: 1; }
.remove-btn:hover { color: #d65c5c; }

.action-row { display: flex; gap: 0.5rem; margin-top: 1rem; }
.action-btn { flex: 1; background: rgba(16, 13, 11, 0.8); border: 1px solid #3d332b; color: #a89a86; padding: 0.6rem 1rem; border-radius: 6px; cursor: pointer; transition: all 0.2s; font-weight: 500; }
.action-btn:hover { border-color: #5a4b3d; color: #d6c4a8; }
.action-btn.primary { background: linear-gradient(180deg, #a8833e 0%, #7b5d28 100%); border-color: #c9a55b; color: #1a140d; font-weight: 700; }
.action-btn.primary:disabled { opacity: 0.5; cursor: not-allowed; }

.add-section { margin-bottom: 0.8rem; }
.add-section:last-child { margin-bottom: 0; }
.add-section-title { font-size: 0.85rem; color: #8f7f6e; margin-bottom: 0.4rem; }
.add-list { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.add-tag { background: rgba(201, 165, 91, 0.1); border: 1px solid #5a4b3d; color: #d6c4a8; padding: 0.35rem 0.7rem; border-radius: 4px; font-size: 0.85rem; cursor: pointer; transition: all 0.2s; }
.add-tag:hover { background: rgba(201, 165, 91, 0.2); border-color: #c9a55b; }
.add-tag.suffix { background: rgba(139, 0, 0, 0.1); border-color: #5a2b2b; color: #d6a8a8; }
.add-tag.suffix:hover { background: rgba(139, 0, 0, 0.2); border-color: #b53b3b; }
.add-tag.disabled { opacity: 0.4; cursor: not-allowed; }

.empty-hint { color: #5a4b3d; font-size: 0.85rem; text-align: center; padding: 0.8rem; font-style: italic; }

/* Stats panel */
.stats-summary { background: rgba(16, 13, 11, 0.6); border: 1px solid #3d332b; border-radius: 6px; padding: 0.8rem; margin-bottom: 1rem; }
.summary-row { display: flex; justify-content: space-between; padding: 0.3rem 0; border-bottom: 1px solid #322b24; }
.summary-row:last-child { border-bottom: none; }
.summary-label { color: #8f7f6e; }
.summary-value { color: #d6c4a8; font-weight: 600; }
.stats-group { margin-bottom: 1rem; }
.stats-group:last-child { margin-bottom: 0; }
.stats-group-title { font-size: 0.85rem; color: #c9a55b; margin-bottom: 0.4rem; padding-bottom: 0.2rem; border-bottom: 1px solid #322b24; }
.stat-row { display: flex; justify-content: space-between; padding: 0.35rem 0; font-size: 0.9rem; }
.stat-name { color: #a89a86; }
.stat-value { color: #4caf50; font-weight: 600; }
.stat-count { color: #8f7f6e; font-size: 0.75rem; }

@media (max-width: 640px) {
  .calc-layout { display: block; }
  .calc-right { margin-top: 1rem; }
  .slot-grid { grid-template-columns: repeat(5, 1fr); }
  .ency-grid { grid-template-columns: 1fr; }
}
</style>
