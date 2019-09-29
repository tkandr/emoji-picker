import React, { forwardRef } from 'react';
import { Category as CategoryType } from '../../types/emojiData';
import { useStore } from '../../store/hooks';
import { CategoryWrapper } from './Styles';
import Emoji from './Emoji';

interface OriginalProps extends CategoryType {
  index: number;
}

interface Props extends OriginalProps {
  forwardedRef: React.Ref<HTMLDivElement>;
}

const Category: React.FC<Props> = (props: Props) => {
  const { categoriesEmojis } = useStore();

  return (
    <CategoryWrapper ref={props.forwardedRef}>
      <div className="category-header">{props.name}</div>
      <div className="category-emojis">
        {categoriesEmojis(props.index).map(emoji => (
          <Emoji key={emoji.char} {...emoji} />
        ))}
      </div>
    </CategoryWrapper>
  );
};

// eslint-disable-next-line react/display-name
export default forwardRef((props: OriginalProps, ref: React.Ref<HTMLDivElement>) => {
  return <Category {...props} forwardedRef={ref} />;
});
