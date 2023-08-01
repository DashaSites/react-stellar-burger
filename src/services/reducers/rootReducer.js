import { combineReducers } from 'redux';

export const INGREDIENTS_LOADED = 'INGREDIENTS_LOADED';


const ingredientsInitialState = {
    ingredients: [],
    isLoading: true,
    isError: false
}


// Редьюсер ***
const ingredients = (state = ingredientsInitialState, action) => {
    switch (action.type) {
        case INGREDIENTS_LOADED: {
            return {
                ingredients: action.payload,
                isLoading: false,
                isError: false
            }
        }
        default: return state
    }
}

// Редьюсер ***
//const BLA = (state, action) => {}

// Редьюсер ***
//const BLABLA = (state, action) => {}

// Корневой редьюсер
export const rootReducer = combineReducers({
    ingredientsState: ingredients
    // user, 
    // collaboration 
})