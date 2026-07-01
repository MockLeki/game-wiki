import { defineConfig } from 'vitepress'

export default defineConfig({
  // 站点基础信息
  base: '/',
  title: "桌面破坏神Wiki",
  description: "最全的游戏资料站",
  lang: 'zh-CN',

  themeConfig: {

    // 默认暗黑模式
    appearance: 'dark',

    // 网站左上角的logo文字
    siteTitle: '桌面破坏神 - QQ官方群1048729821 玩家交流群737018935',

    // 【顶部导航栏】对应你Wiki的大栏目
    nav: [
      { text: '首页', link: '/' },
      { text: '装备图鉴', link: '/items/' },
      { text: '仆从大全', link: '/minions' },
      { text: '关卡大全', link: '/levels' },
      { text: '技能大全', link: '/skills' },
      { text: '伤害计算器', link: '/damage-calculator' },
      { text: '词条计算器', link: '/affixes' },
      { text: '常见问题', link: '/faq' }
    ],

    // 开启搜索功能（内置免费本地搜索）
    search: {
      provider: 'local'
    },

    // 页脚文字
    footer: {
      message: '噜总制作，QQ:1224325275，非官方Wiki',
      copyright: 'QQ官方群1048729821 QQ玩家交流群737018935'
    }
  }
})