import axios from 'axios';

import { SET_USER, SET_READY, LOGOUT } from '../reducers/user';

export const setUser = payload => ({
  type: SET_USER,
  payload
})

export const setReady = payload => ({
  type: SET_READY,
  payload
})

export const logout = () => ({
  type: LOGOUT
})

export const login = (login, password, cb) => dispatch => {
  axios.post('/api/users/login', {
    login, password
  })
    .then(({ data }) => {
      dispatch(setUser(data));
      cb();
    })
    .catch(e => alert(e.response.data.message))
}

export const register = (login, password, passwordCheck, cb) => dispatch => {
  axios.post('/api/users/register', {
    login, password, passwordCheck
  })
    .then(({ data }) => {
      dispatch(setUser(data));
      alert(data.message);
      cb();
    })
    .catch(e => alert(e.response.data.message))
}

export const auth = token => dispatch => {
  axios.get('/api/users/auth', {
    headers: { Authorization: token }
  })
    .then(({ data }) => dispatch((setUser(data))))
    .catch(e => {
      console.log(e.response.data.message);
      localStorage.removeItem('token');
    })
    .finally(() => dispatch(setReady(true)))
}