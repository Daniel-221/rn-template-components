# 公共组件

少、薄、可靠。跟业务沾边的不要预装，特殊处理交给业务方改。

| 组件 | 路径                      | 说明                              |
| ---- | ------------------------- | --------------------------------- |
| Text   | `src/components/Text.tsx`   | 默认主题主色，其余透传 RN Text     |
| Button | `src/components/Button.tsx` | 默认主按钮样式，其余透传 Pressable |
| Icon   | `src/components/Icon/`      | `icon` 名来自 `assets/icons/*.png`，默认尺寸与主题色 |
| Image  | `src/components/Image.tsx`  | 透传 RN Image，远程图走系统缓存 |
| Loading | `src/components/Loading.tsx` | 主题对应的 Lottie loading |
| Header | `src/components/Header.tsx` | 左侧返回 + 标题 |
| Screen | `src/components/Screen.tsx` | 默认 Header，或传入自定义 header |
| ErrorBoundary | `src/components/ErrorBoundary.tsx` | 渲染错误兜底，默认 ErrorFallback |
| ErrorFallback | `src/components/ErrorFallback.tsx` | 异常兜底页，可重试 |
| SheetModal | `src/components/SheetModal/` | 底部弹出，默认无 handle；`handle` 才显示拖拽条 |
| SheetHeader | `src/components/SheetModal/SheetHeader.tsx` | Sheet 默认标题栏，标题 + 关闭 |
| ConfirmModal | `src/components/ConfirmModal.tsx` | 基于 SheetModal，标题 + 说明 + 取消/确定 |
| Popover | `src/components/Popover/` | 锚点浮层；默认按 trigger 盒，`anchor={{ x, y }}` 按窗口触点 |
| Toast | `src/components/Toast.tsx` | `showToast`；App 挂 `PortalProvider` 与 `ToastHost` |
| NoticeBar | `src/components/NoticeBar.tsx` | `showNoticeBar(节点, 时长)`；App 挂 `NoticeBarHost` |
| CheckBox | `src/components/CheckBox.tsx` | 勾选框；可选 children 文案。无 size / 图标 API |
| CapsuleSwitch | `src/components/CapsuleSwitch.tsx` | 胶囊开关。无宽高 / 文案 API |
| PinInput | `src/components/PinInput.tsx` | 数字格；默认 4 位。无倒计时 / 完成回调 |

