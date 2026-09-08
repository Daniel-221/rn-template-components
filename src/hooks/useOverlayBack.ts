import { useMemoizedFn } from './useMemoizedFn';
import { useEffect } from 'react';
import { BackHandler } from 'react-native';

export function useOverlayBack(active: boolean, onClose: () => void) {
  const close = useMemoizedFn(onClose);

  useEffect(() => {
    if (!active) {
      return;
    }
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      close();
      return true;
    });
    return () => sub.remove();
  }, [active, close]);
}
