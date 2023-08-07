import { LOAD_INGREDIENTS_SUCCESS } from '../actions/ingredientsActions.js'

export const DROP_INGREDIENT = 'DROP_INGREDIENT';


// initialState for constructorReducer
const initialState = {
  bunIngredientID: null,
  middleIngredientsIDs: []
}


// Редьюсер для получения списка ингредиентов в конструкторе бургера
export const constructorReducer  = (state = initialState, action) => {
  switch (action.type) {
      case LOAD_INGREDIENTS_SUCCESS: {
        const ingredients = action.payload;
        const bunElement = ingredients.length > 0 && ingredients.find((item) => item.type === "bun");
        const middleIngedients = ingredients.filter((item) => item.type !== "bun");

          return {
            bunIngredientID: bunElement._id,
            middleIngredientsIDs: middleIngedients.map(item => item._id)
          }
      }
      case DROP_INGREDIENT: {
        const droppedIngredient = action.payload;

        return {
          ...state,
          middleIngredientsIDs: [...state.middleIngredientsIDs, droppedIngredient._id]
        }

      }
      default: {
          return state;
      }
  }
}


