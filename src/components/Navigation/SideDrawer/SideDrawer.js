import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.css'
import BackDrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Auxillary'

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close]

    if(props.open){
        attachedClasses = [classes.SideDrawer, classes.Open]
    }
    return(
        <Aux>
        <BackDrop show= {props.open} clicked ={props.clicked}/>
        <div className= {attachedClasses.join(' ')} onClick={props.clicked}>
        <div className= {classes.Logo}>
        <Logo />
        </div>
        <nav className= {classes.Nav}>
            <NavigationItems  authenticated= {props.isAuth}/>
        </nav>
        </div>
        </Aux>
    )
};

export default sideDrawer;