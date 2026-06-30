import{_ as k,v as h,o as t,c as o,j as s,a as c,e as p,F as _,B as f,N as v,t as l,p as u}from"./chunks/framework.BuIsu9Ay.js";const y={key:0},b={key:1,class:"heroes-grid"},g={class:"hero-title"},j={class:"hero-quality"},N={class:"hero-job"},D=JSON.parse('{"title":"英雄图鉴","description":"","frontmatter":{},"headers":[],"relativePath":"heroes.md","filePath":"heroes.md"}'),q={name:"heroes.md"},C=Object.assign(q,{setup(B){const r=u([]),i=u(!0);h(async()=>{try{const a=await fetch("/data/heroes.json");r.value=await a.json()}catch(a){console.error("加载英雄数据失败:",a)}finally{i.value=!1}});const d=a=>({common:"#9e9e9e",rare:"#2196f3",epic:"#9c27b0",legendary:"#ff9800"})[a]||"#9e9e9e",m=a=>({common:"普通",rare:"稀有",epic:"史诗",legendary:"传说"})[a]||a;return(a,n)=>(t(),o("div",null,[n[0]||(n[0]=s("h1",{id:"英雄图鉴",tabindex:"-1"},[c("英雄图鉴 "),s("a",{class:"header-anchor",href:"#英雄图鉴","aria-label":'Permalink to "英雄图鉴"'},"​")],-1)),n[1]||(n[1]=s("div",{class:"tip custom-block"},[s("p",{class:"custom-block-title"},"提示"),s("p",null,[c("数据来源于 "),s("code",null,"public/data/heroes.json"),c("，可直接编辑该文件更新英雄数据。")])],-1)),i.value?(t(),o("p",y,"加载中...")):p("",!0),i.value?p("",!0):(t(),o("div",b,[(t(!0),o(_,null,f(r.value,e=>(t(),o("div",{key:e.id,class:"hero-card",style:v({borderColor:d(e.quality)})},[s("div",{class:"hero-header",style:v({backgroundColor:d(e.quality)})},[s("div",g,[s("h3",null,l(e.name),1),s("span",j,l(m(e.quality)),1)]),s("div",N,l(e.job),1)],4),s("pre",null,[s("code",null,`<div class="hero-body">
  <div class="hero-stats">
    <div class="stat">
      <span class="stat-label">等级</span>
      <span class="stat-value">`+l(e.level)+`</span>
    </div>
    <div class="stat">
      <span class="stat-label">生命</span>
      <span class="stat-value">`+l(e.hp)+`</span>
    </div>
    <div class="stat">
      <span class="stat-label">攻击</span>
      <span class="stat-value">`+l(e.attack)+`</span>
    </div>
    <div class="stat">
      <span class="stat-label">防御</span>
      <span class="stat-value">`+l(e.defense)+`</span>
    </div>
  </div>
  
  <div class="hero-desc">
    <p>`+l(e.description)+`</p>
  </div>
  
  <div class="hero-skills">
    <p><strong>技能:</strong></p>
    <div class="skills">
      <div v-for="skill in hero.skills" :key="skill.name" class="skill-item">
        <div class="skill-header">
          <span class="skill-name">`+l(a.skill.name)+`</span>
          <span class="skill-cd">CD: `+l(a.skill.cooldown)+`秒</span>
        </div>
        <p class="skill-desc">`+l(a.skill.description)+`</p>
      </div>
    </div>
  </div>
</div>
`,1)])],4))),128))]))]))}}),P=k(C,[["__scopeId","data-v-4765fe5f"]]);export{D as __pageData,P as default};
