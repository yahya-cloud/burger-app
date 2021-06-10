import React, { Component } from 'react';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';

import * as actionCreator from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router';
import checkValidity from '../../shared/checkValidity';

class  Auth extends Component {

    state = {
        controls: {
            email:{
                elementType:"input",
                elementConfig:{
                    typ:"email",
                    placeholder:"Email Address"
                },
                value:"",
                validation:{
                    required: true,
                    checkEmail: true
                },
                valid: false,
                touched: false
              },
            password:{
                elementType:"input",
                elementConfig:{
                    type:"password",
                    placeholder:"Enter Password"
                },
                value:"",
                validation:{
                    required: true,
                    minSize: 5
                },
                valid: false,
                touched: false
              }
        },
        isSignup: true
    }

    componentDidMount(){
        if(!this.props.building && this.props.authRedirectPath !== '/'){
            this.props.authRedirectPath()
        }
    }

    changeInputHandler(event, inputIdentifier){
        const updatedControls = {
            ...this.state.controls
        }
        const updatedControlElement = {
           ...updatedControls[inputIdentifier]
        }

        updatedControlElement.value = event.target.value;
        updatedControlElement.valid = checkValidity(updatedControlElement.value, updatedControlElement.validation);
        updatedControlElement.touched = true;

        updatedControls[inputIdentifier] = updatedControlElement

        this.setState({controls: updatedControls})

    }

    submit(event){
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
    }

    switchAuthModeHandler = () => {
     this.setState(prevState => {
         return {isSignup: !prevState.isSignup};
     })
    }

    render(){
    
        const inputElements = [];

        for(let key in this.state.controls){
            inputElements.push({
                id:key,
                config: this.state.controls[key]
            })
        }   
        
        
        let form = (inputElements.map(el => {
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
           })
       );

    

       if(this.props.loading){
           form = <Spinner />
       }

       let errorMessage = null;
       if(this.props.error){
           errorMessage = (<h3> {this.props.error} </h3>)
       }


       let authenticate = null;
       if(this.props.authenticated){
           authenticate = <Redirect to={this.props.authRedirectPath}/>
       }

        return (
        <div className={classes.Auth}>
        {authenticate}
        {errorMessage}
        <form onSubmit={ (event) => this.submit(event)}>
        {form}
        <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button clicked={this.switchAuthModeHandler} btnType="Danger">CLICK TO {this.state.isSignup ? "SIGNIN" : "SIGNUP"} </Button>
        </div>
        )
    }

}

const mapStateToProps = state => {
    return{
        loading: state.auth.loading,
        error: state.auth.error,
        authenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath,
        building: state.burger.building
    }
}


const mapDispatchToProps = dispatch => {
    return{
        onAuth: (email, password, isSignup) => dispatch(actionCreator.auth(email, password, isSignup)),
        onAuthRedirect: () => dispatch(actionCreator.authRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);