import { EventType, Fit, Layout, useRive, useStateMachineInput } from '@rive-app/react-canvas';
import natureRiv from '../../assets/nature.riv';
import { useEffect } from 'react';
import { appBackground } from './AppBackground.module.scss';

const STATE_MACHINE_NAME = 'Start';

export default function AppBackground() {
    const { rive, RiveComponent } = useRive({
        src: natureRiv,
        stateMachines: STATE_MACHINE_NAME,
        layout: new Layout({
            fit: Fit.Layout // TODO: check this
        }),
        autoplay: true,
        automaticallyHandleEvents: true
    });

    // TODO: Check memo
    const riveInput = useStateMachineInput(rive, STATE_MACHINE_NAME, 'on/off');

    useEffect(() => {
        if (riveInput) {
            riveInput.value = true;
            // subscribe to store updates
        }
    }, [riveInput]);

    useEffect(() => {
        if (!rive) return;

        const handleStateChange = () => {
            if (!riveInput) {
                return;
            }
            console.log('State machine updated:', riveInput.value);
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