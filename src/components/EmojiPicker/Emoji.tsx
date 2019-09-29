import React from 'react';
import Styles from 'styled-components';
import { Emoji as EmojiType } from '../../types';

const Style = Styles.div`
  height: 30px;
  flex-basis: 12%;
  font-size: 21px;
  line-height: 30px;
  margin-right: 6px;
  cursor: pointer;
`;

const Emoji: React.FC<EmojiType> = emoji => {
  return <Style> {emoji.char} </Style>;
};

export default Emoji;
