<script setup>
import { ref, onMounted } from 'vue'

const levels = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const response = await fetch('/data/levels.json')
    levels.value = await response.json()
  } catch (e) {
    console.error('加载关卡数据失败:', e)
  } finally {
    loading.value = false
  }
})

const difficultyColor = (difficulty) => {
  const colors = {
    '简单': '#4caf50',
    '普通': '#2196f3',
    '困难': '#ff9800',
    '噩梦': '#f44336',
    '地狱': '#9c27b0'
  }
  return colors[difficulty] || '#9e9e9e'
}
</script>

# 关卡大全

::: tip 提示
数据来源于 `public/data/levels.json`，可直接编辑该文件更新关卡数据。
:::

<p v-if="loading">加载中...</p>

<div v-if="!loading" class="levels-list">
  <div v-for="level in levels" :key="level.id" class="level-card">
    <div class="level-header">
      <h3>{{ level.name }}</h3>
      <span 
        class="difficulty-badge"
        :style="{ backgroundColor: difficultyColor(level.difficulty) }"
      >
        {{ level.difficulty }}
      </span>
    </div>
    
    <div class="level-body">
      <div class="level-info">
        <p><strong>所在区域:</strong> {{ level.area }}</p>
        <p><strong>推荐等级:</strong> {{ level.level }}</p>
        <p><strong>Boss:</strong> {{ level.boss }}</p>
      </div>
      
      <div class="level-desc">
        <p>{{ level.description }}</p>
      </div>
      
      <div class="drops-section">
        <p><strong>主要掉落:</strong></p>
        <div class="drops">
          <span v-for="drop in level.drops" :key="drop" class="drop-tag">
            {{ drop }}
          </span>
        </div>
      </div>
    </div>
  </div>
</div>

<style scoped>
.levels-list {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.level-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.level-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.level-header h3 {
  margin: 0;
  font-size: 1.3rem;
}

.difficulty-badge {
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: bold;
  color: white;
}

.level-body {
  padding: 1rem;
}

.level-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.level-info p {
  margin: 0.3rem 0;
}

.level-desc {
  background: #f9f9f9;
  padding: 0.8rem;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.level-desc p {
  margin: 0;
  color: #555;
}

.drops-section p {
  margin: 0.5rem 0;
}

.drops {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.drop-tag {
  background: #e8f5e9;
  color: #2e7d32;
  padding: 0.3rem 0.7rem;
  border-radius: 15px;
  font-size: 0.85rem;
}
</style>
