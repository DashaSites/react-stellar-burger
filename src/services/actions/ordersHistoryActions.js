import { getUserOrders } from "../../utils/burger-api.js";

// экшены для редьюсера ordersFeedReducer 
export const LOAD_USER_ORDERS_REQUEST = "LOAD_USER_ORDERS_REQUEST";
export const LOAD_USER_ORDERS_SUCCESS = "LOAD_USER_ORDERS_SUCCESS";
export const LOAD_USER_ORDERS_ERROR = "LOAD_USER_ORDERS_ERROR";


// Запрос к серверу для загрузки истории заказов пользователей
export function getFetchedUserOrdersFromApi() { // функция с мидлваром
  return (dispatch) => {
      // флажок о начале загрузки
      dispatch({
          type: LOAD_USER_ORDERS_REQUEST
        })

      getUserOrders() // запрос к апи
      .then((res) => {
          dispatch({
              type: LOAD_USER_ORDERS_SUCCESS, 
              payload: res.data // ОБРАТИТЬ ВНИМАНИЕ НА СТРУКТУРУ ДАННЫХ В ОТВЕТЕ СЕРВЕРА
            })
      }).catch((err) => {
          console.log(err);
          // Если сервер не вернул данных, отправляем экшен об ошибке
          dispatch({
              type: LOAD_USER_ORDERS_ERROR
          })
      })
  }
}