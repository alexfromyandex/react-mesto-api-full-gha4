import React from 'react';
import { Link, useMatch } from 'react-router-dom';
import logo from '../images/Logo.svg';

function Header(props) {

  const routeMatch = useMatch("/signin"); 

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Mesto Russia" />
      <p className="header__user-info">{props.userData.email}
      {routeMatch ? <Link to="/signup" className="header__link">Регистрация</Link> :
        <Link to="/signin" className="header__link" onClick={props.handleLogout}>{props.loggedIn ? "Выйти" : "Войти"}</Link>}
      </p>
    </header>
  );
}

export default Header;