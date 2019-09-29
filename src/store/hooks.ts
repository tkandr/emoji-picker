import { useContext } from 'react';
import StoreContext from './StoreContext';
import { EmojiPickerStore } from './index';

export const useStore = (): EmojiPickerStore => {
  return useContext(StoreContext);
}
