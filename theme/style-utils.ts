import { ImageStyle, TextStyle, ViewStyle } from 'react-native';

import dp2px from './dp2px';
import { getScreenSize } from './getScreenSize';

export type StyleValue = TextStyle | ViewStyle | ImageStyle;
export type StyleList = Record<string, StyleValue>;
export type NamedStyles<T> = {
  [P in keyof T]: StyleValue;
};

export type PositionRealStyle = {
  marginTop?: number;
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  width?: number;
  height?: number;
};

export type PositionStyle = {
  marginTop?: number;
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  width?: number | ((payload: PositionStyle) => number);
  height?: number | ((payload: PositionStyle) => number);
};

// Layout-only. `fontSize` and `lineHeight` are deliberately absent and must
// stay that way together: scaling one without the other breaks vertical rhythm.
const SCALE_STYLE_KEYS = new Set([
  'width',
  'minWidth',
  'maxWidth',
  'height',
  'minHeight',
  'maxHeight',
  'margin',
  'marginTop',
  'marginBottom',
  'marginLeft',
  'marginRight',
  'marginHorizontal',
  'marginVertical',
  'padding',
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',
  'paddingHorizontal',
  'paddingVertical',
  'top',
  'right',
  'bottom',
  'left',
  'gap',
  'rowGap',
  'columnGap',
  'borderRadius',
  'borderTopLeftRadius',
  'borderTopRightRadius',
  'borderBottomLeftRadius',
  'borderBottomRightRadius',
  'borderTopStartRadius',
  'borderTopEndRadius',
  'borderBottomStartRadius',
  'borderBottomEndRadius',
]);

class FixedPxNumber extends Number {
  public readonly __fixedPx__ = true;
  private readonly __value__: number;

  constructor(value: number) {
    super(value);
    this.__value__ = value;
  }

  override valueOf(): number {
    return this.__value__;
  }

  override toString(): string {
    return String(this.__value__);
  }

  toJSON(): number {
    return this.__value__;
  }
}

export const fixedPx = (value: number): number => {
  return new FixedPxNumber(value) as unknown as number;
};

export const isFixedPx = (value: unknown): boolean => {
  return (
    value instanceof FixedPxNumber ||
    (typeof value === 'object' &&
      value !== null &&
      '__fixedPx__' in value &&
      (value as { __fixedPx__: boolean }).__fixedPx__)
  );
};

const transformValue = (
  key: string,
  value: unknown,
  screenWidth: number
): unknown => {
  if (isFixedPx(value)) {
    return Number(value);
  }

  if (SCALE_STYLE_KEYS.has(key) && typeof value === 'number') {
    return dp2px(value, screenWidth);
  }

  return value;
};

export const scaleStyleList = <T>(
  style: T,
  screenWidth: number = getScreenSize('width')
): T => {
  const styleRecord = style as Record<string, StyleValue>;
  const nextStyle: Record<string, StyleValue> = {};

  Object.entries(styleRecord).forEach(([outerKey, styleItem]) => {
    const nextStyleItem: TextStyle | ViewStyle | ImageStyle = {};

    Object.entries(styleItem).forEach(([innerKey, value]) => {
      nextStyleItem[innerKey as keyof typeof nextStyleItem] = transformValue(
        innerKey,
        value,
        screenWidth
      ) as never;
    });

    nextStyle[outerKey] = nextStyleItem;
  });

  return nextStyle as T;
};

