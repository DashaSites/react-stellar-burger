import {
  GET_FULL_ORDER_DETAILS_REQUEST,
  GET_FULL_ORDER_DETAILS_SUCCESS,
  GET_FULL_ORDER_DETAILS_ERROR,
} from "../actions/orderDetailsActions.js";

// initialState for fullOrderFoundByNumberReducer
const initialState = {
  order: null, // значение null будет прочитано в компоненте OrderFullInfo как falsy (в отличие от "[]", который был бы прочитан как truthy)
  isError: false,
  isLoading: false
};

// Получение всех деталей заказа, которые нашлись на сервере по номеру заказа
export const fullOrderFoundByNumberReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FULL_ORDER_DETAILS_REQUEST: {
      return {
        ...state,
        isError: false,
        isLoading: true
      };
    }
    case GET_FULL_ORDER_DETAILS_SUCCESS: {
      return {
        ...state,
        order: action.payload,
        isError: false,
        isLoading: false
      };
    }
    case GET_FULL_ORDER_DETAILS_ERROR: {
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