import {
  LOAD_INGREDIENTS_SUCCESS,
  DELETE_INGREDIENT,
  DROP_INGREDIENT_BUN,
  DROP_INGREDIENT_MIDDLE,
  MOVE_INGREDIENT,
} from "../actions/ingredientsActions.js";
import { v4 as uuidv4 } from "uuid";

// Сохраняю в localStorage стейт:
//!!! НОВОЕ const prevStateString = localStorage.getItem('constructorState');


// initialState for constructorReducer
const initialState = {
  bunIngredientID: null,
  // массив ингредиентов, который содержит айдишники и уникальные ключи каждого инг-та
  middleIngredients: [],
};

/* !!! НОВОЕ
const initialState = prevStateString ? JSON.parse(prevStateString) : {
  bunIngredientID: null,
  // массив ингредиентов, который содержит айдишники и уникальные ключи каждого инг-та
  middleIngredients: [],
};
*/

// Редьюсер для получения списка ингредиентов в конструкторе бургера
export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case LOAD_INGREDIENTS_SUCCESS: {

      if (state.bunIngredientID) {
        return state;
      }

      const ingredients = action.payload; // все ингредиенты с сервера

      const bunElement =
        ingredients.length > 0 &&
        ingredients.find((item) => item.type === "bun"); // нашла булку в ингредиентах с сервера

      const middleIngedients = ingredients.filter(
        (item) => item.type !== "bun" // все ингредиенты с сервера, кроме булок
      );

      return {
        bunIngredientID: bunElement._id, 
        middleIngredients: middleIngedients.map((item) => {
          return {
            id: item._id,
            key: uuidv4(),
          };
        }),
      };
    }
    
    
    case DROP_INGREDIENT_BUN: {
      const droppedIngredientBun = action.payload;

      const newState = {
        ...state,
        // перетаскиваемые булки заменяют собой булки, которые были в конструкторе раньше
        bunIngredientID: droppedIngredientBun._id,
      };

      // !!! НОВОЕ const stringifiedConstructorState = JSON.stringify(newState);

      // !!! НОВОЕ localStorage.setItem('constructorState', stringifiedConstructorState);

      return newState;
    }

    case DROP_INGREDIENT_MIDDLE: {
      const droppedIngredientMiddle = action.payload;

      const newState = {
        ...state,
        // перетаскиваемые начинки и соусы падают в середину конструктора
        middleIngredients: [
          ...state.middleIngredients,
          {
            id: droppedIngredientMiddle._id,
            key: droppedIngredientMiddle.key,
          },
        ],
      };

      const stringifiedConstructorState = JSON.stringify(newState);
      localStorage.setItem('constructorState', stringifiedConstructorState);
      return newState;
    }

    case DELETE_INGREDIENT: {
      const newState = {
        ...state,
        // возвращаю все начинки, кроме выбрасываемой
        middleIngredients: state.middleIngredients.filter(
          (middleIngredient) => middleIngredient.key !== action.payload
        ),
      };

      const stringifiedConstructorState = JSON.stringify(newState);
      localStorage.setItem('constructorState', stringifiedConstructorState);
      return newState;
    }

    case MOVE_INGREDIENT: {
      const dragIndex = action.payload.dragIndex;
      const hoverIndex = action.payload.hoverIndex;

      const middleIngredients = state.middleIngredients;

      const movedIngredient = middleIngredients[dragIndex];

      // Сплайсом видоизменяю массив ингредиентов в два подхода:
      middleIngredients.splice(dragIndex, 1); // то, что драгается
      middleIngredients.splice(hoverIndex, 0, movedIngredient); // то, что дропается

      return {
        ...state,
        middleIngredients: middleIngredients,
      };
    }
    default: {
      return state;
    }
  }
};
