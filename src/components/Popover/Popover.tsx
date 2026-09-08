import { Portal } from '@gorhom/portal';
import { useEffect, useRef, type ReactElement, type ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { createThemedStyles, useThemedStyles } from '../../../theme/useTheme';

import { useOverlayBack } from '../../hooks/useOverlayBack';
import { overlayZ } from '../constants/portal';
import {
  usePopoverPosition,
  type PopoverPlacement,
  type PopoverPoint,
} from './usePopoverPosition';

export type PopoverProps = {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
  placement?: PopoverPlacement;
  /** 按这个节点的包围盒定位。传了 `anchor` 时不需要。 */
  trigger?: ReactElement;
  /** 窗口坐标上的点（0×0）。有则按触点，不量 trigger。 */
  anchor?: PopoverPoint;
};

const createStyles = createThemedStyles(t => ({
  trigger: {
    alignSelf: 'flex-start',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  origin: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 1,
    height: 1,
  },
  fill: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  card: {
    position: 'absolute',
    backgroundColor: t.color.bg.elevated,
    borderRadius: t.radius.lg,
    paddingVertical: t.spacing.xs,
    borderWidth: 1,
    borderColor: t.color.border.subtle,
    shadowColor: t.color.shadow.strong,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 8,
  },
  hidden: {
    left: -9999,
    top: -9999,
    opacity: 0,
    elevation: 0,
  },
}));

export function Popover({
  visible,
  onClose,
  trigger,
  children,
  placement = 'auto',
  anchor,
}: PopoverProps) {
  const styles = useThemedStyles(createStyles);
  const triggerRef = useRef<View>(null);
  const originRef = useRef<View>(null);
  const { measure, onContentLayout, position } = usePopoverPosition(
    visible,
    triggerRef,
    originRef,
    placement,
    anchor ?? null,
  );
  const ready = useSharedValue(0);
  const entered = useRef(false);

  useEffect(() => {
    if (!visible) {
      entered.current = false;
      ready.value = 0;
      return;
    }
    if (!position || entered.current) {
      return;
    }
    entered.current = true;
    ready.value = withTiming(1, {
      duration: 200,
      easing: Easing.out(Easing.cubic),
    });
  }, [position, ready, visible]);

  const cardAnim = useAnimatedStyle(() => ({
    opacity: ready.value,
  }));

  useOverlayBack(visible, onClose);

  return (
    <>
      {trigger ? (
        <View ref={triggerRef} collapsable={false} style={styles.trigger}>
          {trigger}
        </View>
      ) : null}
      {visible ? (
        <Portal>
          <View
            style={[
              styles.overlay,
              { zIndex: overlayZ.popover, elevation: overlayZ.popover },
            ]}
            onLayout={measure}
          >
            <View
              ref={originRef}
              pointerEvents="none"
              collapsable={false}
              style={styles.origin}
            />
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="close"
              onPress={onClose}
              style={styles.fill}
            />
            <Animated.View
              pointerEvents={position ? 'auto' : 'none'}
              collapsable={false}
              onLayout={e => {
                const { width, height } = e.nativeEvent.layout;
                onContentLayout({ width, height });
              }}
              style={[
                styles.card,
                position
                  ? { left: position.left, top: position.top }
                  : styles.hidden,
                cardAnim,
              ]}
            >
              {children}
            </Animated.View>
          </View>
        </Portal>
      ) : null}
    </>
  );
}
