import { Portal } from '@gorhom/portal';
import { useMemoizedFn } from '../hooks/useMemoizedFn';
import { useEffect, useRef, useState } from 'react';
import { AppState, StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { createThemedStyles, useThemedStyles } from '../../theme/useTheme';

import { overlayZ } from './constants/portal';
import { Text } from './Text';

const DEFAULT_DURATION = 2000;
const FADE_MS = 150;

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

function ToastCard({ message }: { message: string }) {
  const styles = useThemedStyles(createStyles);
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: FADE_MS,
      easing: Easing.out(Easing.cubic),
    });
  }, [opacity]);

  const fade = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View style={[styles.card, fade]}>
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
}

export function ToastHost() {
  const styles = useThemedStyles(createStyles);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hide = useMemoizedFn(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
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
    setVisible(true);
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

  if (!visible) {
    return null;
  }

  return (
    <Portal>
      <View
        pointerEvents="none"
        style={[
          styles.overlay,
          { zIndex: overlayZ.toast, elevation: overlayZ.toast },
        ]}
      >
        <ToastCard key={message} message={message} />
      </View>
    </Portal>
  );
}
