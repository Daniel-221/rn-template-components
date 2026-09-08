import { Pressable, type PressableProps } from 'react-native';

import { createThemedStyles, useThemedStyles } from '../../theme/useTheme';

import { Text } from './Text';

export type ButtonProps = PressableProps;

const createStyles = createThemedStyles(t => ({
  button: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: t.spacing.md,
    paddingVertical: t.spacing.s,
    borderRadius: t.radius.md,
    backgroundColor: t.color.action.primary.bg.default,
  },
  pressed: {
    opacity: 0.86,
  },
  disabled: {
    opacity: 0.4,
  },
  label: {
    fontSize: 16,
    lineHeight: 26,
    fontWeight: '500',
    color: t.color.action.primary.text.reverse,
  },
}));

export function Button({
  style,
  disabled,
  children,
  ...rest
}: ButtonProps) {
  const styles = useThemedStyles(createStyles);

  return (
    <Pressable
      accessibilityRole="button"
      {...rest}
      disabled={disabled}
      style={state => [
        styles.button,
        state.pressed && !disabled ? styles.pressed : undefined,
        disabled ? styles.disabled : undefined,
        typeof style === 'function' ? style(state) : style,
      ]}
    >
      {typeof children === 'function'
        ? children
        : typeof children === 'string' || typeof children === 'number'
          ? <Text style={styles.label}>{children}</Text>
          : children}
    </Pressable>
  );
}
