import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { register } from '../redux/actions/user';

const Register = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    login: '',
    password: '',
    passwordCheck: ''
  })

  const onInputChange = e => setForm({ ...form, [e.target.name]: e.target.value});

  const onRegister = e => {
    e.preventDefault();
    dispatch(register(form.login, form.password, form.passwordCheck));
  }

  return (
    <section onSubmit={onRegister} className="auth">
      <div className="auth__container container">
        <form className="auth__form">
          <h1 className="auth__title title">Регистрация</h1>
          <input onChange={onInputChange} value={form.login} type="text" placeholder="Логин" name="login" className="auth__input input" />
          <input onChange={onInputChange} value={form.password} type="password" placeholder="Пароль" name="password" className="auth__input input" />
          <input onChange={onInputChange} value={form.passwordCheck} type="password" placeholder="Повторите пароль" name="passwordCheck" className="auth__input input" />
          <button className="auth__btn btn">Зарегистрироваться</button>
        </form>
      </div>
    </section>
  )
}

export default Register;