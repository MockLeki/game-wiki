<script setup>
import { ref, computed, onMounted } from 'vue'

const itemData = ref(null)
const equipTree = ref(null)
const iconMap = ref({})
const loading = ref(true)
const activeTab = ref('tree')
const treeSlot = ref('weapon')

onMounted(async () => {
  try {
    const [itemsRes, treeRes, iconRes] = await Promise.all([
      fetch('/data/items.json'),
      fetch('/data/equipment_tree.json'),
      fetch('/data/icon_map.json')
    ])
    itemData.value = await itemsRes.json()
    equipTree.value = await treeRes.json()
    iconMap.value = await iconRes.json()
  } catch (e) {
    console.error('加载失败:', e)
  } finally {
    loading.value = false
  }
})

const slotNames = {
  weapon: '武器', helm: '头盔', chest: '胸甲', shoulder: '护肩',
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

const qualityColors = { common: '#9e9e9e', uncommon: '#4caf50', rare: '#2196f3', legendary: '#ff9800' }

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

const currentTree = computed(() => {
  if (!equipTree.value) return null
  return equipTree.value.tree[treeSlot.value]
})

const treeTiers = computed(() => {
  if (!currentTree.value) return []
  return [
    { key: 'common', name: '普通' },
    { key: 'uncommon', name: '非凡' },
    { key: 'rare', name: '稀有' },
    { key: 'legendary', name: '传说' }
  ].map(t => ({ ...t, items: currentTree.value[t.key] || [] }))
})

const legendaryById = computed(() => {
  if (!itemData.value) return {}
  const map = {}
  ;[...itemData.value.legendary_weapons, ...itemData.value.legendary_armor].forEach(item => {
    map[item.id] = item
  })
  return map
})

const getDesc = (id) => {
  return legendaryById.value[id]?.desc || ''
}

const getMinionIcon = (name) => {
  return iconMap.value.minion_map ? iconMap.value.minion_map[name] : null
}
</script>

# 装备数据库

<div class="tip-box">
  <strong>数据来源</strong>
  <p>装备数据从游戏本体中提取，包含完整装备树（普通→非凡→稀有→传说）、传说特效、消耗品与材料。</p>
</div>
<p v-if="loading">加载中...</p>
<div v-if="!loading && itemData" class="equipment-container">
<div class="tabs">
<button :class="['tab', { active: activeTab === 'tree' }]" @click="activeTab = 'tree'">🌲 装备树</button>
<button :class="['tab', { active: activeTab === 'weapons' }]" @click="activeTab = 'weapons'">⚔️ 传说武器</button>
<button :class="['tab', { active: activeTab === 'armor' }]" @click="activeTab = 'armor'">🛡️ 传说防具</button>
<button :class="['tab', { active: activeTab === 'consumables' }]" @click="activeTab = 'consumables'">🧪 消耗品</button>
<button :class="['tab', { active: activeTab === 'materials' }]" @click="activeTab = 'materials'">📦 材料</button>
<button :class="['tab', { active: activeTab === 'reins' }]" @click="activeTab = 'reins'">🐴 随从</button>
</div>

<!-- 装备树 Tab -->
<div v-if="activeTab === 'tree'" class="tab-content">
<div class="tree-slot-tabs">
<button v-for="n in ['weapon','helm','chest','shoulder','necklace','gloves','belt','legs','boots','ring']" :key="n" :class="['tree-slot-btn', { active: treeSlot === n }]" @click="treeSlot = n">
<img :src="slotIcons[n]" class="tree-slot-icon" :alt="slotNames[n]">
<span>{{ slotNames[n] }}</span>
</button>
</div>
<div class="equipment-tree">
<div v-for="tier in treeTiers" :key="tier.key" class="tree-tier">
<div class="tier-header" :style="{ color: qualityColors[tier.key] }">
<span class="tier-dot" :style="{ backgroundColor: qualityColors[tier.key] }"></span>
<span class="tier-name">{{ tier.name }}</span>
<span class="tier-count">({{ tier.items.length }}件)</span>
</div>
<div class="tier-items">
<div v-for="item in tier.items" :key="item.id" class="tree-node" :style="{ borderColor: qualityColors[item.quality] }">
<img v-if="item.icon" :src="item.icon" class="tree-icon" alt="">
<img v-else :src="slotIcons[item.slot]" class="tree-icon" alt="">
<div class="tree-node-body">
<span class="tree-node-name">{{ item.name }}</span>
<span class="tree-node-en">{{ item.nameEn }}</span>
<span v-if="getDesc(item.id)" class="tree-node-effect">{{ getDesc(item.id) }}</span>
</div>
</div>
</div>
</div>
</div>
</div>

<!-- 传说武器 Tab -->
<div v-if="activeTab === 'weapons'" class="tab-content">
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
<span class="eq-slot">传说</span>
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

<!-- 传说防具 Tab -->
<div v-if="activeTab === 'armor'" class="tab-content">
<div v-for="g in Object.entries(groupedArmor)" :key="g[0]" class="armor-group">
<h3 class="slot-title">{{ g[0] }}</h3>
<div class="equipment-grid">
<div v-for="item in g[1]" :key="item.id" class="equipment-card" style="border-color: #ff9800">
<div class="eq-header" style="background: #ff9800">
<div class="eq-title">
<div class="eq-icon-wrap">
<img :src="slotIcons[item.slot]" class="slot-bg" alt="">
<img v-if="item.icon" :src="item.icon" class="eq-icon-img" alt="">
</div>
<span class="eq-name">{{ item.name }}</span>
</div>
<span class="eq-slot">传说</span>
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

<!-- 消耗品 Tab -->
<div v-if="activeTab === 'consumables'" class="tab-content">
<h3>生命药水</h3>
<div class="consumables-grid">
<div v-for="p in hpPotions" :key="p.id" class="consumable-card">
<div class="con-header">
<div class="con-icon-wrap">
<img v-if="p.icon" :src="p.icon" class="con-icon-img" alt="">
</div>
<span class="con-name">{{ p.name }}</span>
</div>
<div class="con-body"><p>{{ p.desc }}</p></div>
</div>
</div>
<h3>增益药水（持续1小时）</h3>
<div class="consumables-grid">
<div v-for="p in buffPotions" :key="p.id" class="consumable-card">
<div class="con-header" style="background: #2196f3">
<div class="con-icon-wrap">
<img v-if="p.icon" :src="p.icon" class="con-icon-img" alt="">
</div>
<span class="con-name">{{ p.name }}</span>
</div>
<div class="con-body"><p>{{ p.desc }}</p></div>
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

<!-- 材料&宝箱 Tab -->
<div v-if="activeTab === 'materials'" class="tab-content">
<h3>材料</h3>
<div class="consumables-grid">
<div v-for="m in itemData.materials" :key="m.id" class="consumable-card">
<div class="con-header" style="background: #9c27b0">
<div class="con-icon-wrap">
<img v-if="m.icon" :src="m.icon" class="con-icon-img" alt="">
</div>
<span class="con-name">{{ m.name }}</span>
</div>
<div class="con-body"><p>{{ m.desc }}</p></div>
</div>
</div>
<h3>宝箱</h3>
<div class="consumables-grid">
<div v-for="c in itemData.chests" :key="c.id" class="consumable-card">
<div class="con-header" style="background: #ff9800">
<div class="con-icon-wrap">
<img v-if="c.icon" :src="c.icon" class="con-icon-img" alt="">
</div>
<span class="con-name">{{ c.name }}</span>
</div>
<div class="con-body"><p>{{ c.desc }}</p></div>
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

<!-- 随从缰绳 Tab -->
<div v-if="activeTab === 'reins'" class="tab-content">
<p class="section-desc">击败对应怪物获得缰绳，使用后永久解锁该随从。</p>
<div class="reins-grid">
<div v-for="rein in itemData.companion_reins" :key="rein.id" class="rein-card">
<div class="rein-icon-wrap">
<img v-if="getMinionIcon(rein.companion)" :src="getMinionIcon(rein.companion)" class="rein-icon-img" alt="">
</div>
<div class="rein-name">{{ rein.name }}</div>
<div class="rein-companion">解锁：{{ rein.companion }}</div>
<div class="rein-companion-en">{{ rein.companionEn }}</div>
</div>
</div>
</div>
</div>

<style scoped>
.tip-box { background: #1a1a2e; border-radius: 8px; padding: 1rem; margin-bottom: 1.5rem; color: #ccc; border-left: 4px solid #9c27b0; }
.tip-box strong { color: #9c27b0; display: block; margin-bottom: 0.3rem; }
.tabs { display: flex; gap: 0.5rem; margin-bottom: 1.5rem; flex-wrap: wrap; }
.tab { background: #1a1a2e; color: #888; border: 1px solid #333; padding: 0.6rem 1.2rem; border-radius: 6px; cursor: pointer; font-size: 0.95rem; transition: all 0.2s; }
.tab:hover { border-color: #555; color: #ccc; }
.tab.active { background: rgba(156, 39, 176, 0.15); border-color: #9c27b0; color: #fff; }
.tab-content { animation: fadeIn 0.3s; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
h3 { color: #fff; margin: 1.5rem 0 0.8rem 0; font-size: 1.1rem; }

/* Equipment Tree */
.tree-slot-tabs { display: flex; gap: 0.4rem; margin-bottom: 1.5rem; flex-wrap: wrap; }
.tree-slot-btn { background: #1a1a2e; border: 1px solid #333; border-radius: 6px; padding: 0.4rem 0.8rem; color: #888; cursor: pointer; display: flex; align-items: center; gap: 0.4rem; font-size: 0.9rem; transition: all 0.2s; }
.tree-slot-btn:hover { border-color: #555; color: #ccc; }
.tree-slot-btn.active { background: rgba(156, 39, 176, 0.15); border-color: #9c27b0; color: #fff; }
.tree-slot-icon { width: 24px; height: 24px; object-fit: contain; }
.equipment-tree { display: flex; flex-direction: column; gap: 1rem; }
.tree-tier { background: rgba(26, 26, 46, 0.6); border-radius: 10px; padding: 1rem; border: 1px solid #333; }
.tier-header { display: flex; align-items: center; gap: 0.4rem; margin-bottom: 0.8rem; font-weight: bold; font-size: 1rem; }
.tier-dot { width: 10px; height: 10px; border-radius: 50%; }
.tier-count { font-size: 0.85rem; color: #666; margin-left: 0.5rem; }
.tier-items { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 0.8rem; }
.tree-node { background: #1a1a2e; border: 2px solid; border-radius: 8px; padding: 0.8rem; display: flex; align-items: flex-start; gap: 0.8rem; transition: transform 0.15s; }
.tree-node:hover { transform: translateY(-2px); }
.tree-icon { width: 48px; height: 48px; border-radius: 6px; background: #2d2d44; object-fit: contain; flex-shrink: 0; }
.tree-node-body { display: flex; flex-direction: column; gap: 0.15rem; flex: 1; min-width: 0; }
.tree-node-name { color: #fff; font-weight: bold; font-size: 0.95rem; }
.tree-node-en { color: #666; font-size: 0.8rem; font-style: italic; }
.tree-node-effect { color: #ff9800; font-size: 0.85rem; margin-top: 0.3rem; line-height: 1.4; }

/* Equipment Cards */
.equipment-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 1rem; }
.equipment-card { background: #1a1a2e; border: 2px solid; border-radius: 8px; overflow: hidden; }
.eq-header { padding: 0.7rem 1rem; color: #fff; display: flex; justify-content: space-between; align-items: center; }
.eq-title { display: flex; align-items: center; gap: 0.6rem; }
.eq-icon-wrap { width: 48px; height: 48px; position: relative; flex-shrink: 0; }
.slot-bg { width: 100%; height: 100%; object-fit: contain; position: absolute; top: 0; left: 0; }
.eq-icon-img { width: 70%; height: 70%; object-fit: contain; position: absolute; top: 15%; left: 15%; filter: drop-shadow(0 1px 2px rgba(0,0,0,0.5)); }
.eq-name { font-weight: bold; font-size: 1rem; }
.eq-slot { font-size: 0.8rem; background: rgba(0,0,0,0.2); padding: 0.15rem 0.5rem; border-radius: 4px; }
.eq-body { padding: 0.8rem 1rem; }
.eq-name-en { color: #666; font-size: 0.85rem; margin: 0 0 0.8rem 0; font-style: italic; }
.eq-effect { background: rgba(255, 152, 0, 0.08); border-left: 3px solid #ff9800; padding: 0.7rem; border-radius: 0 6px 6px 0; margin-bottom: 0.8rem; }
.effect-label { font-size: 0.75rem; background: #ff9800; color: #000; padding: 0.1rem 0.4rem; border-radius: 3px; font-weight: bold; margin-bottom: 0.4rem; display: inline-block; }
.eq-effect p { color: #ccc; font-size: 0.9rem; line-height: 1.5; margin: 0.5rem 0 0 0; }
.eq-desc-en { color: #555; font-size: 0.8rem; font-style: italic; margin: 0; }
.armor-group { margin-bottom: 1.5rem; }
.slot-title { color: #ff9800; font-size: 1rem; margin: 0 0 0.8rem 0; padding-bottom: 0.3rem; border-bottom: 1px solid #333; }

/* Consumables */
.consumables-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 0.8rem; }
.consumable-card { background: #1a1a2e; border-radius: 8px; overflow: hidden; border: 1px solid #333; }
.con-header { background: #4caf50; padding: 0.6rem 1rem; color: #fff; display: flex; align-items: center; gap: 0.6rem; }
.con-icon-wrap { width: 32px; height: 32px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.2); border-radius: 6px; }
.con-icon-img { width: 24px; height: 24px; object-fit: contain; }
.con-name { font-weight: bold; font-size: 0.95rem; }
.con-body { padding: 0.7rem 1rem; }
.con-body p { color: #aaa; font-size: 0.9rem; margin: 0; line-height: 1.4; }
.exp-books { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 0.5rem; }
.exp-book { background: #1a1a2e; border-radius: 6px; padding: 0.5rem 0.8rem; display: flex; align-items: center; gap: 0.6rem; border-left: 3px solid #00bcd4; }
.book-tier { color: #00bcd4; font-weight: bold; font-size: 0.85rem; min-width: 40px; }
.book-name { color: #fff; font-size: 0.9rem; flex: 1; }
.book-desc { color: #666; font-size: 0.8rem; }
.random-boxes { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 0.5rem; }
.random-box { background: #1a1a2e; border: 1px solid #333; border-radius: 6px; padding: 0.5rem; text-align: center; color: #aaa; font-size: 0.9rem; display: flex; flex-direction: column; align-items: center; gap: 0.3rem; }
.box-icon-wrap { width: 40px; height: 40px; position: relative; }
.box-slot-bg { width: 100%; height: 100%; object-fit: contain; }

/* Reins */
.reins-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 0.8rem; }
.rein-card { background: #1a1a2e; border: 1px solid #333; border-radius: 8px; padding: 0.8rem; text-align: center; transition: border-color 0.2s; }
.rein-card:hover { border-color: #9c27b0; }
.rein-icon-wrap { width: 56px; height: 56px; margin: 0 auto 0.3rem; background: #2d2d44; border-radius: 50%; display: flex; align-items: center; justify-content: center; overflow: hidden; }
.rein-icon-img { width: 48px; height: 48px; object-fit: contain; }
.rein-name { color: #ff9800; font-weight: bold; font-size: 0.9rem; }
.rein-companion { color: #aaa; font-size: 0.85rem; margin-top: 0.2rem; }
.rein-companion-en { color: #555; font-size: 0.75rem; }
.section-desc { color: #888; font-size: 0.9rem; margin-bottom: 1rem; }
</style>
