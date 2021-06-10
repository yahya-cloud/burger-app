import React, { Component } from 'react';
import { withRouter } from 'react-router';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import Input from '../../components/UI/Input/Input';
import { connect } from 'react-redux';
import checkValidity from '../../shared/checkValidity';

class ContactData extends Component{

    state={
      orderForm:{
          name:{
            elementType:"input",
            elementConfig:{
                type:"text",
                placeholder:"Your Name"
            },
            value:"",
            validation:{
                required: true
            },
            valid: false,
            touched: false
          },
          state:{
              elementType:"input",
              elementConfig:{
                  type:"text",
                  placeholder:"Your State"
              },
              value:"",
             validation:{
                required: true
            },
            valid: false,
            touched: false
          },  
          street:{
            elementType:"input",
            elementConfig:{
                type:"text",
                placeholder:"Street"
            },
            value:"",
            validation:{
               required: true
           },
           valid: false,
           touched: false
          },
          pinCode: {
            elementType:"input",
            elementConfig:{
                type:"text",
                placeholder:"ZIP Code"
            },
            value:"",
            validation:{
               required: true,
               maxSize: 5,
               minSize: 5
           },
           valid: false,
           touched: false
          },
          email:{
            elementType:"input",
            elementConfig:{
                type:"email",
                placeholder:"Your Email"
            },
            value:"",
            validation:{
               required: true,
               checkEmail: true
           },
           valid: false,
           touched: false
          },
         deliveryMethod:{
            elementType:"select",
            elementConfig:{
                type:"text",
                options:[
                    {value:"fastest", displayValue:"fastest"},
                    {value:"Cheapest", displayValue:"Cheapest"}
                ]
            },
            value:"fastest",
            validation:{},
            valid: true,
            touched: false 
         }          
     }, 
        formIsValid: false
    }

    

    order = (event) => {
        this.setState({loading: true})
        const formData = {};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        const orders = 
            {
                ingredients:{...this.props.ings},
                totalPrice: this.props.price,
                contactData: formData,
                userId: this.props.userId
            }
        
        this.props.onOrderBurger(orders, this.props.token);    
        event.preventDefault();
       
    }


    changeInputHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
        ...this.state.orderForm
    }
    const updatedFormElement = {
        ...updatedOrderForm[inputIdentifier]
    }

    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched =  true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    
    let formIsValid = true;
    for(let inputIdentifier in updatedOrderForm){
        formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    
    }

    render(){

        const inputElements = [];

        for(let key in this.state.orderForm){
            inputElements.push({
                id:key,
                config: this.state.orderForm[key]
            })
        }
        
        let form = (
             <form>
    
            {inputElements.map(el => {
                return <Input
                key= {el.id}
                elementType={el.config.elementType}
                elementConfig={el.config.elementConfig}
                value={el.config.value}
                inValid={!el.config.valid}
                shouldValidate = {el.config.validation}
                isTouched = {el.config.touched} 
                changed={(event) => this.changeInputHandler(event,el.id)}
                />
            })}
            <Button disabled={!this.state.formIsValid} clicked={this.order} btnType="Success">Order</Button>
        </form>
        );

        if(this.props.loading){
            form = <Spinner />
        }

        

        return (
            <div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
         {form}
        </div>
        
        )
    }
}



const mapStateToProps = state => {
 return{
    ings: state.burger.ingredients,
    price: state.burger.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
 }
}


const mapDispatchToProps = dispatch => {
    return{
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withErrorHandler(ContactData, axios)));
