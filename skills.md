<script setup>
import { ref, computed, onMounted, reactive } from 'vue'

const skillData = ref(null)
const loading = ref(true)
const activeClass = ref('warrior')
const talentRanks = reactive({})
const hoveredTalent = ref(null)
const activeTalentTab = ref('combat')

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

const totalPoints = computed(() => {
  return currentClass.value ? (currentClass.value.totalPoints || 24) : 24
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
  if (talent.milestone) return false
  return remainingPoints.value > 0 && getTalentRank(talent.id) < talent.maxRank
}

const canRefund = (talent) => {
  if (talent.milestone) return false
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
  if (!skillData.value) return '#8f7f6e'
  const t = skillData.value.abilityTags[tag]
  return t ? t.color : '#8f7f6e'
}

const tagName = (tag) => {
  if (!skillData.value) return tag
  const t = skillData.value.abilityTags[tag]
  return t ? t.name : tag
}

const allocatedTalents = computed(() => {
  if (!currentClass.value || !currentClass.value.talents) return []
  return currentClass.value.talents.filter(t => getTalentRank(t.id) > 0 && !t.milestone)
})

const switchClass = (cls) => {
  activeClass.value = cls
  hoveredTalent.value = null
}

const talentGrid = computed(() => {
  if (!currentClass.value || !currentClass.value.talents) return []
  const grid = []
  for (let r = 1; r <= 5; r++) {
    const row = currentClass.value.talents.filter(t => t.row === r).sort((a, b) => a.col - b.col)
    grid.push(row)
  }
  return grid
})

const rowLevels = computed(() => {
  return currentClass.value ? (currentClass.value.rowLevels || [1, 5, 5, 5, 6]) : [1, 5, 5, 5, 6]
})

const pointProgress = computed(() => (spentPoints.value / totalPoints.value) * 100)

const formatTalentDesc = (talent, rank = 0) => {
  if (!talent) return ''
  let text = talent.desc || ''
  if (rank <= 0) return text
  const values = talent.values || {}
  const currentRank = Math.min(rank, talent.maxRank)
  for (const key in values) {
    const arr = values[key]
    if (Array.isArray(arr) && arr.length >= currentRank) {
      const val = arr[currentRank - 1]
      text = text.replace(new RegExp(`\\{${key}\\}`, 'g'), val)
    }
  }
  return text
}

const nextRankValue = (talent, key) => {
  if (!talent || !talent.values) return null
  const rank = getTalentRank(talent.id)
  const nextRank = Math.min(rank + 1, talent.maxRank)
  const arr = talent.values[key]
  if (Array.isArray(arr) && arr.length >= nextRank) {
    return arr[nextRank - 1]
  }
  return null
}

const nodeStatus = (talent) => {
  const rank = getTalentRank(talent.id)
  if (rank >= talent.maxRank) return 'maxed'
  if (rank > 0) return 'allocated'
  if (canAllocate(talent)) return 'available'
  return 'locked'
}
</script>

# 技能大全

<div class="tip-box">
  <strong>数据来源</strong>
  <p>技能数据从游戏本体 Deskrawl Demo 的 Unity 资源中提取，天赋树布局与“战斗天赋”页签参考游戏内截图重构。点击天赋节点可分配/退回点数，底部实时显示当前加点效果。</p>
</div>

<p v-if="loading">加载中...</p>

<div v-if="!loading && skillData" class="skill-container">
<div class="class-tabs">
<button v-for="(cls, key) in skillData.classes" :key="key" :class="['class-tab', { active: activeClass === key }]" @click="switchClass(key)">
<img v-if="cls.icon && cls.icon.startsWith('/')" :src="cls.icon" class="class-icon-img" alt="">
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
<div v-if="currentClass" class="section">
<div class="talent-tabs">
<button :class="['talent-tab', { active: activeTalentTab === 'combat' }]" @click="activeTalentTab = 'combat'">战斗天赋</button>
<button :class="['talent-tab', { active: activeTalentTab === 'life' }]" @click="activeTalentTab = 'life'">生活技能</button>
</div>
<div v-if="activeTalentTab === 'combat'">
<div class="talent-header">
<h3 class="section-title">🌟 天赋模拟器</h3>
<div class="point-tracker">
<div class="point-bar-wrap">
<div class="point-bar" :style="{ width: pointProgress + '%' }"></div>
<span class="point-text">已分配 {{ spentPoints }} / {{ totalPoints }}</span>
</div>
<span class="points-remaining" :class="{ 'no-points': remainingPoints === 0 }">剩余: <strong>{{ remainingPoints }}</strong></span>
<button class="reset-btn" @click="refundAll">重置</button>
</div>
</div>
<p class="talent-hint" :class="{ 'no-points-hint': remainingPoints === 0 }">
<span v-if="remainingPoints > 0">💡 左键点击分配天赋点，右键点击退回天赋点</span>
<span v-else>⚠️ 天赋点已全部分配（共 {{ totalPoints }} 点），右键节点可退回重加</span>
</p>
<div class="talent-tree-panel">
<div class="talent-tree-bg"></div>
<div class="talent-tree-frame">
<div class="row-levels">
<div v-for="(lvl, idx) in rowLevels" :key="idx" class="row-level">
<div class="level-ring">{{ lvl }}</div>
</div>
</div>
<div class="talent-grid">
<div v-for="(row, rIdx) in talentGrid" :key="rIdx" class="talent-row">
<div v-for="talent in row" :key="talent.id" class="talent-cell" :class="{ 'milestone': talent.milestone }">
<div class="vertical-line" v-if="rIdx > 0 && !talent.milestone"></div>
<div :class="['talent-node', nodeStatus(talent)]" @click="allocatePoint(talent)" @contextmenu.prevent="refundPoint(talent)" @mouseenter="hoveredTalent = talent" @mouseleave="hoveredTalent = null">
<div class="talent-icon-ring">
<img v-if="talent.icon" :src="talent.icon" class="talent-icon-img" alt="">
</div>
<div class="talent-rank">{{ getTalentRank(talent.id) }} / {{ talent.maxRank }}</div>
<div class="talent-name">{{ talent.name }}</div>
</div>
</div>
</div>
</div>
</div>
</div>
<div v-if="hoveredTalent" class="talent-detail">
<div class="detail-header" :style="{ backgroundColor: nodeStatus(hoveredTalent) === 'maxed' ? '#ff9800' : (nodeStatus(hoveredTalent) === 'allocated' ? '#ff9800' : '#4a4a6a') }">
<img v-if="hoveredTalent.icon" :src="hoveredTalent.icon" class="detail-icon" alt="">
<div class="detail-title">
<strong>{{ hoveredTalent.name }}</strong>
<span class="detail-name-en">{{ hoveredTalent.nameEn }} ({{ hoveredTalent.category }})</span>
</div>
</div>
<div class="detail-body">
<p class="detail-desc">{{ formatTalentDesc(hoveredTalent, getTalentRank(hoveredTalent.id)) }}</p>
<p class="detail-desc-en">{{ hoveredTalent.descEn }}</p>
<p class="detail-rank">当前等级: {{ getTalentRank(hoveredTalent.id) }} / {{ hoveredTalent.maxRank }}</p>
<p class="detail-next" v-if="!hoveredTalent.milestone && getTalentRank(hoveredTalent.id) < hoveredTalent.maxRank && remainingPoints > 0">下一级: {{ formatTalentDesc(hoveredTalent, getTalentRank(hoveredTalent.id) + 1) }}</p>
<p class="detail-warning" v-if="!hoveredTalent.milestone && remainingPoints === 0 && getTalentRank(hoveredTalent.id) < hoveredTalent.maxRank">天赋点已用完，右键其他节点退回点数</p>
</div>
</div>
</div>
<div v-if="activeTalentTab === 'life'" class="life-skills-section">
<div class="no-data-box">
<p>🌱 生活技能数据尚未在 Demo 版本中提取到。</p>
<p>游戏内“生活技能”页签显示为占位或将在后续版本开放。</p>
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
<span class="summary-desc">{{ formatTalentDesc(talent, getTalentRank(talent.id)) }}</span>
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
  background: #181513;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  color: #c7b8a3;
  border-left: 4px solid #c9a55b;
}
.tip-box strong { color: #c9a55b; display: block; margin-bottom: 0.3rem; }
.section { margin-bottom: 2rem; }
.section-title {
  color: #efe6d8;
  border-bottom: 2px solid #3d332b;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}
.class-tabs { display: flex; gap: 1rem; margin-bottom: 1.5rem; }
.class-tab {
  flex: 1;
  background: #181513;
  border: 2px solid #3d332b;
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
}
.class-tab:hover { border-color: #6b5d50; background: #2d2723; }
.class-tab.active { border-color: #c9a55b; background: rgba(201, 165, 91, 0.15); }
.class-icon { font-size: 2rem; }
.class-icon-img { width: 48px; height: 48px; object-fit: contain; }
.class-name { font-size: 1.2rem; font-weight: bold; color: #efe6d8; }
.class-name-en { font-size: 0.85rem; color: #8f7f6e; }
.class-info {
  background: #181513;
  border-radius: 8px;
  padding: 1rem 1.5rem;
  margin-bottom: 2rem;
  border-left: 4px solid #c9a55b;
}
.class-info h2 { margin: 0 0 0.5rem 0; color: #efe6d8; }
.class-desc { color: #c7b8a3; margin: 0.3rem 0; }
.class-stat { color: #ff9800; margin: 0.3rem 0; font-size: 0.9rem; }
.abilities-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1rem; }
.ability-card {
  background: #181513;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #3d332b;
  display: flex;
  align-items: stretch;
}
.ability-icon-wrap {
  width: 80px;
  min-height: 100%;
  background: linear-gradient(135deg, #2d2723 0%, #181513 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-right: 1px solid #3d332b;
}
.ability-icon-img { width: 56px; height: 56px; object-fit: contain; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5)); }
.ability-body { padding: 0.8rem 1rem; flex: 1; }
.ability-header { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.3rem; }
.ability-name { color: #efe6d8; font-size: 1.05rem; font-weight: bold; }
.ability-tag {
  font-size: 0.75rem;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  color: #efe6d8;
  font-weight: bold;
}
.ability-name-en { color: #8f7f6e; font-size: 0.85rem; margin: 0 0 0.5rem 0; font-style: italic; }
.ability-desc { color: #c7b8a3; font-size: 0.9rem; line-height: 1.5; margin: 0; }
.talent-tabs { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
.talent-tab {
  background: #181513;
  color: #8f7f6e;
  border: 1px solid #3d332b;
  padding: 0.5rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: all 0.2s;
}
.talent-tab:hover { border-color: #6b5d50; color: #c7b8a3; }
.talent-tab.active { background: rgba(201, 165, 91, 0.15); border-color: #c9a55b; color: #efe6d8; }
.talent-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.talent-header .section-title { margin-bottom: 0; border: none; }
.point-tracker { display: flex; align-items: center; gap: 0.8rem; background: #181513; padding: 0.5rem 1rem; border-radius: 8px; }
.point-bar-wrap {
  width: 160px;
  height: 22px;
  background: #3d332b;
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
  color: #efe6d8;
  font-size: 0.75rem;
  line-height: 22px;
  font-weight: bold;
  text-shadow: 0 1px 2px rgba(0,0,0,0.8);
}
.points-remaining { color: #ff9800; font-size: 0.9rem; }
.points-remaining.no-points { color: #f44336; }
.reset-btn { background: #4a4a6a; color: white; border: none; padding: 0.4rem 0.8rem; border-radius: 4px; cursor: pointer; font-size: 0.85rem; }
.reset-btn:hover { background: #5a5a8a; }
.talent-hint { color: #8f7f6e; font-size: 0.85rem; margin: 0.5rem 0 1rem 0; }
.talent-hint.no-points-hint { color: #f44336; font-weight: bold; }
.talent-tree-panel {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid #3d332b;
  padding: 1rem;
  min-height: 600px;
}
.talent-tree-bg {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: url('/images/icons/ui/warrior_talent_bg.png') center center / contain no-repeat;
  opacity: 0.3;
  z-index: 0;
}
.talent-tree-frame {
  position: relative;
  z-index: 1;
  display: flex;
  gap: 0.5rem;
}
.row-levels {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0.5rem 0;
  width: 40px;
  flex-shrink: 0;
}
.row-level {
  display: flex;
  align-items: center;
  justify-content: center;
}
.level-ring {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff9800, #f44336);
  color: #efe6d8;
  font-weight: bold;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(255,255,255,0.3);
  box-shadow: 0 0 8px rgba(255, 152, 0, 0.4);
}
.talent-grid {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 0.8rem;
}
.talent-row {
  display: flex;
  justify-content: space-around;
  gap: 0.5rem;
}
.talent-cell {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: 90px;
}
.talent-cell.milestone { opacity: 0.8; }
.vertical-line {
  position: absolute;
  top: -1rem;
  left: 50%;
  width: 3px;
  height: 1rem;
  background: linear-gradient(180deg, rgba(255,152,0,0.5), rgba(255,255,255,0.2));
  transform: translateX(-50%);
  z-index: 0;
}
.talent-node {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  cursor: pointer;
  transition: all 0.15s;
  user-select: none;
  padding: 0.3rem;
  border-radius: 8px;
}
.talent-node:hover { transform: translateY(-2px); }
.talent-node:hover .talent-icon-ring { border-color: #ff9800; }
.talent-icon-ring {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.3);
  background: rgba(28, 24, 21, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: all 0.15s;
  box-shadow: 0 2px 6px rgba(0,0,0,0.5);
}
.talent-icon-img { width: 40px; height: 40px; object-fit: contain; }
.talent-rank {
  font-size: 0.75rem;
  color: #8f7f6e;
  background: rgba(0,0,0,0.6);
  padding: 0.1rem 0.4rem;
  border-radius: 10px;
  font-weight: bold;
}
.talent-name {
  font-size: 0.75rem;
  color: #c7b8a3;
  text-align: center;
  max-width: 80px;
  line-height: 1.2;
}
.talent-node.allocated .talent-icon-ring { border-color: #ff9800; box-shadow: 0 0 10px rgba(255, 152, 0, 0.5); }
.talent-node.allocated .talent-rank { color: #ff9800; }
.talent-node.maxed .talent-icon-ring { border-color: #ff9800; background: rgba(255, 152, 0, 0.2); box-shadow: 0 0 15px rgba(255, 152, 0, 0.7); }
.talent-node.maxed .talent-rank { color: #ff9800; }
.talent-node.available .talent-icon-ring { border-color: #4caf50; box-shadow: 0 0 8px rgba(76, 175, 80, 0.4); }
.talent-node.locked { opacity: 0.7; }
.talent-node.milestone .talent-icon-ring { border-color: #c9a55b; }
.talent-detail {
  margin-top: 1rem;
  background: rgba(28, 24, 21, 0.95);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #3d332b;
}
.detail-header {
  padding: 0.8rem 1rem;
  color: #efe6d8;
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
.detail-icon { width: 40px; height: 40px; object-fit: contain; }
.detail-title { display: flex; flex-direction: column; }
.detail-title strong { font-size: 1.05rem; }
.detail-name-en { font-size: 0.8rem; opacity: 0.8; }
.detail-body { padding: 1rem; }
.detail-desc { color: #c7b8a3; font-size: 0.95rem; margin: 0 0 0.5rem 0; }
.detail-desc-en { color: #8f7f6e; font-size: 0.85rem; font-style: italic; margin: 0 0 0.5rem 0; }
.detail-rank { color: #ff9800; font-size: 0.85rem; margin: 0; }
.detail-next { color: #4caf50; font-size: 0.85rem; margin: 0.3rem 0 0 0; }
.detail-warning { color: #f44336; font-size: 0.85rem; margin: 0.3rem 0 0 0; font-weight: bold; }
.no-data-box { background: #181513; border-radius: 8px; padding: 1.5rem; text-align: center; color: #8f7f6e; }
.no-data-box p { margin: 0.5rem 0; }
.life-skills-section { background: rgba(28, 24, 21, 0.5); border-radius: 8px; padding: 1rem; }
.summary-section { background: rgba(156, 39, 176, 0.05); border-radius: 8px; padding: 1rem; }
.summary-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 0.8rem; }
.summary-item {
  background: #181513;
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
  background: #2d2723;
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
.summary-desc { color: #c7b8a3; font-size: 0.85rem; }
.stats-table-wrap { overflow-x: auto; }
.stats-table { width: 100%; border-collapse: collapse; background: #181513; border-radius: 8px; overflow: hidden; }
.stats-table th { background: #2d2723; color: #c9a55b; padding: 0.6rem 1rem; text-align: left; font-weight: bold; }
.stats-table td { padding: 0.5rem 1rem; border-top: 1px solid #2d2723; }
.stat-name { color: #ff9800; font-weight: bold; white-space: nowrap; width: 120px; }
.stat-desc { color: #c7b8a3; font-size: 0.9rem; }
.species-list { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.species-tag { background: #181513; padding: 0.4rem 0.8rem; border-radius: 6px; color: #c7b8a3; font-size: 0.9rem; border: 1px solid #3d332b; }
.rarity-list { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.rarity-tag { padding: 0.4rem 1rem; border-radius: 6px; border: 2px solid; font-weight: bold; font-size: 0.9rem; background: #181513; }
</style>
