import {
  LOAD_ALL_ORDERS_CONNECTING,
  LOAD_ALL_ORDERS_OPEN,
  LOAD_ALL_ORDERS_CLOSE,
  LOAD_ALL_ORDERS_MESSAGE,
  LOAD_ALL_ORDERS_ERROR,
  WebsocketStatus
} from '../actions/socketActions.js';

const websocketInitialState = {
  status: WebsocketStatus.OFFLINE,
  orders: [],
  error: '',
  isOrdersFeedLoading: false
};


// 1) Редьюсер для загрузки заказов, сделанных всеми пользователями
export const socketReducer = (state = websocketInitialState, action) => {
  switch (action.type) {
    case LOAD_ALL_ORDERS_CONNECTING: {
      return {
        ...state,
        status: WebsocketStatus.CONNECTING,
        isOrdersFeedLoading: true
      };
    }
    case LOAD_ALL_ORDERS_OPEN: {
      return {
        ...state,
        status: WebsocketStatus.ONLINE,
        isOrdersFeedLoading: true
      };
    }
    case LOAD_ALL_ORDERS_MESSAGE: {
      return {
        ...state,
        orders: action.payload,
        isOrdersFeedLoading: false
      };
    }
    case LOAD_ALL_ORDERS_CLOSE: {
      return {
        ...state,
        status: WebsocketStatus.OFFLINE
      };
    }
    case LOAD_ALL_ORDERS_ERROR: {
      return {
        ...websocketInitialState,
        error: action.payload
      };
    }
    default: {
      return state;
    }
  }
};