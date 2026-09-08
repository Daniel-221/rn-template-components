import { useState } from 'react';
import { View } from 'react-native';

import { createThemedStyles, useThemedStyles } from '../../../theme/useTheme';

import { CapsuleSwitch } from '../../components/CapsuleSwitch';
import { PreviewSection } from './PreviewSection';

const createStyles = createThemedStyles(t => ({
  root: {
    gap: t.spacing.lg,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: t.spacing.md,
    alignItems: 'center',
  },
}));

export function CapsuleSwitchPreview() {
  const styles = useThemedStyles(createStyles);
  const [off, setOff] = useState(false);
  const [on, setOn] = useState(true);

  return (
    <View style={styles.root}>
      <PreviewSection title="默认">
        <View style={styles.row}>
          <CapsuleSwitch value={off} onChange={setOff} />
          <CapsuleSwitch value={on} onChange={setOn} />
        </View>
      </PreviewSection>

      <PreviewSection title="禁用 / 只读">
        <View style={styles.row}>
          <CapsuleSwitch value={false} disabled onChange={() => undefined} />
          <CapsuleSwitch value disabled onChange={() => undefined} />
          <CapsuleSwitch value />
        </View>
      </PreviewSection>
    </View>
  );
}
