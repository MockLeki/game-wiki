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
    siteTitle: '桌面破坏神-QQ官方群1048729821 玩家交流群1048729821',

    // 【顶部导航栏】对应你Wiki的大栏目
    nav: [
      { text: '首页', link: '/' },
      { text: '装备图鉴', link: '/items/' },
      { text: '仆从大全', link: '/minions' },
      { text: '关卡大全', link: '/levels' },
      { text: '角色介绍', link: '/heroes/' },
      { text: '伤害计算器', link: '/damage-calculator' },
      { text: '常见问题', link: '/faq' }
    ],

    // 【左侧侧边栏】每个大栏目下的子页面目录
    sidebar: {
      // 物品图鉴栏目的侧边栏
      '/items/': [
        {
          text: '装备分类',
          items: [
            { text: '武器大全', link: '/items/weapons' },
            { text: '防具大全', link: '/items/armors' },
            { text: '材料列表', link: '/items/materials' }
          ]
        }
      ],
      // 关卡大全栏目的侧边栏
      '/stages/': [
        {
          text: '关卡目录',
          items: [
            { text: '第一章', link: '/stages/chapter1' },
            { text: '第二章', link: '/stages/chapter2' }
          ]
        }
      ]
    },

    // 开启搜索功能（内置免费本地搜索）
    search: {
      provider: 'local'
    },

    // 页脚文字
    footer: {
      message: '噜总制作，QQ:1224325275，非官方Wiki',
      copyright: 'QQ官方群1048729821 QQ玩家交流群1048729821'
    }
  }
})