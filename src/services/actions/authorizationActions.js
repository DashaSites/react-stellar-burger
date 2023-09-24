import { loginUser } from "../../utils/burger-api.js";
import { logoutUser } from "../../utils/burger-api.js";
import { getUser } from "../../utils/burger-api.js";

// Экшены для редьюсера authorizationReducer
export const AUTHORIZE_USER_REQUEST = 'AUTHORIZE_USER_REQUEST';
export const AUTHORIZE_USER_SUCCESS = 'AUTHORIZE_USER_SUCCESS';
export const AUTHORIZE_USER_ERROR = 'AUTHORIZE_USER_ERROR';

export const LOGOUT_USER_REQUEST = 'LOGOUT_USER_REQUEST';
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';
export const LOGOUT_USER_ERROR = 'LOGOUT_USER_ERROR';

export const GET_USER_DETAILS_REQUEST = 'GET_USER_DETAILS_REQUEST';
export const GET_USER_DETAILS_SUCCESS = 'GET_USER_DETAILS_SUCCESS';
export const GET_USER_DETAILS_ERROR = 'GET_USER_DETAILS_ERROR';


// Асинхронный запрос к серверу для авторизации пользователя (функция с мидлваром)
export const getFetchedAuthorizedUser = (email, password) => { 
  return (dispatch) => {
    // флажок о начале загрузки
    dispatch({
        type: AUTHORIZE_USER_REQUEST
    })

    loginUser(email, password) // Передаю на сервер введенные юзером имейл и пароль
    .then((res) => {
        dispatch({
            type: AUTHORIZE_USER_SUCCESS,
            payload: {
              accessToken: res.accessToken, 
              refreshToken: res.refreshToken, 
              userEmail: res.user.email,
              userName: res.user.name
            },
          })
    }).catch((err) => {
        console.log(err);
        // Если сервер не вернул данных, отправляем экшен об ошибке
        dispatch({
            type: AUTHORIZE_USER_ERROR
        })
    })
  }   
}



// Асинхронный (с мидлваром) запрос к серверу для выхода из системы
export const getUserLoggedOut = () => { 
  return (dispatch) => {
    // флажок о начале загрузки
    dispatch({
        type: LOGOUT_USER_REQUEST
    })

    logoutUser()
    .then((res) => {
        dispatch({
            type: LOGOUT_USER_SUCCESS,
            payload: {
              message: res.message
            },
          })
    }).catch((err) => {
        console.log(err);
        // Если сервер не вернул данных, отправляем экшен об ошибке
        dispatch({
            type: LOGOUT_USER_ERROR
        })
    })
  }   
}


// Асинхронный (с мидлваром) запрос к серверу для получения данных пользователя
export const getFetchedUserDetails = () => { 
  return (dispatch) => {
    // флажок о начале загрузки
    dispatch({
        type: GET_USER_DETAILS_REQUEST
    })

    getUser()
    .then((res) => {
        dispatch({
            type: GET_USER_DETAILS_SUCCESS,
            payload: {
              userEmail: res.user.email,
              userName: res.user.name
            },
          })
    }).catch((err) => {
        console.log(err);
        // Если сервер не вернул данных, отправляем экшен об ошибке
        dispatch({
            type: GET_USER_DETAILS_ERROR
        })
    })
  }   
}