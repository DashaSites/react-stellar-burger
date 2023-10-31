import { rootReducer } from '../reducers/rootReducer.js';
import { compose, legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {
  LOAD_ALL_ORDERS_WS_CONNECT,
  LOAD_ALL_ORDERS_WS_DISCONNECT,
  LOAD_ALL_ORDERS_WS_OPEN,
  LOAD_ALL_ORDERS_WS_CLOSE,
  LOAD_ALL_ORDERS_WS_ERROR,
  LOAD_ALL_ORDERS_WS_MESSAGE
} from '../actions/socketFeedActions.js';
import { socketMiddleware } from "../middleware/socket-middleware.js";


const feedWsActions = {
  wsConnect: LOAD_ALL_ORDERS_WS_CONNECT,
  wsDisconnect: LOAD_ALL_ORDERS_WS_DISCONNECT,
  onOpen: LOAD_ALL_ORDERS_WS_OPEN,
  onClose: LOAD_ALL_ORDERS_WS_CLOSE,
  onError: LOAD_ALL_ORDERS_WS_ERROR, 
  onMessage: LOAD_ALL_ORDERS_WS_MESSAGE
}

const historyWsActions = {}

const isAuthRequiredForFeed = false;


const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;


const enhancer = composeEnhancers(applyMiddleware(thunk), 
applyMiddleware(socketMiddleware('wss://norma.nomoreparties.space/orders/all', feedWsActions, isAuthRequiredForFeed)));  


export const store = createStore(rootReducer, enhancer);

export const select = (selector) => {
  const state = store.getState();
  const data = selector(state);
  return data; 
}
