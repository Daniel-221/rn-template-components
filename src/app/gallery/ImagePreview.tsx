import { View } from 'react-native';

import { createThemedStyles, useThemedStyles } from '../../../theme/useTheme';

import { Image } from '../../components/Image';
import { PreviewSection } from './PreviewSection';

const localSource = require('../../../assets/icon.png');

const createStyles = createThemedStyles(t => ({
  root: {
    gap: t.spacing.lg,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
    gap: t.spacing.md,
  },
  size48: {
    width: 48,
    height: 48,
  },
  size96: {
    width: 96,
    height: 96,
  },
  cover: {
    width: 96,
    height: 64,
    backgroundColor: t.color.bg.surface,
  },
  contain: {
    width: 96,
    height: 64,
    backgroundColor: t.color.bg.surface,
  },
}));

export function ImagePreview() {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.root}>
      <PreviewSection title="source">
        <View style={styles.row}>
          <Image source={localSource} style={styles.size48} />
          <Image source={localSource} style={styles.size96} />
        </View>
      </PreviewSection>

      <PreviewSection title="resizeMode">
        <View style={styles.row}>
          <Image source={localSource} resizeMode="cover" style={styles.cover} />
          <Image
            source={localSource}
            resizeMode="contain"
            style={styles.contain}
          />
        </View>
      </PreviewSection>
    </View>
  );
}
