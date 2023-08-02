import { combineReducers } from 'redux';

// экшены для редьюсера ingredientsReducer 
export const LOAD_INGREDIENTS_REQUEST = 'LOAD_INGREDIENTS_REQUEST';
export const LOAD_INGREDIENTS_SUCCESS = 'LOAD_INGREDIENTS_SUCCESS ';
export const LOAD_INGREDIENTS_ERROR = 'LOAD_INGREDIENTS_ERROR';

// initialState for ingredientsReducer
const ingredientsInitialState = {
    ingredients: [],
    isLoading: false,
    isError: false
}


// 1) Редьюсер для загрузки с сервера ингредиентов
const ingredientsReducer = (state = ingredientsInitialState, action) => {
    switch (action.type) {
        case LOAD_INGREDIENTS_REQUEST: {
            return {
                ...state,
                isLoading: true
            }
        }
        case LOAD_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredients: action.payload,
                isLoading: false,
                isError: false
            }
        }
        case LOAD_INGREDIENTS_ERROR: {
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        }
        default: {
            return state;
        }
    }
}

// Корневой редьюсер
export const rootReducer = combineReducers({
    ingredientsState: ingredientsReducer
})



// 2) Редьюсер для получения списка ингредиентов в конструкторе бургера
const constructorReducer = (state, action) => {};

// 3) Добавление данных об ингредиенте, просматриваемом в попапе
const ingredientDetailsReducer = (state, action) => {}

// 4) Получение и обновление номера заказа в попапе
const orderDetailsReducer = (state, action) => {}



