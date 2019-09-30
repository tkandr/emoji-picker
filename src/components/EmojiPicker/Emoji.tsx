import React from 'react';
import { Emoji as EmojiType } from '../../types';
import { EmojiWrapper } from './Styles';

interface Props extends EmojiType {
  onClick: Function;
}

const Emoji: React.FC<Props> = ({ onClick, ...emoji }: Props) => {
  return <EmojiWrapper onClick={() => onClick(emoji)}> {emoji.char} </EmojiWrapper>;
};

export default Emoji;
