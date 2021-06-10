import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';


export const addIngredient = (ingType) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientType: ingType
    }
}

export const removeIngredient = (ingType) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientType: ingType
    }
}

export const setIngredients = (ings) =>{
    return {
    
        type: actionTypes.FETCH_INGREDIENTS,
        ingredients: ings
    }
} 

export const fetchIngredientsFailed = () => {
    return{
        type:actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const fetchIngredients = () => {

    // return dispatch => {
    //     axios.get('https://burger-builder-d34c6.firebaseio.com/ingredients.json')
    //     .then(res =>  { 
           
    //        dispatch(setIngredients(res.data))
    //     })
    //     .catch(error => dispatch(fetchIngredientsFailed()));
    // }

    return{
        type: actionTypes.INIT_INGREDIENTS
    }
}