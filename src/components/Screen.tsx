import type { ReactNode } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { createThemedStyles, useThemedStyles } from '../../theme/useTheme';

import { Header } from './Header';

export type ScreenProps = {
  title?: string;
  header?: ReactNode | false;
  onBack?: () => void;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

const createStyles = createThemedStyles(t => ({
  root: {
    flex: 1,
    backgroundColor: t.color.bg.page,
  },
  body: {
    flex: 1,
  },
}));

export function Screen({ title, header, onBack, children, style }: ScreenProps) {
  const insets = useSafeAreaInsets();
  const styles = useThemedStyles(createStyles, [insets.top]);
  const resolvedHeader =
    header === undefined ? (
      <Header title={title} onBack={onBack} />
    ) : header === false ? null : (
      header
    );

  return (
    <View style={[styles.root, { paddingTop: insets.top }, style]}>
      {resolvedHeader}
      <View style={styles.body}>{children}</View>
    </View>
  );
}
