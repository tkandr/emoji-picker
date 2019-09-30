import React, { forwardRef } from 'react';
import { Emoji as EmojiType } from '../../types/emojiData';
import { CategoryWrapper } from './Styles';
import Emoji from './Emoji';

interface OriginalProps {
  name?: string;
  emojis: EmojiType[];
  onEmojiClick: Function;
}

interface Props extends OriginalProps {
  forwardedRef: React.Ref<HTMLDivElement>;
}

const Category: React.FC<Props> = (props: Props) => {
  return (
    <CategoryWrapper ref={props.forwardedRef}>
      {!!props.emojis.length && (
        <>
          <div className="category-header">{props.name}</div>
          <div className="category-emojis">
            {props.emojis.map(emoji => (
              <Emoji onClick={props.onEmojiClick} key={emoji.id} {...emoji} />
            ))}
          </div>
        </>
      )}
    </CategoryWrapper>
  );
};

// eslint-disable-next-line react/display-name
export default forwardRef((props: OriginalProps, ref: React.Ref<HTMLDivElement>) => {
  return <Category {...props} forwardedRef={ref} />;
});
