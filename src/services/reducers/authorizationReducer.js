import {
  AUTHORIZE_USER_REQUEST,
  AUTHORIZE_USER_SUCCESS,
  AUTHORIZE_USER_ERROR,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_ERROR,
  GET_USER_DETAILS_REQUEST,
  GET_USER_DETAILS_SUCCESS,
  GET_USER_DETAILS_ERROR
} from "../actions/authorizationActions.js";

// initialState for authorizationReducer
export const initialState = {
  //isAuthChecked: false;
  isRegistered: false,
  isAuthorized: false,
  userName: null,
  userEmail: null,
  isError: false
};

// Авторизация в окне login
export const authorizationReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHORIZE_USER_REQUEST: {
      return {
        ...state,
        isError: false
      };
    }
    case AUTHORIZE_USER_SUCCESS: {
      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
      return {
        ...state,
        isAuthorized: true,
        userName: action.payload.userName,
        userEmail: action.payload.userEmail
      };
    }
    case AUTHORIZE_USER_ERROR: {
      return {
        ...state,
        isError: true
      };
    }
    case LOGOUT_USER_REQUEST: {
      return {
        ...state,
        isError: false
      };
    }
    case LOGOUT_USER_SUCCESS: {
      console.log(action.payload.message);
      return {
        ...state,
        isAuthorized: false
      };
    }
    case LOGOUT_USER_ERROR: {
      return {
        ...state,
        isError: true
      };
    }
    case GET_USER_DETAILS_REQUEST: {
      return {
        ...state,
        isError: false
      };
    }
    case GET_USER_DETAILS_SUCCESS: {
      return {
        ...state,
        userName: action.payload.userName,
        userEmail: action.payload.userEmail
      };
    }
    case GET_USER_DETAILS_ERROR: {
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