import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/',
  title: "桌面破坏神Wiki",
  description: "最全的游戏资料站",
  lang: 'zh-CN',

  themeConfig: {
    appearance: 'dark',
    siteTitle: '桌面破坏神 - QQ官方群1048729821 玩家交流群737018935',

    nav: [
      { text: '首页', link: '/' },
      { text: '数据库', link: '/database' },
      { text: '玩家社区', link: '/community' }
    ],

    sidebar: [
      {
        text: '📊 数据库',
        items: [
          { text: '数据库首页', link: '/database' },
          { text: '装备图鉴', link: '/items' },
          { text: '词条计算器', link: '/affixes' },
          { text: '技能大全', link: '/skills' },
          { text: '仆从大全', link: '/minions' },
          { text: '关卡大全', link: '/levels' },
          { text: '伤害计算器', link: '/damage-calculator' },
        ]
      },
      {
        text: '📋 其他',
        items: [
          { text: '常见问题', link: '/faq' },
          { text: '玩家社区', link: '/community' },
        ]
      }
    ],

    search: {
      provider: 'local'
    },

    footer: {
      message: '噜总制作，QQ:1224325275，非官方Wiki',
      copyright: 'QQ官方群1048729821 QQ玩家交流群737018935'
    }
  }
})
