import React from 'react';

import Logo from '../Logo/Logo';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems';
import Classes from './Toolbar.css';

const toolbar = (props) => (
  <div>
        <header className= {Classes.Toolbar}>
        <div onClick={props.clicked}>
          <div className={Classes.Icon}></div>
          <div className={Classes.Icon}></div>
          <div className={Classes.Icon}></div>
        </div>
        <div className={Classes.Logo}>
        <Logo />
        </div>
      <nav className= {Classes.DesktopOnly}>
      <NavigationItems authenticated= {props.isAuth}/>
      </nav>  

</header>

  </div>

);

export default toolbar;