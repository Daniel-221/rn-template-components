import { Appearance } from 'react-native';

import { createStore } from './createStore';

type Theme = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';

type AppState = {
  theme: Theme;
  systemTheme: ResolvedTheme;
  toggleTheme: () => void;
  setSystemTheme: (systemTheme: ResolvedTheme) => void;
};

const resolveScheme = (scheme: unknown): ResolvedTheme =>
  scheme === 'dark' ? 'dark' : 'light';

export const useAppStore = createStore<AppState>(set => ({
  theme: 'light',
  systemTheme: resolveScheme(Appearance.getColorScheme()),
  toggleTheme: () =>
    set(state => ({
      theme: state.theme === 'light' ? 'dark' : 'light',
    })),
  setSystemTheme: systemTheme => set({ systemTheme }),
}));

Appearance.addChangeListener(({ colorScheme }) => {
  useAppStore.getState().setSystemTheme(resolveScheme(colorScheme));
});
