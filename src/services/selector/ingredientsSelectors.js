// Элемент ингредиента, найденный по id через constructorReducer 
export function ingredientSelector(id) { 
  return function (state) {

    const allIngredients = state.ingredientsState.ingredients;

    const ingredient = allIngredients.find(element => element._id === id);

    return ingredient;

  }

}