import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { logout } from '../redux/actions/user';

import logo from '../assets/img/logo.svg';

const Header = () => {
  const dispatch = useDispatch();
  const userElRef = useRef();

  const [isPopupOpen, setPopupOpen] = useState(false);

  const user = useSelector(({ user }) => user.currentUser);

  const onTogglePopup = () => setPopupOpen(!isPopupOpen);

  const onLogout = () => dispatch(logout());

  const handleOutsideClick = e => {
    const path = e.path || (e.composedPath && e.composedPath());
    !path.includes(userElRef.current) && setPopupOpen(false);
  }

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [])

  return (
    <header className="header">
      <div className="header__container container">
        <Link to="/" className="header__logo logo">
          <img src={logo} alt="Логотип" />
          Yo` Recipes
        </Link>
        <div className="header__auth">
          {!user && <Link to="/login" className="header__login">Войти</Link>}
          {!user && <Link to="/register" className="header__register">Зарегистрироваться</Link>}
        </div>
        {user && (
          <div ref={userElRef} onClick={onTogglePopup} className="header__user user">
            <button className={`user__btn ${isPopupOpen ? 'active' : ''}`}>{user.login}</button>
            {isPopupOpen && (
              <ul className="user__popup">
                <li className="user__popup-item">
                  <Link to="/own" className="user__popup-link">Мои рецепты</Link>
                </li>
                <li className="user__popup-item">
                  <Link to="/favorites" className="user__popup-link">Избранное</Link>
                </li>
                <li className="user__popup-item">
                  <button onClick={onLogout} className="user__popup-link header__logout">Выйти</button>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
