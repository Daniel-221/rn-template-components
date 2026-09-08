import { View } from 'react-native';

import { createThemedStyles, useThemedStyles } from '../../theme/useTheme';

import { Button } from './Button';
import { Screen } from './Screen';
import { Text } from './Text';

export type ErrorFallbackProps = {
  error?: Error | null;
  onRetry?: () => void;
};

const createStyles = createThemedStyles(t => ({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: t.spacing.lg,
    gap: t.spacing.sm,
  },
  title: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '600',
  },
  message: {
    fontSize: 14,
    lineHeight: 22,
    color: t.color.text.secondary,
    textAlign: 'center',
  },
}));

export function ErrorFallback({ error, onRetry }: ErrorFallbackProps) {
  const styles = useThemedStyles(createStyles);

  return (
    <Screen header={false}>
      <View style={styles.body}>
        <Text style={styles.title}>出了点问题</Text>
        <Text style={styles.message}>
          {__DEV__ && error?.message ? error.message : '页面出错了，请重试'}
        </Text>
        {onRetry ? <Button onPress={onRetry}>重试</Button> : null}
      </View>
    </Screen>
  );
}
