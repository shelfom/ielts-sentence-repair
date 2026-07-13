# 项目上下文

## 技术栈

- **核心**: React 19, TypeScript 5, Vite 7, Express
- **UI**: 纯 CSS（两色方案 #071A22 + #D6F5F2）
- **测试**: Vitest + @testing-library/react

## 目录结构

```
├── scripts/            # 构建与启动脚本
│   ├── build.sh        # 构建脚本（Vite build）
│   ├── dev.sh          # 开发环境启动脚本
│   ├── start.sh        # 生产环境启动脚本（tsx server）
│   └── validate-data.ts # 练习数据校验脚本
├── server/             # 服务端逻辑
│   ├── routes/         # API 路由
│   ├── server.ts       # Express 服务入口
│   └── vite.ts         # Vite 中间件集成
├── src/                # 前端源码 (React)
│   ├── App.tsx         # 主组件（练习界面 + 完成界面）
│   ├── App.test.tsx    # UI 测试
│   ├── main.tsx        # React 入口
│   ├── exercises.ts    # 195 道练习题数据
│   ├── styles.css      # 全局样式（两色方案）
│   └── vite-env.d.ts   # Vite 类型声明
├── index.html          # 入口 HTML
├── package.json        # 项目依赖管理
├── tsconfig.json       # TypeScript 配置（composite）
├── tsconfig.app.json   # 前端 TS 配置
├── tsconfig.node.json  # Node 端 TS 配置
├── vite.config.ts      # Vite 配置
└── vitest.config.ts    # Vitest 配置
```

## 包管理规范

**仅允许使用 pnpm** 作为包管理器，**严禁使用 npm 或 yarn**。

## 开发规范

- React 组件使用函数式组件 + Hooks
- 组件文件使用 `.tsx` 扩展名
- 纯 CSS 样式，不使用 Tailwind
- 两色方案：#071A22（ink）和 #D6F5F2（ice）

### 编码规范

- 默认按 TypeScript `strict` 心智写代码
- 禁止隐式 `any` 和 `as any`
- React 17+ 不需要 `import React from 'react'`，除非代码中显式使用了 `React.xxx`

## 关键命令

- `pnpm dev` - 启动开发环境
- `pnpm build` - 构建生产版本
- `pnpm start` - 启动生产环境
- `pnpm test` - 运行 UI 测试
- `pnpm test:data` - 运行练习数据校验
- `pnpm ts-check` - TypeScript 类型检查
