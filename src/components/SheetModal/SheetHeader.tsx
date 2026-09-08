import { Pressable, View } from 'react-native';

import { createThemedStyles, useThemedStyles } from '../../../theme/useTheme';

import { Icon } from '../Icon';
import { Text } from '../Text';

export type SheetHeaderProps = {
  title?: string;
  onClose?: () => void;
};

const createStyles = createThemedStyles(t => ({
  root: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: t.spacing.md,
  },
  side: {
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  close: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '600',
  },
}));

export function SheetHeader({ title, onClose }: SheetHeaderProps) {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.root}>
      <View style={styles.side} />
      <View style={styles.titleWrap}>
        {title ? (
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        ) : null}
      </View>
      <View style={styles.side}>
        {onClose ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="close"
            hitSlop={8}
            onPress={onClose}
            style={styles.close}
          >
            <Icon icon="close" size={20} />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}
