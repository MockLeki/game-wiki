import{_ as S,v as j,o as l,c as o,j as s,a as y,e as r,F as u,B as v,n as P,t as e,N as w,p as m,h,ak as B}from"./chunks/framework.BuIsu9Ay.js";const O={key:0},V={key:1,class:"skill-container"},$={class:"class-tabs"},z=["onClick"],A={class:"class-icon"},F={class:"class-name"},L={class:"class-name-en"},W={key:0,class:"class-info"},I={class:"class-desc"},J={class:"class-stat"},M={key:1,class:"section"},U={class:"abilities-grid"},q={class:"ability-header"},G={class:"ability-name"},H={class:"ability-body"},K={class:"ability-name-en"},Q={class:"ability-desc"},X={key:2,class:"section"},Y={class:"talent-header"},Z={class:"point-tracker"},ss={class:"points-spent"},ts={class:"points-remaining"},es={class:"points-total"},ns={key:3,class:"section"},as={key:4,class:"section summary-section"},ls={class:"summary-grid"},os={class:"summary-name"},is={class:"summary-rank"},cs={class:"summary-desc"},rs={class:"section"},ds={class:"stats-table-wrap"},us={class:"stats-table"},vs={class:"stat-name"},ps={class:"stat-desc"},_s={class:"section"},ms={class:"species-list"},ys={class:"section"},hs={class:"rarity-list"},Ts=JSON.parse('{"title":"技能大全","description":"","frontmatter":{},"headers":[],"relativePath":"skills.md","filePath":"skills.md"}'),ks={name:"skills.md"},gs=Object.assign(ks,{setup(fs){const c=m(null),k=m(!0),d=m("warrior"),p=B({}),b=m(30),_=m(null);j(async()=>{try{const a=await fetch("/data/skills.json");c.value=await a.json()}catch(a){console.error("加载失败:",a)}finally{k.value=!1}});const i=h(()=>c.value?c.value.classes[d.value]:null),C=h(()=>{let a=0;for(const t in p)t.startsWith(d.value+"_")&&(a+=p[t]);return a}),T=h(()=>b.value-C.value),g=a=>{const t=`${d.value}_${a}`;return p[t]||0},x=()=>{Object.keys(p).forEach(a=>{a.startsWith(d.value+"_")&&delete p[a]})},D=a=>{if(!c.value)return"#666";const t=c.value.abilityTags[a];return t?t.color:"#666"},N=a=>{if(!c.value)return a;const t=c.value.abilityTags[a];return t?t.name:a},E=h(()=>!i.value||!i.value.talents?[]:i.value.talents.filter(a=>g(a.id)>0)),R=a=>{d.value=a,_.value=null};return(a,t)=>(l(),o("div",null,[t[11]||(t[11]=s("h1",{id:"技能大全",tabindex:"-1"},[y("技能大全 "),s("a",{class:"header-anchor",href:"#技能大全","aria-label":'Permalink to "技能大全"'},"​")],-1)),t[12]||(t[12]=s("div",{class:"tip-box"},[s("strong",null,"数据来源"),s("p",null,"技能数据从游戏本体文件（Deskrawl Demo）的 Unity 资源中提取，包含战士和法师两大职业的主动技能、天赋树及属性系统。 点击天赋节点可分配/退回天赋点，底部实时显示当前加点效果总结。")],-1)),k.value?(l(),o("p",O,"加载中...")):r("",!0),!k.value&&c.value?(l(),o("div",V,[s("div",$,[(l(!0),o(u,null,v(c.value.classes,(n,f)=>(l(),o("button",{key:f,class:P(["class-tab",{active:d.value===f}]),onClick:bs=>R(f)},[s("span",A,e(n.icon),1),s("span",F,e(n.name),1),s("span",L,e(n.nameEn),1)],10,z))),128))]),i.value?(l(),o("div",W,[s("h2",null,e(i.value.icon)+" "+e(i.value.name)+" ("+e(i.value.nameEn)+")",1),s("p",I,e(i.value.description),1),s("p",J,[t[0]||(t[0]=s("strong",null,"主属性:",-1)),y(" "+e(i.value.primaryStat),1)])])):r("",!0),i.value?(l(),o("div",M,[t[1]||(t[1]=s("h3",{class:"section-title"},"⚡ 主动技能",-1)),s("div",U,[(l(!0),o(u,null,v(i.value.abilities,n=>(l(),o("div",{key:n.id,class:"ability-card"},[s("div",q,[s("span",G,e(n.name),1),s("span",{class:"ability-tag",style:w({backgroundColor:D(n.tag)})},e(N(n.tag)),5)]),s("div",H,[s("p",K,e(n.nameEn),1),s("p",Q,e(n.description),1)])]))),128))])])):r("",!0),i.value&&i.value.talents&&i.value.talents.length>0?(l(),o("div",X,[s("div",Y,[t[4]||(t[4]=s("h3",{class:"section-title"},"🌟 天赋模拟器",-1)),s("div",Z,[s("span",ss,[t[2]||(t[2]=y("已分配: ",-1)),s("strong",null,e(C.value),1)]),s("span",ts,[t[3]||(t[3]=y("剩余: ",-1)),s("strong",{class:P({"no-points":T.value===0})},e(T.value),3)]),s("span",es,"/ "+e(b.value),1),s("button",{class:"reset-btn",onClick:x},"重置天赋")])]),s("pre",null,[s("code",null,`<p class="talent-hint">💡 左键点击分配天赋点，右键点击退回天赋点</p>

<!-- 天赋分类展示 -->
<div class="talent-categories">
  <div v-for="(talents, cat) in talentsByCategory" :key="cat" class="talent-category">
    <h4 class="category-title">
      <span class="category-dot" :style="{ backgroundColor: categoryColor(cat) }"></span>
      `+e(a.cat)+`
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
          <span class="talent-id">#`+e(a.talent.id)+`</span>
        </div>
        <div class="talent-info">
          <span class="talent-name">`+e(a.talent.name)+`</span>
          <span class="talent-rank">
            `+e(g(a.talent.id))+" / "+e(a.talent.maxRank)+`
          </span>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- 天赋详情悬浮 -->
<div v-if="selectedTalent" class="talent-tooltip">
  <strong>`+e(_.value.name)+" ("+e(_.value.nameEn)+`)</strong>
  <p>`+e(_.value.desc)+`</p>
  <p class="talent-en">`+e(_.value.descEn)+`</p>
</div>
`,1)])])):r("",!0),i.value&&(!i.value.talents||i.value.talents.length===0)?(l(),o("div",ns,[...t[5]||(t[5]=[s("h3",{class:"section-title"},"🌟 天赋模拟器",-1),s("div",{class:"no-data-box"},[s("p",null,"🎭 法师天赋数据尚未在 Demo 版本的本地化文件中找到。"),s("p",null,"游戏文件中存在 SorcererTalent0 - SorcererTalent23 共24个天赋节点的资产引用，但对应的文本描述可能存储在服务端或将在正式版中补充。"),s("p",null,"如果你有法师天赋的截图或文字资料，可以补充给我们！")],-1)])])):r("",!0),E.value.length>0?(l(),o("div",as,[t[6]||(t[6]=s("h3",{class:"section-title"},"📋 当前加点效果总结",-1)),s("div",ls,[(l(!0),o(u,null,v(E.value,n=>(l(),o("div",{key:n.id,class:"summary-item"},[s("span",os,e(n.name),1),s("span",is,"Lv."+e(g(n.id)),1),s("span",cs,e(n.desc),1)]))),128))])])):r("",!0),s("div",rs,[t[8]||(t[8]=s("h3",{class:"section-title"},"📊 属性系统参考",-1)),s("div",ds,[s("table",us,[t[7]||(t[7]=s("thead",null,[s("tr",null,[s("th",null,"属性"),s("th",null,"说明")])],-1)),s("tbody",null,[(l(!0),o(u,null,v(c.value.stats,n=>(l(),o("tr",{key:n.key},[s("td",vs,e(n.name),1),s("td",ps,e(n.desc),1)]))),128))])])])]),s("div",_s,[t[9]||(t[9]=s("h3",{class:"section-title"},"🐺 仆从物种类型",-1)),s("div",ms,[(l(!0),o(u,null,v(c.value.species,n=>(l(),o("span",{key:n.key,class:"species-tag"},e(n.name)+" ("+e(n.nameEn)+") ",1))),128))])]),s("div",ys,[t[10]||(t[10]=s("h3",{class:"section-title"},"💎 装备品质",-1)),s("div",hs,[(l(!0),o(u,null,v(c.value.rarities,n=>(l(),o("span",{key:n.key,class:"rarity-tag",style:w({borderColor:n.color,color:n.color})},e(n.name),5))),128))])])])):r("",!0)]))}}),Es=S(gs,[["__scopeId","data-v-2e8e97f5"]]);export{Ts as __pageData,Es as default};
