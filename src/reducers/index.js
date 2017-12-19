import {SET_INGREDIENT} from "../constants";
import {SELECT_INGREDIENT} from "../constants";
import {REMOVE_INGREDIENT} from "../constants";
export default (state={selectedIngredients:[]}, action)=>{
    let stateBefore = Object.assign({},state);
    switch(action.type){
        case SET_INGREDIENT:
            console.log('SET_INGREDIENT');
            const {newIngredients,ingredientType} = action;
           // const ingredients = Object.assign({}, state);
            stateBefore[ingredientType]=newIngredients
            return stateBefore;
        case SELECT_INGREDIENT:
            console.log('SELECT_INGREDIENT');
            const {selected,selectedType} = action;

            if(!stateBefore[selectedType].find(function (item) {
                    return item.id == selected;
            })) return stateBefore;
            stateBefore['selectedIngredients']=stateBefore['selectedIngredients'] || [];
            stateBefore['selectedIngredients'][selectedType]=stateBefore['selectedIngredients'][selectedType] || [];
            let selectedIngredient=stateBefore['selectedIngredients'][selectedType];
            if(selectedIngredient.indexOf(+selected)==-1)
                selectedIngredient.push(+selected);
            console.log('state2',state);
            return stateBefore
        case REMOVE_INGREDIENT:
            console.log('REMOVE_INGREDIENT');
            const {removed,removedType} = action;
            //let stateBefore = Object.assign({},state);
            stateBefore['selectedIngredients']=stateBefore['selectedIngredients'] || [];
            stateBefore['selectedIngredients'][removedType]=stateBefore['selectedIngredients'][removedType] || [];
            let removedIngredient=stateBefore['selectedIngredients'][removedType];
            selectedIngredient.splice(removedIngredient.indexOf(+removed), 1);
            return stateBefore
        default:
            return state;
    }

} 