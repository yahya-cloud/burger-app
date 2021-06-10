import * as actionTypes from "../actions/actionTypes";
import updatedObject from "../Utility";

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const purchaseInit = (state, action) => {
    return updatedObject(state, {purchased:false})
}

const purchaseBurgerSuccess = (state, action) => {
    const newOrders = updatedObject(action.orderData, {id: action.id});
    return updatedObject(state, {
        orders: state.orders.concat(newOrders),
        loading: false,
        purchased: true
    })
}

const purchaseBurgerFailed = (state, action) => {
    return updatedObject(state, { loading:false})
}

const purchaseBurgerStart = (state, action) => {
    return updatedObject(state, {loading: true})
}

const fetchOrderStart = (state, action) => {
    return updatedObject(state, {
        orders: action.orders,
        loading: true})
}

const fetchOrderSuccess = (state, action) => {
    return updatedObject(state, {loading: false})
}

const fetchOrderFail = (state, action) => {
    return updatedObject(state, {loading:false})     
}


const reducer = (state = initialState, action) => {
switch (action.type) {
    case actionTypes.PURCHASE_INIT:return purchaseInit(state, action)
    case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action)
    case actionTypes.PURCHASE_BURGER_FAILED: return purchaseBurgerFailed(state, action)
    case actionTypes.PURCHASE_BURGER_START:return purchaseBurgerStart(state, action)
    case actionTypes.FETCH_ORDER_START:return fetchOrderStart(state, action)
    case actionTypes.FETCH_ORDER_SUCCESS:return fetchOrderSuccess(state, action)
    case actionTypes.FETCH_ORDER_FAIL:return fetchOrderFail(state, action)
        
    default:
    return state
}
}

export default reducer;