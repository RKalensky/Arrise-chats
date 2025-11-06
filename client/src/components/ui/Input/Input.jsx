import * as styles from './input.module.scss';

export default function Input({
  value = '',
  placeholder = '',
  errorMessage = '',
  onChange,
  onKeyPress = () => null
}) {
  return (
    <div className={styles.inputWrapper}>
      <input
        className={styles.common}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
      <p className={styles.errorMessage}>{errorMessage}</p>
    </div>
  );
}
