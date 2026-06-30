<script setup>
import { ref, onMounted } from 'vue'

const heroes = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const response = await fetch('/data/heroes.json')
    heroes.value = await response.json()
  } catch (e) {
    console.error('加载英雄数据失败:', e)
  } finally {
    loading.value = false
  }
})

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
  const names = {
    common: '普通',
    rare: '稀有',
    epic: '史诗',
    legendary: '传说'
  }
  return names[quality] || quality
}
</script>

# 英雄图鉴

::: tip 提示
数据来源于 `public/data/heroes.json`，可直接编辑该文件更新英雄数据。
:::

<p v-if="loading">加载中...</p>

<div v-if="!loading" class="heroes-grid">
  <div 
    v-for="hero in heroes" 
    :key="hero.id" 
    class="hero-card"
    :style="{ borderColor: qualityColor(hero.quality) }"
  >
    <div class="hero-header" :style="{ backgroundColor: qualityColor(hero.quality) }">
      <div class="hero-title">
        <h3>{{ hero.name }}</h3>
        <span class="hero-quality">{{ qualityName(hero.quality) }}</span>
      </div>
      <div class="hero-job">{{ hero.job }}</div>
    </div>
    
    <div class="hero-body">
    <div class="hero-stats">
    <div class="stat">
    <span class="stat-label">等级</span>
    <span class="stat-value">{{ hero.level }}</span>
    </div>
    <div class="stat">
    <span class="stat-label">生命</span>
    <span class="stat-value">{{ hero.hp }}</span>
    </div>
    <div class="stat">
    <span class="stat-label">攻击</span>
    <span class="stat-value">{{ hero.attack }}</span>
    </div>
    <div class="stat">
    <span class="stat-label">防御</span>
    <span class="stat-value">{{ hero.defense }}</span>
    </div>
    </div>
    
    <div class="hero-desc">
    <p>{{ hero.description }}</p>
    </div>
    
    <div class="hero-skills">
    <p><strong>技能:</strong></p>
    <div class="skills">
    <div v-for="skill in hero.skills" :key="skill.name" class="skill-item">
    <div class="skill-header">
    <span class="skill-name">{{ skill.name }}</span>
    <span class="skill-cd">CD: {{ skill.cooldown }}秒</span>
    </div>
    <p class="skill-desc">{{ skill.description }}</p>
    </div>
    </div>
    </div>
    </div>
  </div>
</div>

<style scoped>
.heroes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.2rem;
}

.hero-card {
  border: 3px solid;
  border-radius: 10px;
  overflow: hidden;
  background: #1a1a2e;
  box-shadow: 0 3px 12px rgba(0,0,0,0.3);
}

.hero-header {
  color: white;
  padding: 1rem;
}

.hero-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.3rem;
}

.hero-title h3 {
  margin: 0;
  font-size: 1.4rem;
}

.hero-quality {
  background: rgba(0,0,0,0.25);
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-size: 0.8rem;
}

.hero-job {
  font-size: 0.9rem;
  opacity: 0.9;
}

.hero-body {
  padding: 1rem;
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  background: #2d2d44;
  padding: 0.8rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.stat {
  text-align: center;
}

.stat-label {
  display: block;
  font-size: 0.75rem;
  color: #888;
}

.stat-value {
  display: block;
  font-size: 1.1rem;
  font-weight: bold;
  color: #fff;
}

.hero-desc {
  background: #2d2d44;
  padding: 0.7rem;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.hero-desc p {
  margin: 0;
  font-size: 0.9rem;
  color: #ccc;
}

.hero-skills > p {
  margin: 0 0 0.5rem 0;
}

.skills {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.skill-item {
  background: #2d2d44;
  padding: 0.7rem;
  border-radius: 6px;
  border-left: 3px solid #1976d2;
}

.skill-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.3rem;
}

.skill-name {
  font-weight: bold;
  color: #64b5f6;
}

.skill-cd {
  font-size: 0.8rem;
  color: #888;
}

.skill-desc {
  margin: 0;
  font-size: 0.85rem;
  color: #aaa;
}
</style>
