import * as styles from './chatMessage.module.scss';

export default function ChatMessage({ userName, message }) {
  return (
    <div className={styles.messageWrapper}>
      <h2 className={styles.userName}>{userName}</h2>
      <p className={styles.message}>{message}</p>
    </div>
  );
}
