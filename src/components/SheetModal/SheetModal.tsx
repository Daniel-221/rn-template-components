import { Portal } from '@gorhom/portal';
import { type ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { createThemedStyles, useThemedStyles } from '../../../theme/useTheme';

import { useOverlayBack } from '../../hooks/useOverlayBack';
import { overlayZ } from '../constants/portal';
import { SheetHeader } from './SheetHeader';
import { useSheetModalAnimation } from './useSheetModalAnimation';

export type SheetModalProps = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  header?: ReactNode | false;
  handle?: boolean;
  children?: ReactNode;
};

const createStyles = createThemedStyles(t => ({
  root: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  fill: {
    ...StyleSheet.absoluteFillObject,
  },
  mask: {
    backgroundColor: t.color.mask.default,
  },
  sheet: {
    overflow: 'hidden',
    borderTopLeftRadius: t.radius.xl,
    borderTopRightRadius: t.radius.xl,
    backgroundColor: t.color.bg.elevated,
  },
  handleWrap: {
    alignItems: 'center',
    paddingTop: t.spacing.sm,
    paddingBottom: t.spacing.xs,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: t.radius.pill,
    backgroundColor: t.color.text.disable,
  },
}));

export function SheetModal({
  visible,
  onClose,
  title,
  header,
  handle = false,
  children,
}: SheetModalProps) {
  const insets = useSafeAreaInsets();
  const styles = useThemedStyles(createStyles);
  const { close, maskStyle, mounted, pan, screenHeight, sheetStyle } =
    useSheetModalAnimation(visible, onClose);

  useOverlayBack(mounted, close);

  const resolvedHeader =
    header === undefined ? (
      <SheetHeader title={title} onClose={close} />
    ) : header === false ? null : (
      header
    );

  if (!mounted) {
    return null;
  }

  return (
    <Portal>
      <View
        pointerEvents={visible ? 'auto' : 'none'}
        accessibilityViewIsModal
        style={[
          styles.root,
          { zIndex: overlayZ.sheet, elevation: overlayZ.sheet },
        ]}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="close"
          disabled={!visible}
          onPress={close}
          style={styles.fill}
        >
          <Animated.View
            pointerEvents="none"
            style={[styles.fill, styles.mask, maskStyle]}
          />
        </Pressable>
        <Animated.View
          style={[
            styles.sheet,
            { maxHeight: screenHeight * 0.9, paddingBottom: insets.bottom },
            sheetStyle,
          ]}
        >
          <GestureDetector gesture={pan}>
            <View>
              {handle ? (
                <View style={styles.handleWrap}>
                  <View style={styles.handle} />
                </View>
              ) : null}
              {resolvedHeader}
            </View>
          </GestureDetector>
          {children}
        </Animated.View>
      </View>
    </Portal>
  );
}
