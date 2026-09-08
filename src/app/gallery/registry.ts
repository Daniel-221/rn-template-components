import type { ComponentType } from 'react';

import { ButtonPreview } from './ButtonPreview';
import { IconPreview } from './IconPreview';
import { ImagePreview } from './ImagePreview';
import { ErrorBoundaryPreview } from './ErrorBoundaryPreview';
import { HeaderPreview } from './HeaderPreview';
import { LoadingPreview } from './LoadingPreview';
import { ScreenPreview } from './ScreenPreview';
import { ConfirmModalPreview } from './ConfirmModalPreview';
import { PopoverPreview } from './PopoverPreview';
import { SheetModalPreview } from './SheetModalPreview';
import { ToastPreview } from './ToastPreview';
import { NoticeBarPreview } from './NoticeBarPreview';
import { CheckBoxPreview } from './CheckBoxPreview';
import { CapsuleSwitchPreview } from './CapsuleSwitchPreview';
import { PinInputPreview } from './PinInputPreview';
import { TextPreview } from './TextPreview';

export type GalleryItem = {
  id: string;
  title: string;
  description: string;
  Preview: ComponentType;
  layout?: 'scroll' | 'fill';
};

export const galleryItems: GalleryItem[] = [
  {
    id: 'Text',
    title: 'Text',
    description: '默认主题主色，其余透传 RN Text',
    Preview: TextPreview,
  },
  {
    id: 'Button',
    title: 'Button',
    description: '默认主按钮样式，其余透传 Pressable',
    Preview: ButtonPreview,
  },
  {
    id: 'Icon',
    title: 'Icon',
    description: 'icon 名对应 assets/icons，默认尺寸与主题色',
    Preview: IconPreview,
  },
  {
    id: 'Image',
    title: 'Image',
    description: '透传 RN Image，远程图走系统缓存',
    Preview: ImagePreview,
  },
  {
    id: 'Loading',
    title: 'Loading',
    description: '主题对应的 Lottie loading',
    Preview: LoadingPreview,
  },
  {
    id: 'Header',
    title: 'Header',
    description: '左侧返回 + 标题，无 left/right/样式 API',
    Preview: HeaderPreview,
  },
  {
    id: 'Screen',
    title: 'Screen',
    description: '默认 Header，或传入自定义 header',
    Preview: ScreenPreview,
  },
  {
    id: 'ErrorBoundary',
    title: 'ErrorBoundary',
    description: '渲染错误兜底页，可重试',
    Preview: ErrorBoundaryPreview,
  },
  {
    id: 'SheetModal',
    title: 'SheetModal',
    description: '底部弹出，默认无 handle，手势关闭',
    Preview: SheetModalPreview,
  },
  {
    id: 'ConfirmModal',
    title: 'ConfirmModal',
    description: '基于 SheetModal 的确认弹层，取消 / 确定',
    Preview: ConfirmModalPreview,
  },
  {
    id: 'Popover',
    title: 'Popover',
    description: '锚点浮层，贴边翻转，可在列表和 Sheet 里用',
    Preview: PopoverPreview,
    layout: 'fill',
  },
  {
    id: 'Toast',
    title: 'Toast',
    description: 'showToast，盖在 Sheet / Popover 上',
    Preview: ToastPreview,
  },
  {
    id: 'NoticeBar',
    title: 'NoticeBar',
    description: 'showNoticeBar 传入节点和时长',
    Preview: NoticeBarPreview,
  },
  {
    id: 'CheckBox',
    title: 'CheckBox',
    description: '勾选框，可选文案，受控 checked',
    Preview: CheckBoxPreview,
  },
  {
    id: 'CapsuleSwitch',
    title: 'CapsuleSwitch',
    description: '胶囊开关，受控 value',
    Preview: CapsuleSwitchPreview,
  },
  {
    id: 'PinInput',
    title: 'PinInput',
    description: '数字密码格，系统数字键盘',
    Preview: PinInputPreview,
  },
];

export function getGalleryItem(id: string): GalleryItem | undefined {
  return galleryItems.find(item => item.id === id);
}
