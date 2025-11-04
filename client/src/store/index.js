import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

export default function initStore(initialStore = {}) {
    const store = createStore(rootReducer, initialStore, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(rootSaga);

    return store;
}

