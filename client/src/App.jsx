import Nature from './layouts/Nature';
import ChatRoomsList from './components/ChatRoomsList/ChatRoomsList';
import ChatRoom from './components/ChatRoom/ChatRoom';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedChatRoom } from './store/selectors/chatRooms';
import Modal from './components/ui/Modal/Modal';
import { selectChatRoom } from './store/actions/chatRooms';
import { setChatRoomClosedStatus } from './store/actions/chatRoomMessages';

export default function App() {
  const selectedChatRoom = useSelector(getSelectedChatRoom);
  const dispatch = useDispatch();

  const resetRoomHandler = () => {
    dispatch(selectChatRoom(null));
    dispatch(setChatRoomClosedStatus(false));
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
