# DESIGN.md

## Design Tokens

### 色彩
- 主色（ink）：#071A22 — 深墨色背景
- 辅色（ice）：#D6F5F2 — 冰薄荷色前景文字
- 仅使用以上两色，通过 opacity 和 color-mix 产生层次变化

### 字体
- 正文/界面：IBM Plex Mono（等宽，400/500）
- 句子展示：Bodoni Moda（衬线，500/600）
- 通过 fonts.googleapis.cn 引入（CN 域名优化）

### 动效
- 缓动曲线：cubic-bezier(.2,.8,.2,1)
- 入场动画：rise-in（上移淡入）
- 线条动画：draw-across / draw-down（scale 展开）
- 光标闪烁：blink（steps(1)）
- 支持 prefers-reduced-motion

## 布局
- 全屏 grid 布局：topbar / practice / footer
- 响应式断点：760px
- 最小宽度：320px

## 设计禁忌
- 不使用任何第三种颜色
- 不使用圆角（所有元素均为直角）
- 不使用阴影、渐变背景
- 不使用图标（纯文字 + 键盘交互）
