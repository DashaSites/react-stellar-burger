import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredientsReducer.js';
import { constructorReducer } from './constructorReducer.js';
import { ingredientDetailsReducer } from './ingredientDetailsReducer.js';
import { orderDetailsReducer } from './orderDetailsReducer.js';



// Корневой редьюсер
export const rootReducer = combineReducers({
    ingredientsState: ingredientsReducer,
    constructorState: constructorReducer,
    ingredientDetailsState: ingredientDetailsReducer,
    orderDetailsState: orderDetailsReducer
})