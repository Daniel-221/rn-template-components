import { PortalProvider } from '@gorhom/portal';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import RootNavigator from './app/RootNavigator';
import { ErrorBoundary } from './components/ErrorBoundary';
import { NoticeBarHost } from './components/NoticeBar';
import { ToastHost } from './components/Toast';
import { useThemeTokens } from '../theme/useTheme';

export default function App() {
  const { isDark } = useThemeTokens();

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <ErrorBoundary>
          <PortalProvider>
            <View style={styles.root}>
              <StatusBar style={isDark ? 'light' : 'dark'} />
              <RootNavigator />
              <NoticeBarHost />
              <ToastHost />
            </View>
          </PortalProvider>
        </ErrorBoundary>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
