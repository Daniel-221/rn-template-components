import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { createThemedStyles, useThemedStyles } from '../../../theme/useTheme';
import { useThemeTokens } from '../../../theme/useTheme';

import { Screen } from '../../components/Screen';
import { Text } from '../../components/Text';
import { useAppStore } from '../../store/appStore';
import type { RootStackParamList } from '../RootNavigator';
import { galleryItems } from './registry';

type Props = NativeStackScreenProps<RootStackParamList, 'ComponentGallery'>;

const createStyles = createThemedStyles(t => ({
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: t.spacing.md,
    paddingTop: t.spacing.md,
    gap: t.spacing.sm,
  },
  themeToggle: {
    alignSelf: 'flex-start',
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
  item: {
    padding: t.spacing.md,
    borderRadius: t.radius.md,
    backgroundColor: t.color.bg.elevated,
    gap: t.spacing.xxxs,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '500',
  },
  itemChevron: {
    fontSize: 16,
    lineHeight: 26,
    color: t.color.text.tertiary,
  },
  itemDescription: {
    fontSize: 14,
    lineHeight: 22,
    color: t.color.text.secondary,
  },
}));

export default function ComponentGalleryScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const { tokens, isDark } = useThemeTokens();
  const styles = useThemedStyles(createStyles);

  return (
    <Screen title="组件">
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + tokens.spacing.lg },
        ]}
      >
        <Pressable
          onPress={() => useAppStore.getState().toggleTheme()}
          style={styles.themeToggle}
        >
          <Text style={styles.themeToggleText}>
            {isDark ? '深色' : '浅色'} · 点按切换
          </Text>
        </Pressable>

        {galleryItems.map(item => (
          <Pressable
            key={item.id}
            onPress={() =>
              navigation.navigate('ComponentPreview', { id: item.id })
            }
            style={styles.item}
          >
            <View style={styles.itemHeader}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemChevron}>›</Text>
            </View>
            <Text style={styles.itemDescription}>{item.description}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </Screen>
  );
}
