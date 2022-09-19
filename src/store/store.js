// building redux
import { compose, createStore, applyMiddleware} from 'redux';
import {logger} from "redux-logger/src";

import {rootReducer} from "./root-reducer";

const middleWares = [logger]

const composedEnhancers = compose(applyMiddleware(...middleWares))

// root reducer

export const store = createStore(rootReducer, undefined, composedEnhancers);
