import {
  LOAD_USER_ORDERS_REQUEST,
  LOAD_USER_ORDERS_SUCCESS,
  LOAD_USER_ORDERS_ERROR
} from "../actions/ordersHistoryActions";

// initialState for ordersFeedReducer
const ordersHistoryInitialState = {
  userOrders: [],
  areUserOrdersLoading: false,
  isErrorWithUserOrders: false
};

// 1) Редьюсер для загрузки с сервера истории заказов текущего пользователя
export const ordersHistoryReducer = (state = ordersHistoryInitialState, action) => {
  switch (action.type) {
    case LOAD_USER_ORDERS_REQUEST: {
      return {
        ...state,
        areUserOrdersLoading: true
      };
    }
    case LOAD_USER_ORDERS_SUCCESS: {
      return {
        ...state,
        userOrders: action.payload, // РАЗОБРАТЬСЯ В СТРУКТУРЕ ДАННЫХ
        areUserOrdersLoading: false,
        isErrorWithUserOrders: false
      };
    }
    case LOAD_USER_ORDERS_ERROR: {
      return {
        ...ordersHistoryInitialState,
        isErrorWithUserOrders: true
      };
    }
    default: {
      return state;
    }
  }
};