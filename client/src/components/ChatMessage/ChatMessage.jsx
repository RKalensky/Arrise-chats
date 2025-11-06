import Confetti from 'react-confetti-boom';
import emojiRegex from 'emoji-regex';
import { animated, useSpring } from '@react-spring/web';

import * as styles from './chatMessage.module.scss';
import { useEffect, useState } from 'react';

const CONFETTI_PRESENCE_INTERVAL = 5000;

export default function ChatMessage({ userName, message, isFromSocket }) {
  const withEmoji = emojiRegex().test(message);
  const [isEmojiShown, setIsEmojiShown] = useState(withEmoji);

  const springConfettiProps = useSpring({
    config: {
      duration: CONFETTI_PRESENCE_INTERVAL
    },
    from: { opacity: 1 },
    to: { opacity: 0 }
  });

  const springNewMessageProps = useSpring({
    from: { opacity: 0, transform: 'translateX(30px)' },
    to: { opacity: 1, transform: 'translateX(0)' }
  });

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

  return (
    <animated.div
      className={styles.messageWrapper}
      style={isFromSocket ? springNewMessageProps : {}}
    >
      <h2 className={styles.userName}>{userName}</h2>
      <p className={styles.message}>{message}</p>
      {isEmojiShown && (
        <animated.div className={styles.confetti} style={springConfettiProps}>
          <div className={styles.confetti}>
            <Confetti mode="fall" particleCount={40} />
          </div>
        </animated.div>
      )}
    </animated.div>
  );
}
