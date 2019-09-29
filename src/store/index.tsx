import { observable, computed, action } from 'mobx';
import emojiData from '../emoji-data.json';
import { Category, Emoji } from '../types';
import { EmojiData } from '../types';

export class EmojiPickerStore {
  @observable isOpen = false;
  @observable filterValue = '';
  @observable activeCategoryIndex = 0;
  @observable recentlyUsed = [];

  private emojiData: EmojiData = emojiData;
  private emojiArr = Object.values(emojiData.emojis); // for filtering

  get categories(): Category[] {
    return this.emojiData.categories;
  }

  @computed get activeCategoryId(): string {
    return this.categories[this.activeCategoryIndex].id;
  }

  @computed get emojis(): Emoji[] {
    if (this.filterValue) {
      return this.filteredEmojis;
    }

    return this.emojiData.categories[this.activeCategoryIndex].emojis.map(emojiName => {
      return this.emojiData.emojis[emojiName];
    });
  }

  @computed get filteredEmojis(): Emoji[] {
    return this.emojiArr.filter(item => {
      return item.keywords.some(keyword => keyword.includes(this.filterValue));
    });
  }

  @action.bound setActiveCategory(categoryId: string): void {
    const category = this.categories.find(({ id }) => id === categoryId);
    if (!category) {
      console.error(`Given category ${categoryId} does not exist in categories list`);
      this.activeCategoryIndex = 0;
      return;
    }

    this.activeCategoryIndex = this.categories.indexOf(category);
  }

  @action.bound toggleOpen(isOpen?: boolean): void {
    if (typeof isOpen === 'boolean') {
      this.isOpen = isOpen;
    }
    this.isOpen = !this.isOpen;
  }
}

export default new EmojiPickerStore();
