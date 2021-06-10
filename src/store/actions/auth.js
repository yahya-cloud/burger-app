// import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
   return{
       type: actionTypes.AUTH_START
   }
}

export const authSuccess = (token, userId) => {
    return{
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    }
}

export const authFail = (err) => {
    return{
        type: actionTypes.AUTH_FAIL,
        error: err
    }
}

export const logout =  () => {
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT
    }
}

export const logoutSucceed = () => {
    return{
        type: actionTypes.AUTH_LOGOUT
    }
}


export const authRedirectPath = (path) => {
    return {
        type: actionTypes.AUTH_REDIRECT_PATH,
        path: path
    }
}

export const checkAuthTimeout = (expiresTime) => {
    return {        
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime: expiresTime
    }
}

export const auth = (email, password, isSignup) => {
    // return dispatch => {
    //     dispatch(authStart());
    //     const authData = {
    //         email: email,
    //         password: password,
    //         returnSecureToken: true
    //     }
    //     let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDwnMG5GVQc_foX61-prPy0e5znZq3_S84";
    //     if(!isSignup){
    //         url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDwnMG5GVQc_foX61-prPy0e5znZq3_S84";
    //     }
    //     axios.post(url, authData)
    //     .then(res => {
    //         // console.log(res);
    //         localStorage.setItem('token', res.data.idToken);
    //         localStorage.setItem('expirationTime', res.data.expiresIn);
    //         localStorage.setItem('userId', res.data.localId);
    //         dispatch(authSuccess(res.data.idToken, res.data.localId));
    //         dispatch(checkAuthTimeout(res.data.expiresIn));
    //     })
    //     .catch(err => {
    //         dispatch(authFail(err.response.data.error.message))
    //     })
    // }
    return {
        type: actionTypes.AUTH_USER,
        email: email,
        password: password,
        isSignup: isSignup
    }
}

export const authCheckState = () => {
    // return dispatch => {
    //     const token = localStorage.getItem("token");
    //     if(!token){
          
    //         dispatch(logout())
    //     }else{
    //         const expirationTime = new Date(localStorage.getItem('expirationTime'));
    //         const userId = localStorage.getItem("userId");
          
    //         const date = new Date();
    //         if(new Date() < expirationTime){
    //         dispatch(authSuccess(token, userId))
    //         dispatch(checkAuthTimeout((expirationTime.getTime() - date.getTime()) / 1000 ))   
    //         }
    //     }
    // }
    return {
        type: actionTypes.AUTH_CHECK_STATE
    }
}

