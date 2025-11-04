import { EventType, Fit, Layout, useRive, useStateMachineInput } from '@rive-app/react-canvas';
import natureRiv from '../../assets/nature.riv';
import { useEffect } from 'react';
import { appBackground } from './AppBackground.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getTheme } from '../../store/selectors/ui';
import { setTheme } from '../../store/actions/ui';

const STATE_MACHINE_NAME = 'Start';

export default function AppBackground() {
    const dispatch = useDispatch();
    const theme = useSelector(getTheme);

    const { rive, RiveComponent } = useRive({
        src: natureRiv,
        stateMachines: STATE_MACHINE_NAME,
        layout: new Layout({
            fit: Fit.Layout // TODO: check this
        }),
        autoplay: true,
        automaticallyHandleEvents: true
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
        <div className={appBackground}>
            <RiveComponent/>
        </div>
    );
}