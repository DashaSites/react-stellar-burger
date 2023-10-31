/*
import {
  LOAD_ALL_ORDERS_REQUEST,
  LOAD_ALL_ORDERS_SUCCESS,
  LOAD_ALL_ORDERS_ERROR
} from "../actions/ordersFeedActions";
*/
import {
  LOAD_ALL_ORDERS_WS_CONNECT,
  LOAD_ALL_ORDERS_WS_CONNECTING,
  LOAD_ALL_ORDERS_WS_OPEN,
  LOAD_ALL_ORDERS_WS_CLOSE,
  LOAD_ALL_ORDERS_WS_ERROR,
  LOAD_ALL_ORDERS_WS_MESSAGE
} from '../actions/socketFeedActions.js';
import { WebsocketStatus } from "../../utils/socketData.js";

// initialState for ordersFeedReducer
const ordersFeedInitialState = {
  allOrders: [],
  total: null,
  totalToday: null,
  areAllOrdersLoading: false,
  isErrorWithAllOrders: false
};

// 1) Редьюсер для загрузки заказов, сделанных всеми пользователями
export const ordersFeedReducer = (state = ordersFeedInitialState, action) => {
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
        ...ordersFeedInitialState,
        connectionError: action.payload,
        isOrdersFeedLoading: false
      };
    }
    case LOAD_ALL_ORDERS_WS_MESSAGE: {
      return {
        ...state,
        allOrders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
        isOrdersFeedLoading: false
      };
    }
    default: {
      return state;
    }
/*
    case LOAD_ALL_ORDERS_REQUEST: {
      return {
        ...state,
        areAllOrdersLoading: true
      };
    }
    case LOAD_ALL_ORDERS_SUCCESS: {
      const stringifiedPayload = JSON.stringify(action.payload);

      return {
        ...state,
        allOrders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
        areAllOrdersLoading: false,
        isErrorWithAllOrders: false
      };
    }
    case LOAD_ALL_ORDERS_ERROR: {
      return {
        ...ordersFeedInitialState,
        isErrorWithAllOrders: true
      };
    }
    default: {
      return state;
    }

    */
  }
};