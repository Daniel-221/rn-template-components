import { useState } from 'react';
import { View } from 'react-native';

import { createThemedStyles, useThemedStyles } from '../../../theme/useTheme';

import { Button } from '../../components/Button';
import { SheetModal } from '../../components/SheetModal';
import { Text } from '../../components/Text';
import { showToast } from '../../components/Toast';
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
  sheetBody: {
    paddingHorizontal: t.spacing.md,
    paddingBottom: t.spacing.lg,
    gap: t.spacing.sm,
  },
  hint: {
    fontSize: 14,
    lineHeight: 22,
    color: t.color.text.secondary,
  },
}));

export function ToastPreview() {
  const styles = useThemedStyles(createStyles);
  const [sheet, setSheet] = useState(false);

  return (
    <View style={styles.root}>
      <PreviewSection title="弹出">
        <View style={styles.row}>
          <Button onPress={() => showToast('已复制')}>短文案</Button>
          <Button
            onPress={() =>
              showToast('这段比较长，用来看折行和 maxWidth，菜单应仍居中。')
            }
          >
            长文案
          </Button>
          <Button
            onPress={() => {
              showToast('第一次');
              setTimeout(() => showToast('连点会重置计时'), 400);
            }}
          >
            连点
          </Button>
        </View>
      </PreviewSection>

      <PreviewSection title="盖在 Sheet 上">
        <Button onPress={() => setSheet(true)}>打开 Sheet</Button>
        <SheetModal visible={sheet} title="Sheet 里的 Toast" onClose={() => setSheet(false)}>
          <View style={styles.sheetBody}>
            <Text style={styles.hint}>同一窗口 Portal，Toast 应盖在 Sheet 上面。</Text>
            <Button onPress={() => showToast('来自 Sheet')}>弹出 Toast</Button>
          </View>
        </SheetModal>
      </PreviewSection>
    </View>
  );
}
