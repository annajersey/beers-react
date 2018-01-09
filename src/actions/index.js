import {SET_INGREDIENT} from "../constants";
import {SELECT_INGREDIENT} from "../constants";
import {REMOVE_INGREDIENT} from "../constants";
import {SIGNED_IN} from "../constants";
export function setIngredient(newIngredients, ingredientType){
    const action = {
        type: SET_INGREDIENT,
        newIngredients,
        ingredientType
    }
    return action;
}

export function selectIngredient(selected,selectedType){
    const action = {
        type: SELECT_INGREDIENT,
        selected,
        selectedType
    }
    return action;
}

export function removeIngredient(removed,removedType){
    const action = {
        type: REMOVE_INGREDIENT,
        removed,
        removedType
    }
    return action;
}

export function logUser(email) {
    const action = {
        type: SIGNED_IN,
        email
    }
    return action;
}

