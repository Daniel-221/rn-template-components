import { useState } from 'react';
import { View } from 'react-native';

import { createThemedStyles, useThemedStyles } from '../../../theme/useTheme';

import { CheckBox } from '../../components/CheckBox';
import { PreviewSection } from './PreviewSection';

const createStyles = createThemedStyles(t => ({
  root: {
    gap: t.spacing.lg,
  },
  col: {
    gap: t.spacing.sm,
  },
}));

export function CheckBoxPreview() {
  const styles = useThemedStyles(createStyles);
  const [plain, setPlain] = useState(false);
  const [labeled, setLabeled] = useState(true);

  return (
    <View style={styles.root}>
      <PreviewSection title="默认">
        <View style={styles.col}>
          <CheckBox checked={plain} onChange={setPlain} />
          <CheckBox checked={labeled} onChange={setLabeled}>
            已阅读并同意协议
          </CheckBox>
        </View>
      </PreviewSection>

      <PreviewSection title="禁用 / 只读">
        <View style={styles.col}>
          <CheckBox checked={false} disabled onChange={() => undefined}>
            未选中禁用
          </CheckBox>
          <CheckBox checked disabled onChange={() => undefined}>
            已选中禁用
          </CheckBox>
          <CheckBox checked>只读展示</CheckBox>
        </View>
      </PreviewSection>
    </View>
  );
}
