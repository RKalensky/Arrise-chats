import Confetti from 'react-confetti-boom';
import emojiRegex from 'emoji-regex';
import { animated, useSpring } from '@react-spring/web';

import * as styles from './chatMessage.module.scss';
import { useEffect, useState } from 'react';

const CONFETTI_PRESENCE_INTERVAL = 5000;

export default function ChatMessage({ userName, message, isFromSocket }) {
  const withEmoji = emojiRegex().test(message);
  const [isEmojiShown, setIsEmojiShown] = useState(withEmoji);

  const springProps = useSpring({
    config: {
      duration: CONFETTI_PRESENCE_INTERVAL
    },
    from: { opacity: 1 },
    to: { opacity: 0 }
  });

  console.log('isFromSocket', isFromSocket);

  useEffect(() => {
    if (!withEmoji) {
      return;
    }

    if (!isFromSocket) {
      setIsEmojiShown(false);
    }

    setTimeout(() => {
      setIsEmojiShown(false);
    }, CONFETTI_PRESENCE_INTERVAL);
  }, []);

  console.log('isEmojiShown', isEmojiShown);

  return (
    <div className={styles.messageWrapper}>
      <h2 className={styles.userName}>{userName}</h2>
      <p className={styles.message}>{message}</p>
      {isEmojiShown && (
        <animated.div className={styles.confetti} style={springProps}>
          <div className={styles.confetti}>
            <Confetti mode="fall" particleCount={40} />
          </div>
        </animated.div>
      )}
    </div>
  );
}
