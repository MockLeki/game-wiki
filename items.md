<script setup>
import { ref, computed, onMounted } from 'vue'

const items = ref([])
const loading = ref(true)

const qualityFilter = ref('')
const typeFilter = ref('')
const minLevel = ref(0)
const maxLevel = ref(100)
const searchQuery = ref('')

onMounted(async () => {
  try {
    const response = await fetch('/data/items.json')
    items.value = await response.json()
  } catch (e) {
    console.error('加载失败:', e)
  } finally {
    loading.value = false
  }
})

const filteredItems = computed(() => {
  return items.value.filter(item => {
    const matchQuality = !qualityFilter.value || item.quality === qualityFilter.value
    const matchType = !typeFilter.value || item.type === typeFilter.value
    const matchLevel = item.level >= minLevel.value && item.level <= maxLevel.value
    const matchSearch = !searchQuery.value || item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchQuality && matchType && matchLevel && matchSearch
  })
})

const resetFilters = () => {
  qualityFilter.value = ''
  typeFilter.value = ''
  minLevel.value = 0
  maxLevel.value = 100
  searchQuery.value = ''
}

const qualityColor = (quality) => {
  const colors = {
    common: '#9e9e9e',
    rare: '#2196f3',
    epic: '#9c27b0',
    legendary: '#ff9800'
  }
  return colors[quality] || '#9e9e9e'
}

const qualityName = (quality) => {
  const names = { common: '普通', rare: '稀有', epic: '史诗', legendary: '传说' }
  return names[quality] || quality
}

const typeName = (type) => {
  const names = {
    weapon: '武器', armor: '护甲', helmet: '头盔',
    shoulder: '护肩', necklace: '项链', gloves: '手套',
    belt: '腰带', legs: '护腿', boots: '靴子', ring: '戒指'
  }
  return names[type] || type
}
</script>

# 物品数据库

<div class="tip-box">
  <strong>提示</strong>
  <p>数据来源于 <code>public/data/items.json</code>，可直接编辑该文件更新装备数据。
  这里装备主要词条有这些
  以下仅展示装备图和特殊词条属性</p>
</div>

<div class="tip-box">
  <strong>主要词条展示</strong>
  <p>武器：2</p>
  <p>头盔：3</p>
  <p>护肩：4</p>
  <p>胸甲：5</p>
  <p>手套：5</p>
  <p>腰带：3</p>
  <p>护腿：43</p>
  <p>靴子：32</p>
  <p>项链：34</p>
  <p>戒指：1</p>
</div>

<div class="tip-box">
  <strong>次要词条展示</strong>
  <p>武器：命中回血 击杀回血 击杀回法</p>
  <p>头盔：生命恢复 金币发现 魔法发现 药水发现 经验值</p>
  <p>护肩：生命恢复 移动速度</p>
  <p>胸甲：生命恢复 命中回血 金币发现 魔法发现 经验值</p>
  <p>手套：击杀回法 金币发现 魔法发现 药水发现 经验值</p>
  <p>腰带：生命恢复 击杀回法 药水发现 经验值</p>
  <p>护腿：生命恢复 命中回血 金币发现 魔法发现 经验值</p>
  <p>靴子：命中回血 金币发现 魔法发现 药水发现 经验值</p>
  <p>项链：命中回血 魔法发现 移动速度 经验值</p>
  <p>戒指：命中回血 击杀回血 击杀回法 金币发现 魔法发现 经验值</p>
</div>

<div class="filters">
  <div class="filter-group">
    <label>搜索:</label>
    <input type="text" v-model="searchQuery" placeholder="输入装备名称..." class="search-input">
  </div>
  <div class="filter-group">
    <label>品级:</label>
    <select v-model="qualityFilter">
      <option value="">全部</option>
      <option value="common">普通</option>
      <option value="rare">稀有</option>
      <option value="epic">史诗</option>
      <option value="legendary">传说</option>
    </select>
  </div>
  <div class="filter-group">
    <label>类型:</label>
    <select v-model="typeFilter">
      <option value="">全部</option>
      <option value="weapon">武器</option>
      <option value="helmet">头盔</option>
      <option value="shoulder">护肩</option>
      <option value="necklace">项链</option>
      <option value="armor">护甲</option>
      <option value="gloves">手套</option>
      <option value="belt">腰带</option>
      <option value="legs">护腿</option>
      <option value="boots">靴子</option>
      <option value="ring">戒指</option>
    </select>
  </div>
  <button class="reset-btn" @click="resetFilters">重置</button>
</div>

## 查询结果

<p v-if="loading">加载中...</p>
<p v-else-if="filteredItems.length === 0">没有找到物品</p>
<p v-else>共找到 <strong>{{ filteredItems.length }}</strong> 件物品</p>

<div v-if="!loading" class="items-grid">
  <div 
    v-for="item in filteredItems" 
    :key="item.id" 
    class="item-card"
    :style="{ borderColor: qualityColor(item.quality) }"
  >
    <div v-if="item.image" class="item-image">
      <img :src="item.image" />
    </div>
    <div class="item-header" :style="{ backgroundColor: qualityColor(item.quality) }">
      <span class="item-name">{{ item.name }}</span>
      <span class="item-quality">{{ qualityName(item.quality) }}</span>
    </div>
    <div class="item-body">
      <div class="item-info">
        <p><strong>类型:</strong> {{ typeName(item.type) }}</p>
        <p><strong>等级:</strong> {{ item.level }}</p>
        <p><strong>攻击:</strong> {{ item.attack || 0 }}</p>
        <p><strong>防御:</strong> {{ item.defense || 0 }}</p>
      </div>
      <p class="item-desc">{{ item.description || item.effect }}</p>
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
}

.tip-box strong {
  color: #9c27b0;
  display: block;
  margin-bottom: 0.3rem;
}

.tip-box code {
  background: rgba(156, 39, 176, 0.2);
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  color: #9c27b0;
}

.filters {
  background: #1a1a2e;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-group label {
  color: #ccc;
  font-weight: bold;
}

.search-input {
  background: #2d2d44;
  color: white;
  border: 1px solid #444;
  border-radius: 4px;
  padding: 0.4rem 0.6rem;
  width: 200px;
  outline: none;
}

.search-input:focus {
  border-color: #9c27b0;
}

.search-input::placeholder {
  color: #666;
}

.filter-group select {
  background: #2d2d44;
  color: white;
  border: 1px solid #444;
  border-radius: 4px;
  padding: 0.4rem 0.6rem;
}

.reset-btn {
  background: #4a4a6a;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.reset-btn:hover {
  background: #5a5a8a;
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}

.item-card {
  border: 3px solid;
  border-radius: 8px;
  overflow: hidden;
  background: #1a1a2e;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
}

.item-image {
  display: flex;
  justify-content: center;
  padding: 0.5rem;
  background: #2d2d44;
}

.item-image img {
  width: 100px;
  height: 100px;
  object-fit: contain;
}

.item-header {
  padding: 0.8rem;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-name {
  font-weight: bold;
  font-size: 1.1rem;
}

.item-quality {
  font-size: 0.85rem;
  background: rgba(0,0,0,0.2);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
}

.item-body {
  padding: 0.8rem;
  color: #ccc;
}

.item-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.3rem;
  margin-bottom: 0.8rem;
}

.item-info p {
  margin: 0.2rem 0;
  font-size: 0.9rem;
}

.item-desc {
  font-size: 0.9rem;
  color: #ff9800;
  border-top: 1px solid #333;
  padding-top: 0.8rem;
  margin: 0;
}
</style>
