import { getOrderDetails, getOrderByNumber } from "../../utils/burger-api.js";

// экшены для редьюсера orderDetailsReducer 
export const GET_ORDER_DETAILS_REQUEST = 'GET_ORDER_DETAILS_REQUEST';
export const GET_ORDER_DETAILS_SUCCESS = 'GET_ORDER_DETAILS_SUCCESS';
export const GET_ORDER_DETAILS_ERROR = 'GET_ORDER_DETAILS_ERROR';

// экшены для редьюсера fullOrderFoundByNumberReducer 
export const GET_FULL_ORDER_DETAILS_REQUEST = 'GET_FULL_ORDER_DETAILS_REQUEST';
export const GET_FULL_ORDER_DETAILS_SUCCESS = 'GET_FULL_ORDER_DETAILS_SUCCESS';
export const GET_FULL_ORDER_DETAILS_ERROR = 'GET_FULL_ORDER_DETAILS_ERROR';



  // Асинхронный запрос за всеми деталями заказа (по его номеру)
  export const getFetchedFullOrderDetails = (number) => { 
    return (dispatch) => {
      // флажок о начале загрузки
      dispatch({
          type: GET_FULL_ORDER_DETAILS_REQUEST
      })

      getOrderByNumber(number) // прокидываю номер заказа в запросе к серверу
      .then((res) => {
          dispatch({
              type: GET_FULL_ORDER_DETAILS_SUCCESS, 
              payload: res.orders[0] // получаю единственный заказ, который лежит в пришедшем с сервера массиве
            })
      }).catch((err) => {
          console.log(err);
          // Если сервер не вернул данных, отправляем экшен об ошибке
          dispatch({
              type: GET_FULL_ORDER_DETAILS_ERROR
          })
      })
    }   
  }






  // Асинхронный запрос к серверу за номером заказа (функция с мидлваром)
  export const getFetchedOrderDetailsFromApi = (array) => { 
    return (dispatch) => {
      // флажок о начале загрузки
      dispatch({
          type: GET_ORDER_DETAILS_REQUEST
      })

      getOrderDetails(array) // Прокинем массив id в запросе к серверу
      .then((res) => {
          dispatch({
              type: GET_ORDER_DETAILS_SUCCESS, 
              payload: res.order.number
            })
      }).catch((err) => {
          console.log(err);
          // Если сервер не вернул данных, отправляем экшен об ошибке
          dispatch({
              type: GET_ORDER_DETAILS_ERROR
          })
      })
    }   
  }