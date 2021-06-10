import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga'; 


import './index.css';
import App from './App';
import burgerReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';
import {watchEvery, watchBurgerBuilder, watchOrders} from './store/sagas/index';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

// const logger = store => {
//     return next => {
//         return action => {
//             console.log('[Middleware dispatching]', action);
//             const result = next(action);
//             console.log('[Middleware] next state', store.getState());
//             return result;
//         }
//     }
// }


const rootReducer = combineReducers({
   burger: burgerReducer,
   order:  orderReducer, 
   auth: authReducer 
})

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk, sagaMiddleware))
    );

sagaMiddleware.run(watchEvery);
sagaMiddleware.run(watchBurgerBuilder);
sagaMiddleware.run(watchOrders);


const app = (
    <BrowserRouter>
       <Provider store = {store} ><App /></Provider>
    </BrowserRouter>
)

ReactDOM.render(app, document.getElementById('root'));
