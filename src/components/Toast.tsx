import { Portal } from '@gorhom/portal';
import { useMemoizedFn } from '../hooks/useMemoizedFn';
import { useEffect, useRef, useState } from 'react';
import {
  AccessibilityInfo,
  AppState,
  StyleSheet,
  View,
} from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { createThemedStyles, useThemedStyles } from '../../theme/useTheme';

import { overlayZ } from './constants/portal';
import { Text } from './Text';

const DEFAULT_DURATION = 2000;
const FADE_MS = 150;
const SCALE_HIDDEN = 0.2;
const FADE_IN = {
  duration: FADE_MS,
  easing: Easing.out(Easing.cubic),
} as const;
const FADE_OUT = {
  duration: FADE_MS,
  easing: Easing.in(Easing.cubic),
} as const;

type Host = {
  show: (message: string, duration?: number) => void;
  hide: () => void;
};

let host: Host | null = null;

export function showToast(message: string, duration = DEFAULT_DURATION) {
  host?.show(message, duration);
}

export function hideToast() {
  host?.hide();
}

const createStyles = createThemedStyles(t => ({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    maxWidth: 280,
    paddingVertical: t.spacing.s,
    paddingHorizontal: t.spacing.sm,
    borderRadius: t.radius.md,
    backgroundColor: t.color.bg.toast,
  },
  text: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    color: t.color.text.inverse,
  },
}));

function ToastCard({
  message,
  visible,
  onExited,
}: {
  message: string;
  visible: boolean;
  onExited: () => void;
}) {
  const styles = useThemedStyles(createStyles);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(SCALE_HIDDEN);

  useEffect(() => {
    if (visible) {
      opacity.value = withTiming(1, FADE_IN);
      scale.value = withTiming(1, FADE_IN);
      return;
    }
    opacity.value = withTiming(0, FADE_OUT, finished => {
      if (finished) {
        runOnJS(onExited)();
      }
    });
    scale.value = withTiming(SCALE_HIDDEN, FADE_OUT);
  }, [onExited, opacity, scale, visible]);

  const fade = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      accessible
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
      accessibilityLabel={message}
      style={[styles.card, fade]}
    >
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
}

export function ToastHost() {
  const styles = useThemedStyles(createStyles);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [message, setMessage] = useState('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mountedRef = useRef(false);
  const visibleRef = useRef(false);

  const unmount = useMemoizedFn(() => {
    if (visibleRef.current) {
      return;
    }
    mountedRef.current = false;
    visibleRef.current = false;
    setMounted(false);
  });

  const hide = useMemoizedFn(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (!mountedRef.current || !visibleRef.current) {
      return;
    }
    visibleRef.current = false;
    setVisible(false);
  });

  const show = useMemoizedFn((next: string, duration = DEFAULT_DURATION) => {
    if (!next) {
      return;
    }
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setMessage(next);
    mountedRef.current = true;
    visibleRef.current = true;
    setMounted(true);
    setVisible(true);
    AccessibilityInfo.announceForAccessibility(next);
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

  if (!mounted) {
    return null;
  }

  return (
    <Portal>
      <View
        pointerEvents="none"
        importantForAccessibility="no"
        style={[
          styles.overlay,
          { zIndex: overlayZ.toast, elevation: overlayZ.toast },
        ]}
      >
        <ToastCard
          key={message}
          message={message}
          visible={visible}
          onExited={unmount}
        />
      </View>
    </Portal>
  );
}
