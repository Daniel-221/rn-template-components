import { View } from 'react-native';

import { createThemedStyles, useThemedStyles } from '../../../theme/useTheme';

import { Text } from '../../components/Text';
import type { ThemeTokens } from '../../../theme';
import { PreviewSection } from './PreviewSection';

const COLOR_ORDER = [
  'primary',
  'secondary',
  'tertiary',
  'disable',
  'link',
  'inverse',
] as const satisfies ReadonlyArray<keyof ThemeTokens['color']['text']>;

const createStyles = createThemedStyles(t => ({
  root: {
    gap: t.spacing.lg,
  },
  size28: { fontSize: 28, lineHeight: 34 },
  size20: { fontSize: 20, lineHeight: 28 },
  size16: { fontSize: 16, lineHeight: 26 },
  size14: { fontSize: 14, lineHeight: 22 },
  size12: { fontSize: 12, lineHeight: 20 },
  weightRegular: { fontSize: 18, lineHeight: 28, fontWeight: '400' },
  weightMedium: { fontSize: 18, lineHeight: 28, fontWeight: '500' },
  textPrimary: {
    fontSize: 16,
    lineHeight: 26,
    color: t.color.text.primary,
  },
  textSecondary: {
    fontSize: 16,
    lineHeight: 26,
    color: t.color.text.secondary,
  },
  textTertiary: {
    fontSize: 16,
    lineHeight: 26,
    color: t.color.text.tertiary,
  },
  textDisable: {
    fontSize: 16,
    lineHeight: 26,
    color: t.color.text.disable,
  },
  textLink: {
    fontSize: 16,
    lineHeight: 26,
    color: t.color.text.link,
  },
  textInverse: {
    fontSize: 16,
    lineHeight: 26,
    color: t.color.text.inverse,
  },
  combo: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '500',
    color: t.color.text.secondary,
  },
  inverseWrap: {
    alignSelf: 'flex-start',
    paddingHorizontal: t.spacing.xs,
    paddingVertical: t.spacing.xxxs,
    borderRadius: t.radius.xs,
    backgroundColor: '#111',
  },
  customColor: { fontSize: 14, lineHeight: 22, color: '#E85D04' },
  letterSpacing: { fontSize: 16, lineHeight: 26, letterSpacing: 2 },
}));

const COLOR_STYLES = {
  primary: 'textPrimary',
  secondary: 'textSecondary',
  tertiary: 'textTertiary',
  disable: 'textDisable',
  link: 'textLink',
  inverse: 'textInverse',
} as const;

export function TextPreview() {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.root}>
      <PreviewSection title="style">
        <Text style={styles.size28}>28 / 34</Text>
        <Text style={styles.size20}>20 / 28</Text>
        <Text style={styles.size16}>16 / 26</Text>
        <Text style={styles.size14}>14 / 22</Text>
        <Text style={styles.size12}>12 / 20</Text>
      </PreviewSection>

      <PreviewSection title="color">
        {COLOR_ORDER.map(color => {
          const inverse = color === 'inverse';
          return (
            <View key={color} style={inverse ? styles.inverseWrap : undefined}>
              <Text style={styles[COLOR_STYLES[color]]}>
                {color} {inverse ? '深底上的反色' : '主题文本色'}
              </Text>
            </View>
          );
        })}
      </PreviewSection>

      <PreviewSection title="weight">
        <Text style={styles.weightRegular}>regular 400</Text>
        <Text style={styles.weightMedium}>medium 500</Text>
      </PreviewSection>

      <PreviewSection title="透传">
        <Text style={styles.combo}>fontSize + weight + color</Text>
        <Text style={styles.customColor}>任意色值 #E85D04</Text>
        <Text style={styles.size16} numberOfLines={1}>
          numberOfLines=1 超长文本会被截断，后面这些字不应换行显示出来
        </Text>
        <Text style={styles.textLink} onPress={() => undefined}>
          onPress 可点击（透传 RN Text）
        </Text>
        <Text style={styles.letterSpacing}>letterSpacing</Text>
      </PreviewSection>
    </View>
  );
}
