import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { createThemedStyles, useThemedStyles } from '../../../theme/useTheme';
import { useThemeTokens } from '../../../theme/useTheme';

import { Screen } from '../../components/Screen';
import { Text } from '../../components/Text';
import { useAppStore } from '../../store/appStore';
import type { RootStackParamList } from '../RootNavigator';
import { getGalleryItem } from './registry';

type Props = NativeStackScreenProps<RootStackParamList, 'ComponentPreview'>;

const createStyles = createThemedStyles(t => ({
  missing: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  missingText: {
    color: t.color.text.secondary,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: t.spacing.md,
    paddingTop: t.spacing.md,
    gap: t.spacing.md,
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: t.spacing.sm,
  },
  description: {
    flex: 1,
    fontSize: 14,
    lineHeight: 22,
    color: t.color.text.secondary,
  },
  themeToggle: {
    paddingHorizontal: t.spacing.sm,
    paddingVertical: t.spacing.xxs,
    borderRadius: t.radius.pill,
    backgroundColor: t.color.bg.elevated,
  },
  themeToggleText: {
    fontSize: 14,
    lineHeight: 22,
    color: t.color.text.secondary,
  },
  fillHeader: {
    paddingTop: t.spacing.md,
    paddingHorizontal: t.spacing.md,
  },
}));

export default function ComponentPreviewScreen({ route }: Props) {
  const insets = useSafeAreaInsets();
  const { tokens, isDark } = useThemeTokens();
  const styles = useThemedStyles(createStyles);
  const item = getGalleryItem(route.params.id);
  const title = item?.title ?? route.params.id;

  const toolbar = (
    <View style={styles.toolbar}>
      <Text style={styles.description}>
        {item?.description ?? `未找到组件 ${route.params.id}`}
      </Text>
      <Pressable
        onPress={() => useAppStore.getState().toggleTheme()}
        style={styles.themeToggle}
      >
        <Text style={styles.themeToggleText}>{isDark ? '深色' : '浅色'}</Text>
      </Pressable>
    </View>
  );

  if (!item) {
    return (
      <Screen title={title}>
        <View style={styles.missing}>
          <Text style={styles.missingText}>未找到组件 {route.params.id}</Text>
        </View>
      </Screen>
    );
  }

  const Preview = item.Preview;

  if (item.layout === 'fill') {
    return (
      <Screen title={title}>
        <View style={styles.fillHeader}>{toolbar}</View>
        <Preview />
      </Screen>
    );
  }

  return (
    <Screen title={title}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + tokens.spacing.xl },
        ]}
      >
        {toolbar}
        <Preview />
      </ScrollView>
    </Screen>
  );
}
