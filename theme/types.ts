import type { ColorSchemeName } from 'react-native';

import type { StyleList } from './style-utils';
import type { ThemeTokens } from './tokens';

export type ThemedStylesCreator<T extends StyleList> = (
  tokens: ThemeTokens,
) => T;

export type ThemeTokensReturnType = {
  theme: ColorSchemeName;
  isDark: boolean;
  tokens: ThemeTokens;
};
