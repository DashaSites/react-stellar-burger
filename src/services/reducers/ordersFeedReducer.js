import {
  LOAD_ALL_ORDERS_REQUEST,
  LOAD_ALL_ORDERS_SUCCESS,
  LOAD_ALL_ORDERS_ERROR
} from "../actions/ordersFeedActions";

// initialState for ordersFeedReducer
const ordersFeedInitialState = {
  allOrders: [],
  areAllOrdersLoading: false,
  isErrorWithAllOrders: false
};

// 1) Редьюсер для загрузки с сервера заказов, сделанных всеми пользователями
export const ordersFeedReducer = (state = ordersFeedInitialState, action) => {
  switch (action.type) {
    case LOAD_ALL_ORDERS_REQUEST: {
      return {
        ...state,
        areAllOrdersLoading: true
      };
    }
    case LOAD_ALL_ORDERS_SUCCESS: {
      return {
        ...state,
        allOrders: action.payload, // РАЗОБРАТЬСЯ В СТРУКТУРЕ ДАННЫХ
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