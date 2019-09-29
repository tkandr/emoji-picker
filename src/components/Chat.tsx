import React from 'react';
import Styled from 'styled-components';
import MessageInput from './MessageInput';

const Styles = Styled.section`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  .messages {
    flex: 1 1 auto;
  }
`;

const Chat: React.FC = () => (
  <Styles>
    <div className="messages">Messages</div>
    <MessageInput />
  </Styles>
);

export default Chat;
