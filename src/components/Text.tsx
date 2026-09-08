import { Text as RNText, type TextProps as RNTextProps } from 'react-native';

import { useThemeTokens } from '../../theme/useTheme';

export type TextProps = RNTextProps;

export function Text({
  allowFontScaling = false,
  style,
  ...rest
}: TextProps) {
  const { tokens } = useThemeTokens();

  return (
    <RNText
      allowFontScaling={allowFontScaling}
      style={[{ color: tokens.color.text.primary }, style]}
      {...rest}
    />
  );
}
