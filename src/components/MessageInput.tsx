import React, { useCallback, useState, useRef, useEffect } from 'react';
import Styled from 'styled-components';
import EmojiPicker from './EmojiPicker';
import { useStore } from '../store/hooks';

const MessageInput: React.FC = () => {
  const store = useStore();
  const [inputVal, setInputVal] = useState('');

  // some mind blowing stuff
  // see https://reactjs.org/docs/hooks-faq.html#why-am-i-seeing-stale-props-or-state-inside-my-function
  const prevValRef = useRef('');
  useEffect(() => {
    prevValRef.current = inputVal;
  });

  const handleEmoji = useCallback((char: string): void => {
    console.log('handle input change');
    setInputVal(prevValRef.current + char);
  }, []);

  return (
    <Styles>
      <input
        className="msg-input"
        value={inputVal}
        placeholder="Write a message..."
        onChange={event => setInputVal(event.target.value)}
      />
      <span className="image-picker-icon" onClick={() => store.toggleOpen()}>
        &#128555;
      </span>
      <EmojiPicker onEmojiClick={handleEmoji} />
    </Styles>
  );
};

const Styles = Styled.div`
  display: flex;
  align-items: center;
  margin: auto;
  width: 100%;
  position: relative;
  .image-picker-icon {
    position: absolute;
    right: 2em;
    cursor: pointer;
  }
  .msg-input {
    padding: 0.5em 3em 0.5em 0.5em;
    margin: 0.5em;
    border: none;
    border-radius: 3px;
    width: 100%;
    padding: 10px;
    border: 1px solid black;
    border-radius: 5px;
    font-size: 1.2rem;
    font-size: 1.2rem;
  }
`;

export default MessageInput;
