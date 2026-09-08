import { View } from 'react-native';

import { createThemedStyles, useThemedStyles } from '../../../theme/useTheme';

import { Icon } from '../../components/Icon';
import { PreviewSection } from './PreviewSection';

const createStyles = createThemedStyles(t => ({
  root: {
    gap: t.spacing.lg,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: t.spacing.md,
  },
}));

export function IconPreview() {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.root}>
      <PreviewSection title="icon">
        <View style={styles.row}>
          <Icon icon="close" />
          <Icon icon="check" />
          <Icon icon="checkmark" />
          <Icon icon="chevron-left" />
          <Icon icon="chevron-right" />
        </View>
      </PreviewSection>

      <PreviewSection title="size">
        <View style={styles.row}>
          <Icon icon="close" size={16} />
          <Icon icon="close" size={24} />
          <Icon icon="close" size={32} />
        </View>
      </PreviewSection>

      <PreviewSection title="color">
        <View style={styles.row}>
          <Icon icon="check" />
          <Icon icon="check" color="#0074DB" />
          <Icon icon="check" color="#FF453A" />
        </View>
      </PreviewSection>
    </View>
  );
}
