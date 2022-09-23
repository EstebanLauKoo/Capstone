// building redux
import { compose, createStore, applyMiddleware} from 'redux';
import {logger} from "redux-logger/src";

import {rootReducer} from "./root-reducer";

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import createSagaMiddleware from 'redux-saga'
/*import thunk from "redux-thunk";*/

import {rootSaga} from "./root-saga";

// this logger middle ware is in case you want to debug and follow the re rendering and state changes

/*const loggerMiddleware = (store) = (next) => (action) => {
    if (!action.type) {
        return next(action);
    }

    console.log('type: ', action.type);
    console.log('payload: ', action.payload);
    console.log('currentState: ', store.getState());

    next(action);

    console.log('next state: ', store.getState())
}

const middleWares = [loggerMiddleware]*/
const persistConfig = {
    key: 'root',
    // this is like saying storage: storage
    storage,
    whitelist: ['cart']
}
const sagaMiddleware = createSagaMiddleware()

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleWares = [process.env.NODE_ENV !== 'production' && logger, sagaMiddleware, /*thunk,*/].filter(Boolean)

const composeEnhancer =
    (process.env.NODE_ENV !== 'production' &&
        window &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares))

// root reducer

export const store = createStore(persistedReducer, undefined, composedEnhancers);

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)
