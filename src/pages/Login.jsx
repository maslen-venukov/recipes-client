import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { login } from '../redux/actions/user';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [form, setForm] = useState({
    login: '',
    password: ''
  })

  const onInputChange = e => setForm({ ...form, [e.target.name]: e.target.value});

  const onLogin = e => {
    e.preventDefault();
    dispatch(login(form.login, form.password));
    history.goBack();
  }

  return (
    <section onSubmit={onLogin} className="auth">
      <div className="auth__container container">
        <form className="auth__form">
          <h1 className="auth__title title">Авторизация</h1>
          <input onChange={onInputChange} value={form.login} type="text" placeholder="Логин" name="login" className="auth__input input" />
          <input onChange={onInputChange} value={form.password} type="password" placeholder="Пароль" name="password" className="auth__input input" />
          <button className="auth__btn btn">Войти</button>
        </form>
      </div>
    </section>
  )
}

export default Login;