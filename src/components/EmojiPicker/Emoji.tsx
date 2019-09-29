import React from 'react';
import { Emoji as EmojiType } from '../../types';
import { EmojiWrapper } from './Styles';

const Emoji: React.FC<EmojiType> = emoji => {
  return <EmojiWrapper> {emoji.char} </EmojiWrapper>;
};

export default Emoji;
