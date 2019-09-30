import * as fs from 'fs';
import * as path from 'path';
import { Emoji, Category, EmojiData } from '../src/types';

/**
 * @todo
 * Eslint automatically replace tsconfig.module to 'esnext', and es6 imports doesnt work with standard node 10
 * find some solution if I'll have enough time
 */

const emojilib = require('emojilib'); // eslint-disable-line

const categories = [
  { name: 'Smileys & People', key: 'people' },
  { name: 'Animals & Nature', key: 'animals_and_nature', id: 'animals' },
  { name: 'Food & Drink', key: 'food_and_drink', id: 'food' },
  { name: 'Activities', key: 'activity' },
  { name: 'Travel & Places', key: 'travel_and_places', id: 'travel' },
  { name: 'Objects', key: 'objects' },
  { name: 'Symbols', key: 'symbols' },
  { name: 'Flags', key: 'flags' },
];

const rawEmojis = emojilib.lib;
Object.entries(rawEmojis).forEach(
  ([key, emoji]: [string, any]) => {
    emoji.id = key;
  },
);

const emojis: { [key: string]: Emoji } = rawEmojis;

const categoriesMap: { [name: string]: Category } = {};

Object.entries(emojis).forEach(([emojiKey, emoji]) => {
  const { category: categoryKey } = emoji;
  if (!categoriesMap[categoryKey]) {
    const categoryDescriptor = categories.find(({ key }) => key === categoryKey);
    if (!categoryDescriptor) {
      console.error(`There is no category descriptor for '${categoryKey}' category!`);
      return;
    }

    categoriesMap[categoryKey] = {
      id: categoryDescriptor.id || categoryKey,
      name: categoryDescriptor.name,
      emojis: [],
    };
  }

  categoriesMap[categoryKey].emojis.push(emojiKey);
});

const result: EmojiData = {
  emojis,
  categories: categories.map(({ key }) => {
    return categoriesMap[key];
  }),
};

const p = path.resolve(__dirname, '../src/emoji-data.json');
fs.writeFileSync(p, JSON.stringify(result));
console.log(`Emoji data has been successfully written to ${p}`);
