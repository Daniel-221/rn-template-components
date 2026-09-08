import { useState } from 'react';
import { View } from 'react-native';

import { createThemedStyles, useThemedStyles } from '../../../theme/useTheme';

import { PinInput } from '../../components/PinInput';
import { Text } from '../../components/Text';
import { PreviewSection } from './PreviewSection';

const createStyles = createThemedStyles(t => ({
  root: {
    gap: t.spacing.lg,
  },
  value: {
    fontSize: 13,
    lineHeight: 20,
    color: t.color.text.secondary,
  },
}));

export function PinInputPreview() {
  const styles = useThemedStyles(createStyles);
  const [pin4, setPin4] = useState('');
  const [pin6, setPin6] = useState('');

  return (
    <View style={styles.root}>
      <PreviewSection title="4 位（默认）">
        <PinInput value={pin4} onChangeText={setPin4} autoFocus />
        <Text style={styles.value}>{pin4 || '空'}</Text>
      </PreviewSection>

      <PreviewSection title="6 位">
        <PinInput value={pin6} onChangeText={setPin6} length={6} />
        <Text style={styles.value}>{pin6 || '空'}</Text>
      </PreviewSection>
    </View>
  );
}
