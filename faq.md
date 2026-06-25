<script setup>
import { ref } from 'vue'

const openIndex = ref(null)

const faqs = [
  {
    question: '如何获得传说品质的装备？',
    answer: '传说装备主要通过以下途径获得：\n1. 击杀地狱难度副本的Boss\n2. 参与限时活动\n3. 使用传说碎片在铁匠铺合成\n4. 完成成就系统奖励'
  },
  {
    question: '英雄升级需要哪些材料？',
    answer: '英雄升级需要：\n1. 经验药水（可通过副本获得）\n2. 金币\n3. 部分高级英雄需要特定灵魂石'
  },
  {
    question: '如何快速提升战力？',
    answer: '快速提升战力的方法：\n1. 优先升级装备品质\n2. 强化英雄技能等级\n3. 镶嵌宝石\n4. 收集套装效果\n5. 完成每日任务获取资源'
  },
  {
    question: '新手应该如何选择英雄？',
    answer: '新手推荐：\n1. 优先培养一个治疗型英雄（如小狐）\n2. 组队时更容易找到位置\n3. 治疗英雄前期副本需求大\n4. 后期可转型输出或坦克'
  },
  {
    question: '装备强化有什么技巧？',
    answer: '装备强化技巧：\n1. 优先强化武器和胸甲\n2. 使用保护符防止强化失败爆装备\n3. 强化等级越高，成功率越低\n4. 建议在活动期间强化，有额外加成'
  },
  {
    question: '如何挑战更高难度的副本？',
    answer: '挑战高难度副本建议：\n1. 提升队伍平均等级\n2. 组建均衡的队伍（坦克+输出+治疗）\n3. 查看副本攻略了解Boss机制\n4. 准备好足够的药水\n5. 多练习走位和技能释放时机'
  },
  {
    question: '游戏内货币有哪些？如何获取？',
    answer: '游戏货币：\n1. 金币 - 最常见，通过副本、任务获得\n2. 钻石 - 付费货币，也可通过活动少量获得\n3. 荣誉点 - PVP玩法获得\n4. 公会贡献 - 公会活动获得'
  },
  {
    question: '如何加入公会？有什么好处？',
    answer: '公会系统：\n1. 等级达到15级可加入公会\n2. 可在公会列表中选择申请\n3. 好处：参与公会副本获得稀有材料\n4. 公会科技提升属性\n5. 结识朋友，组队更方便'
  }
]

const toggleFAQ = (index) => {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

# 常见问题 FAQ

::: tip 提示
这里收录了新手玩家最常问到的问题，持续更新中。
:::

<div class="faq-list">
  <div 
    v-for="(faq, index) in faqs" 
    :key="index" 
    class="faq-item"
    :class="{ open: openIndex === index }"
  >
    <div class="faq-question" @click="toggleFAQ(index)">
      <span>{{ faq.question }}</span>
      <span class="faq-icon">{{ openIndex === index ? '−' : '+' }}</span>
    </div>
    <div v-if="openIndex === index" class="faq-answer">
      <pre>{{ faq.answer }}</pre>
    </div>
  </div>
</div>

<style scoped>
.faq-list {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.faq-item {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
}

.faq-item.open {
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.faq-question {
  background: linear-gradient(135deg, #43a047 0%, #2e7d32 100%);
  color: white;
  padding: 1rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
}

.faq-question:hover {
  background: linear-gradient(135deg, #66bb6a 0%, #43a047 100%);
}

.faq-icon {
  font-size: 1.5rem;
  font-weight: bold;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.2);
  border-radius: 50%;
}

.faq-answer {
  padding: 1rem;
  background: #f9f9f9;
  border-top: 1px solid #e0e0e0;
}

.faq-answer pre {
  margin: 0;
  white-space: pre-wrap;
  font-family: inherit;
  font-size: 0.95rem;
  line-height: 1.6;
  color: #333;
}
</style>
