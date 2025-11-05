import Nature from './layouts/Nature';
import ChatRoomsList from './components/ChatRoomsList/ChatRoomsList';
import ChatRoom from './components/ChatRoom/ChatRoom';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedChatRoom } from './store/selectors/chatRoomsList';
import Modal from './components/Modal/Modal';
import { selectChatRoom } from './store/actions/chatRoomsList';

export default function App() {
  const selectedChatRoom = useSelector(getSelectedChatRoom);
  const dispatch = useDispatch();

  const resetRoomHandler = () => {
    dispatch(selectChatRoom(null));
  };

  return (
    <Nature>
      {!selectedChatRoom && <ChatRoomsList />}
      {selectedChatRoom && (
        <Modal title={`Chat room: ${selectedChatRoom.name}`} onClose={resetRoomHandler}>
          <ChatRoom />
        </Modal>
      )}
    </Nature>
  );
}
