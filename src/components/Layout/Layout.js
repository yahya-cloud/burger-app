import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxillary';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Toolbar from '../Toolbar/Toolbar';
import classes from './Layout.css';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    closeSideDrawerHandler = () => {
        this.setState({
            showSideDrawer:false
        })
    }

    openSideDrawerHandler = () => {
        this.setState({
           showSideDrawer: true 
        })
    }


    render(){
        return(
            <Aux>
            <Toolbar
            isAuth= {this.props.isAuthenticated}  
            open= {this.state.showSideDrawer} 
            clicked= {this.openSideDrawerHandler} />
            <SideDrawer
            isAuth= {this.props.isAuthenticated}  
            open = {this.state.showSideDrawer} 
            clicked= {this.closeSideDrawerHandler}/> 
            <div className= {classes.Content} >{this.props.children}</div>
        </Aux>
        )
    }
  
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }    
}

export default connect(mapStateToProps)(Layout);

