import { Portal } from '@gorhom/portal';
import { useMemoizedFn } from 'ahooks';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { AppState, StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { createThemedStyles, useThemedStyles } from '../../theme/useTheme';

import { overlayZ } from './constants/portal';

const DEFAULT_DURATION = 4000;
const ENTER_MS = 220;
const OFFSET = 12;

type Host = {
  show: (content: ReactNode, duration?: number) => void;
  hide: () => void;
};

let host: Host | null = null;

export function showNoticeBar(content: ReactNode, duration = DEFAULT_DURATION) {
  host?.show(content, duration);
}

export function hideNoticeBar() {
  host?.hide();
}

const createStyles = createThemedStyles(t => ({
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  bar: {
    position: 'absolute',
    left: t.spacing.sm,
    right: t.spacing.sm,
    padding: t.spacing.sm,
    borderRadius: t.radius.lg,
    backgroundColor: t.color.bg.elevated,
    shadowColor: t.color.shadow.strong,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 8,
  },
}));

export function NoticeBarHost() {
  const insets = useSafeAreaInsets();
  const styles = useThemedStyles(createStyles);
  const [content, setContent] = useState<ReactNode>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const translateY = useSharedValue(-120);

  const hide = useMemoizedFn(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setContent(null);
    translateY.value = -120;
  });

  const show = useMemoizedFn((next: ReactNode, duration = DEFAULT_DURATION) => {
    if (next == null || next === false) {
      return;
    }
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setContent(next);
    translateY.value = -120;
    translateY.value = withTiming(0, {
      duration: ENTER_MS,
      easing: Easing.out(Easing.cubic),
    });
    if (duration > 0) {
      timerRef.current = setTimeout(hide, duration);
    }
  });

  useEffect(() => {
    host = { show, hide };
    return () => {
      host = null;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [hide, show]);

  useEffect(() => {
    const sub = AppState.addEventListener('change', state => {
      if (state !== 'active') {
        hide();
      }
    });
    return () => sub.remove();
  }, [hide]);

  const slide = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  if (!content) {
    return null;
  }

  return (
    <Portal>
      <View
        pointerEvents="box-none"
        style={[
          styles.overlay,
          { zIndex: overlayZ.noticeBar, elevation: overlayZ.noticeBar },
        ]}
      >
        <Animated.View
          style={[styles.bar, { top: insets.top + OFFSET }, slide]}
        >
          {content}
        </Animated.View>
      </View>
    </Portal>
  );
}
