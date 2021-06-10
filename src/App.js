import React, { Component } from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actionTypes from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
})

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
})

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
})


class App extends Component {

  render() {
    let routes = (<Switch>
      <Route path="/" exact component={BurgerBuilder} />
      <Route path="/auth"  component={asyncAuth} />
      </Switch>);
    
    if(this.props.isAuthenticated){
    routes = (<Switch>
      <Route path="/" exact component={BurgerBuilder} />
      <Route path="/checkout" component={asyncCheckout} />
      <Route path="/orders" component={asyncOrders} />
      <Route path="/logout"  component={Logout} />
      <Route path="/auth"  component={asyncAuth} />
      <Redirect to='/' />
      </Switch>)
    }
    return (
      <Layout>
      {routes}
     </Layout>
    );
  }
  
}

const mapStateToProps = state => {
  return{
   isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return{
    onAuthCheckState: dispatch(actionTypes.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
