import { DependencyList, useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { useAppStore } from '../src/store/appStore';
import { useDimensionStore } from '../src/store/dimension';

import { createTokens } from './tokens';
import { NamedStyles, scaleStyleList, StyleList } from './style-utils';
import type { ThemedStylesCreator } from './types';

export function useThemeTokens(overwriteTheme?: 'dark' | 'light') {
  const theme = useAppStore(state => state.theme);
  const systemTheme = useAppStore(state => state.systemTheme);

  const isDark = useMemo(() => {
    if (overwriteTheme !== undefined) {
      return overwriteTheme === 'dark';
    }
    if (theme === 'system') {
      return systemTheme === 'dark';
    }
    return theme === 'dark';
  }, [theme, systemTheme, overwriteTheme]);

  const tokens = useMemo(
    () => createTokens(isDark ? 'dark' : 'light'),
    [isDark],
  );

  return {
    theme,
    isDark,
    tokens,
  };
}

const EMPTY_DEPENDENCY_LIST: DependencyList = [];

export function useThemedStyles<T extends StyleList>(
  creator: ThemedStylesCreator<T>,
  deps: DependencyList = EMPTY_DEPENDENCY_LIST,
  overwriteTheme?: 'dark' | 'light',
) {
  const { tokens } = useThemeTokens(overwriteTheme);
  const layoutWidth = useDimensionStore(state => state.layout.width);
  const layoutHeight = useDimensionStore(state => state.layout.height);
  const scaleWidth =
    layoutWidth > 0 && layoutHeight > 0
      ? Math.min(layoutWidth, layoutHeight)
      : layoutWidth;

  return useMemo(
    () =>
      StyleSheet.create(
        scaleStyleList(creator(tokens), scaleWidth) as NamedStyles<T>,
      ) as T,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [creator, scaleWidth, tokens, ...deps],
  );
}

export const createThemedStyles = <T extends StyleList>(
  creator: ThemedStylesCreator<T>,
) => creator;
