import * as actionTypes from '../actions/actionTypes';
import updatedObject from '../Utility';

const initialState = {
    ingredients:null,
    totalPrice: 4,
    error:false,
    building: false
}

const INGREDIENT_PRICE = {
    salad: 5,
    bacon: 25,
    cheese: 10,
    meat: 50
}

const addIngredient = (state, action) => {
    const updatedIngredient = {[action.ingredientType]: state.ingredients[action.ingredientType] + 1}
    const updatedIngredients = updatedObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientType],
        building: true
    }
    return updatedObject(state, updatedState);
}

const removeIngredient = (state, action) => {
    const updatedIng  = {[action.ingredientType]: state.ingredients[action.ingredientType] - 1}
    const updatedIngs = updatedObject(state.ingredients, updatedIng);
    const updatedSt = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientType]
    }
    return updatedObject(state, updatedSt);
} 

const fetchIngredient = (state, action) => {
    return updatedObject(state, {
        ingredients: action.ingredients,
        error: false,
        totalPrice: 4
    })
}

const fetchIngredientFailed = (state, action) => {
    return updatedObject(state, {error: true})
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action)
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action)
        case actionTypes.FETCH_INGREDIENTS: return fetchIngredient(state, action)
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientFailed(state, action)
        default:
        return state
    }
}

export default reducer