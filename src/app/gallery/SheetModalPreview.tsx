import { useState } from 'react';
import { View } from 'react-native';

import { createThemedStyles, useThemedStyles } from '../../../theme/useTheme';

import { Button } from '../../components/Button';
import { SheetModal } from '../../components/SheetModal';
import { Text } from '../../components/Text';
import { PreviewSection } from './PreviewSection';

const createStyles = createThemedStyles(t => ({
  root: {
    gap: t.spacing.lg,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: t.spacing.sm,
  },
  body: {
    paddingHorizontal: t.spacing.md,
    paddingBottom: t.spacing.lg,
    gap: t.spacing.sm,
  },
  bodyText: {
    fontSize: 14,
    lineHeight: 22,
    color: t.color.text.secondary,
  },
  customHeader: {
    paddingHorizontal: t.spacing.md,
    paddingBottom: t.spacing.sm,
  },
  customTitle: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '600',
  },
}));

export function SheetModalPreview() {
  const styles = useThemedStyles(createStyles);
  const [open, setOpen] = useState<'default' | 'custom' | 'none' | 'handle' | null>(
    null,
  );

  return (
    <View style={styles.root}>
      <PreviewSection title="打开">
        <View style={styles.row}>
          <Button onPress={() => setOpen('default')}>默认标题</Button>
          <Button onPress={() => setOpen('custom')}>自定义 header</Button>
          <Button onPress={() => setOpen('none')}>无 header</Button>
          <Button onPress={() => setOpen('handle')}>带 handle</Button>
        </View>
      </PreviewSection>

      <SheetModal
        visible={open === 'default'}
        title="默认标题"
        onClose={() => setOpen(null)}
      >
        <View style={styles.body}>
          <Text style={styles.bodyText}>下拉标题栏或点遮罩 / 关闭可收起</Text>
        </View>
      </SheetModal>

      <SheetModal
        visible={open === 'custom'}
        header={
          <View style={styles.customHeader}>
            <Text style={styles.customTitle}>整块传入的标题</Text>
          </View>
        }
        onClose={() => setOpen(null)}
      >
        <View style={styles.body}>
          <Text style={styles.bodyText}>不走默认标题栏，header 整块替换</Text>
        </View>
      </SheetModal>

      <SheetModal
        visible={open === 'none'}
        header={false}
        onClose={() => setOpen(null)}
      >
        <View style={styles.body}>
          <Text style={styles.bodyText}>header={'{false}'}，无标题栏</Text>
        </View>
      </SheetModal>

      <SheetModal
        visible={open === 'handle'}
        title="带 handle"
        handle
        onClose={() => setOpen(null)}
      >
        <View style={styles.body}>
          <Text style={styles.bodyText}>传 handle 才显示拖拽条</Text>
        </View>
      </SheetModal>
    </View>
  );
}
