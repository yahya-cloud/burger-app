import React, { Component } from 'react';

import Aux from '../../../hoc/Auxillary'
import Button from '../../UI/Button/Button'


class OrderSummary extends Component {

    render(){
        const ingredientSummary =  Object.keys(this.props.ingredient)
        .map(igKeys => {
           return <li key={igKeys}><span style= {{textTransform: 'uppercase'}}>{igKeys}</span>:{this.props.ingredient[igKeys]} </li>
        })

        return( 
        <Aux>
        
            <h3>Your orders</h3>
            <p>Your order will be delivered with the following delicious Ingredients</p>
            <ul>
            {ingredientSummary}
            </ul>
            <p><strong>Total Price: Rs{this.props.price}</strong></p>

            <Button btnType= "Danger" clicked= {this.props.canceled}>CANCEL</Button>
            <Button btnType= "Success" clicked= {this.props.continue}>CONTINUE</Button>
        </Aux>);
    }
}   

export default OrderSummary;