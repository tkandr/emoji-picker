import { observable, computed, action } from 'mobx';
import emojiData from '../emoji-data.json';
import { Category, Emoji } from '../types';
import { EmojiData } from '../types';

export class EmojiPickerStore {
  @observable isOpen = true;
  @observable filterValue = '';
  @observable recentlyUsed = [];

  private emojiData: EmojiData = emojiData;
  private emojiArr = Object.values(emojiData.emojis); // for filtering

  get categories(): Category[] {
    return this.emojiData.categories;
  }

  categoriesEmojis = (categoryIndex: number): Emoji[] => {
    return this.categories[categoryIndex].emojis.map(emojiName => {
      return this.emojiData.emojis[emojiName];
    });
  };

  @computed get filteredEmojis(): Emoji[] {
    return this.emojiArr.filter(item => {
      return item.keywords.some(keyword => keyword.includes(this.filterValue));
    });
  }

  @action.bound toggleOpen(isOpen?: boolean): void {
    if (typeof isOpen === 'boolean') {
      this.isOpen = isOpen;
    }
    this.isOpen = !this.isOpen;
  }
}

export default new EmojiPickerStore();
