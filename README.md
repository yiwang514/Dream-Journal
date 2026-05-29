<div align="center">

# Energy Space

**记录成长，为梦想储蓄**

一个基于 React + TypeScript 的个人成功日记与梦想储蓄追踪器。

[![Deploy](https://github.com/yiwang514/Dream-Journal/actions/workflows/deploy.yml/badge.svg)](https://github.com/yiwang514/Dream-Journal/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite)](https://vitejs.dev/)

</div>

---

## 项目介绍

Energy Space 是一个帮助你建立自信的 Web 应用——通过记录每天的小成就来积累信心，同时用可视化的目标系统追踪梦想储蓄进度。所有数据存储在浏览器本地，无需后端，无需注册。

## 功能特性

### 成功日记

- 每天记录 3 件你做到的小事，无论多小
- 支持行内编辑，点击任意条目即可修改
- 删除后可通过 Toast 通知一键撤销
- 每次保存新条目时触发彩纸庆祝动画

### 梦想储蓄

- 创建梦想并设定目标金额（人民币）
- 存入金额，实时查看进度条变化
- 梦想达成时展示庆祝徽章
- 支持编辑、删除梦想，操作可撤销

### 统计面板

- 总日记数、梦想完成率、储蓄概览
- Recharts 饼图展示各梦想的储蓄分布
- 每个梦想的独立进度条
- 最近 7 条日记时间线

### 通用功能

- **深色 / 浅色主题** — 一键切换，状态持久化到 localStorage
- **数据导出 / 导入** — 将所有数据备份为 JSON 文件并可随时恢复
- **PWA 支持** — 可安装为独立应用，支持离线使用
- **响应式布局** — 桌面端双栏并排，移动端自动堆叠
- **毛玻璃 UI** — 温暖渐变、浮动粒子、细腻颗粒纹理

## 技术栈

| 分类 | 技术 |
|---|---|
| 框架 | React 18 + TypeScript |
| 构建工具 | Vite 6 |
| 路由 | React Router DOM 7 |
| 样式 | Tailwind CSS 3 |
| 图表 | Recharts |
| PWA | vite-plugin-pwa (Workbox) |
| 测试 | Vitest + Testing Library |
| 代码规范 | ESLint 9 (flat config) + Prettier |
| 部署 | GitHub Actions + GitHub Pages |

## 快速开始

### 环境要求

- Node.js >= 20
- npm

### 安装

```bash
git clone https://github.com/yiwang514/Dream-Journal.git
cd Dream-Journal
npm ci
```

### 开发

```bash
npm run dev
```

在浏览器中打开 `http://localhost:5173`。

### 构建与预览

```bash
npm run build
npm run preview
```

### 测试

```bash
npm run test          # 单次运行
npm run test:watch    # 监听模式
```

### 代码检查与格式化

```bash
npm run lint          # 检查
npm run lint:fix      # 自动修复
npm run format        # 格式化
```

## 项目结构

```
src/
├── components/          # React 组件
│   ├── HomePage.tsx     # 主页：日记 + 梦想面板
│   ├── StatsPage.tsx    # 统计面板
│   ├── SuccessJournal.tsx  # 成功日记
│   ├── DreamBoard.tsx   # 梦想面板
│   ├── DreamCard.tsx    # 梦想卡片
│   ├── ThemeToggle.tsx  # 主题切换
│   ├── DataExportImport.tsx  # 数据导入导出
│   └── ...
├── hooks/               # 自定义 Hooks
│   ├── useEntries.ts    # 日记增删改查
│   ├── useDreams.ts     # 梦想增删改查 + 存款
│   ├── useLocalStorage.ts   # 本地存储
│   └── useTheme.ts      # 主题管理
├── utils/               # 工具函数
│   └── confetti.ts      # 彩纸动画
├── __tests__/           # 单元测试
├── types.ts             # TypeScript 类型定义
├── App.tsx              # 路由配置
└── main.tsx             # 应用入口
```

## 部署

项目通过 GitHub Actions 在每次推送到 `main` 分支时自动部署到 GitHub Pages。也可以手动部署：

```bash
npm run deploy
```

## 开源协议

[MIT](LICENSE) &copy; 2026 [yiwang514](https://github.com/yiwang514)
