import { ingredientSelector } from './ingredientsSelectors.js';

// Элемент булки, найденный через редьюсер для конструктора бургера
 export function bunSelector(state) { 
  const bunID = state.constructorState.bunIngredientID
  return state.ingredientsState.ingredients.find((item) => item._id === bunID)
}

// Элемент начинки, найденный через редьюсер для конструктора бургера
export function middleIngredientsSelector(state) {
  const middleIngredientsIDs = state.constructorState.middleIngredientsIDs
  return middleIngredientsIDs.map(id => ingredientSelector(id)(state))

  //return state.ingredientsState.ingredients.filter((item) => middleIngredientsIDs.includes(item._id))
}

// Селектор функции, которая подсчитывает текущую сумму заказа
export function sumSelector(state) {
  const bun = bunSelector(state);
  const middleIngredients = middleIngredientsSelector(state);
  const selectedIngredients = [bun, ...middleIngredients, bun] 

  const newSum = selectedIngredients.reduce((sum, currentIngredient) => {
    return sum + currentIngredient.price;
  }, 0)

  return newSum;
}