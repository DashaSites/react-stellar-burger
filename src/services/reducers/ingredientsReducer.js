import { LOAD_INGREDIENTS_REQUEST, LOAD_INGREDIENTS_SUCCESS, LOAD_INGREDIENTS_ERROR } from '../actions/ingredientsActions.js';


// initialState for ingredientsReducer
const ingredientsInitialState = {
  ingredients: [],
  isLoading: false,
  isError: false
}


// 1) Редьюсер для загрузки с сервера ингредиентов
export const ingredientsReducer = (state = ingredientsInitialState, action) => {
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