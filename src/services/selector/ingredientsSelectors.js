// Элемент ингредиента, найденный по id через constructorReducer
export function ingredientSelector(id) {
  return function (state) {
    const allIngredients = state.ingredientsState.ingredients;

    const ingredient = allIngredients.find((element) => element._id === id);

    return ingredient;
  };
}



// Общая цена заказа, найденная по id всех его ингредиентов
export function orderPriceSelector(ingredientsIds) {

  return function (state) {
    const allIngredients = state.ingredientsState.ingredients;

    const selectedIngredients = ingredientsIds.map((id) => {
      return allIngredients.find((ingredient) => ingredient._id === id)
    })

    const getOrderPrice = (ingredientsInOrder) => {
      let orderPrice = 0;
  
      ingredientsInOrder.forEach((ingredient) => {
        orderPrice += ingredient.price; 
      });
  
      return orderPrice;
    }

    return getOrderPrice(selectedIngredients);
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