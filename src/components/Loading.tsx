import LottieView from 'lottie-react-native';
import type { StyleProp, ViewStyle } from 'react-native';

import { useThemeTokens } from '../../theme/useTheme';
import DARK from './lottie/loading2_dark';
import LIGHT from './lottie/loading2_light';

export type LoadingProps = {
  size?: number;
  style?: StyleProp<ViewStyle>;
};

export function Loading({ size = 20, style }: LoadingProps) {
  const { isDark } = useThemeTokens();

  return (
    <LottieView
      autoPlay
      loop
      source={isDark ? DARK : LIGHT}
      style={[{ width: size, height: size }, style]}
    />
  );
}
