import { LOAD_INGREDIENTS_SUCCESS } from '../actions/ingredientsActions.js'


// initialState for constructorReducer
const initialState = {
  bunIngredientID: null,
  middleIngredientsIDs: []
}


// 1) Редьюсер для загрузки с сервера ингредиентов
export const constructorReducer  = (state = initialState, action) => {
  switch (action.type) {
      case LOAD_INGREDIENTS_SUCCESS: {
        const ingredients = action.payload;
        const bunElement = ingredients.length > 0 && ingredients.find((item) => item.type === "bun");
        const middleIngedients = ingredients.filter((item) => item.type !== "bun");

          return {
            bunIngredientID: bunElement.id,
            middleIngredientsIDs: middleIngedients.map(item => item.id)
          }
      }
      default: {
          return state;
      }
  }
}


