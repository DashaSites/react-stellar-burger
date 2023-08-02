import { GET_ORDER_DETAILS_REQUEST, GET_ORDER_DETAILS_SUCCESS, GET_ORDER_DETAILS_ERROR } from '../actions/orderDetailsActions.js';


// initialState for orderDetailsReducer
const initialState = {
  orderNumber: null,
  isError: false
}


// Получение и обновление номера заказа в попапе
export const orderDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
      case GET_ORDER_DETAILS_REQUEST: {
          return {
              ...state,
              isError: false
          }
      }
      case GET_ORDER_DETAILS_SUCCESS: {
          return {
              ...state,
              orderNumber: action.payload, // ДОБАВИТЬ ЧТО-ТО ПОСЛЕ payload
              isError: false
          }
      }
      case GET_ORDER_DETAILS_ERROR: {
          return {
              ...state,
              isError: true
          }
      }
      default: {
          return state;
      }
  }
}