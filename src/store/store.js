// building redux
import { compose, createStore, applyMiddleware} from 'redux';
import {logger} from "redux-logger/src";

import {rootReducer} from "./root-reducer";

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

const middleWares = [logger]

const composedEnhancers = compose(applyMiddleware(...middleWares))

// root reducer

export const store = createStore(rootReducer, undefined, composedEnhancers);
