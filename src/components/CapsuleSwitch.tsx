import { useMemoizedFn } from 'ahooks';
import { useEffect, useRef } from 'react';
import { Animated, Pressable } from 'react-native';

import { fixedPx } from '../../theme/style-utils';
import { createThemedStyles, useThemedStyles } from '../../theme/useTheme';

export type CapsuleSwitchProps = {
  value: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
};

const TRACK_W = 40;
const TRACK_H = 24;
const PAD = 2;

const createStyles = createThemedStyles(t => ({
  track: {
    width: fixedPx(TRACK_W),
    height: fixedPx(TRACK_H),
    justifyContent: 'center',
    borderRadius: fixedPx(TRACK_H / 2),
  },
  trackOn: {
    backgroundColor: t.color.state.primary.success,
  },
  trackOff: {
    backgroundColor: t.color.bg.subtle,
  },
  pressed: {
    opacity: 0.86,
  },
  disabled: {
    opacity: 0.4,
  },
  thumb: {
    position: 'absolute',
    left: fixedPx(PAD),
    width: fixedPx(TRACK_H - PAD * 2),
    height: fixedPx(TRACK_H - PAD * 2),
    borderRadius: fixedPx((TRACK_H - PAD * 2) / 2),
    backgroundColor: t.color.action.primary.text.inverse,
    shadowColor: t.color.shadow.default,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.14,
    shadowRadius: 4,
    elevation: 2,
  },
}));

export function CapsuleSwitch({
  value,
  onChange,
  disabled,
}: CapsuleSwitchProps) {
  const styles = useThemedStyles(createStyles);
  const travel = TRACK_W - (TRACK_H - PAD * 2) - PAD * 2;
  const animX = useRef(new Animated.Value(value ? travel : 0)).current;
  const interactive = !!onChange && !disabled;

  useEffect(() => {
    Animated.timing(animX, {
      toValue: value ? travel : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [animX, travel, value]);

  const onPress = useMemoizedFn(() => {
    onChange?.(!value);
  });

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled: !!disabled }}
      disabled={!interactive}
      onPress={onPress}
      style={({ pressed }) => [
        styles.track,
        value ? styles.trackOn : styles.trackOff,
        pressed && interactive ? styles.pressed : undefined,
        disabled ? styles.disabled : undefined,
      ]}
    >
      <Animated.View
        style={[styles.thumb, { transform: [{ translateX: animX }] }]}
      />
    </Pressable>
  );
}
