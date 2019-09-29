import React from 'react';
import Styled from 'styled-components';
import { observer } from 'mobx-react';

import { useStore } from '../../store/hooks';
import { categories } from '../../svgs';
import { Category } from '../../types';
import CategoryIcon from './CategoryIcon';
import Emoji from './Emoji';

const Styles = Styled.div`
  position: absolute;
  bottom: 3.5em;
  right: 2em;
  z-index: 10;
  padding: 10px;
  border: 3px solid #ddd;
  border-radius: 8px;
  .categories-list {
    display: flex;
    justify-content: space-between;
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(16px);
    margin-top: 5px;
  }
  .emojis-container {
    display: flex;
    flex-wrap: wrap;
    height: 300px;
    width: 270px;
    overflow: scroll;
  }
`;

interface Props {
  onIconSelect: Function;
}

// eslint-disable-next-line
const renderCategoryIcon: React.FC<Category> = ({ id }: Category) => {
  const Icon = categories[id];
  console.log(Icon, id);
  return (
    <div key={id} className="category-icon">
      <Icon />
    </div>
  );
};

const EmojiPicker: React.FC<Props> = ({ onIconSelect }: Props) => {
  const store = useStore();
  if (!store.isOpen) {
    return null;
  }

  return (
    <Styles>
      <div className="emojis-container">
        {store.emojis.map(emoji => (
          <Emoji key={emoji.char} {...emoji} />
        ))}
      </div>
      <div className="categories-list">
        {store.categories.map(category => (
          <CategoryIcon
            key={category.id}
            isActive={store.activeCategoryId === category.id}
            {...category}
          />
        ))}
      </div>
    </Styles>
  );
};

export default observer(EmojiPicker);
