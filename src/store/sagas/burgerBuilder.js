import {put} from 'redux-saga/effects';

import axios from '../../axios-orders'; 
import * as actions from '../actions/index';

export function* fetchIngredientsSaga(action){
    try{
    const res = yield axios.get('https://burger-builder-d34c6.firebaseio.com/ingredients.json');           
    yield put(actions.setIngredients(res.data))
    }catch(err){
       yield put(actions.fetchIngredientsFailed());
    }
}