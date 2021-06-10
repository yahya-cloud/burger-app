import React from 'react';
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
]

const buildControls = (props) => (
    <div className= {classes.BuildControls}>
    <p> <strong>Rs. {props.price.toFixed(2)}</strong> </p>

     {controls.map(ctrl => (
         <BuildControl 
         label = {ctrl.label}
         key = {ctrl.label}
         added = {() => props.ingredientAdded(ctrl.type)}
         removed = {() => props.ingredientRemove(ctrl.type)} 
         disabled = {props.disabled[ctrl.type]}
         />
     ))}
    
     <button 
     disabled= {!props.purchasable}
     className= {classes.OrderButton}
     onClick= {props.ordered} >{props.isAuth ? 'ORDER' : 'SIGN UP TO ORDER'} </button>
     
    </div>
);

export default buildControls;