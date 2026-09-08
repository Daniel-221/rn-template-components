import { useMemoizedFn } from '../../hooks/useMemoizedFn';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const SPRING = { duration: 300, dampingRatio: 1 } as const;
const DISMISS_DISTANCE = 100;
const DISMISS_VELOCITY = 800;

export function useSheetModalAnimation(visible: boolean, onClose: () => void) {
  const { height: screenHeight } = useWindowDimensions();
  const [mounted, setMounted] = useState(visible);
  const mountedRef = useRef(visible);
  const translateY = useSharedValue(screenHeight);
  const screenHeightSV = useSharedValue(screenHeight);
  const startY = useSharedValue(0);
  // UI 线程：退场后拦住已经开始的 pan。JS 的 .enabled(visible) 只拦新手势。
  const open = useSharedValue(visible ? 1 : 0);
  // JS：close() 只触发一次 onClose。
  const closingRef = useRef(false);

  useEffect(() => {
    screenHeightSV.value = screenHeight;
  }, [screenHeight, screenHeightSV]);
  const close = useMemoizedFn(() => {
    if (!visible || closingRef.current) {
      return;
    }
    closingRef.current = true;
    onClose();
  });

  const unmount = useMemoizedFn(() => {
    mountedRef.current = false;
    setMounted(false);
  });

  useEffect(() => {
    if (visible) {
      closingRef.current = false;
      open.value = 1;
      mountedRef.current = true;
      setMounted(true);
      translateY.value = screenHeightSV.value;
      translateY.value = withSpring(0, SPRING);
      return;
    }
    open.value = 0;
    if (!mountedRef.current) {
      return;
    }
    translateY.value = withSpring(screenHeightSV.value, SPRING, finished => {
      if (finished) {
        runOnJS(unmount)();
      }
    });
  }, [open, screenHeightSV, translateY, unmount, visible]);

  const pan = useMemo(
    () =>
      Gesture.Pan()
        .enabled(visible)
        .onStart(() => {
          startY.value = translateY.value;
        })
        .onUpdate(e => {
          if (open.value === 0) {
            return;
          }
          const next = startY.value + e.translationY;
          translateY.value = next < 0 ? 0 : next;
        })
        .onEnd(e => {
          if (open.value === 0) {
            return;
          }
          if (
            translateY.value > DISMISS_DISTANCE ||
            e.velocityY > DISMISS_VELOCITY
          ) {
            runOnJS(close)();
          } else {
            translateY.value = withSpring(0, SPRING);
          }
        }),
    [close, open, startY, translateY, visible],
  );

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));
  const maskStyle = useAnimatedStyle(() => ({
    opacity: 1 - translateY.value / screenHeightSV.value,
  }));

  return { close, maskStyle, mounted, pan, screenHeight, sheetStyle };
}
