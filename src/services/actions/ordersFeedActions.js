import { getAllOrders } from "../../utils/burger-api.js";

// экшены для редьюсера ordersFeedReducer 
export const LOAD_ALL_ORDERS_REQUEST = 'LOAD_ALL_ORDERS_REQUEST';
export const LOAD_ALL_ORDERS_SUCCESS = 'LOAD_ALL_ORDERS_SUCCESS';
export const LOAD_ALL_ORDERS_ERROR = 'LOAD_ALL_ORDERS_ERROR';





// Запрос к серверу для загрузки заказов всех покупателей
export function getFetchedAllOrdersFromApi() { // функция с мидлваром
  return (dispatch) => {
      // флажок о начале загрузки
      dispatch({
          type: LOAD_ALL_ORDERS_REQUEST
        })

      getAllOrders() // импортировала эту функцию сюда из апи
      .then((res) => {
          dispatch({
              type: LOAD_ALL_ORDERS_SUCCESS, 
              payload: res.data // ОБРАТИТЬ ВНИМАНИЕ НА СТРУКТУРУ ДАННЫХ В ОТВЕТЕ СЕРВЕРА
            })
      }).catch((err) => {
          console.log(err);
          // Если сервер не вернул данных, отправляем экшен об ошибке
          dispatch({
              type: LOAD_ALL_ORDERS_ERROR
          })
      })
  }
}