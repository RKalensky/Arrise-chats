import * as styles from './modal.module.scss';

export default function Modal({ title, onClose, children }) {
  return (
    <div className={styles.modal}>
      <h1>{title}</h1>
      <div className={styles.close} onClick={onClose} />
      <div className={styles.modalContent}>{children}</div>
    </div>
  );
}
