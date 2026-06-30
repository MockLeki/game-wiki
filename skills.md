<script setup>
import { ref, computed, onMounted, reactive } from 'vue'

const skillData = ref(null)
const loading = ref(true)
const activeClass = ref('warrior')
const talentRanks = reactive({})  // { 'warrior_0': 2, 'warrior_1': 1, ... }
const totalPoints = ref(30)  // Demo: 30 talent points to spend
const selectedTalent = ref(null)

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
</script>

# 技能大全

<div class="tip-box">
  <strong>数据来源</strong>
  <p>技能数据从游戏本体文件（Deskrawl Demo）的 Unity 资源中提取，包含战士和法师两大职业的主动技能、天赋树及属性系统。
  点击天赋节点可分配/退回天赋点，底部实时显示当前加点效果总结。</p>
</div>

<p v-if="loading">加载中...</p>

<div v-if="!loading && skillData" class="skill-container">

  <!-- 职业切换 -->
  <div class="class-tabs">
    <button
      v-for="(cls, key) in skillData.classes"
      :key="key"
      :class="['class-tab', { active: activeClass === key }]"
      @click="switchClass(key)"
    >
      <span class="class-icon">{{ cls.icon }}</span>
      <span class="class-name">{{ cls.name }}</span>
      <span class="class-name-en">{{ cls.nameEn }}</span>
    </button>
  </div>

  <!-- 职业信息 -->
  <div v-if="currentClass" class="class-info">
    <h2>{{ currentClass.icon }} {{ currentClass.name }} ({{ currentClass.nameEn }})</h2>
    <p class="class-desc">{{ currentClass.description }}</p>
    <p class="class-stat"><strong>主属性:</strong> {{ currentClass.primaryStat }}</p>
  </div>

  <!-- 主动技能 -->
  <div v-if="currentClass" class="section">
    <h3 class="section-title">⚡ 主动技能</h3>
    <div class="abilities-grid">
      <div v-for="ability in currentClass.abilities" :key="ability.id" class="ability-card">
        <div class="ability-header">
          <span class="ability-name">{{ ability.name }}</span>
          <span class="ability-tag" :style="{ backgroundColor: tagColor(ability.tag) }">
            {{ tagName(ability.tag) }}
          </span>
        </div>
        <div class="ability-body">
          <p class="ability-name-en">{{ ability.nameEn }}</p>
          <p class="ability-desc">{{ ability.description }}</p>
        </div>
      </div>
    </div>
  </div>

  <!-- 天赋模拟器 -->
  <div v-if="currentClass && currentClass.talents && currentClass.talents.length > 0" class="section">
    <div class="talent-header">
      <h3 class="section-title">🌟 天赋模拟器</h3>
      <div class="point-tracker">
        <span class="points-spent">已分配: <strong>{{ spentPoints }}</strong></span>
        <span class="points-remaining">剩余: <strong :class="{ 'no-points': remainingPoints === 0 }">{{ remainingPoints }}</strong></span>
        <span class="points-total">/ {{ totalPoints }}</span>
        <button class="reset-btn" @click="refundAll">重置天赋</button>
      </div>
    </div>

    <p class="talent-hint">💡 左键点击分配天赋点，右键点击退回天赋点</p>

    <!-- 天赋分类展示 -->
    <div class="talent-categories">
      <div v-for="(talents, cat) in talentsByCategory" :key="cat" class="talent-category">
        <h4 class="category-title">
          <span class="category-dot" :style="{ backgroundColor: categoryColor(cat) }"></span>
          {{ cat }}
        </h4>
        <div class="talent-nodes">
          <div
            v-for="talent in talents"
            :key="talent.id"
            :class="['talent-node', {
              'maxed': getTalentRank(talent.id) >= talent.maxRank,
              'allocated': getTalentRank(talent.id) > 0,
              'available': canAllocate(talent)
            }]"
            @click="allocatePoint(talent)"
            @contextmenu.prevent="refundPoint(talent)"
            @mouseenter="selectedTalent = talent"
            @mouseleave="selectedTalent = null"
          >
            <div class="talent-icon" :style="{ borderColor: categoryColor(cat) }">
              <span class="talent-id">#{{ talent.id }}</span>
            </div>
            <div class="talent-info">
              <span class="talent-name">{{ talent.name }}</span>
              <span class="talent-rank">
                {{ getTalentRank(talent.id) }} / {{ talent.maxRank }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 天赋详情悬浮 -->
    <div v-if="selectedTalent" class="talent-tooltip">
      <strong>{{ selectedTalent.name }} ({{ selectedTalent.nameEn }})</strong>
      <p>{{ selectedTalent.desc }}</p>
      <p class="talent-en">{{ selectedTalent.descEn }}</p>
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

  <!-- 当前加点总结 -->
  <div v-if="allocatedTalents.length > 0" class="section summary-section">
    <h3 class="section-title">📋 当前加点效果总结</h3>
    <div class="summary-grid">
      <div v-for="talent in allocatedTalents" :key="talent.id" class="summary-item">
        <span class="summary-name">{{ talent.name }}</span>
        <span class="summary-rank">Lv.{{ getTalentRank(talent.id) }}</span>
        <span class="summary-desc">{{ talent.desc }}</span>
      </div>
    </div>
  </div>

  <!-- 属性系统参考 -->
  <div class="section">
    <h3 class="section-title">📊 属性系统参考</h3>
    <div class="stats-table-wrap">
      <table class="stats-table">
        <thead>
          <tr>
            <th>属性</th>
            <th>说明</th>
          </tr>
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

  <!-- 物种类型 -->
  <div class="section">
    <h3 class="section-title">🐺 仆从物种类型</h3>
    <div class="species-list">
      <span v-for="sp in skillData.species" :key="sp.key" class="species-tag">
        {{ sp.name }} ({{ sp.nameEn }})
      </span>
    </div>
  </div>

  <!-- 品质系统 -->
  <div class="section">
    <h3 class="section-title">💎 装备品质</h3>
    <div class="rarity-list">
      <span
        v-for="r in skillData.rarities"
        :key="r.key"
        class="rarity-tag"
        :style="{ borderColor: r.color, color: r.color }"
      >
        {{ r.name }}
      </span>
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

.tip-box strong {
  color: #9c27b0;
  display: block;
  margin-bottom: 0.3rem;
}

.skill-container {
  color: #ccc;
}

/* 职业切换 */
.class-tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

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

.class-tab:hover {
  border-color: #555;
  background: #2d2d44;
}

.class-tab.active {
  border-color: #9c27b0;
  background: rgba(156, 39, 176, 0.15);
}

.class-icon {
  font-size: 2rem;
}

.class-name {
  font-size: 1.2rem;
  font-weight: bold;
  color: #fff;
}

.class-name-en {
  font-size: 0.85rem;
  color: #888;
}

/* 职业信息 */
.class-info {
  background: #1a1a2e;
  border-radius: 8px;
  padding: 1rem 1.5rem;
  margin-bottom: 2rem;
  border-left: 4px solid #9c27b0;
}

.class-info h2 {
  margin: 0 0 0.5rem 0;
  color: #fff;
}

.class-desc {
  color: #aaa;
  margin: 0.3rem 0;
}

.class-stat {
  color: #ff9800;
  margin: 0.3rem 0;
  font-size: 0.9rem;
}

/* 通用 section */
.section {
  margin-bottom: 2rem;
}

.section-title {
  color: #fff;
  border-bottom: 2px solid #333;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}

/* 主动技能 */
.abilities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1rem;
}

.ability-card {
  background: #1a1a2e;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #333;
}

.ability-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 1rem;
  background: #2d2d44;
}

.ability-name {
  font-weight: bold;
  color: #fff;
  font-size: 1.05rem;
}

.ability-tag {
  font-size: 0.75rem;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  color: #fff;
  font-weight: bold;
}

.ability-body {
  padding: 0.8rem 1rem;
}

.ability-name-en {
  color: #666;
  font-size: 0.85rem;
  margin: 0 0 0.5rem 0;
  font-style: italic;
}

.ability-desc {
  color: #ccc;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
}

/* 天赋模拟器 */
.talent-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.talent-header .section-title {
  margin-bottom: 0;
  border: none;
}

.point-tracker {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  background: #1a1a2e;
  padding: 0.5rem 1rem;
  border-radius: 8px;
}

.points-spent {
  color: #4caf50;
}

.points-remaining {
  color: #ff9800;
}

.points-remaining .no-points {
  color: #f44336;
}

.points-total {
  color: #666;
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

.reset-btn:hover {
  background: #5a5a8a;
}

.talent-hint {
  color: #666;
  font-size: 0.85rem;
  margin: 0.5rem 0 1rem 0;
}

.talent-categories {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.talent-category {
  background: #1a1a2e;
  border-radius: 8px;
  padding: 1rem;
}

.category-title {
  color: #fff;
  font-size: 1rem;
  margin: 0 0 0.8rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.category-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}

.talent-nodes {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 0.8rem;
}

.talent-node {
  background: #2d2d44;
  border: 2px solid #444;
  border-radius: 8px;
  padding: 0.6rem;
  cursor: pointer;
  transition: all 0.15s;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  user-select: none;
}

.talent-node:hover {
  border-color: #666;
  background: #353548;
}

.talent-node.available {
  border-color: #4caf50;
  box-shadow: 0 0 6px rgba(76, 175, 80, 0.3);
}

.talent-node.allocated {
  border-color: #ff9800;
  background: rgba(255, 152, 0, 0.08);
}

.talent-node.maxed {
  border-color: #ff9800;
  background: rgba(255, 152, 0, 0.15);
  box-shadow: 0 0 10px rgba(255, 152, 0, 0.4);
}

.talent-icon {
  width: 40px;
  height: 40px;
  border-radius: 6px;
  border: 2px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1a1a2e;
  flex-shrink: 0;
}

.talent-id {
  color: #888;
  font-size: 0.75rem;
  font-weight: bold;
}

.talent-node.allocated .talent-id {
  color: #ff9800;
}

.talent-info {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.talent-name {
  color: #fff;
  font-size: 0.9rem;
  font-weight: bold;
}

.talent-rank {
  color: #888;
  font-size: 0.8rem;
}

.talent-node.allocated .talent-rank {
  color: #ff9800;
}

/* 天赋悬浮提示 */
.talent-tooltip {
  position: fixed;
  bottom: 20px;
  right: 20px;
  max-width: 350px;
  background: #1a1a2e;
  border: 1px solid #9c27b0;
  border-radius: 8px;
  padding: 1rem;
  z-index: 100;
  box-shadow: 0 4px 12px rgba(0,0,0,0.5);
}

.talent-tooltip strong {
  color: #9c27b0;
  display: block;
  margin-bottom: 0.3rem;
}

.talent-tooltip p {
  color: #ccc;
  font-size: 0.9rem;
  margin: 0.2rem 0;
}

.talent-tooltip .talent-en {
  color: #666;
  font-style: italic;
  font-size: 0.8rem;
}

/* 无数据提示 */
.no-data-box {
  background: #1a1a2e;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  color: #888;
}

.no-data-box p {
  margin: 0.5rem 0;
}

/* 加点总结 */
.summary-section {
  background: rgba(156, 39, 176, 0.05);
  border-radius: 8px;
  padding: 1rem;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 0.8rem;
}

.summary-item {
  background: #1a1a2e;
  border-radius: 6px;
  padding: 0.6rem 0.8rem;
  border-left: 3px solid #ff9800;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.summary-name {
  color: #ff9800;
  font-weight: bold;
  font-size: 0.9rem;
}

.summary-rank {
  color: #4caf50;
  font-size: 0.8rem;
}

.summary-desc {
  color: #aaa;
  font-size: 0.85rem;
}

/* 属性表 */
.stats-table-wrap {
  overflow-x: auto;
}

.stats-table {
  width: 100%;
  border-collapse: collapse;
  background: #1a1a2e;
  border-radius: 8px;
  overflow: hidden;
}

.stats-table th {
  background: #2d2d44;
  color: #9c27b0;
  padding: 0.6rem 1rem;
  text-align: left;
  font-weight: bold;
}

.stats-table td {
  padding: 0.5rem 1rem;
  border-top: 1px solid #2d2d44;
}

.stat-name {
  color: #ff9800;
  font-weight: bold;
  white-space: nowrap;
  width: 120px;
}

.stat-desc {
  color: #aaa;
  font-size: 0.9rem;
}

/* 物种 */
.species-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.species-tag {
  background: #1a1a2e;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  color: #aaa;
  font-size: 0.9rem;
  border: 1px solid #333;
}

/* 品质 */
.rarity-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.rarity-tag {
  padding: 0.4rem 1rem;
  border-radius: 6px;
  border: 2px solid;
  font-weight: bold;
  font-size: 0.9rem;
  background: #1a1a2e;
}
</style>
