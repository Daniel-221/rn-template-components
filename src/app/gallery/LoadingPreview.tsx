import { View } from 'react-native';

import { createThemedStyles, useThemedStyles } from '../../../theme/useTheme';

import { Loading } from '../../components/Loading';
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

export function LoadingPreview() {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.root}>
      <PreviewSection title="size">
        <View style={styles.row}>
          <Loading size={16} />
          <Loading size={20} />
          <Loading size={32} />
        </View>
      </PreviewSection>
    </View>
  );
}
