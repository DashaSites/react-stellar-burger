import { ingredientSelector } from "./ingredientsSelectors.js";

// Элемент булки, найденный через редьюсер для конструктора бургера
export function bunSelector(state) {
  const bunID = state.constructorState.bunIngredientID;
  return state.ingredientsState.ingredients.find((item) => item._id === bunID);
}

// Элемент начинки, найденный через редьюсер для конструктора бургера
export function middleIngredientsSelector(state) {
  const middleIngredients = state.constructorState.middleIngredients;
  return middleIngredients.map((middleIngredient) => {
    const ingredient = ingredientSelector(middleIngredient.id)(state);
    return {
      ...ingredient,
      key: middleIngredient.key,
    };
  });
}

// Селектор функции, которая подсчитывает текущую сумму заказа
export function sumSelector(state) {
  const bun = bunSelector(state);
  const middleIngredients = middleIngredientsSelector(state);
  const selectedIngredients = [bun, ...middleIngredients, bun];

  const newSum = selectedIngredients.reduce((sum, currentIngredient) => {
    return sum + currentIngredient.price;
  }, 0);

  return newSum;
}
