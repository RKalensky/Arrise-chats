import { useState } from 'react';
import Moon from '../../assets/moon';
import Sun from '../../assets/sun';
import * as styles from './ThemeToggle.module.scss';
import classNames from 'classnames';

export default function ThemeToggle() {
    // light or dark
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    }

    const toggleClasses = classNames(styles.toggle, {
        [styles.light]: theme === 'light',
        [styles.dark]: theme === 'dark',
    })

    const circleClasses = classNames(styles.circle, {
        [styles.circleEndPosition]: theme === 'dark',
    })

    // TODO: add spring animations

    return (
        <div className={toggleClasses} onClick={toggleTheme}>
            {theme === 'dark' && <Moon/>}
            <div className={circleClasses}></div>
            {theme === 'light' && <Sun/>}
        </div>
    )
}