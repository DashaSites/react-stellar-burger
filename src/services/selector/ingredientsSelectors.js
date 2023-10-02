// Элемент ингредиента, найденный по id через constructorReducer
export function ingredientSelector(id) {
  return function (state) {
    const allIngredients = state.ingredientsState.ingredients;

    const ingredient = allIngredients.find((element) => element._id === id);

    return ingredient;
  };
}


// Все ингредиенты - не помню, нужен ли этот селектор
export function allIngredientsSelector() {
  return function (state) {
    const allIngredients = state.ingredientsState.ingredients;

    return allIngredients;
  };
}







// NEW
// Кликнутый ингредиент
export function clickedIngredientSelector() {
  return function (state) {
    const clickedIngredient = state.ingredientsState.clickedIngredient;
    return clickedIngredient;
  };
}


