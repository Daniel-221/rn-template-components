import { useMemo, useState } from 'react';
import { Pressable, ScrollView, useWindowDimensions, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { createThemedStyles, useThemedStyles } from '../../../theme/useTheme';

import { Button } from '../../components/Button';
import { Popover, type PopoverPoint } from '../../components/Popover';
import { SheetModal } from '../../components/SheetModal';
import { Text } from '../../components/Text';
import { PreviewSection } from './PreviewSection';

const LIST = ['置顶会话', '消息免打扰', '在文件中查找', '删除聊天'];

const MESSAGES = [
  '早上那版接口文档我贴群里了，有空对一下字段。',
  '这条比较长：popover 按触点定位，不包整条消息。长按不同高度、列表上下滚动后再按，菜单都应该跟着手指，而不是锚在气泡顶底。\n\n下面再垫一段占高度，方便滚出一屏。\n\n对齐、翻转、贴边还是原来那套。',
  '收到，我这边先改锚点 API。',
  '高消息 2：如果还按 trigger 盒量，菜单会贴在这块的上沿或下沿，手指按在中间时整段可能已经出屏。长按中间、顶部、底部对比一下。\n\n占位\n占位\n占位\n占位',
  '短回复：可以。',
  '再滚一下。长按屏幕下半页的消息，看会不会被安全区裁掉。',
  '高消息 3：列表超过一页是为了确认滚动后 pageX / pageY 仍是窗口坐标，减去 Modal 原点就能对上。\n\n继续占高度。\n\n继续占高度。',
  '最后一条，滚到底再长按。',
];

const createStyles = createThemedStyles(t => ({
  root: {
    flex: 1,
    backgroundColor: t.color.bg.page,
  },
  scroll: {
    paddingHorizontal: t.spacing.md,
    paddingTop: t.spacing.md,
    gap: t.spacing.lg,
  },
  corners: {
    height: 220,
    borderRadius: t.radius.md,
    backgroundColor: t.color.bg.elevated,
    padding: t.spacing.sm,
    justifyContent: 'space-between',
  },
  cornerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menu: {
    minWidth: 148,
  },
  menuItem: {
    paddingHorizontal: t.spacing.md,
    paddingVertical: t.spacing.sm,
  },
  menuItemPressed: {
    backgroundColor: t.color.bg.subtle,
  },
  menuLabel: {
    fontSize: 15,
    lineHeight: 22,
  },
  menuDanger: {
    color: t.color.state.error,
  },
  list: {
    borderRadius: t.radius.md,
    overflow: 'hidden',
    backgroundColor: t.color.bg.elevated,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: t.spacing.md,
    paddingVertical: t.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: t.color.border.subtle,
  },
  rowTitle: {
    fontSize: 15,
    lineHeight: 22,
  },
  more: {
    paddingHorizontal: t.spacing.s,
    paddingVertical: t.spacing.xxs,
  },
  moreText: {
    fontSize: 14,
    lineHeight: 22,
    color: t.color.text.secondary,
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
  chatList: {
    paddingHorizontal: t.spacing.md,
    paddingBottom: t.spacing.md,
    gap: t.spacing.sm,
  },
  bubble: {
    borderRadius: t.radius.md,
    backgroundColor: t.color.bg.page,
    padding: t.spacing.md,
  },
  bubbleBody: {
    fontSize: 15,
    lineHeight: 24,
  },
}));

function Menu({ onClose, danger }: { onClose: () => void; danger?: boolean }) {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.menu}>
      <Pressable
        onPress={onClose}
        style={({ pressed }) => [
          styles.menuItem,
          pressed && styles.menuItemPressed,
        ]}
      >
        <Text style={styles.menuLabel}>复制</Text>
      </Pressable>
      <Pressable
        onPress={onClose}
        style={({ pressed }) => [
          styles.menuItem,
          pressed && styles.menuItemPressed,
        ]}
      >
        <Text
          style={[styles.menuLabel, danger ? styles.menuDanger : undefined]}
        >
          {danger ? '删除' : '分享'}
        </Text>
      </Pressable>
      <Pressable
        onPress={onClose}
        style={({ pressed }) => [
          styles.menuItem,
          pressed && styles.menuItemPressed,
        ]}
      >
        <Text style={styles.menuLabel}>复制</Text>
      </Pressable>
      <Pressable
        onPress={onClose}
        style={({ pressed }) => [
          styles.menuItem,
          pressed && styles.menuItemPressed,
        ]}
      >
        <Text
          style={[styles.menuLabel, danger ? styles.menuDanger : undefined]}
        >
          {danger ? '删除' : '分享'}
        </Text>
      </Pressable>
      <Pressable
        onPress={onClose}
        style={({ pressed }) => [
          styles.menuItem,
          pressed && styles.menuItemPressed,
        ]}
      >
        <Text style={styles.menuLabel}>复制</Text>
      </Pressable>
      <Pressable
        onPress={onClose}
        style={({ pressed }) => [
          styles.menuItem,
          pressed && styles.menuItemPressed,
        ]}
      >
        <Text
          style={[styles.menuLabel, danger ? styles.menuDanger : undefined]}
        >
          {danger ? '删除' : '分享'}
        </Text>
      </Pressable>
    </View>
  );
}

function LongPressBubble({
  text,
  onAnchor,
}: {
  text: string;
  onAnchor: (point: PopoverPoint) => void;
}) {
  const styles = useThemedStyles(createStyles);
  const gesture = useMemo(
    () =>
      Gesture.LongPress()
        .minDuration(400)
        .maxDistance(24)
        .onStart(e => {
          runOnJS(onAnchor)({ x: e.absoluteX, y: e.absoluteY });
        }),
    [onAnchor],
  );

  return (
    <GestureDetector gesture={gesture}>
      <View style={styles.bubble}>
        <Text style={styles.bubbleBody}>{text}</Text>
      </View>
    </GestureDetector>
  );
}

export function PopoverPreview() {
  const insets = useSafeAreaInsets();
  const { height: windowHeight } = useWindowDimensions();
  const styles = useThemedStyles(createStyles);
  const [corner, setCorner] = useState<'tl' | 'tr' | 'bl' | 'br' | null>(null);
  const [dir, setDir] = useState<'auto' | 'top' | 'bottom' | null>(null);
  const [row, setRow] = useState<number | null>(null);
  const [sheet, setSheet] = useState(false);
  const [sheetPop, setSheetPop] = useState(false);
  const [chat, setChat] = useState(false);
  const [touch, setTouch] = useState<PopoverPoint | null>(null);

  const closeChat = () => {
    setTouch(null);
    setChat(false);
  };

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={[
        styles.scroll,
        { paddingBottom: insets.bottom + 32 },
      ]}
    >
      <PreviewSection title="贴边四角（自动翻转）">
        <View style={styles.corners}>
          <View style={styles.cornerRow}>
            <Popover
              visible={corner === 'tl'}
              onClose={() => setCorner(null)}
              trigger={<Button onPress={() => setCorner('tl')}>左上</Button>}
            >
              <Menu onClose={() => setCorner(null)} />
            </Popover>
            <Popover
              visible={corner === 'tr'}
              onClose={() => setCorner(null)}
              trigger={<Button onPress={() => setCorner('tr')}>右上</Button>}
            >
              <Menu onClose={() => setCorner(null)} />
            </Popover>
          </View>
          <View style={styles.cornerRow}>
            <Popover
              visible={corner === 'bl'}
              onClose={() => setCorner(null)}
              trigger={<Button onPress={() => setCorner('bl')}>左下</Button>}
            >
              <Menu onClose={() => setCorner(null)} />
            </Popover>
            <Popover
              visible={corner === 'br'}
              onClose={() => setCorner(null)}
              trigger={<Button onPress={() => setCorner('br')}>右下</Button>}
            >
              <Menu onClose={() => setCorner(null)} />
            </Popover>
          </View>
        </View>
      </PreviewSection>

      <PreviewSection title="指定方向">
        <View style={styles.cornerRow}>
          <Popover
            visible={dir === 'auto'}
            onClose={() => setDir(null)}
            placement="auto"
            trigger={<Button onPress={() => setDir('auto')}>auto</Button>}
          >
            <Menu onClose={() => setDir(null)} />
          </Popover>
          <Popover
            visible={dir === 'top'}
            onClose={() => setDir(null)}
            placement="top"
            trigger={<Button onPress={() => setDir('top')}>top</Button>}
          >
            <Menu onClose={() => setDir(null)} />
          </Popover>
          <Popover
            visible={dir === 'bottom'}
            onClose={() => setDir(null)}
            placement="bottom"
            trigger={<Button onPress={() => setDir('bottom')}>bottom</Button>}
          >
            <Menu onClose={() => setDir(null)} />
          </Popover>
        </View>
      </PreviewSection>

      <PreviewSection title="触点锚点（消息列表）">
        <Text style={styles.hint}>
          Sheet 里滚动列表，长按任意气泡按手指位置弹出。整页只挂一层 Popover。
        </Text>
        <Button onPress={() => setChat(true)}>打开消息列表</Button>
        <SheetModal visible={chat} title="消息" onClose={closeChat}>
          <ScrollView
            style={{ maxHeight: windowHeight * 0.75 }}
            contentContainerStyle={styles.chatList}
          >
            {MESSAGES.map((text, index) => (
              <LongPressBubble key={index} text={text} onAnchor={setTouch} />
            ))}
          </ScrollView>
          <Popover
            visible={!!touch}
            onClose={() => setTouch(null)}
            anchor={touch ?? undefined}
          >
            <Menu onClose={() => setTouch(null)} />
          </Popover>
        </SheetModal>
      </PreviewSection>

      <PreviewSection title="列表里">
        <View style={styles.list}>
          {LIST.map((title, index) => (
            <View key={title} style={styles.row}>
              <Text style={styles.rowTitle}>{title}</Text>
              <Popover
                visible={row === index}
                onClose={() => setRow(null)}
                trigger={
                  <Pressable onPress={() => setRow(index)} style={styles.more}>
                    <Text style={styles.moreText}>更多</Text>
                  </Pressable>
                }
              >
                <Menu danger onClose={() => setRow(null)} />
              </Popover>
            </View>
          ))}
        </View>
      </PreviewSection>

      <PreviewSection title="Sheet 浮层里">
        <Button onPress={() => setSheet(true)}>打开 Sheet</Button>
        <SheetModal
          visible={sheet}
          title="浮层里的 Popover"
          onClose={() => {
            setSheetPop(false);
            setSheet(false);
          }}
        >
          <View style={styles.sheetBody}>
            <Text style={styles.hint}>
              Sheet 里再开一层，点遮罩先关 Popover
            </Text>
            <Popover
              visible={sheetPop}
              onClose={() => setSheetPop(false)}
              trigger={
                <Button onPress={() => setSheetPop(true)}>打开菜单</Button>
              }
            >
              <Menu onClose={() => setSheetPop(false)} />
            </Popover>
          </View>
        </SheetModal>
      </PreviewSection>
    </ScrollView>
  );
}
