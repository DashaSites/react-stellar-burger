import { loginUser } from "../../utils/burger-api.js";

// Экшены для редьюсера authorizationReducer
export const AUTHORIZE_USER_REQUEST = 'AUTHORIZE_USER_REQUEST';
export const AUTHORIZE_USER_SUCCESS = 'AUTHORIZE_USER_SUCCESS';
export const AUTHORIZE_USER_ERROR = 'AUTHORIZE_USER_ERROR';




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
            type: AUTHORIZE_USER_SUCCESS, //res.order.number
            payload: {
              accessToken: res.accessToken,
              refreshToken: res.refreshToken,
              userEmail: res.user.email,
              userName: res.user.name
            }
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