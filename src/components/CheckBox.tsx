import type { ReactNode } from 'react';
import { Pressable, View } from 'react-native';

import {
  createThemedStyles,
  useThemeTokens,
  useThemedStyles,
} from '../../theme/useTheme';

import { Icon } from './Icon';
import { Text } from './Text';

export type CheckBoxProps = {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  children?: ReactNode;
  accessibilityLabel?: string;
  testID?: string;
};

const BOX = 20;

const createStyles = createThemedStyles(t => ({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: t.spacing.xs,
  },
  pressed: {
    opacity: 0.86,
  },
  disabled: {
    opacity: 0.4,
  },
  box: {
    width: BOX,
    height: BOX,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: t.radius.pill,
    borderWidth: 1,
    borderColor: t.color.border.strong,
  },
  boxChecked: {
    borderColor: t.color.action.primary.bg.default,
    backgroundColor: t.color.action.primary.bg.default,
  },
  label: {
    flexShrink: 1,
    fontSize: 15,
    lineHeight: 22,
  },
}));

export function CheckBox({
  checked,
  onChange,
  disabled,
  children,
  accessibilityLabel,
  testID,
}: CheckBoxProps) {
  const styles = useThemedStyles(createStyles);
  const { tokens } = useThemeTokens();
  const interactive = !!onChange && !disabled;

  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ checked, disabled: !interactive }}
      testID={testID}
      disabled={!interactive}
      hitSlop={8}
      onPress={() => onChange?.(!checked)}
      style={({ pressed }) => [
        styles.root,
        pressed && interactive ? styles.pressed : undefined,
        disabled ? styles.disabled : undefined,
      ]}
    >
      <View style={[styles.box, checked ? styles.boxChecked : undefined]}>
        {checked ? (
          <Icon
            icon="checkmark"
            size={14}
            color={tokens.color.action.primary.text.reverse}
          />
        ) : null}
      </View>
      {children == null
        ? null
        : typeof children === 'string' || typeof children === 'number'
          ? <Text style={styles.label}>{children}</Text>
          : children}
    </Pressable>
  );
}
