


export function bunSelector(state) {
  const bunID = state.constructorState.bunIngredientID
  return state.ingredientsState.ingredients.find((item) => item.id === bunID)
}

export function middleIngredientsSelector(state) {
  const middleIngredientsIDs = state.constructorState.middleIngredientsIDs
  return state.ingredientsState.ingredients.filter((item) => middleIngredientsIDs.includes(item.id))
}

export function sumSelector(state) {
  const bun = bunSelector(state);
  const middleIngredients = middleIngredientsSelector(state);
  const selectedIngredients = [bun, ...middleIngredients, bun] 

  const newSum = selectedIngredients.reduce((sum, currentIngredient) => {
    return sum + currentIngredient.price;
  }, 0)

  return newSum;
}