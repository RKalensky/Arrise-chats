import * as styles from './modal.module.scss';
import { animated, useSpring } from '@react-spring/web';

export default function Modal({ title, onClose, children }) {
  const springProps = useSpring({
    from: { opacity: 0, transform: 'scale(0.8)' },
    to: { opacity: 1, transform: 'scale(1)' }
  });

  return (
    <animated.div className={styles.modal} style={springProps}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.close} onClick={onClose} />
      <div className={styles.modalContent}>{children}</div>
    </animated.div>
  );
}
