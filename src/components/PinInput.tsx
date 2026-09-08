import { useMemoizedFn } from '../hooks/useMemoizedFn';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { createThemedStyles, useThemedStyles } from '../../theme/useTheme';

import { Text } from './Text';

export type PinInputRef = {
  focus: () => void;
  blur: () => void;
};

export type PinInputProps = {
  value: string;
  onChangeText: (value: string) => void;
  length?: number;
  autoFocus?: boolean;
};

const DEFAULT_LENGTH = 4;

export const PinInput = forwardRef<PinInputRef, PinInputProps>(
  ({ value, onChangeText, length = DEFAULT_LENGTH, autoFocus }, ref) => {
    const styles = useThemedStyles(createStyles);
    const inputRef = useRef<TextInput>(null);
    const [focused, setFocused] = useState(false);
    const [cursorVisible, setCursorVisible] = useState(true);

    const focus = useMemoizedFn(() => {
      inputRef.current?.focus();
    });
    const blur = useMemoizedFn(() => {
      inputRef.current?.blur();
    });

    useImperativeHandle(ref, () => ({ focus, blur }), [blur, focus]);

    useEffect(() => {
      if (!focused) {
        setCursorVisible(true);
        return;
      }
      const id = setInterval(() => setCursorVisible(v => !v), 530);
      return () => clearInterval(id);
    }, [focused]);

    const digits = useMemo(
      () => value.split('').concat(Array(length).fill('')).slice(0, length),
      [length, value],
    );
    const activeIndex = value.length < length ? value.length : length - 1;

    const handleChangeText = useMemoizedFn((text: string) => {
      onChangeText(text.replace(/\D/g, '').slice(0, length));
    });

    return (
      <View style={styles.wrap}>
        <View pointerEvents="none" style={styles.row}>
          {digits.map((char, index) => {
            const isActive = focused && index === activeIndex;
            const display = char || (isActive && cursorVisible ? '|' : '');
            return (
              <View
                key={index}
                style={[styles.box, isActive ? styles.boxFocused : undefined]}
              >
                <Text style={styles.digit}>{display}</Text>
              </View>
            );
          })}
        </View>
        <TextInput
          ref={inputRef}
          value={value}
          onChangeText={handleChangeText}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          maxLength={length}
          keyboardType="number-pad"
          autoFocus={autoFocus}
          contextMenuHidden
          autoCorrect={false}
          allowFontScaling={false}
          caretHidden
          underlineColorAndroid="transparent"
          style={styles.input}
        />
      </View>
    );
  },
);

PinInput.displayName = 'PinInput';

const createStyles = createThemedStyles(t => ({
  wrap: {
    position: 'relative',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: t.spacing.sm,
  },
  box: {
    flex: 1,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: t.radius.xl,
    borderWidth: 1,
    borderColor: t.color.border.subtle,
    backgroundColor: t.color.bg.surface,
  },
  boxFocused: {
    borderColor: t.color.text.primary,
  },
  digit: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
  },
  input: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0,
    color: 'transparent',
  },
}));
