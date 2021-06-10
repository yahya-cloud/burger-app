import React, { Component } from 'react';
import { Redirect, Route } from 'react-router';
import {connect} from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../ContactData/ContactData'

class Checkout extends Component{

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    

    render(){
        let summary = <Redirect to='/' />;
        let purchasedBurger = this.props.purchased ?  <Redirect to="/" /> : null;
         if(this.props.ings){
             summary =(<div>
              {purchasedBurger}
                <CheckoutSummary
                 checkoutCancel={this.checkoutCancelledHandler}
                 checkoutContinue={this.checkoutContinueHandler}
                 ingredients= {this.props.ings}/>
                 <Route path={this.props.match.path + "/contact-data"} 
                 component= {ContactData} />
                {/* <Route path={this.props.match.path + "/contact-data"} render={() => <ContactData ingredients={this.props.ings} price= {this.props.price} /> }  /> */}
                </div>)
         }
        return summary
    }
};
const mapStateToProps = state => {
    return{
        ings: state.burger.ingredients,
        purchased: state.order.purchased
    }
}
export default connect(mapStateToProps)(Checkout);