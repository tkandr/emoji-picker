import { observable, computed, action } from 'mobx';
import emojiData from '../emoji-data.json';
import { Category, Emoji } from '../types';
import { EmojiData } from '../types';

export class EmojiPickerStore {
  @observable isOpen = true;
  @observable filterValue = '';
  @observable recentlyUsed: Category = {
    id: 'recent',
    name: 'Frequently used',
    emojis: [],
  };

  private emojiData: EmojiData = emojiData;
  private emojiArr = Object.values(emojiData.emojis); // for filtering

  get categories(): Category[] {
    return [this.recentlyUsed, ...this.emojiData.categories];
  }

  getCategoriesEmojis = (categoryIndex: number): Emoji[] => {
    return this.categories[categoryIndex].emojis.map(emojiName => {
      return this.emojiData.emojis[emojiName];
    });
  };

  @computed get filteredEmojis(): Emoji[] {
    return this.emojiArr.filter(item => {
      return item.keywords.some(keyword => keyword.includes(this.filterValue));
    });
  }

  @computed get isFilterMode(): boolean {
    return !!this.filterValue;
  }

  @action.bound addRecentlyUsed(emojiId: string): void {
    const recentlyUsedEmojis = this.recentlyUsed.emojis.filter(key => key !== emojiId);
    this.recentlyUsed.emojis = [emojiId, ...recentlyUsedEmojis];
  }

  @action.bound toggleOpen(isOpen?: boolean): void {
    if (typeof isOpen === 'boolean') {
      this.isOpen = isOpen;
    }
    this.isOpen = !this.isOpen;
  }

  @action.bound setFilterValue(val: string): void {
    this.filterValue = val;
  }
}

export default new EmojiPickerStore();
