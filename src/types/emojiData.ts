export interface Category {
  id: string;
  name: string;
  emojis: string[]; // array of keys in Emoji object
}

export interface Emoji {
  id: string;
  keywords: string[];
  char: string;
  fitzpatrick_scale: boolean;
  category: string;
}

export interface EmojiData {
  categories: Category[];
  emojis: { [key: string]: Emoji };
}
