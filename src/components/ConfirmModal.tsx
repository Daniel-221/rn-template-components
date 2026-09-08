import type { ReactNode } from 'react';
import { View } from 'react-native';

import { createThemedStyles, useThemedStyles } from '../../theme/useTheme';

import { Button } from './Button';
import { SheetHeader, SheetModal } from './SheetModal';
import { Text } from './Text';

export type ConfirmModalProps = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: ReactNode;
  cancelText?: string;
  confirmText?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
};

const createStyles = createThemedStyles(t => ({
  body: {
    paddingHorizontal: t.spacing.md,
    paddingBottom: t.spacing.md,
    gap: t.spacing.lg,
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    color: t.color.text.secondary,
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    gap: t.spacing.sm,
  },
  action: {
    flex: 1,
    alignSelf: 'stretch',
  },
  cancel: {
    backgroundColor: t.color.action.secondary.default,
  },
  cancelLabel: {
    fontSize: 16,
    lineHeight: 26,
    fontWeight: '500',
    color: t.color.action.secondary.text,
  },
}));

export function ConfirmModal({
  visible,
  onClose,
  title,
  description,
  children,
  cancelText = '取消',
  confirmText = '确定',
  onCancel,
  onConfirm,
}: ConfirmModalProps) {
  const styles = useThemedStyles(createStyles);

  return (
    <SheetModal
      visible={visible}
      onClose={onClose}
      header={<SheetHeader title={title} />}
    >
      <View style={styles.body}>
        {children ??
          (description ? (
            <Text style={styles.description}>{description}</Text>
          ) : null)}
        <View style={styles.actions}>
          <Button style={[styles.action, styles.cancel]} onPress={onCancel ?? onClose}>
            <Text style={styles.cancelLabel}>{cancelText}</Text>
          </Button>
          <Button style={styles.action} onPress={onConfirm}>
            {confirmText}
          </Button>
        </View>
      </View>
    </SheetModal>
  );
}
