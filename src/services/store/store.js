import { rootReducer } from '../reducers/rootReducer.js';
import { compose, legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {
  LOAD_ALL_ORDERS_WS_CONNECT,
  LOAD_ALL_ORDERS_WS_DISCONNECT,
  LOAD_ALL_ORDERS_WS_OPEN,
  LOAD_ALL_ORDERS_WS_CLOSE,
  LOAD_ALL_ORDERS_WS_ERROR,
  LOAD_ALL_ORDERS_WS_MESSAGE,

  LOAD_USERS_ORDERS_WS_CONNECT,
  LOAD_USERS_ORDERS_WS_DISCONNECT,
  LOAD_USERS_ORDERS_WS_OPEN,
  LOAD_USERS_ORDERS_WS_CLOSE,
  LOAD_USERS_ORDERS_WS_ERROR,
  LOAD_USERS_ORDERS_WS_MESSAGE
} from '../actions/socketActions.js';
import { socketMiddleware } from '../middleware/socket-middleware.js';



const feedWsActions = {
  wsConnect: LOAD_ALL_ORDERS_WS_CONNECT,
  wsDisconnect: LOAD_ALL_ORDERS_WS_DISCONNECT,
  onOpen: LOAD_ALL_ORDERS_WS_OPEN,
  onClose: LOAD_ALL_ORDERS_WS_CLOSE,
  onError: LOAD_ALL_ORDERS_WS_ERROR, 
  onMessage: LOAD_ALL_ORDERS_WS_MESSAGE
}

const historyWsActions = {
  wsConnect: LOAD_USERS_ORDERS_WS_CONNECT,
  wsDisconnect: LOAD_USERS_ORDERS_WS_DISCONNECT,
  onOpen: LOAD_USERS_ORDERS_WS_OPEN,
  onClose: LOAD_USERS_ORDERS_WS_CLOSE,
  onError: LOAD_USERS_ORDERS_WS_ERROR, 
  onMessage: LOAD_USERS_ORDERS_WS_MESSAGE
}


const isAuthRequiredForFeed = false;
const isAuthRequiredForHistory = true;


const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;


const feedSocketMiddleware = socketMiddleware('wss://norma.nomoreparties.space/orders/all', feedWsActions, isAuthRequiredForFeed);
const historySocketMiddleware = socketMiddleware('wss://norma.nomoreparties.space/orders', historyWsActions, isAuthRequiredForHistory);

const enhancer = composeEnhancers(applyMiddleware(thunk), 
                                  applyMiddleware(feedSocketMiddleware),
                                  applyMiddleware(historySocketMiddleware));  


export const store = createStore(rootReducer, enhancer);

export const select = (selector) => {
  const state = store.getState();
  const data = selector(state);
  return data; 
}
