import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from '../reducers/reducers';
/* eslint-disable import/no-cycle */
import { propagateSocket } from '../middleware/socket-io';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(propagateSocket)),
);
/* eslint-enable */

export default store;
