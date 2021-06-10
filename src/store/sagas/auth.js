import {put, delay} from 'redux-saga/effects';

import * as actions from '../actions/index';
import axios from '../../axios-orders';


export function* logoutSaga(action){
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationTime');
    yield localStorage.removeItem('userId');
    yield put(actions.logoutSucceed());
}


export function* checkAuthTimeoutSaga(action){
   yield delay(action.expirationTime * 100000);
   yield put(actions.logoutSucceed());
} 

export function* authUserSaga(action){
   yield put(actions.authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }
    let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDwnMG5GVQc_foX61-prPy0e5znZq3_S84";
    if(!action.isSignup){
        url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDwnMG5GVQc_foX61-prPy0e5znZq3_S84";
    }
   try {
    const res = yield axios.post(url, authData);
    yield localStorage.setItem('token', res.data.idToken);
    yield localStorage.setItem('expirationTime', res.data.expiresIn);
    yield localStorage.setItem('userId', res.data.localId);
    yield put(actions.authSuccess(res.data.idToken, res.data.localId));
    yield put(actions.checkAuthTimeout(res.data.expiresIn));    
   } catch (err) {
    yield put(actions.authFail(err.response.data.error.message));
   }   

}


export function* authCheckStateSaga(action){
    const token = yield localStorage.getItem("token");
    if(!token){
      
       yield put(actions.logoutSucceed())
    }else{
        const expirationTime = yield new Date(localStorage.getItem('expirationTime'));
        const userId = yield localStorage.getItem("userId");
      
        const date = new Date();
        if(new Date() < expirationTime){
        yield put(actions.authSuccess(token, userId))
        yield put(actions.checkAuthTimeout((expirationTime.getTime() - date.getTime()) / 1000 ))   
        }
    }
}