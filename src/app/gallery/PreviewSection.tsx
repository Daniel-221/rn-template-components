import type { PropsWithChildren } from 'react';
import { View } from 'react-native';

import { createThemedStyles, useThemedStyles } from '../../../theme/useTheme';

import { Text } from '../../components/Text';

const createStyles = createThemedStyles(t => ({
  section: {
    gap: t.spacing.xs,
  },
  title: {
    fontSize: 12,
    lineHeight: 20,
    fontWeight: '500',
    color: t.color.text.tertiary,
  },
}));

export function PreviewSection({
  title,
  children,
}: PropsWithChildren<{ title: string }>) {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.section}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.section}>{children}</View>
    </View>
  );
}
