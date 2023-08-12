import { DELETE_INGREDIENT, DROP_INGREDIENT_MIDDLE } from "../reducers/constructorReducer";
import { v4 as uuidv4 } from "uuid";

// экшены для редьюсера ingredientsReducer 
export const LOAD_INGREDIENTS_REQUEST = 'LOAD_INGREDIENTS_REQUEST';
export const LOAD_INGREDIENTS_SUCCESS = 'LOAD_INGREDIENTS_SUCCESS';
export const LOAD_INGREDIENTS_ERROR = 'LOAD_INGREDIENTS_ERROR';



// Написать какой-то такой экшн-криейтор для получения ингредиента с добавленным к нему уникальным ключом
//export function addIngredientWithUuid(item, givenUuid) {
//  return {
//    type: ADD_INGREDIENT_WITH_UUID,
//    ingredients: item,
//    key: givenUuid
//  }
//}


// Экшн-криейтор для удаления элемента конструктора
export function deleteIngredient(_id) {
  return {
    type: DELETE_INGREDIENT,
    payload: _id
  }
}


// Экшн-криейтор для дропания ингредиента. Он добавляет ин-ту key с уникальным номером 
export function dropIngredientWithUuid(droppedIngredient) {
  return {
    type: DROP_INGREDIENT_MIDDLE,
    payload: { ...droppedIngredient, key: uuidv4() }
  }
}