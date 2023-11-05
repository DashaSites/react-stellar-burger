import {
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_DETAILS_ERROR,
} from "../actions/orderDetailsActions.js";

// initialState for fullOrderFoundByNumberReducer
const initialState = {
  order: {},
  isError: false,
  isLoading: false
};

// Получение всех деталей заказа, которые нашлись на сервере по номеру заказа
export const fullOrderFoundByNumberReducer = (state = initialState, action) => {
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
        order: action.payload,
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