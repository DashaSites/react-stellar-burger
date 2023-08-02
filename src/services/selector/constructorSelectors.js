


export function bunSelector(state) {
  const bunID = state.constructorState.bunIngredientID
  return state.ingredientsState.ingredients.find((item) => item.id === bunID)
}

export function middleIngredientSelector(state) {
  const middleIngredientsIDs = state.constructorState.middleIngredientsIDs
  return state.ingredientsState.ingredients.filter((item) => middleIngredientsIDs.includes(item.id))
}