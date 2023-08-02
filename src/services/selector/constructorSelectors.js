
// Элемент булки, найденный через редьюсер для конструктора бургера
 export function bunSelector(state) { 
  const bunID = state.constructorState.bunIngredientID
  return state.ingredientsState.ingredients.find((item) => item.id === bunID)
}

// Элемент начинки, найденный через редьюсер для конструктора бургера
export function middleIngredientsSelector(state) {
  const middleIngredientsIDs = state.constructorState.middleIngredientsIDs
  //return state.ingredientsState.ingredients.filter((item) => middleIngredientsIDs.includes(item.id))
  return state.ingredientsState.ingredients.filter((item) => item.type !== "bun");
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