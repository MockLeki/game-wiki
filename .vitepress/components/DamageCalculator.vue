<script setup>
import { ref } from 'vue'

const weaponDps = ref(100)
const attackSpeed = ref(1.0)
const fixedDamage = ref(0)
const strengthPercent = ref(0)
const physicalPercent = ref(0)
const normalAttackPercent = ref(0)

const calcAttackPower = () => {
  const base = (weaponDps.value * attackSpeed.value) + fixedDamage.value
  const strengthMultiplier = 1 + (strengthPercent.value / 100)
  const physicalMultiplier = 1 + (physicalPercent.value / 100)
  const normalAttackMultiplier = 1 + (normalAttackPercent.value / 100)
  return (base * strengthMultiplier * physicalMultiplier * normalAttackMultiplier).toFixed(2)
}

const resetAll = () => {
  weaponDps.value = 100
  attackSpeed.value = 1.0
  fixedDamage.value = 0
  strengthPercent.value = 0
  physicalPercent.value = 0
  normalAttackPercent.value = 0
}
</script>

<template>
  <div class="calculator-wrapper">
    <div class="tip-box">
      <strong>公式说明</strong>
      <p>攻击强度 = (武器DPS x 攻速 + 固定伤害) x (1 + 力量%) x (1 + 物理伤害%) x (1 + 普通攻击伤害%)</p>
    </div>
    
    <div class="calculator-layout">
      <div class="input-section">
        <h2>输入数值</h2>
        
        <div class="input-group">
          <label>武器 DPS</label>
          <input type="number" v-model="weaponDps" min="0" step="1">
        </div>
        
        <div class="input-group">
          <label>攻击速度</label>
          <input type="number" v-model="attackSpeed" min="0.1" step="0.01">
        </div>
        
        <div class="input-group">
          <label>固定伤害</label>
          <input type="number" v-model="fixedDamage" min="0" step="1">
        </div>
        
        <div class="input-group">
          <label>力量百分比</label>
          <input type="number" v-model="strengthPercent" min="0" step="1">
        </div>
        
        <div class="input-group">
          <label>物理伤害百分比</label>
          <input type="number" v-model="physicalPercent" min="0" step="1">
        </div>
        
        <div class="input-group">
          <label>普通攻击伤害百分比</label>
          <input type="number" v-model="normalAttackPercent" min="0" step="1">
        </div>
        
        <button class="reset-btn" @click="resetAll">重置</button>
      </div>
      
      <div class="result-section">
        <h2>计算结果</h2>
        
        <div class="result-card">
          <div class="result-item">
            <span class="result-label">攻击强度</span>
            <span class="result-value">{{ calcAttackPower() }}</span>
          </div>
          
          <div class="result-item">
            <span class="result-label">每秒伤害</span>
            <span class="result-value">{{ (calcAttackPower() * attackSpeed).toFixed(2) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calculator-wrapper { max-width: 1000px; margin: 0 auto; padding: 1rem; }

.tip-box { background: #1a1a2e; border-radius: 8px; padding: 1rem; margin-bottom: 1.5rem; color: #ccc; }
.tip-box strong { color: #ff9800; display: block; margin-bottom: 0.5rem; }

.calculator-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }

.input-section, .result-section { background: #1a1a2e; border-radius: 8px; padding: 1.5rem; }

h2 { color: #fff; margin-top: 0; margin-bottom: 1rem; font-size: 1.2rem; }

.input-group { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem; }
.input-group label { width: 160px; color: #ccc; font-weight: bold; }
.input-group input { 
  background: #2d2d44; 
  color: white; 
  border: 1px solid #444; 
  border-radius: 4px; 
  padding: 0.5rem; 
  width: 120px;
  text-align: right;
}

.reset-btn { 
  background: #4a4a6a; 
  color: white; 
  border: none; 
  padding: 0.5rem 1.5rem; 
  border-radius: 4px; 
  cursor: pointer;
  margin-top: 0.5rem;
}

.result-card { background: #12121f; border-radius: 8px; padding: 1rem; }

.result-item { 
  display: flex; 
  justify-content: space-between; 
  align-items: center;
  padding: 0.8rem 0;
  border-bottom: 1px solid #333;
}
.result-item:last-child { border-bottom: none; }

.result-label { color: #888; font-size: 0.9rem; }
.result-value { font-size: 1.2rem; font-weight: bold; color: #ff9800; }
</style>
