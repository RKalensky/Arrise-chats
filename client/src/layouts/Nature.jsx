import { EventType, Fit, Layout, useRive, useStateMachineInput } from '@rive-app/react-canvas';
import natureRiv from '../assets/nature.riv';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTheme } from '../store/selectors/ui';
import { setTheme } from '../store/actions/ui';

import * as styles from './nature.module.scss';
import ThemeToggle from '../components/ui/ThemeToggle/ThemeToggle';

const STATE_MACHINE_NAME = 'Start';

export default function Nature({ children }) {
  const dispatch = useDispatch();
  const theme = useSelector(getTheme);
  const { rive, RiveComponent } = useRive({
    src: natureRiv,
    stateMachines: STATE_MACHINE_NAME,
    layout: new Layout({
      fit: Fit.Fill
    }),
    autoplay: true
  });
  const riveInput = useStateMachineInput(rive, STATE_MACHINE_NAME, 'on/off');

  useEffect(() => {
    if (riveInput) {
      riveInput.value = theme === 'dark';
    }
  }, [theme]);

  useEffect(() => {
    if (!rive) return;

    const handleStateChange = () => {
      if (!riveInput) {
        return;
      }

      dispatch(setTheme(riveInput.value ? 'dark' : 'light'));
    };

    rive.on(EventType.StateChange, handleStateChange);

    return () => {
      rive.off(EventType.StateChange, handleStateChange);
    };
  }, [rive, riveInput]);

  return (
    <div className={styles.natureLayout}>
      <div className={styles.natureBackground}>
        <RiveComponent />
      </div>
      <ThemeToggle className={styles.themeToggle} />
      {children}
    </div>
  );
}
