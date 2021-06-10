import React, { Component } from 'react';
import {connect} from 'react-redux';

import * as burgerActions from '../../store/actions/index';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../../hoc/Auxillary';
import Spinner from '../../components/UI/Spinner/Spinner';

import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';



export class BurgerBuilder extends Component{

     state = {

        totalPrice: 4,
        purchasing: false,
    }

    componentDidMount(){
        this.props.onInitIngredients()
    }

    updatePurchasableState = (ingredients) => { 
       const sum = Object.keys(ingredients)
       .map(igKeys => {
           return ingredients[igKeys]
       }) 
       .reduce((acc, el) => {
           return acc + el
       } ,0)
       return sum > 0      
    }

    // addIngredients = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const newIngredients = {
    //         ...this.state.ingredients
    //     };
    //     newIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENT_PRICE[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({ingredients: newIngredients, totalPrice: newPrice});
    //     this.updatePurchasableState(newIngredients)
    // }

    // removeIngredients = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if(oldCount <= 0){
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const newIngredients = {
    //         ...this.state.ingredients
    //     };
    //     newIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENT_PRICE[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceAddition;
    //     this.setState({ingredients: newIngredients, totalPrice: newPrice})
    //     this.updatePurchasableState(newIngredients)
    // }

    updatePurchaseHandler = () => {
        
        if(this.props.authenticated){
            let prevPurchasing = !this.state.purchasing;
            this.setState({purchasing: prevPurchasing})
        }else{
            this.props.onAuthRedirectPath()
            this.props.history.push('/auth');
        }

        
    }

    updateCancelPurchaseHandler = () => {
        this.setState({purchasing: false})
    }

    updateContinueHandler =  () => {
    this.props.onInitPurchase()
    this.props.history.push('/checkout');
    }


render(){

        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let content =  null;

        let burger = this.state.error ? <p>ingredients Not Found</p> : <Spinner />;

        if(this.props.ings){
            burger = (
                <Aux>
                    <Burger ingredients= {this.props.ings}/>
                    <BuildControls 
                        ingredientAdded = {this.props.onAddIngredient}
                        ingredientRemove = {this.props.onRemoveIngredient}
                        isAuth = {this.props.authenticated}
                        disabled = {disabledInfo}
                        price = {this.props.price}
                        purchasable = {this.updatePurchasableState(this.props.ings)  }
                        ordered = {this.updatePurchaseHandler}
                    />
                </Aux>);


                    content =  <OrderSummary
                    price= {this.props.price}
                    canceled= {this.updateCancelPurchaseHandler}
                    continue= {this.updateContinueHandler}
                    ingredient= {this.props.ings}/>
        }
         
        if(this.props.err){
            content = <Spinner />
            console.log('loading...');
        }

        return(
          
          
        <Aux>
        <Modal
        show= {this.state.purchasing}
        cancel = {this.updateCancelPurchaseHandler}>
         {content} 
        </Modal>    
         {burger}
          
        </Aux>
        );   
    }
}

const mapStateToProps = state => {
    return{
       ings: state.burger.ingredients,
       price: state.burger.totalPrice,
       err: state.burger.error,
       authenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onAddIngredient: (ingType) => dispatch(burgerActions.addIngredient(ingType)),
        onRemoveIngredient: (ingType) => dispatch(burgerActions.removeIngredient(ingType)),
        onInitIngredients: () => dispatch(burgerActions.fetchIngredients()),
        onInitPurchase: () => dispatch(burgerActions.purchaseInit()),
        onAuthRedirectPath: () => dispatch(burgerActions.authRedirectPath('/checkout'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
