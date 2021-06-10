import React from 'react';

import classes from './Input.css'

const input = (props) => {

    let inputElement = null;
    const inputClasses = [classes.InputElement];
    let errorMessage = null;

    if(props.inValid && props.shouldValidate && props.isTouched){
        inputClasses.push(classes.Invalid)
        errorMessage = (<p>Please enter valid value</p>)
    }
    
    switch (props.elementType) {
        case ('input'):
        inputElement = <input
        className={inputClasses.join(' ')} 
        {...props.elementConfig}
        value={props.value} 
        onChange={props.changed}
        />
        break;

        case ('text-area'):
        inputElement = <textarea
        className={inputClasses.join(' ')} 
        {...props.elementConfig}
        value={props.value} 
        onChange={props.changed}
        />    
        break;

        case ('select'):
            inputElement = (
            <select
            className={inputClasses.join(' ')} 
            value={props.value}
            onChange={props.changed}>
            {props.elementConfig.options.map(option =>(
                <option key={option.value} value={option.value}> {option.displayValue} </option>
            ))}
            </select> 
             ); 
        break;

        

        default:
         inputElement =(
        <input className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value} 
        onChange={props.changed}
        />  )
        break;
    }

    return(
    <div className={classes.Input} >
   <label className={classes.Label} >{props.label}</label>
   {inputElement}
   {errorMessage}
    </div>
    );
}

export default input;