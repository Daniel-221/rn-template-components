import { View } from 'react-native';

import { createThemedStyles, useThemedStyles } from '../../../theme/useTheme';

import { Button } from '../../components/Button';
import { Text } from '../../components/Text';
import { PreviewSection } from './PreviewSection';

const createStyles = createThemedStyles(t => ({
  root: {
    gap: t.spacing.lg,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: t.spacing.sm,
    alignItems: 'center',
  },
  secondary: {
    backgroundColor: t.color.action.secondary.default,
  },
  secondaryLabel: {
    fontSize: 16,
    lineHeight: 26,
    fontWeight: '500',
    color: t.color.action.secondary.text,
  },
  destructive: {
    backgroundColor: t.color.action.destructive.bg.default,
  },
  destructiveLabel: {
    fontSize: 16,
    lineHeight: 26,
    fontWeight: '500',
    color: t.color.action.destructive.text.inverse,
  },
  block: {
    alignSelf: 'stretch',
  },
}));

export function ButtonPreview() {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.root}>
      <PreviewSection title="默认">
        <View style={styles.row}>
          <Button>主要按钮</Button>
          <Button disabled>禁用</Button>
        </View>
      </PreviewSection>

      <PreviewSection title="style 覆盖">
        <View style={styles.row}>
          <Button style={styles.secondary}>
            <Text style={styles.secondaryLabel}>次要</Text>
          </Button>
          <Button style={styles.destructive}>
            <Text style={styles.destructiveLabel}>危险</Text>
          </Button>
        </View>
      </PreviewSection>

      <PreviewSection title="透传">
        <Button style={styles.block} onPress={() => undefined}>
          width 拉满 + onPress
        </Button>
      </PreviewSection>
    </View>
  );
}
