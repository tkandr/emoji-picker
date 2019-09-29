import Styled from 'styled-components';

const emojiWidth = 30;
const emojiRightMargin = 6;
const emojisInRow = 7;
const flexBasisPercent = (100 * (emojiWidth - emojiRightMargin)) / emojiWidth / emojisInRow;
const emojiContainerWidth = (emojiWidth + emojiRightMargin) * emojisInRow;

export const MainWrapper = Styled.div`
  position: absolute;
  bottom: 3.5em;
  right: 2em;
  z-index: 10;
  padding: 10px;
  border: 3px solid #ddd;
  border-radius: 8px;
  .categories-anchors {
    display: flex;
    justify-content: space-between;
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(16px);
    margin-top: 5px;
  }
`;

export const EmojiWrapper = Styled.div`
  height: 30px;
  flex-basis: ${flexBasisPercent}%;
  font-size: 21px;
  line-height: 30px;
  margin-right: ${emojiRightMargin}px;
  cursor: pointer;
`;

export const CategoryIconWrapper = Styled.div<{ isActive: boolean }>`     
  padding: 5px;
  svg {
    fill: #70737A;
  }
  ${props =>
    props.isActive &&
    `
      box-shadow: 0 -2px 0 #248BF2;
      svg {
        fill: #248BF2;
      }
    }
  `}
`;

export const CategoryListWrapper = Styled.div`
  height: 300px;
  width: ${emojiContainerWidth}px;
  overflow: scroll;
`;

export const CategoryWrapper = Styled.div`
  margin-bottom: 10px;
  
  .category-header {
    padding: 10px 0;
    text-align: left;
    font-family: SF Pro Text;
    font-size: 18px;
    line-height: 24px;    
    letter-spacing: -0.24px;
    color: #171A1F;
  }
  .category-emojis {
    display: flex;
    flex-wrap: wrap;
  }
`;
