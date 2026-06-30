import{_ as v,v as f,o,c as l,j as s,a as d,e as i,F as _,B as m,t,N as g,p}from"./chunks/framework.BuIsu9Ay.js";const y={key:0},b={key:1,class:"levels-list"},h={class:"level-header"},x=JSON.parse('{"title":"关卡大全","description":"","frontmatter":{},"headers":[],"relativePath":"levels.md","filePath":"levels.md"}'),k={name:"levels.md"},j=Object.assign(k,{setup(B){const c=p([]),r=p(!0);f(async()=>{try{const a=await fetch("/data/levels.json");c.value=await a.json()}catch(a){console.error("加载关卡数据失败:",a)}finally{r.value=!1}});const u=a=>({简单:"#4caf50",普通:"#2196f3",困难:"#ff9800",噩梦:"#f44336",地狱:"#9c27b0"})[a]||"#9e9e9e";return(a,n)=>(o(),l("div",null,[n[0]||(n[0]=s("h1",{id:"关卡大全",tabindex:"-1"},[d("关卡大全 "),s("a",{class:"header-anchor",href:"#关卡大全","aria-label":'Permalink to "关卡大全"'},"​")],-1)),n[1]||(n[1]=s("div",{class:"tip custom-block"},[s("p",{class:"custom-block-title"},"提示"),s("p",null,[d("数据来源于 "),s("code",null,"public/data/levels.json"),d("，可直接编辑该文件更新关卡数据。")])],-1)),r.value?(o(),l("p",y,"加载中...")):i("",!0),r.value?i("",!0):(o(),l("div",b,[(o(!0),l(_,null,m(c.value,e=>(o(),l("div",{key:e.id,class:"level-card"},[s("div",h,[s("h3",null,t(e.name),1),s("span",{class:"difficulty-badge",style:g({backgroundColor:u(e.difficulty)})},t(e.difficulty),5)]),s("pre",null,[s("code",null,`<div class="level-body">
  <div class="level-info">
    <p><strong>所在区域:</strong> `+t(e.area)+`</p>
    <p><strong>推荐等级:</strong> `+t(e.level)+`</p>
    <p><strong>Boss:</strong> `+t(e.boss)+`</p>
  </div>
  
  <div class="level-desc">
    <p>`+t(e.description)+`</p>
  </div>
  
  <div class="drops-section">
    <p><strong>主要掉落:</strong></p>
    <div class="drops">
      <span v-for="drop in level.drops" :key="drop" class="drop-tag">
        `+t(a.drop)+`
      </span>
    </div>
  </div>
</div>
`,1)])]))),128))]))]))}}),C=v(j,[["__scopeId","data-v-0ed83838"]]);export{x as __pageData,C as default};
