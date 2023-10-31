import {
  LOAD_ALL_ORDERS_WS_CONNECT,
  LOAD_ALL_ORDERS_WS_CONNECTING,
  LOAD_ALL_ORDERS_WS_OPEN,
  LOAD_ALL_ORDERS_WS_CLOSE,
  LOAD_ALL_ORDERS_WS_ERROR,
  LOAD_ALL_ORDERS_WS_MESSAGE
} from '../actions/socketFeedActions.js';
import { WebsocketStatus } from "../../utils/socketData.js";

const initialState = {
  status: WebsocketStatus.OFFLINE, // статус подключения к серверу
  orders: [],
  connectionError: '',
  isOrdersFeedLoading: false
};




// 1) Редьюсер для загрузки заказов, сделанных всеми пользователями
export const socketFeedReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case LOAD_ALL_ORDERS_WS_CONNECT: {
      return {
        ...state,
        status: WebsocketStatus.CONNECTING,
        isOrdersFeedLoading: true
      };
    }


    case LOAD_ALL_ORDERS_WS_CONNECTING: {
      return {
        ...state,
        status: WebsocketStatus.CONNECTING,
        isOrdersFeedLoading: true
      };
    }
    case LOAD_ALL_ORDERS_WS_OPEN: {
      return {
        ...state,
        status: WebsocketStatus.ONLINE,
        isOrdersFeedLoading: false,
        connectionError: ''
      };
    }
    case LOAD_ALL_ORDERS_WS_CLOSE: {
      return {
        ...state,
        status: WebsocketStatus.OFFLINE,
        isOrdersFeedLoading: false
      };
    }
    case LOAD_ALL_ORDERS_WS_ERROR: {
      return {
        ...initialState,
        connectionError: action.payload,
        isOrdersFeedLoading: false
      };
    }
    case LOAD_ALL_ORDERS_WS_MESSAGE: {
      return {
        ...state,
        orders: action.payload,
        isOrdersFeedLoading: false
      };
    }
    default: {
      return state;
    }
  }
};