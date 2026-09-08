import { useDimensionStore } from '../src/store/dimension';

export const getScreenSize = (key: 'width' | 'height') =>
  useDimensionStore.getState().layout[key];
