import {
  LOAD_USERS_ORDERS_WS_CONNECT,
  LOAD_USERS_ORDERS_WS_CONNECTING,
  LOAD_USERS_ORDERS_WS_OPEN,
  LOAD_USERS_ORDERS_WS_CLOSE,
  LOAD_USERS_ORDERS_WS_ERROR,
  LOAD_USERS_ORDERS_WS_MESSAGE
} from '../actions/socketActions.js';
import { WebsocketStatus } from "../../utils/socketData.js";

// initialState for ordersHistoryReducer
const ordersHistoryInitialState = {
  userOrders: [],
  isOrdersHistoryLoading: false,
  isErrorWithUserOrders: false
};


// 1) Редьюсер для загрузки с сервера истории заказов текущего пользователя
export const ordersHistoryReducer = (state = ordersHistoryInitialState, action) => {
  switch (action.type) {
    case LOAD_USERS_ORDERS_WS_CONNECT: {
      return {
        ...state,
        status: WebsocketStatus.CONNECTING,
        isOrdersHistoryLoading: true
      };
    }
    case LOAD_USERS_ORDERS_WS_CONNECTING: {
      return {
        ...state,
        status: WebsocketStatus.CONNECTING,
        isOrdersHistoryLoading: true
      };
    }
    case LOAD_USERS_ORDERS_WS_OPEN: {
      return {
        ...state,
        status: WebsocketStatus.ONLINE,
        isOrdersHistoryLoading: false,
        isErrorWithUserOrders: ''
      };
    }
    case LOAD_USERS_ORDERS_WS_CLOSE: {
      return {
        ...state,
        status: WebsocketStatus.OFFLINE,
        isOrdersHistoryLoading: false,
        isErrorWithUserOrders: false
      };
    }
    case LOAD_USERS_ORDERS_WS_ERROR: {
      return {
        ...ordersHistoryInitialState,
        isErrorWithUserOrders: action.payload,
        isOrdersHistoryLoading: false
      };
    }
    case LOAD_USERS_ORDERS_WS_MESSAGE: {
      return {
        ...state,
        userOrders: action.payload.orders,
        isOrdersHistoryLoading: false
      };
    }
    default: {
      return state;
    }
  }
};