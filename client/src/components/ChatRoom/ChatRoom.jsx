import { useDispatch, useSelector } from 'react-redux';
import { getChatRoomMessages } from '../../store/selectors/chatRoomMessages';

import ChatMessage from '../ChatMessage/ChatMessage';
import ChatPanel from '../ChatPanel/ChatPanel';
import Loader from '../ui/Loader/Loader';

import * as styles from './chatRoom.module.scss';
import { useEffect, useRef } from 'react';
import { RECONNECT } from '../../store/actions/chatRoomMessages';

export default function ChatRoom() {
  const list = useRef(null);
  const { messages, isFetching, fetchErrorMessage, isConnectionClosed } =
    useSelector(getChatRoomMessages);
  const dispatch = useDispatch();

  useEffect(() => {
    if (list.current?.lastElementChild) {
      list.current?.lastElementChild.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const reconnectHandler = () => {
    dispatch({ type: RECONNECT });
  };

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

  console.log('isConnectionClosed', isConnectionClosed);

  return (
    <div className={styles.chatRoom}>
      {isFetching ? <Loader /> : messagesTemplate}
      {isConnectionClosed && <div onClick={reconnectHandler}>RECONNECT</div>}
      <div className={styles.chatPanel}>
        <ChatPanel />
      </div>
    </div>
  );
}
