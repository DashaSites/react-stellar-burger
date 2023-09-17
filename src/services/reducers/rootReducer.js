import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredientsReducer.js';
import { constructorReducer } from './constructorReducer.js';
import { orderDetailsReducer } from './orderDetailsReducer.js';
import { authorizationReducer } from './authorizationReducer.js';



// Корневой редьюсер
export const rootReducer = combineReducers({
    ingredientsState: ingredientsReducer, // получение ингредиентов с сервера
    constructorState: constructorReducer, // получение ингредиентов в конструкторе: и через загрузку, и через дроп
    orderDetailsState: orderDetailsReducer, // получение с сервера номера заказа
    authorizationState: authorizationReducer
})