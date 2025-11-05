import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { fetchChatRoomsStart } from '../../store/actions/chatRoomsList';
import { getChatRooms } from '../../store/selectors/chatRoomsList';

import * as styles from './ChatRoomsList.module.scss';

export default function ThemeToggle() {
  const { rooms, isFetching, errorMessage } = useSelector(getChatRooms);
  const dispatch = useDispatch();

  console.log('rooms', rooms, isFetching, errorMessage);

  useEffect(() => {
    dispatch(fetchChatRoomsStart());
  }, []);

  const fetchingTemplate = <p>Loading...</p>;
  const list = (
    <ul className={styles.chatRoomsList}>
      {rooms.map(({ id, name }) => (
        <li key={id} className={styles.list}>
          <NavLink to={`chat-room/${id}`}>{name}</NavLink>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <h1 className={styles.header}>Chat rooms list</h1>
      {isFetching ? fetchingTemplate : list}
    </>
  );
}
