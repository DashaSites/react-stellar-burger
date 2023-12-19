import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR
} from "../actions/registrationActions.js";
import { initialState } from "./authorizationReducer";


// Авторизация в окне login
export const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST: {
      return {
        ...state,
        isError: false
      };
    }
    case REGISTER_USER_SUCCESS: {
      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
      return {
        ...state,
        isRegistered: true,
        userName: action.payload.userName,
        userEmail: action.payload.userEmail,
      };
    }
    case REGISTER_USER_ERROR: {
      return {
        ...state,
        isError: true
      };
    }
    default: {
      return state;
    }
  }
};