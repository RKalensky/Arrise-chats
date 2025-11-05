import Input from '../controls/Input/Input';
import Button from '../controls/Button/Button';

import { chatPanel } from './chatPanel.module.scss';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { validateMessage, validateName } from '../../utils/validateInputs';
import { sendChatRoomMessage } from '../../store/actions/chatRoomMessages';
import { getSelectedChatRoom } from '../../store/selectors/chatRoomsList';

export default function ChatPanel() {
  const [nickName, setNickName] = useState('');
  const [message, setMessage] = useState('');
  const [nickNameError, setNickNameError] = useState('');
  const [messageError, setMessageError] = useState('');

  const room = useSelector(getSelectedChatRoom);
  const dispatch = useDispatch();

  const setNickNameHandler = (name) => {
    setNickName(name);
  };

  const setMessageHandler = (message) => {
    setMessage(message);
  };

  const keyPressHandler = (event) => {
    if (event.key === 'Enter') {
      sendMessageHandler();
    }
  };

  const sendMessageHandler = () => {
    const nickNameErrorValidationResult = validateName(nickName);
    const messageErrorValidationResult = validateMessage(message);

    setNickNameError(nickNameErrorValidationResult);
    setMessageError(messageErrorValidationResult);

    if (!nickNameErrorValidationResult && !messageErrorValidationResult && room) {
      dispatch(sendChatRoomMessage({ userName: nickName, message, roomId: room.id }));
      setMessage('');
    }
  };

  return (
    <div className={chatPanel}>
      <Input
        placeholder="Nickname"
        value={nickName}
        onChange={(event) => setNickNameHandler(event.target.value)}
        errorMessage={nickNameError}
      />
      <Input
        placeholder="Message"
        value={message}
        onChange={(event) => setMessageHandler(event.target.value)}
        errorMessage={messageError}
        onKeyPress={keyPressHandler}
      />
      <Button onClick={sendMessageHandler}>Send</Button>
    </div>
  );
}
