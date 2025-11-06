import { useSelector } from 'react-redux';
import { getChatRoomMessages } from '../../store/selectors/chatRoomMessages';

import ChatMessage from '../ChatMessage/ChatMessage';
import ChatPanel from '../ChatPanel/ChatPanel';
import Loader from '../Loader/Loader';

import * as styles from './chatRoom.module.scss';
import { useEffect, useRef } from 'react';

export default function ChatRoom() {
  const list = useRef(null);
  const { messages, isFetching, fetchErrorMessage } = useSelector(getChatRoomMessages);

  useEffect(() => {
    if (list.current?.lastElementChild) {
      list.current?.lastElementChild.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  if (fetchErrorMessage) {
    return <div>{fetchErrorMessage}</div>;
  }

  const messagesTemplate = !messages.length ? (
    <p className={styles.noMessages}>No messages yet</p>
  ) : (
    <ul className={styles.messages} ref={list}>
      {messages.map(({ userName, message, isFromSocket }, index) => {
        return (
          <li key={index} className={styles.message}>
            <ChatMessage
              message={message}
              userName={userName}
              isFromSocket={isFromSocket}
            ></ChatMessage>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className={styles.chatRoom}>
      {isFetching ? <Loader /> : messagesTemplate}
      <div className={styles.chatPanel}>
        <ChatPanel />
      </div>
    </div>
  );
}
