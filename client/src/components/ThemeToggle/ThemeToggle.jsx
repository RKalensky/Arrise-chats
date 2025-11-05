import Moon from '../../assets/moon';
import Sun from '../../assets/sun';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { getTheme } from '../../store/selectors/ui';
import { toggleTheme } from '../../store/actions/ui';

import * as styles from './ThemeToggle.module.scss';

export default function ThemeToggle({ className }) {
  const theme = useSelector(getTheme);
  const dispatch = useDispatch();

  const handleToggleClick = () => {
    dispatch(toggleTheme());
  };

  const toggleClasses = classNames(className, styles.toggle, {
    [styles.light]: theme === 'light',
    [styles.dark]: theme === 'dark'
  });

  const circleClasses = classNames(styles.circle, {
    [styles.circleEndPosition]: theme === 'dark'
  });

  // TODO: add spring animations

  return (
    <div className={toggleClasses} onClick={handleToggleClick}>
      {theme === 'dark' && <Moon />}
      <div className={circleClasses}></div>
      {theme === 'light' && <Sun />}
    </div>
  );
}
