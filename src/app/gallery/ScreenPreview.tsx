import { View } from 'react-native';

import { createThemedStyles, useThemedStyles } from '../../../theme/useTheme';

import { Header } from '../../components/Header';
import { Screen } from '../../components/Screen';
import { Text } from '../../components/Text';
import { PreviewSection } from './PreviewSection';

const createStyles = createThemedStyles(t => ({
  root: {
    gap: t.spacing.lg,
  },
  frame: {
    height: 180,
    marginHorizontal: -t.spacing.md,
    overflow: 'hidden',
    borderRadius: t.radius.md,
  },
  body: {
    padding: t.spacing.md,
  },
  bodyText: {
    fontSize: 14,
    lineHeight: 22,
    color: t.color.text.secondary,
  },
}));

export function ScreenPreview() {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.root}>
      <PreviewSection title="默认 header">
        <View style={styles.frame}>
          <Screen title="默认标题">
            <View style={styles.body}>
              <Text style={styles.bodyText}>不传 header，用默认 Header</Text>
            </View>
          </Screen>
        </View>
      </PreviewSection>

      <PreviewSection title="自定义 header">
        <View style={styles.frame}>
          <Screen header={<Header title="自定义" onBack={() => undefined} />}>
            <View style={styles.body}>
              <Text style={styles.bodyText}>传入 header 节点</Text>
            </View>
          </Screen>
        </View>
      </PreviewSection>

      <PreviewSection title="无 header">
        <View style={styles.frame}>
          <Screen header={false}>
            <View style={styles.body}>
              <Text style={styles.bodyText}>header={'{false}'} 不渲染顶栏</Text>
            </View>
          </Screen>
        </View>
      </PreviewSection>
    </View>
  );
}
