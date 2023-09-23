import {
  AUTHORIZE_USER_REQUEST,
  AUTHORIZE_USER_SUCCESS,
  AUTHORIZE_USER_ERROR
} from "../actions/authorizationActions.js";

// initialState for authorizationReducer
const initialState = {
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
      return {
        ...state,
        isAuthorized: true,
        userName: action.payload.userName,
        userEmail: action.payload.userEmail // КАК ПОЛОЖИТЬ В localStorage ТОКЕНЫ?
      };
    }
    case AUTHORIZE_USER_ERROR: {
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