import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className= {classes.NavigationItems}>
    <NavigationItem link="/" > Burger Builder </NavigationItem>
    {props.authenticated ? <NavigationItem link="/orders" > Orders </NavigationItem> : null}
    { props.authenticated ? 
     <NavigationItem link="/logout">Logout </NavigationItem> 
     :<NavigationItem link="/auth">Authentication </NavigationItem>  }
    </ul>
);

export default navigationItems;