# `theme` 样式开发规范

统一的主题 token 与屏幕适配能力。所有导出都从 `@/theme` 引入。

## 核心原则

- 样式统一通过 `useThemedStyles` 创建
- 样式定义配合 `createThemedStyles` 使用，保证类型推断稳定
- `useThemedStyles` 会自动对布局类数值样式执行 `dp2px` 适配屏幕宽度
- 颜色统一从 `tokens.color` 获取，不要写死色值
- 优先使用 token：`t.spacing.*`、`t.radius.*`、`t.color.*`。视觉稿标注的
  `text/primary` 对应 `t.color.text.primary`

## 推荐写法

```ts
import { createThemedStyles, useThemedStyles } from '@/theme';

const createStyles = createThemedStyles((t) => ({
  container: {
    padding: t.spacing.md,
    borderRadius: t.radius.lg,
    backgroundColor: t.color.bg.surface,
  },
  row: {
    flexDirection: 'row',
    gap: t.spacing.sm,
  },
  card: {
    width: '48%',
    padding: t.spacing.md,
  },
}));

// 组件内
const styles = useThemedStyles(createStyles);
```

`createStyles` 必须定义在组件外。写在组件内每次渲染都是新引用，`useThemedStyles`
的缓存会完全失效。

需要依赖组件内的动态值时，通过第二个参数传入：

```ts
const styles = useThemedStyles(createStyles, [headerHeight]);
```

只需要读 token、不生成样式时用 `useThemeTokens()`，返回 `{ theme, isDark, tokens }`。

## 自动缩放范围

以宽度 390 为设计基准（见 `dp2px.ts`），按 `min(窗口宽, 窗口高)` 等比缩放，
因此分屏/横屏下不会把高度和内边距放大到超出窗口。

会自动缩放：

- `width` / `minWidth` / `maxWidth`
- `height` / `minHeight` / `maxHeight`
- `margin*`
- `padding*`
- `top` / `right` / `bottom` / `left`
- `gap` / `rowGap` / `columnGap`
- `borderRadius*`

不缩放：

- `fontSize` 与 `lineHeight` —— 二者必须同进同退，只缩放其中一个会破坏行距节奏。
  字号从 `tokens.textSizes` 取预设档位，不要靠缩放
- `borderWidth` / `opacity` / `zIndex` / `flex` / `transform`
- 字符串值，例如 `width: '48%'`、颜色

只对样式对象里的 `number` 生效。

## 何时使用 `fixedPx`

默认直接写普通数字或 token，不要预先包一层 `fixedPx(...)`。只有确认某个值
**不能**跟随自动缩放时才用：

- 1px 视觉分割线
- 不希望随屏幕宽度变化的尺寸，例如 icon 容器的 `width` / `height`
- 需要和原生能力严格对齐的定位值

```ts
import { createThemedStyles, fixedPx } from '@/theme';

const createStyles = createThemedStyles(() => ({
  divider: { height: fixedPx(1) },
  iconWrap: { width: fixedPx(24), height: fixedPx(24) },
}));
```

`fixedPx` 依赖上面这套样式缩放流程生效，只能放在 `createThemedStyles` /
`useThemedStyles` 生成的样式对象里。组件 prop、业务常量、动画/手势参数不走这条
链路，写了也没有意义：

```tsx
<Icon size={24} />
```

## 深浅色

`useThemeTokens` 从 `appStore` 读 `theme`（`'light' | 'dark' | 'system'`）。
取 `'system'` 时跟随 `appStore.systemTheme`，后者由 `appStore` 里的 `Appearance`
监听器维护，不参与持久化。

需要强制某一档时传第三个参数：`useThemedStyles(createStyles, [], 'dark')`。
