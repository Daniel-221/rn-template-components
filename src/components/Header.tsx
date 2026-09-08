import { Pressable, View } from 'react-native';

import { createThemedStyles, useThemedStyles } from '../../theme/useTheme';

import { Icon } from './Icon';
import { Text } from './Text';

const HEADER_HEIGHT = 56;

export type HeaderProps = {
  title?: string;
  onBack?: () => void;
};

const createStyles = createThemedStyles(t => ({
  root: {
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: t.spacing.md,
  },
  side: {
    width: 44,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  back: {
    width: 44,
    height: 44,
    alignItems: 'flex-start',
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

export function Header({ title, onBack }: HeaderProps) {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.root}>
      <View style={styles.side}>
        {onBack ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="back"
            hitSlop={8}
            onPress={onBack}
            style={styles.back}
          >
            <Icon icon="chevron-left" size={24} />
          </Pressable>
        ) : null}
      </View>
      <View style={styles.titleWrap}>
        {title ? (
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        ) : null}
      </View>
      <View style={styles.side} />
    </View>
  );
}
