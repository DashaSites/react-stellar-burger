import { v4 as uuidv4 } from "uuid";

// экшены для редьюсера ingredientsReducer 
export const LOAD_INGREDIENTS_REQUEST = 'LOAD_INGREDIENTS_REQUEST';
export const LOAD_INGREDIENTS_SUCCESS = 'LOAD_INGREDIENTS_SUCCESS';
export const LOAD_INGREDIENTS_ERROR = 'LOAD_INGREDIENTS_ERROR';

export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const DROP_INGREDIENT_BUN = 'DROP_INGREDIENT_BUN';
export const DROP_INGREDIENT_MIDDLE = 'DROP_INGREDIENT_MIDDLE';
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';



// экшен-криейтор для удаления элемента конструктора
export function deleteIngredient(_id) {
  return {
    type: DELETE_INGREDIENT,
    payload: _id
  }
}


// экшен-криейтор для дропания ингредиента (он добавляет ин-ту key с уникальным номером)
export function dropIngredientWithUuid(droppedIngredient) {
  return {
    type: DROP_INGREDIENT_MIDDLE,
    payload: { ...droppedIngredient, key: uuidv4() }
  }
}