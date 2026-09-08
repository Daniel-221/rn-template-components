import { Image, type ImageProps } from 'react-native';

import { useThemeTokens } from '../../../theme/useTheme';
import type { IconName } from './icon-names.generated';
import { iconRegistry } from './iconRegistry';

export type IconProps = Omit<ImageProps, 'source'> & {
  icon: IconName | (string & {});
  size?: number;
  color?: string;
};

export function Icon({
  icon,
  size = 24,
  color,
  style,
  resizeMode = 'contain',
  ...rest
}: IconProps) {
  const { tokens } = useThemeTokens();
  const source = iconRegistry[icon];

  if (!source) {
    throw new Error(`unknown icon "${icon}"`);
  }

  return (
    <Image
      resizeMode={resizeMode}
      {...rest}
      source={source}
      style={[
        {
          width: size,
          height: size,
          tintColor: color ?? tokens.color.text.primary,
        },
        style,
      ]}
    />
  );
}
