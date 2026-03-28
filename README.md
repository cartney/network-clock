# Network Clock 🕐

网络同步时钟 - 基于 NTP 时间同步的 Web 时钟显示

## 功能特性

- ⏰ **实时时钟显示** - 秒级更新
- 📅 **日期显示** - 年月日 + 星期
- 🔄 **NTP 时间同步** - 自动校准本地时间
- 📺 **全屏模式** - 沉浸式时钟体验
- 🔤 **字体调节** - 支持 40px-300px 字体大小
- 🎨 **现代 UI** - 深色主题 + 霓虹效果
- 📱 **响应式设计** - 适配桌面和移动端

## 技术栈

- React 19 + TypeScript
- Vite 构建工具
- NTP 时间同步 API

## 快速开始

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 使用说明

1. **启动应用** - 运行 `npm run dev`
2. **访问** - 打开浏览器访问 http://localhost:5173
3. **全屏模式** - 点击 ⛶ 按钮进入全屏
4. **调节字体** - 使用 A+ / A- 按钮调整时钟大小
5. **时间同步** - 应用自动每小时同步一次 NTP 时间

## 项目结构

```
network-clock/
├── src/
│   ├── components/
│   │   ├── Clock.tsx          # 时钟核心组件
│   │   └── DateDisplay.tsx    # 日期显示组件
│   ├── utils/
│   │   └── timeSync.ts        # NTP 时间同步工具
│   ├── App.tsx                # 主应用组件
│   ├── App.css                # 应用样式
│   ├── index.css              # 全局样式
│   └── main.tsx               # 入口文件
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## MVP 任务清单

- [x] TK-001: 项目初始化（Vite + React + TS）
- [x] TK-002: 时钟核心组件
- [x] TK-003: 日期组件
- [x] TK-004: 时间同步逻辑
- [x] TK-005: 全屏模式
- [x] TK-006: 字体大小调节
- [x] TK-007: 基础样式
- [ ] TK-008: 测试与优化

## 许可证

MIT
