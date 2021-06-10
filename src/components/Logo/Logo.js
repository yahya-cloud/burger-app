import React from 'react';

import BurgerLogo from '../../assets/Images/burger-logo.png'
import Classes from './Logo.css'

const logo = (props) => (
    <img className= {Classes.Logo} src= {BurgerLogo} alt= "Burger Logo" />
);

export default logo;