<script setup>
import { ref, onMounted } from 'vue'

const levels = ref([])
const minions = ref({ enemies: [] })
const loading = ref(true)

onMounted(async () => {
  try {
    const [levelsRes, minionsRes] = await Promise.all([
      fetch('/data/levels.json'),
      fetch('/data/minions.json')
    ])
    levels.value = await levelsRes.json()
    minions.value = await minionsRes.json()
  } catch (e) {
    console.error('加载关卡数据失败:', e)
  } finally {
    loading.value = false
  }
})

const difficultyColor = (difficulty) => {
  const colors = {
    '安全': '#4caf50',
    '简单': '#4caf50',
    '普通': '#2196f3',
    '困难': '#ff9800',
    '噩梦': '#f44336',
    '地狱': '#9c27b0',
    '未知': '#9e9e9e'
  }
  return colors[difficulty] || '#9e9e9e'
}

const enemyIcon = (name) => {
  const enemy = minions.value.enemies.find(e => e.name === name)
  return enemy ? enemy.icon : null
}

const dropIcon = (drop) => {
  const map = {
    '狼之缰绳': '/images/icons/minions/wolf.png',
    '野猪缰绳': '/images/icons/minions/boar.png',
    '黑蜘蛛缰绳': '/images/icons/minions/spider.png',
    '哥布林战士缰绳': '/images/icons/minions/goblin_warrior.png',
    '骷髅弓箭手缰绳': '/images/icons/minions/skeleton_archer.png',
    '骷髅战士缰绳': '/images/icons/minions/skeleton_warrior.png',
    '兽人战士缰绳': '/images/icons/minions/orc_warrior.png',
    '食人魔缰绳': '/images/icons/minions/ogre.png',
    '树桩怪缰绳': '/images/icons/minions/stumplin.png',
    '远古橡树树人缰绳': '/images/icons/minions/treant.png',
    '血月狼人缰绳': '/images/icons/minions/werewolf.png',
    '龙之缰绳': '/images/icons/minions/dragon.png'
  }
  return map[drop] || null
}
</script>

# 关卡大全

<div class="tip-box">
  <strong>数据来源</strong>
  <p>关卡数据从游戏本体 Deskrawl Demo 的本地化文件（World TextAsset）中提取，包含正式区域名称、推荐等级、Boss、掉落与敌人信息。</p>
</div>

<p v-if="loading">加载中...</p>

<div v-if="!loading" class="levels-list">
<div v-for="level in levels" :key="level.id" class="level-card">
<div class="level-header">
<div class="level-title">
<h3>{{ level.name }}</h3>
<span class="level-name-en">{{ level.nameEn }}</span>
</div>
<span class="difficulty-badge" :style="{ backgroundColor: difficultyColor(level.difficulty) }">{{ level.difficulty }}</span>
</div>
<div class="level-body">
<div class="level-info">
<div class="info-item">
<span class="info-label">所在区域</span>
<span class="info-value">{{ level.area }}</span>
</div>
<div class="info-item">
<span class="info-label">推荐等级</span>
<span class="info-value">{{ level.level }}</span>
</div>
<div class="info-item">
<span class="info-label">Boss</span>
<span class="info-value">{{ level.boss }}</span>
</div>
</div>
<div class="level-desc">
<p>{{ level.description }}</p>
</div>
<div v-if="level.enemies.length > 0" class="enemies-section">
<p><strong>出现敌人</strong></p>
<div class="enemies-list">
<div v-for="enemy in level.enemies" :key="enemy" class="enemy-tag">
<img v-if="enemyIcon(enemy)" :src="enemyIcon(enemy)" class="enemy-icon" alt="">
<span>{{ enemy }}</span>
</div>
</div>
</div>
<div class="drops-section">
<p><strong>主要掉落</strong></p>
<div class="drops">
<div v-for="drop in level.drops" :key="drop" class="drop-tag">
<img v-if="dropIcon(drop)" :src="dropIcon(drop)" class="drop-icon" alt="">
<span>{{ drop }}</span>
</div>
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
.levels-list { display: flex; flex-direction: column; gap: 1.2rem; }
.level-card {
  border: 1px solid #333;
  border-radius: 8px;
  overflow: hidden;
  background: #1a1a2e;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
}
.level-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.level-title h3 { margin: 0; font-size: 1.3rem; }
.level-name-en {
  font-size: 0.85rem;
  color: rgba(255,255,255,0.7);
  display: block;
  margin-top: 0.2rem;
}
.difficulty-badge {
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: bold;
  color: white;
}
.level-body { padding: 1rem; }
.level-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 0.8rem;
  margin-bottom: 1rem;
}
.info-item {
  background: #2d2d44;
  padding: 0.6rem 0.8rem;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
.info-label { color: #888; font-size: 0.8rem; }
.info-value { color: #fff; font-size: 0.95rem; font-weight: bold; }
.level-desc {
  background: #2d2d44;
  padding: 0.8rem;
  border-radius: 6px;
  margin-bottom: 1rem;
}
.level-desc p { margin: 0; color: #ccc; line-height: 1.5; }
.enemies-section,
.drops-section { margin-bottom: 0.8rem; }
.enemies-section p,
.drops-section p { margin: 0.5rem 0; color: #fff; font-weight: bold; }
.enemies-list,
.drops { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.enemy-tag,
.drop-tag {
  background: #2d2d44;
  border: 1px solid #444;
  color: #ccc;
  padding: 0.3rem 0.7rem;
  border-radius: 15px;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.enemy-icon,
.drop-icon { width: 20px; height: 20px; object-fit: contain; border-radius: 50%; background: #1a1a2e; }
</style>
