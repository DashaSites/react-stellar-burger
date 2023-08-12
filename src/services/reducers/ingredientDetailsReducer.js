import { INGREDIENT_POPUP_OPENED, INGREDIENT_POPUP_CLOSED } from '../actions/ingredientDetailsActions.js';

// СОХРАНИТЬ СТЕЙТ В ВИДЕ ТОЛЬКО ОДНОГО АЙДИШНИКА, А ПОЛЯ ВЫТАСКИВАТЬ ПОТОМ ПО СЕЛЕКТОРУ

// initialState for ingredientDetailsReducer
const initialState = {
  ingredientID: null,
  imageLarge: "",
  name: "",
  calories: null,
  proteins: null,
  fat: null,
  carbohydrates: null
}


// Добавление данных об ингредиенте, просматриваемом в попапе
export const ingredientDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
      case INGREDIENT_POPUP_OPENED: {
          return {
              ...state,
              ingredientID: action.payload.id,
              imageLarge: action.payload.src,
              name: action.payload.name,
              calories: action.payload.calories,
              proteins: action.payload.proteins,
              fat: action.payload.fat,
              carbohydrates: action.payload.carbohydrates
          }
      }
      case INGREDIENT_POPUP_CLOSED: {
          return {
            ...state,
            ingredientID: null,
            imageLarge: "",
            name: "",
            calories: null,
            proteins: null,
            fat: null,
            carbohydrates: null
          }
      }
      default: {
          return state;
      }
  }
}