import { useDispatch, useSelector } from 'react-redux';

import { selectChatRoom } from '../../store/actions/chatRoomsList';
import { getChatRooms } from '../../store/selectors/chatRoomsList';

import * as styles from './chatRoomsList.module.scss';
import Loader from '../Loader/Loader';

export default function ChatRoomsList() {
  const { rooms, isFetching, errorMessage } = useSelector(getChatRooms);
  const dispatch = useDispatch();

  const selectChatRoomHandler = ({ id, name }) => {
    console.log('selectChatRoomHandler', id);
    dispatch(selectChatRoom({ id, name }));
  };

  if (errorMessage) {
    return (
      <div className={styles.chatRoomsListWrapper}>
        <h1 className={styles.header}>{errorMessage}</h1>
      </div>
    );
  }

  const listTemplate = (
    <ul>
      {rooms.map(({ id, name }) => (
        <li
          key={id}
          className={styles.roomListItem}
          onClick={() => {
            selectChatRoomHandler({ id, name });
          }}
        >
          {name}
        </li>
      ))}
    </ul>
  );

  return (
    <div className={styles.chatRoomsListWrapper}>
      <h1 className={styles.header}>Chat rooms list</h1>
      {isFetching ? <Loader /> : listTemplate}
    </div>
  );
}
