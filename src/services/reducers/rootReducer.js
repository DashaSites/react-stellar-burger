import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredientsReducer.js';
import { constructorReducer } from './constructorReducer.js';



// Корневой редьюсер
export const rootReducer = combineReducers({
    ingredientsState: ingredientsReducer,
    constructorState: constructorReducer
})




// 3) Добавление данных об ингредиенте, просматриваемом в попапе
const ingredientDetailsReducer = (state, action) => {}

// 4) Получение и обновление номера заказа в попапе
const orderDetailsReducer = (state, action) => {}



