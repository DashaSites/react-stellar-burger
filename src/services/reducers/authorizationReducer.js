import {
  USER_AUTHORIZED_SUCCESSFULLY
} from "../actions/authorizationActions.js";

// initialState for orderDetailsReducer
const initialState = {
  isAuthorized: false,
  userName: null,
  userEmail: null
};

// Получение и обновление номера заказа в попапе
export const authorizationReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_AUTHORIZED_SUCCESSFULLY: {
      return {
        ...state,
        isAuthorized: true,
        userName: action.payload.userName,
        userEmail: action.payload.userEmail
      };
    }
    default: {
      return state;
    }
  }
};