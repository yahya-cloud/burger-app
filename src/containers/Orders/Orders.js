import React, { Component } from 'react';

import Order from '../../components/Order/Order'; 
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';

import * as actionCreator from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {


    componentDidMount(){
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }                  
       

    render(){

        let order = <Spinner />
        if(this.props.loading){
            order = this.props.orders.map(order => (
                <Order
                 ingredients= {order.ingredients}
                 key={order.id}
                 price={+order.totalPrice} />
            ))
        }
        return(
        <div>
           {order}
        </div>    
        )
    }
}

const mapStateToProps = state => {
    return{
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
}
}

const mapDispatchToProps = dispatch => {
    return{
        onFetchOrders: (token, userId) => dispatch(actionCreator.fetchOrders(token, userId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders, axios));