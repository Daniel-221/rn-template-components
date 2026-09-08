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

  useEffect(() => {
    screenHeightSV.value = screenHeight;
  }, [screenHeight, screenHeightSV]);
  const close = useMemoizedFn(() => {
    onClose();
  });

  const unmount = useMemoizedFn(() => {
    mountedRef.current = false;
    setMounted(false);
  });

  useEffect(() => {
    if (visible) {
      mountedRef.current = true;
      setMounted(true);
      translateY.value = screenHeightSV.value;
      translateY.value = withSpring(0, SPRING);
      return;
    }
    if (!mountedRef.current) {
      return;
    }
    translateY.value = withSpring(screenHeightSV.value, SPRING, finished => {
      if (finished) {
        runOnJS(unmount)();
      }
    });
  }, [screenHeightSV, translateY, unmount, visible]);

  const pan = useMemo(
    () =>
      Gesture.Pan()
        .onUpdate(e => {
          if (e.translationY > 0) {
            translateY.value = e.translationY;
          }
        })
        .onEnd(e => {
          if (e.translationY > DISMISS_DISTANCE || e.velocityY > DISMISS_VELOCITY) {
            runOnJS(close)();
          } else {
            translateY.value = withSpring(0, SPRING);
          }
        }),
    [close, translateY],
  );

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));
  const maskStyle = useAnimatedStyle(() => ({
    opacity: 1 - translateY.value / screenHeightSV.value,
  }));

  return { close, maskStyle, mounted, pan, screenHeight, sheetStyle };
}
