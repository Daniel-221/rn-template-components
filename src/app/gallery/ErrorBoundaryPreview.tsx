import { useState } from 'react';
import { View } from 'react-native';

import { createThemedStyles, useThemedStyles } from '../../../theme/useTheme';

import { Button } from '../../components/Button';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { ErrorFallback } from '../../components/ErrorFallback';
import { Text } from '../../components/Text';
import { PreviewSection } from './PreviewSection';

const createStyles = createThemedStyles(t => ({
  root: {
    gap: t.spacing.lg,
  },
  frame: {
    height: 240,
    marginHorizontal: -t.spacing.md,
    overflow: 'hidden',
    borderRadius: t.radius.md,
  },
  live: {
    gap: t.spacing.sm,
  },
  liveBody: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hint: {
    fontSize: 14,
    lineHeight: 22,
    color: t.color.text.secondary,
  },
}));

function Boom() {
  const [boom, setBoom] = useState(false);
  if (boom) {
    throw new Error('预览触发的渲染错误');
  }
  return <Button onPress={() => setBoom(true)}>触发错误</Button>;
}

export function ErrorBoundaryPreview() {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.root}>
      <PreviewSection title="兜底页">
        <View style={styles.frame}>
          <ErrorFallback
            error={new Error('示例错误信息')}
            onRetry={() => undefined}
          />
        </View>
      </PreviewSection>

      <PreviewSection title="捕获渲染错误">
        <View style={styles.live}>
          <Text style={styles.hint}>点按钮后由 ErrorBoundary 接住</Text>
          <View style={styles.frame}>
            <ErrorBoundary>
              <View style={styles.liveBody}>
                <Boom />
              </View>
            </ErrorBoundary>
          </View>
        </View>
      </PreviewSection>
    </View>
  );
}
