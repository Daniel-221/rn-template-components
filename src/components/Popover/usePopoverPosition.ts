import { useMemoizedFn } from '../../hooks/useMemoizedFn';
import { useEffect, useRef, useState, type RefObject } from 'react';
import { useWindowDimensions, type View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type PopoverPlacement = 'auto' | 'top' | 'bottom';
export type PopoverPoint = { x: number; y: number };

export type AnchorRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type ContentSize = {
  width: number;
  height: number;
};

export type PopoverPosition = {
  left: number;
  top: number;
};

const EDGE = 8;
const GAP = 8;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function sameRect(a: AnchorRect | null, b: AnchorRect) {
  return (
    !!a &&
    a.x === b.x &&
    a.y === b.y &&
    a.width === b.width &&
    a.height === b.height
  );
}

export function computePopoverPosition(
  anchor: AnchorRect,
  content: ContentSize,
  windowSize: { width: number; height: number },
  insets: { top: number; bottom: number; left: number; right: number },
  placement: PopoverPlacement,
): PopoverPosition {
  const minX = insets.left + EDGE;
  const maxX = windowSize.width - insets.right - EDGE - content.width;
  const left = clamp(
    anchor.x + anchor.width / 2 - content.width / 2,
    minX,
    Math.max(minX, maxX),
  );

  const minY = insets.top + EDGE;
  const maxY = windowSize.height - insets.bottom - EDGE - content.height;
  const above = anchor.y - content.height - GAP;
  const below = anchor.y + anchor.height + GAP;
  const fitsAbove = above >= minY;
  const fitsBelow = below + content.height <= windowSize.height - insets.bottom - EDGE;

  let top = below;
  if (placement === 'top') {
    top = fitsAbove ? above : below;
  } else if (placement === 'bottom') {
    top = fitsBelow ? below : above;
  } else if (!fitsBelow && fitsAbove) {
    top = above;
  }

  return { left, top: clamp(top, minY, Math.max(minY, maxY)) };
}

export function usePopoverPosition(
  visible: boolean,
  triggerRef: RefObject<View | null>,
  originRef: RefObject<View | null>,
  placement: PopoverPlacement,
  point: PopoverPoint | null,
) {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [anchor, setAnchor] = useState<AnchorRect | null>(null);
  const [content, setContent] = useState<ContentSize | null>(null);
  const [originY, setOriginY] = useState(0);
  const didMeasure = useRef(false);

  const measure = useMemoizedFn(() => {
    if (didMeasure.current) {
      return;
    }
    const origin = originRef.current;
    if (!origin) {
      return;
    }
    origin.measureInWindow((ox, oy) => {
      const apply = (next: AnchorRect) => {
        didMeasure.current = true;
        setOriginY(Math.round(oy));
        setAnchor(prev => (sameRect(prev, next) ? prev : next));
      };

      if (point) {
        apply({
          x: Math.round(point.x - ox),
          y: Math.round(point.y - oy),
          width: 0,
          height: 0,
        });
        return;
      }

      const trigger = triggerRef.current;
      if (!trigger) {
        return;
      }
      trigger.measureInWindow((x, y, w, h) => {
        if (w <= 0 || h <= 0) {
          return;
        }
        apply({
          x: Math.round(x - ox),
          y: Math.round(y - oy),
          width: Math.round(w),
          height: Math.round(h),
        });
      });
    });
  });

  useEffect(() => {
    if (visible) {
      return;
    }
    didMeasure.current = false;
    setAnchor(null);
    setContent(null);
    setOriginY(0);
  }, [visible]);

  const onContentLayout = useMemoizedFn((next: ContentSize) => {
    if (next.width <= 0 || next.height <= 0 ) {
      return;
    }
    const rounded = {
      width: Math.round(next.width),
      height: Math.round(next.height),
    };
    setContent(prev =>
      prev && prev.width === rounded.width && prev.height === rounded.height
        ? prev
        : rounded,
    );
  });

  const safeInsets =
    originY < 1
      ? insets
      : { top: 0, bottom: insets.bottom, left: insets.left, right: insets.right };

  const position =
    visible && anchor && content
      ? computePopoverPosition(
          anchor,
          content,
          { width, height },
          safeInsets,
          placement,
        )
      : null;

  return { measure, onContentLayout, position };
}
