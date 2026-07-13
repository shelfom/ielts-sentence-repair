# DESIGN.md

## Design Tokens

### 色彩
- 主色（ink）：#0B1016 — 深炭色背景
- 辅色（ice）：#E8EDF2 — 冷灰白前景文字
- 仅使用以上两色，通过 opacity 和 color-mix 产生层次变化

### 字体
- 全局：系统无衬线字体栈（-apple-system, BlinkMacSystemFont, "Helvetica Neue", "Segoe UI", Arial, sans-serif）
- 不引入任何装饰性外部字体

### 动效
- 过渡：opacity 160ms ease
- 支持 prefers-reduced-motion

## 布局
- 全屏 grid 布局：topbar / practice / footer
- 练习区域：等宽双列（编辑区 + 答案区），相同字号规则
- 响应式断点：760px（切换为单列）
- 最小宽度：320px

## 设计禁忌
- 不使用任何第三种颜色
- 不使用圆角（所有元素均为直角）
- 不使用阴影、渐变背景
- 不使用图标（纯文字 + 键盘交互）
- 不引入外部字体（仅系统字体栈）
