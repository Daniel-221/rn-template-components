import { textSizes } from './text-size';
import { typography } from './typography';

import { colorTokens } from './color-tokens';

export const spacing = {
  xxxs: 4,
  xxs: 6,
  xs: 8,
  s: 10,
  sm: 12,
  md: 16,
  m: 20,
  lg: 24,
  xl: 32,
  xxl: 40,
  xxxl: 48,
} as const;

export type Spacing = keyof typeof spacing;

export const radius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  pill: 999,
} as const;

type ResolvedColorTokens = (typeof colorTokens)[keyof typeof colorTokens];

export type ThemeTokens = {
  color: ResolvedColorTokens;
  spacing: typeof spacing;
  radius: typeof radius;
  typography: typeof typography;
  textSizes: typeof textSizes;
};

export const createTokens = (mode: 'light' | 'dark'): ThemeTokens => {
  return {
    color: colorTokens[mode],
    spacing,
    radius,
    typography,
    textSizes,
  };
};
