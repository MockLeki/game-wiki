<script setup>
import { ref, computed, onMounted } from 'vue'

const itemData = ref(null)
const iconMap = ref({})
const loading = ref(true)
const activeTab = ref('weapons')

onMounted(async () => {
  try {
    const [itemsRes, iconRes] = await Promise.all([
      fetch('/data/items.json'),
      fetch('/data/icon_map.json')
    ])
    itemData.value = await itemsRes.json()
    iconMap.value = await iconRes.json()
  } catch (e) {
    console.error('加载失败:', e)
  } finally {
    loading.value = false
  }
})

const slotNames = {
  weapon: '武器', helm: '头盔', chest: '护甲', shoulder: '护肩',
  necklace: '项链', gloves: '手套', belt: '腰带', legs: '护腿',
  boots: '靴子', ring: '戒指'
}

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

const qualityColors = {
  legendary: '#ff9800',
  divine: '#e91e63'
}

const groupedArmor = computed(() => {
  if (!itemData.value) return {}
  const groups = {}
  itemData.value.legendary_armor.forEach(item => {
    const s = slotNames[item.slot] || item.slot
    if (!groups[s]) groups[s] = []
    groups[s].push(item)
  })
  return groups
})

const hpPotions = computed(() => {
  if (!itemData.value) return []
  return itemData.value.consumables.filter(c => c.id.startsWith('Hp'))
})

const buffPotions = computed(() => {
  if (!itemData.value) return []
  return itemData.value.consumables.filter(c => !c.id.startsWith('Hp'))
})
</script>

# 装备数据库

<div class="tip-box">
  <strong>数据来源</strong>
  <p>装备数据从游戏本体 Deskrawl Demo 的 Unity 资源中提取，图标来自游戏内实际资源。包含传说装备、消耗品、材料、随从缰绳等完整数据。</p>
</div>

<p v-if="loading">加载中...</p>

<div v-if="!loading && itemData" class="equipment-container">
<div class="tabs">
<button v-for="tab in ['weapons','armor','consumables','materials','reins']" :key="tab" :class="['tab', { active: activeTab === tab }]" @click="activeTab = tab">
<span v-if="tab==='weapons'">⚔️ 传说武器</span>
<span v-else-if="tab==='armor'">🛡️ 传说防具</span>
<span v-else-if="tab==='consumables'">🧪 消耗品</span>
<span v-else-if="tab==='materials'">📦 材料&宝箱</span>
<span v-else>🐴 随从缰绳</span>
</button>
</div>
<div v-if="activeTab==='weapons'" class="tab-content">
<div class="equipment-grid">
<div v-for="item in itemData.legendary_weapons" :key="item.id" class="equipment-card" style="border-color: #ff9800">
<div class="eq-header" style="background: #ff9800">
<div class="eq-title">
<div class="eq-icon-wrap">
<img :src="slotIcons[item.slot]" class="slot-bg" alt="">
<img v-if="item.icon" :src="item.icon" class="eq-icon-img" alt="">
</div>
<span class="eq-name">{{ item.name }}</span>
</div>
<span class="eq-slot">{{ slotNames[item.slot] }}</span>
</div>
<div class="eq-body">
<p class="eq-name-en">{{ item.nameEn }}</p>
<div class="eq-effect">
<span class="effect-label">传说特效</span>
<p>{{ item.desc }}</p>
</div>
<p class="eq-desc-en">{{ item.descEn }}</p>
</div>
</div>
</div>
</div>
<div v-if="activeTab==='armor'" class="tab-content">
<div class="armor-sections">
<div v-for="(items, slot) in groupedArmor" :key="slot" class="armor-slot-group">
<h3 class="slot-title">{{ slot }}</h3>
<div class="equipment-grid">
<div v-for="item in items" :key="item.id" class="equipment-card" style="border-color: #ff9800">
<div class="eq-header" style="background: #ff9800">
<div class="eq-title">
<div class="eq-icon-wrap">
<img :src="slotIcons[item.slot]" class="slot-bg" alt="">
<img v-if="item.icon" :src="item.icon" class="eq-icon-img" alt="">
</div>
<span class="eq-name">{{ item.name }}</span>
</div>
<span class="eq-slot">{{ slotNames[item.slot] }}</span>
</div>
<div class="eq-body">
<p class="eq-name-en">{{ item.nameEn }}</p>
<div class="eq-effect">
<span class="effect-label">传说特效</span>
<p>{{ item.desc }}</p>
</div>
<p class="eq-desc-en">{{ item.descEn }}</p>
</div>
</div>
</div>
</div>
</div>
</div>
<div v-if="activeTab==='consumables'" class="tab-content">
<h3>生命药水</h3>
<div class="equipment-grid consumables-grid">
<div v-for="p in hpPotions" :key="p.id" class="consumable-card">
<div class="con-header">
<div class="con-icon-wrap">
<img v-if="p.icon" :src="p.icon" class="con-icon-img" alt="">
</div>
<span class="con-name">{{ p.name }}</span>
</div>
<div class="con-body">
<p>{{ p.desc }}</p>
</div>
</div>
</div>
<h3>增益药水 (持续1小时)</h3>
<div class="equipment-grid consumables-grid">
<div v-for="p in buffPotions" :key="p.id" class="consumable-card">
<div class="con-header" style="background: #2196f3">
<div class="con-icon-wrap">
<img v-if="p.icon" :src="p.icon" class="con-icon-img" alt="">
</div>
<span class="con-name">{{ p.name }}</span>
</div>
<div class="con-body">
<p>{{ p.desc }}</p>
</div>
</div>
</div>
<h3>经验之书</h3>
<div class="exp-books">
<div v-for="book in itemData.exp_books" :key="book.id" class="exp-book">
<span class="book-tier">Lv.{{ book.tier }}</span>
<span class="book-name">{{ book.name }}</span>
<span class="book-desc">{{ book.desc }}</span>
</div>
</div>
</div>
<div v-if="activeTab==='materials'" class="tab-content">
<h3>材料</h3>
<div class="equipment-grid consumables-grid">
<div v-for="m in itemData.materials" :key="m.id" class="consumable-card">
<div class="con-header" style="background: #9c27b0">
<div class="con-icon-wrap">
<img v-if="m.icon" :src="m.icon" class="con-icon-img" alt="">
</div>
<span class="con-name">{{ m.name }}</span>
</div>
<div class="con-body">
<p>{{ m.desc }}</p>
</div>
</div>
</div>
<h3>宝箱</h3>
<div class="equipment-grid consumables-grid">
<div v-for="c in itemData.chests" :key="c.id" class="consumable-card">
<div class="con-header" style="background: #ff9800">
<div class="con-icon-wrap">
<img v-if="c.icon" :src="c.icon" class="con-icon-img" alt="">
</div>
<span class="con-name">{{ c.name }}</span>
</div>
<div class="con-body">
<p>{{ c.desc }}</p>
</div>
</div>
</div>
<h3>随机装备盒</h3>
<div class="random-boxes">
<div v-for="box in itemData.random_boxes" :key="box.slot" class="random-box">
<div class="box-icon-wrap">
<img :src="slotIcons[box.slot]" class="box-slot-bg" alt="">
</div>
<span>{{ box.name }}</span>
</div>
</div>
</div>
<div v-if="activeTab==='reins'" class="tab-content">
<p class="section-desc">击败对应怪物或完成特定条件后获得，使用缰绳可永久解锁该随从。</p>
<div class="reins-grid">
<div v-for="rein in itemData.companion_reins" :key="rein.id" class="rein-card">
<div class="rein-icon-wrap">
<img v-if="iconMap.minion_map && iconMap.minion_map[rein.companion]" :src="iconMap.minion_map[rein.companion]" class="rein-icon-img" alt="">
</div>
<div class="rein-name">{{ rein.name }}</div>
<div class="rein-companion">解锁：{{ rein.companion }}</div>
<div class="rein-companion-en">{{ rein.companionEn }}</div>
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
.equipment-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1rem; }
.equipment-card {
  background: #1a1a2e;
  border: 2px solid;
  border-radius: 8px;
  overflow: hidden;
}
.eq-header {
  padding: 0.7rem 1rem;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.eq-title { display: flex; align-items: center; gap: 0.6rem; }
.eq-icon-wrap {
  width: 48px;
  height: 48px;
  position: relative;
  flex-shrink: 0;
}
.slot-bg {
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: absolute;
  top: 0; left: 0;
}
.eq-icon-img {
  width: 70%;
  height: 70%;
  object-fit: contain;
  position: absolute;
  top: 15%; left: 15%;
  filter: drop-shadow(0 1px 2px rgba(0,0,0,0.5));
}
.eq-name { font-weight: bold; font-size: 1rem; }
.eq-slot { font-size: 0.8rem; background: rgba(0,0,0,0.2); padding: 0.15rem 0.5rem; border-radius: 4px; }
.eq-body { padding: 0.8rem 1rem; }
.eq-name-en { color: #666; font-size: 0.85rem; margin: 0 0 0.8rem 0; font-style: italic; }
.eq-effect {
  background: rgba(255, 152, 0, 0.08);
  border-left: 3px solid #ff9800;
  padding: 0.7rem;
  border-radius: 0 6px 6px 0;
  margin-bottom: 0.8rem;
}
.effect-label {
  font-size: 0.75rem;
  background: #ff9800;
  color: #000;
  padding: 0.1rem 0.4rem;
  border-radius: 3px;
  font-weight: bold;
  margin-bottom: 0.4rem;
  display: inline-block;
}
.eq-effect p { color: #ccc; font-size: 0.9rem; line-height: 1.5; margin: 0.5rem 0 0 0; }
.eq-desc-en { color: #555; font-size: 0.8rem; font-style: italic; margin: 0; }
.armor-slot-group { margin-bottom: 1.5rem; }
.slot-title {
  color: #ff9800;
  font-size: 1rem;
  margin: 0 0 0.8rem 0;
  padding-bottom: 0.3rem;
  border-bottom: 1px solid #333;
}
.consumable-card {
  background: #1a1a2e;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #333;
}
.con-header {
  background: #4caf50;
  padding: 0.6rem 1rem;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
.con-icon-wrap {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.2);
  border-radius: 6px;
}
.con-icon-img { width: 24px; height: 24px; object-fit: contain; }
.con-name { font-weight: bold; font-size: 0.95rem; }
.con-body { padding: 0.7rem 1rem; }
.con-body p { color: #aaa; font-size: 0.9rem; margin: 0; line-height: 1.4; }
.exp-books {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 0.5rem;
}
.exp-book {
  background: #1a1a2e;
  border-radius: 6px;
  padding: 0.5rem 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  border-left: 3px solid #00bcd4;
}
.book-tier { color: #00bcd4; font-weight: bold; font-size: 0.85rem; min-width: 40px; }
.book-name { color: #fff; font-size: 0.9rem; flex: 1; }
.book-desc { color: #666; font-size: 0.8rem; }
.random-boxes {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 0.5rem;
}
.random-box {
  background: #1a1a2e;
  border: 1px solid #333;
  border-radius: 6px;
  padding: 0.5rem;
  text-align: center;
  color: #aaa;
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
}
.box-icon-wrap { width: 40px; height: 40px; position: relative; }
.box-slot-bg { width: 100%; height: 100%; object-fit: contain; }
.reins-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.8rem;
}
.rein-card {
  background: #1a1a2e;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 0.8rem;
  text-align: center;
  transition: border-color 0.2s;
}
.rein-card:hover { border-color: #9c27b0; }
.rein-icon-wrap {
  width: 56px;
  height: 56px;
  margin: 0 auto 0.3rem;
  background: #2d2d44;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.rein-icon-img { width: 48px; height: 48px; object-fit: contain; }
.rein-name { color: #ff9800; font-weight: bold; font-size: 0.9rem; }
.rein-companion { color: #aaa; font-size: 0.85rem; margin-top: 0.2rem; }
.rein-companion-en { color: #555; font-size: 0.75rem; }
.section-desc { color: #888; font-size: 0.9rem; margin-bottom: 1rem; }
h3 { color: #fff; margin: 1.5rem 0 0.8rem 0; font-size: 1.1rem; }
</style>
