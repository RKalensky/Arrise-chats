import { common } from './button.module.scss';

export default function Button({ onClick, children }) {
  return (
    <button className={common} onClick={onClick}>
      {children}
    </button>
  );
}
