import {
  LOAD_ALL_ORDERS_REQUEST,
  LOAD_ALL_ORDERS_SUCCESS,
  LOAD_ALL_ORDERS_ERROR
} from "../actions/ordersFeedActions";

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
  }
};