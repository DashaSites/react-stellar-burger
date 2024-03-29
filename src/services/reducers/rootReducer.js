import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredientsReducer.js';
import { constructorReducer } from './constructorReducer.js';
import { orderDetailsReducer } from './orderDetailsReducer.js';
import { authorizationReducer } from './authorizationReducer.js';
import { registrationReducer } from "./registrationReducer.js";
import { ordersFeedReducer } from "./ordersFeedReducer.js";
import { ordersHistoryReducer } from "./ordersHistoryReducer";
import { fullOrderFoundByNumberReducer } from "./fullOrderFoundByNumberReducer.js";



// Корневой редьюсер
export const rootReducer = combineReducers({
    ingredientsState: ingredientsReducer, // получение ингредиентов с сервера
    constructorState: constructorReducer, // получение ингредиентов в конструкторе: и через загрузку, и через дроп
    orderDetailsState: orderDetailsReducer, // получение с сервера номера заказа
    authorizationState: authorizationReducer, // получение с сервера инфы об авторизации
    registrationState: registrationReducer, // получение с сервера инфы о регистрации пользователя
    ordersFeedState: ordersFeedReducer, // получение с сервера всей инфы о заказах всех покупателей
    ordersHistoryState: ordersHistoryReducer, // получение с сервера истории заказов пользователя
    fullOrderFoundByNumberState: fullOrderFoundByNumberReducer // получение всей инфы о заказе по его номеру
})