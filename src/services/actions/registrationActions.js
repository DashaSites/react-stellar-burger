import { registerUser } from "../../utils/burger-api.js";

// Экшены для редьюсера registrationReducer
export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_ERROR = 'REGISTER_USER_ERROR';


// Асинхронный запрос к серверу для регистрации пользователя (функция с мидлваром)
export const getFetchedRegisteredUser = (name, email, password) => { 
  return (dispatch) => {
    // флажок о начале загрузки
    dispatch({
        type: REGISTER_USER_REQUEST
    })

    registerUser(name, email, password) // Передаю на сервер введенные юзером имя, имейл и пароль
    .then((res) => {
        dispatch({
            type: REGISTER_USER_SUCCESS,
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
            type: REGISTER_USER_ERROR
        })
    })
  }   
}