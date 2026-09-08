import { useState } from 'react';
import { View } from 'react-native';

import { createThemedStyles, useThemedStyles } from '../../../theme/useTheme';

import { Button } from '../../components/Button';
import { ConfirmModal } from '../../components/ConfirmModal';
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
  custom: {
    fontSize: 15,
    lineHeight: 24,
    color: t.color.text.secondary,
    textAlign: 'center',
  },
}));

export function ConfirmModalPreview() {
  const styles = useThemedStyles(createStyles);
  const [open, setOpen] = useState<'default' | 'custom' | null>(null);

  return (
    <View style={styles.root}>
      <PreviewSection title="打开">
        <View style={styles.row}>
          <Button onPress={() => setOpen('default')}>默认</Button>
          <Button onPress={() => setOpen('custom')}>自定义内容</Button>
        </View>
      </PreviewSection>

      <ConfirmModal
        visible={open === 'default'}
        title="确认删除"
        description="删除后不可恢复，确定继续？"
        onClose={() => setOpen(null)}
        onConfirm={() => setOpen(null)}
      />

      <ConfirmModal
        visible={open === 'custom'}
        title="自定义内容"
        confirmText="知道了"
        onClose={() => setOpen(null)}
        onConfirm={() => setOpen(null)}
      >
        <Text style={styles.custom}>传入 children 时不再渲染 description</Text>
      </ConfirmModal>
    </View>
  );
}
