import {
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_DETAILS_ERROR,
} from "../actions/orderDetailsActions.js";

// initialState for orderDetailsReducer
const initialState = {
  orderNumber: null,
  isError: false,
  isLoading: false
};

// Получение и обновление номера заказа в попапе
export const orderDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_DETAILS_REQUEST: {
      return {
        ...state,
        isError: false,
        isLoading: true
      };
    }
    case GET_ORDER_DETAILS_SUCCESS: {
      return {
        ...state,
        orderNumber: action.payload,
        isError: false,
        isLoading: false
      };
    }
    case GET_ORDER_DETAILS_ERROR: {
      return {
        ...state,
        isError: true,
        isLoading: false
      };
    }
    default: {
      return state;
    }
  }
};
