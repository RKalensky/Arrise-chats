import { produce } from 'immer'
import { SET_THEME, TOGGLE_THEME } from '../actions/ui';

const INITIAL_STATE = {
    theme: 'light'
};

const uiReducer = produce((draft, action) => {
    switch (action.type) {
        case TOGGLE_THEME:
            draft.theme = draft.theme === 'light' ? 'dark' : 'light';
            break;
        case SET_THEME:
            draft.theme = action.payload;
            break;
        default:
            break;
    }
}, INITIAL_STATE);

export default uiReducer;