import {SET_INGREDIENT} from "../constants";
import {SELECT_INGREDIENT} from "../constants";
import {REMOVE_INGREDIENT} from "../constants";

export function setHops(newIngredients, ingredientType){
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

