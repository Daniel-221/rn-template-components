import { ActivityIndicator, type StyleProp, type ViewStyle } from 'react-native';

import { useThemeTokens } from '../../theme/useTheme';

export type LoadingProps = {
  size?: number;
  style?: StyleProp<ViewStyle>;
};

export function Loading({ size = 20, style }: LoadingProps) {
  const { tokens } = useThemeTokens();

  return (
    <ActivityIndicator
      color={tokens.color.brand.primary}
      style={[{ width: size, height: size }, style]}
    />
  );
}
