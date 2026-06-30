<script setup>
import { ref, computed, onMounted, reactive } from 'vue'

const skillData = ref(null)
const loading = ref(true)
const activeClass = ref('warrior')
const talentRanks = reactive({})
const totalPoints = ref(30)
const selectedTalent = ref(null)
const hoveredTalent = ref(null)

onMounted(async () => {
  try {
    const response = await fetch('/data/skills.json')
    skillData.value = await response.json()
  } catch (e) {
    console.error('加载失败:', e)
  } finally {
    loading.value = false
  }
})

const currentClass = computed(() => {
  if (!skillData.value) return null
  return skillData.value.classes[activeClass.value]
})

const spentPoints = computed(() => {
  let total = 0
  for (const key in talentRanks) {
    if (key.startsWith(activeClass.value + '_')) {
      total += talentRanks[key]
    }
  }
  return total
})

const remainingPoints = computed(() => totalPoints.value - spentPoints.value)

const getTalentRank = (talentId) => {
  const key = `${activeClass.value}_${talentId}`
  return talentRanks[key] || 0
}

const canAllocate = (talent) => {
  return remainingPoints.value > 0 && getTalentRank(talent.id) < talent.maxRank
}

const canRefund = (talent) => {
  return getTalentRank(talent.id) > 0
}

const allocatePoint = (talent) => {
  if (!canAllocate(talent)) return
  const key = `${activeClass.value}_${talent.id}`
  talentRanks[key] = (talentRanks[key] || 0) + 1
}

const refundPoint = (talent) => {
  if (!canRefund(talent)) return
  const key = `${activeClass.value}_${talent.id}`
  talentRanks[key]--
  if (talentRanks[key] <= 0) delete talentRanks[key]
}

const refundAll = () => {
  Object.keys(talentRanks).forEach(key => {
    if (key.startsWith(activeClass.value + '_')) {
      delete talentRanks[key]
    }
  })
}

const tagColor = (tag) => {
  if (!skillData.value) return '#666'
  const t = skillData.value.abilityTags[tag]
  return t ? t.color : '#666'
}

const tagName = (tag) => {
  if (!skillData.value) return tag
  const t = skillData.value.abilityTags[tag]
  return t ? t.name : tag
}

const talentsByCategory = computed(() => {
  if (!currentClass.value || !currentClass.value.talents) return {}
  const cats = {}
  currentClass.value.talents.forEach(t => {
    if (!cats[t.category]) cats[t.category] = []
    cats[t.category].push(t)
  })
  return cats
})

const allocatedTalents = computed(() => {
  if (!currentClass.value || !currentClass.value.talents) return []
  return currentClass.value.talents.filter(t => getTalentRank(t.id) > 0)
})

const switchClass = (cls) => {
  activeClass.value = cls
  selectedTalent.value = null
  hoveredTalent.value = null
}

const categoryColor = (cat) => {
  const colors = {
    '属性': '#4caf50',
    '暴击': '#ff9800',
    '防御': '#2196f3',
    '增伤': '#f44336',
    '强化': '#9c27b0',
    '法力': '#00bcd4',
    '控制': '#e91e63',
    '仆从': '#795548'
  }
  return colors[cat] || '#666'
}

const categoryIcon = (cat) => {
  const icons = {
    '属性': '💪', '暴击': '💥', '防御': '🛡️', '增伤': '⚔️',
    '强化': '🔥', '法力': '💧', '控制': '👁️', '仆从': '🐺'
  }
  return icons[cat] || '⭐'
}

const branchColumns = computed(() => {
  if (!currentClass.value || !currentClass.value.talents) return []
  const cats = talentsByCategory.value
  return [
    { name: '属性', talents: cats['属性'] || [] },
    { name: '暴击', talents: cats['暴击'] || [] },
    { name: '防御', talents: cats['防御'] || [] },
    { name: '增伤', talents: cats['增伤'] || [] },
    { name: '强化', talents: cats['强化'] || [] },
    { name: '法力', talents: cats['法力'] || [] },
    { name: '控制', talents: cats['控制'] || [] },
    { name: '仆从', talents: cats['仆从'] || [] }
  ].filter(c => c.talents.length > 0)
})

const pointProgress = computed(() => (spentPoints.value / totalPoints.value) * 100)
</script>

# 技能大全

<div class="tip-box">
  <strong>数据来源</strong>
  <p>技能数据从游戏本体 Deskrawl Demo 的 Unity 资源中提取，包含战士与法师的主动技能、天赋树及属性系统。图标与背景均来自游戏内实际资源。左键点击天赋节点分配点数，右键点击退回点数。</p>
</div>

<p v-if="loading">加载中...</p>

<div v-if="!loading && skillData" class="skill-container">
<div class="class-tabs">
<button v-for="(cls, key) in skillData.classes" :key="key" :class="['class-tab', { active: activeClass === key }]" @click="switchClass(key)">
<img v-if="cls.icon && cls.icon.startsWith('/')" :src="cls.icon" class="class-icon-img" alt="">
<span v-else class="class-icon">{{ cls.icon }}</span>
<span class="class-name">{{ cls.name }}</span>
<span class="class-name-en">{{ cls.nameEn }}</span>
</button>
</div>
<div v-if="currentClass" class="class-info">
<h2>{{ currentClass.name }} ({{ currentClass.nameEn }})</h2>
<p class="class-desc">{{ currentClass.description }}</p>
<p class="class-stat"><strong>主属性:</strong> {{ currentClass.primaryStat }}</p>
</div>
<div v-if="currentClass" class="section">
<h3 class="section-title">⚡ 主动技能</h3>
<div class="abilities-grid">
<div v-for="ability in currentClass.abilities" :key="ability.id" class="ability-card">
<div class="ability-icon-wrap">
<img v-if="ability.icon" :src="ability.icon" class="ability-icon-img" alt="">
</div>
<div class="ability-body">
<div class="ability-header">
<span class="ability-name">{{ ability.name }}</span>
<span class="ability-tag" :style="{ backgroundColor: tagColor(ability.tag) }">{{ tagName(ability.tag) }}</span>
</div>
<p class="ability-name-en">{{ ability.nameEn }}</p>
<p class="ability-desc">{{ ability.description }}</p>
</div>
</div>
</div>
</div>
<div v-if="currentClass && currentClass.talents && currentClass.talents.length > 0" class="section">
<div class="talent-header">
<h3 class="section-title">🌟 天赋模拟器</h3>
<div class="point-tracker">
<div class="point-bar-wrap">
<div class="point-bar" :style="{ width: pointProgress + '%' }"></div>
<span class="point-text">已分配 {{ spentPoints }} / {{ totalPoints }}</span>
</div>
<span class="points-remaining" :class="{ 'no-points': remainingPoints === 0 }">剩余: <strong>{{ remainingPoints }}</strong></span>
<button class="reset-btn" @click="refundAll">重置天赋</button>
</div>
</div>
<p class="talent-hint">💡 左键点击分配天赋点，右键点击退回天赋点</p>
<div class="talent-tree-wrap">
<div class="talent-tree-bg"></div>
<div class="talent-tree">
<div v-for="branch in branchColumns" :key="branch.name" class="talent-branch" :style="{ borderColor: categoryColor(branch.name) }">
<div class="branch-header" :style="{ backgroundColor: categoryColor(branch.name) }">
<span class="branch-icon">{{ categoryIcon(branch.name) }}</span>
<span class="branch-name">{{ branch.name }}</span>
</div>
<div class="branch-nodes">
<div v-for="(talent, idx) in branch.talents" :key="talent.id" class="node-connector" :class="{ 'last': idx === branch.talents.length - 1 }">
<div class="connector-line" v-if="idx > 0"></div>
<div :class="['talent-node', { 'maxed': getTalentRank(talent.id) >= talent.maxRank, 'allocated': getTalentRank(talent.id) > 0, 'available': canAllocate(talent) }]" @click="allocatePoint(talent)" @contextmenu.prevent="refundPoint(talent)" @mouseenter="hoveredTalent = talent" @mouseleave="hoveredTalent = null">
<div class="talent-icon-ring" :style="{ borderColor: categoryColor(branch.name) }">
<img v-if="talent.icon" :src="talent.icon" class="talent-icon-img" alt="">
</div>
<div class="talent-info">
<span class="talent-name">{{ talent.name }}</span>
<span class="talent-rank">{{ getTalentRank(talent.id) }} / {{ talent.maxRank }}</span>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
<div v-if="hoveredTalent" class="talent-detail">
<div class="detail-header" :style="{ backgroundColor: categoryColor(hoveredTalent.category) }">
<img v-if="hoveredTalent.icon" :src="hoveredTalent.icon" class="detail-icon" alt="">
<div class="detail-title">
<strong>{{ hoveredTalent.name }}</strong>
<span class="detail-name-en">{{ hoveredTalent.nameEn }} ({{ hoveredTalent.category }})</span>
</div>
</div>
<div class="detail-body">
<p class="detail-desc">{{ hoveredTalent.desc }}</p>
<p class="detail-desc-en">{{ hoveredTalent.descEn }}</p>
<p class="detail-rank">当前等级: {{ getTalentRank(hoveredTalent.id) }} / {{ hoveredTalent.maxRank }}</p>
</div>
</div>
</div>
<div v-if="currentClass && (!currentClass.talents || currentClass.talents.length === 0)" class="section">
<h3 class="section-title">🌟 天赋模拟器</h3>
<div class="no-data-box">
<p>🎭 法师天赋数据尚未在 Demo 版本的本地化文件中找到。</p>
<p>游戏文件中存在 SorcererTalent0 - SorcererTalent23 共24个天赋节点的资产引用，但对应的文本描述可能存储在服务端或将在正式版中补充。</p>
<p>如果你有法师天赋的截图或文字资料，可以补充给我们！</p>
</div>
</div>
<div v-if="allocatedTalents.length > 0" class="section summary-section">
<h3 class="section-title">📋 当前加点效果总结</h3>
<div class="summary-grid">
<div v-for="talent in allocatedTalents" :key="talent.id" class="summary-item">
<div class="summary-icon-wrap">
<img v-if="talent.icon" :src="talent.icon" class="summary-icon-img" alt="">
</div>
<div class="summary-content">
<span class="summary-name">{{ talent.name }}</span>
<span class="summary-rank">Lv.{{ getTalentRank(talent.id) }}</span>
<span class="summary-desc">{{ talent.desc }}</span>
</div>
</div>
</div>
</div>
<div class="section">
<h3 class="section-title">📊 属性系统参考</h3>
<div class="stats-table-wrap">
<table class="stats-table">
<thead>
<tr><th>属性</th><th>说明</th></tr>
</thead>
<tbody>
<tr v-for="stat in skillData.stats" :key="stat.key">
<td class="stat-name">{{ stat.name }}</td>
<td class="stat-desc">{{ stat.desc }}</td>
</tr>
</tbody>
</table>
</div>
</div>
<div class="section">
<h3 class="section-title">🐺 仆从物种类型</h3>
<div class="species-list">
<span v-for="sp in skillData.species" :key="sp.key" class="species-tag">{{ sp.name }} ({{ sp.nameEn }})</span>
</div>
</div>
<div class="section">
<h3 class="section-title">💎 装备品质</h3>
<div class="rarity-list">
<span v-for="r in skillData.rarities" :key="r.key" class="rarity-tag" :style="{ borderColor: r.color, color: r.color }">{{ r.name }}</span>
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
.section { margin-bottom: 2rem; }
.section-title {
  color: #fff;
  border-bottom: 2px solid #333;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}
.class-tabs { display: flex; gap: 1rem; margin-bottom: 1.5rem; }
.class-tab {
  flex: 1;
  background: #1a1a2e;
  border: 2px solid #333;
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
}
.class-tab:hover { border-color: #555; background: #2d2d44; }
.class-tab.active { border-color: #9c27b0; background: rgba(156, 39, 176, 0.15); }
.class-icon { font-size: 2rem; }
.class-icon-img { width: 48px; height: 48px; object-fit: contain; }
.class-name { font-size: 1.2rem; font-weight: bold; color: #fff; }
.class-name-en { font-size: 0.85rem; color: #888; }
.class-info {
  background: #1a1a2e;
  border-radius: 8px;
  padding: 1rem 1.5rem;
  margin-bottom: 2rem;
  border-left: 4px solid #9c27b0;
}
.class-info h2 { margin: 0 0 0.5rem 0; color: #fff; }
.class-desc { color: #aaa; margin: 0.3rem 0; }
.class-stat { color: #ff9800; margin: 0.3rem 0; font-size: 0.9rem; }
.abilities-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1rem; }
.ability-card {
  background: #1a1a2e;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #333;
  display: flex;
  align-items: stretch;
}
.ability-icon-wrap {
  width: 80px;
  min-height: 100%;
  background: linear-gradient(135deg, #2d2d44 0%, #1a1a2e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-right: 1px solid #333;
}
.ability-icon-img { width: 56px; height: 56px; object-fit: contain; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5)); }
.ability-body { padding: 0.8rem 1rem; flex: 1; }
.ability-header { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.3rem; }
.ability-name { color: #fff; font-size: 1.05rem; font-weight: bold; }
.ability-tag {
  font-size: 0.75rem;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  color: #fff;
  font-weight: bold;
}
.ability-name-en { color: #666; font-size: 0.85rem; margin: 0 0 0.5rem 0; font-style: italic; }
.ability-desc { color: #ccc; font-size: 0.9rem; line-height: 1.5; margin: 0; }
.talent-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.talent-header .section-title { margin-bottom: 0; border: none; }
.point-tracker { display: flex; align-items: center; gap: 0.8rem; background: #1a1a2e; padding: 0.5rem 1rem; border-radius: 8px; }
.point-bar-wrap {
  width: 160px;
  height: 22px;
  background: #333;
  border-radius: 11px;
  position: relative;
  overflow: hidden;
}
.point-bar {
  height: 100%;
  background: linear-gradient(90deg, #4caf50, #ff9800);
  border-radius: 11px;
  transition: width 0.2s;
}
.point-text {
  position: absolute;
  top: 0; left: 0; right: 0;
  text-align: center;
  color: #fff;
  font-size: 0.75rem;
  line-height: 22px;
  font-weight: bold;
  text-shadow: 0 1px 2px rgba(0,0,0,0.8);
}
.points-remaining { color: #ff9800; font-size: 0.9rem; }
.points-remaining.no-points { color: #f44336; }
.reset-btn { background: #4a4a6a; color: white; border: none; padding: 0.4rem 0.8rem; border-radius: 4px; cursor: pointer; font-size: 0.85rem; }
.reset-btn:hover { background: #5a5a8a; }
.talent-hint { color: #666; font-size: 0.85rem; margin: 0.5rem 0 1rem 0; }
.talent-tree-wrap {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid #333;
  padding: 1rem;
  min-height: 500px;
}
.talent-tree-bg {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: url('/images/icons/ui/warrior_talent_bg.png') center center / cover no-repeat;
  opacity: 0.35;
  z-index: 0;
}
.talent-tree {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}
.talent-branch {
  background: rgba(26, 26, 46, 0.85);
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid;
  backdrop-filter: blur(4px);
}
.branch-header {
  padding: 0.5rem 0.8rem;
  color: #fff;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.95rem;
}
.branch-icon { font-size: 1.1rem; }
.branch-nodes { padding: 0.6rem; }
.node-connector { position: relative; padding-bottom: 0.6rem; }
.node-connector.last { padding-bottom: 0; }
.connector-line {
  position: absolute;
  left: 24px;
  top: 48px;
  width: 3px;
  height: calc(100% - 32px);
  background: linear-gradient(180deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05));
  z-index: 0;
}
.talent-node {
  position: relative;
  z-index: 1;
  background: #2d2d44;
  border: 2px solid #444;
  border-radius: 8px;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.15s;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  user-select: none;
}
.talent-node:hover { border-color: #666; background: #353548; transform: translateY(-2px); }
.talent-node.available { border-color: #4caf50; box-shadow: 0 0 8px rgba(76, 175, 80, 0.3); }
.talent-node.allocated { border-color: #ff9800; background: rgba(255, 152, 0, 0.12); }
.talent-node.maxed { border-color: #ff9800; background: rgba(255, 152, 0, 0.2); box-shadow: 0 0 12px rgba(255, 152, 0, 0.5); }
.talent-icon-ring {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1a1a2e;
  flex-shrink: 0;
  overflow: hidden;
}
.talent-icon-img { width: 34px; height: 34px; object-fit: contain; }
.talent-info { display: flex; flex-direction: column; gap: 0.1rem; }
.talent-name { color: #fff; font-size: 0.85rem; font-weight: bold; }
.talent-rank { color: #888; font-size: 0.75rem; }
.talent-node.allocated .talent-rank { color: #ff9800; }
.talent-detail {
  margin-top: 1rem;
  background: rgba(26, 26, 46, 0.95);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #333;
}
.detail-header {
  padding: 0.8rem 1rem;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
.detail-icon { width: 40px; height: 40px; object-fit: contain; }
.detail-title { display: flex; flex-direction: column; }
.detail-title strong { font-size: 1.05rem; }
.detail-name-en { font-size: 0.8rem; opacity: 0.8; }
.detail-body { padding: 1rem; }
.detail-desc { color: #ccc; font-size: 0.95rem; margin: 0 0 0.5rem 0; }
.detail-desc-en { color: #666; font-size: 0.85rem; font-style: italic; margin: 0 0 0.5rem 0; }
.detail-rank { color: #ff9800; font-size: 0.85rem; margin: 0; }
.no-data-box { background: #1a1a2e; border-radius: 8px; padding: 1.5rem; text-align: center; color: #888; }
.no-data-box p { margin: 0.5rem 0; }
.summary-section { background: rgba(156, 39, 176, 0.05); border-radius: 8px; padding: 1rem; }
.summary-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 0.8rem; }
.summary-item {
  background: #1a1a2e;
  border-radius: 6px;
  padding: 0.6rem 0.8rem;
  border-left: 3px solid #ff9800;
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
.summary-icon-wrap {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #2d2d44;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
}
.summary-icon-img { width: 28px; height: 28px; object-fit: contain; }
.summary-content { display: flex; flex-direction: column; gap: 0.15rem; flex: 1; }
.summary-name { color: #ff9800; font-weight: bold; font-size: 0.9rem; }
.summary-rank { color: #4caf50; font-size: 0.8rem; }
.summary-desc { color: #aaa; font-size: 0.85rem; }
.stats-table-wrap { overflow-x: auto; }
.stats-table { width: 100%; border-collapse: collapse; background: #1a1a2e; border-radius: 8px; overflow: hidden; }
.stats-table th { background: #2d2d44; color: #9c27b0; padding: 0.6rem 1rem; text-align: left; font-weight: bold; }
.stats-table td { padding: 0.5rem 1rem; border-top: 1px solid #2d2d44; }
.stat-name { color: #ff9800; font-weight: bold; white-space: nowrap; width: 120px; }
.stat-desc { color: #aaa; font-size: 0.9rem; }
.species-list { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.species-tag { background: #1a1a2e; padding: 0.4rem 0.8rem; border-radius: 6px; color: #aaa; font-size: 0.9rem; border: 1px solid #333; }
.rarity-list { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.rarity-tag { padding: 0.4rem 1rem; border-radius: 6px; border: 2px solid; font-weight: bold; font-size: 0.9rem; background: #1a1a2e; }
</style>
