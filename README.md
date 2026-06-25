# 幻境传说 游戏维基

基于 VitePress 构建的游戏百科全书。

## 文件夹结构

```
game-wiki/
├── .vitepress/
│   └── config.js        # 站点配置文件
├── public/
│   ├── logo.png          # 网站图标
│   └── data/
│       ├── items.json    # 物品数据
│       ├── levels.json   # 关卡数据
│       └── heroes.json   # 英雄数据
├── index.md              # 首页
├── items.md              # 物品数据库
├── levels.md             # 关卡大全
├── heroes.md             # 英雄图鉴
├── faq.md                # 常见问题
└── package.json          # 项目配置
```

## 安装步骤（0基础教程）

### 第一步：安装 Node.js

1. 打开浏览器，访问 https://nodejs.org/
2. 下载 LTS 版本（左侧大按钮）
3. 双击安装包，一路点"下一步"完成安装
4. 安装完成后，按 `Win + R`，输入 `cmd`，回车
5. 在黑窗口里输入 `node -v`，看到版本号就说明装好了

### 第二步：进入项目文件夹

1. 打开文件资源管理器
2. 进入 `C:\Users\12243\Desktop\game-wiki`
3. 在地址栏输入 `cmd`，回车，会打开命令行窗口
4. 或者右键空白处，选择"在终端中打开"

### 第三步：安装依赖

在命令行里输入：
```
npm install
```

等待安装完成（看到新的命令行提示符 `>` 就好了）

### 第四步：本地运行

输入：
```
npm run docs:dev
```

等待几秒钟，会显示类似这样的内容：
```
Local: http://localhost:5173/
```

### 第五步：预览网站

1. 打开浏览器（推荐 Chrome）
2. 地址栏输入 `http://localhost:5173/`
3. 看到网站首页就成功了！

### 第六步：停止网站

按 `Ctrl + C` 可以停止运行

---

## 更新数据教程

### 添加新物品

1. 打开 `public/data/items.json`
2. 在最后一个 `}` 后面加逗号，粘贴新物品模板：

```json
{
  "id": 1013,
  "name": "新物品名",
  "quality": "rare",
  "qualityName": "稀有",
  "type": "weapon",
  "typeName": "武器",
  "level": 50,
  "attack": 200,
  "defense": 0,
  "description": "物品描述"
}
```

3. 保存文件，网站会自动刷新

### 添加新关卡

编辑 `public/data/levels.json`，格式同上

### 添加新英雄

编辑 `public/data/heroes.json`，格式同上

---

## 部署到 GitHub Pages（免费）

### 第一步：注册 GitHub

1. 打开 https://github.com
2. 点击 Sign up 注册账号
3. 记住自己的用户名

### 第二步：创建仓库

1. 登录后点击右上角 + → New repository
2. Repository name 填 `game-wiki`
3. 选择 Public
4. 点击 Create repository

### 第三步：上传代码

1. 在项目文件夹打开终端
2. 依次输入以下命令（把 `你的用户名` 换成你的 GitHub 用户名）：

```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/你的用户名/game-wiki.git
git push -u origin main
```

3. 可能要输入 GitHub 用户名和密码

### 第四步：启用 GitHub Pages

1. 在 GitHub 仓库页面点 Settings
2. 左侧菜单找到 Pages
3. Source 选 Deploy from a branch
4. Branch 选 main，/(root)
5. 点 Save

### 第五步：访问网站

等待 1-2 分钟，访问：
```
https://你的用户名.github.io/game-wiki/
```

---

## 常见问题

Q: 安装依赖很慢怎么办？
A: 可以用淘宝镜像：`npm install --registry=https://registry.npmmirror.com`

Q: 改了代码网站没刷新？
A: 确认保存了文件，VitePress 会自动热更新

Q: 部署后图片不显示？
A: 检查 .vitepress/config.js 里的 srcDir 配置
