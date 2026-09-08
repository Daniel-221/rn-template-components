import { View } from 'react-native';

import { createThemedStyles, useThemedStyles } from '../../../theme/useTheme';

import { Header } from '../../components/Header';
import { PreviewSection } from './PreviewSection';

const createStyles = createThemedStyles(t => ({
  root: {
    gap: t.spacing.lg,
  },
  frame: {
    marginHorizontal: -t.spacing.md,
    backgroundColor: t.color.bg.elevated,
  },
}));

export function HeaderPreview() {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.root}>
      <PreviewSection title="默认">
        <View style={styles.frame}>
          <Header title="标题" onBack={() => undefined} />
        </View>
      </PreviewSection>
    </View>
  );
}
