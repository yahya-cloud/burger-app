import React from 'react';
import {withRouter} from 'react-router-dom';

import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';


const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
    .map(igKeys => {
        return [...Array(props.ingredients[igKeys])].map( (_,i) => {
         return   <BurgerIngredient key={igKeys + i} type= {igKeys} />
        })
    })
    .reduce((arr, el) => arr.concat(el) ,[]);

  if(transformedIngredients.length === 0){
      transformedIngredients = <p>Please add some Ingredients</p>
  }

    return(
        <div className= {classes.Burger}>
            <BurgerIngredient type= "bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type= "bread-bottom"/>
        </div>
    );
}

export default  withRouter(burger);