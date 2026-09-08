import { View } from 'react-native';

import { createThemedStyles, useThemedStyles } from '../../../theme/useTheme';

import { Button } from '../../components/Button';
import { hideNoticeBar, showNoticeBar } from '../../components/NoticeBar';
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
  notice: {
    gap: t.spacing.xxs,
  },
  title: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500',
  },
  desc: {
    fontSize: 13,
    lineHeight: 20,
    color: t.color.text.secondary,
  },
}));

export function NoticeBarPreview() {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.root}>
      <PreviewSection title="打开">
        <View style={styles.row}>
          <Button
            onPress={() =>
              showNoticeBar(
                <View style={styles.notice}>
                  <Text style={styles.title}>任务已完成</Text>
                  <Text style={styles.desc}>点任意按钮可再开一条，会重置计时。</Text>
                </View>,
                4000,
              )
            }
          >
            4 秒
          </Button>
          <Button
            onPress={() =>
              showNoticeBar(
                <Text style={styles.title}>不自动关闭，点「关闭」收起</Text>,
                0,
              )
            }
          >
            不自动关
          </Button>
          <Button onPress={() => hideNoticeBar()}>关闭</Button>
        </View>
      </PreviewSection>
    </View>
  );
}
