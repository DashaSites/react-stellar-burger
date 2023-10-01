import { loginUser, logoutUser, getUser, patchUser, recognizeUser, resetPassword } from "../../utils/burger-api.js";

// Экшены для редьюсера authorizationReducer

export const AUTHORIZE_USER_REQUEST = "AUTHORIZE_USER_REQUEST";
export const AUTHORIZE_USER_SUCCESS = "AUTHORIZE_USER_SUCCESS";
export const AUTHORIZE_USER_ERROR = "AUTHORIZE_USER_ERROR";

export const LOGOUT_USER_REQUEST = "LOGOUT_USER_REQUEST";
export const LOGOUT_USER_SUCCESS = "LOGOUT_USER_SUCCESS";
export const LOGOUT_USER_ERROR = "LOGOUT_USER_ERROR";

export const GET_USER_DETAILS_REQUEST = "GET_USER_DETAILS_REQUEST";
export const GET_USER_DETAILS_SUCCESS = "GET_USER_DETAILS_SUCCESS";
export const GET_USER_DETAILS_ERROR = "GET_USER_DETAILS_ERROR";

export const EDIT_USER_DETAILS_REQUEST = "EDIT_USER_DETAILS_REQUEST";
export const EDIT_USER_DETAILS_SUCCESS = "EDIT_USER_DETAILS_SUCCESS";
export const EDIT_USER_DETAILS_ERROR = "EDIT_USER_DETAILS_ERROR";

export const SET_AUTH_CHECKED = "SET_AUTH_CHECKED";

export const RECOGNIZE_USER_BY_MAIL_REQUEST = "RECOGNIZE_USER_BY_MAIL_REQUEST";
export const RECOGNIZE_USER_BY_MAIL_SUCCESS = "RECOGNIZE_USER_BY_MAIL_SUCCESS";
export const RECOGNIZE_USER_BY_MAIL_ERROR = "RECOGNIZE_USER_BY_MAIL_ERROR";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_ERROR = "RESET_PASSWORD_ERROR";



// Экшн-криейтор для создания экшена, который будет в редьюсере 
// устанавливать флажок isAuthChecked
// (проверяет: "была ли этот пользователь проверен на наличие авторизации?")
export const setAuthChecked = (value) => ({
  type: SET_AUTH_CHECKED,
  payload: value
});


// Проверочный запрос (асинхронный экшен)
export const checkUserAuth = () => {
  return (dispatch) => {
      if (localStorage.getItem("accessToken")) {
        getUser()
            .catch(() => {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
             }) // независимо от того, получили мы данные пользователя или нет, флажок выставляем в true
             .then((data) => {
              dispatch({
                type: AUTHORIZE_USER_SUCCESS,
                payload: {
                  accessToken: localStorage.getItem("accessToken"),
                  refreshToken: localStorage.getItem("refreshToken"),
                  userEmail: data.user.email,
                  userName: data.user.name
                },
              });
             })
            .finally(() => dispatch(setAuthChecked(true)));
      } else {
          dispatch(setAuthChecked(true));
      }
  };
};



// Асинхронный запрос для логина (функция с мидлваром)
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
          });
          dispatch(setAuthChecked(true));
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
          });
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

// Асинхронный (с мидлваром) запрос к серверу для редактирования данных пользователя
export const getEditedUserDetails = (name, email, password) => { 
  return (dispatch) => {
    // флажок о начале загрузки
    dispatch({
        type: EDIT_USER_DETAILS_REQUEST
    })

    patchUser(name, email, password)
    .then((res) => {
        dispatch({
            type: EDIT_USER_DETAILS_SUCCESS,
            payload: {
              updatedUserEmail: res.user.email,
              updatedUserName: res.user.name
            },
          })
    }).catch((err) => {
        console.log(err);
        // Если сервер не вернул данных, отправляем экшен об ошибке
        dispatch({
            type: EDIT_USER_DETAILS_ERROR
        })
    })
  }   
}