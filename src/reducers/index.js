import {SET_INGREDIENT} from "../constants";
import {SELECT_INGREDIENT} from "../constants";
import {REMOVE_INGREDIENT} from "../constants";
import {SIGNED_IN} from "../constants";
export default (state={selectedIngredients:[]}, action)=>{
    let stateBefore = Object.assign({},state);
    switch(action.type){
        case SET_INGREDIENT:
            console.log('SET_INGREDIENT');
            const {newIngredients,ingredientType} = action;
           // const ingredients = Object.assign({}, state);
            //stateBefore[ingredientType]=newIngredients
            return {...state,[ingredientType]:newIngredients};
        case SELECT_INGREDIENT:
            console.log('SELECT_INGREDIENT');
            const {selected,selectedType} = action;
            let newSelected=[
                ...(state.selectedIngredients[selectedType] || []),
                +selected];
            return { ...state,
                    selectedIngredients: {
                        ...state.selectedIngredients,
                        [selectedType]: newSelected
                    }
                 }
        case REMOVE_INGREDIENT:
            console.log('REMOVE_INGREDIENT');
            const {removed,removedType} = action;
            const removedSelected = stateBefore['selectedIngredients'][removedType].filter(
                a =>
                a != removed
            );
            console.log('removedSelected',removedSelected);

            return { ...state,
                selectedIngredients: {
                    ...state.selectedIngredients,
                    [removedType]: removedSelected
                }
            }
        case SIGNED_IN:
            const { email } = action;

            const user = {
                email
            }
            return {...state,user};
        default:
            return state;
    }

} 