import { getScreenSize } from './getScreenSize';

const UI_WIDTH_PX = 390;

export function dp2px(
  uiElementPx: number,
  screenWidth: number = getScreenSize('width')
) {
  // const scale = Math.max(screenWidth / UI_WIDTH_PX, 1);
  // return Number((uiElementPx * scale).toFixed(2));
  return Number(((uiElementPx * screenWidth) / UI_WIDTH_PX).toFixed(2));
}

export default dp2px;
