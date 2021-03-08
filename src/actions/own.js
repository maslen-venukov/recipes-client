import axios from 'axios';

import { SET_OWN, CREATE_MEAL, REMOVE_MEAL, UPDATE_MEAL } from '../reducers/own';

import url from '../apiUrl';

const setOwn = payload => ({
  type: SET_OWN,
  payload
})

const createMeal = payload => ({
  type: CREATE_MEAL,
  payload
})

const removeMeal = payload => ({
  type: REMOVE_MEAL,
  payload
})

const updateMeal = payload => ({
  type: UPDATE_MEAL,
  payload
})

export const fetchOwn = token => dispatch => {
  axios.get(`${url}/api/own`, {
    headers: { Authorization: token }
  })
    .then(({ data }) => dispatch(setOwn(data)))
    .catch(e => console.log(e))
}

export const fetchCreateMeal = (formData, token, cb) => dispatch => {
  axios.post(`${url}/api/own`, formData, {
    headers: { Authorization: token }
  })
    .then(({ data }) => {
      alert('Рецепт успешно создан');
      dispatch(createMeal(data));
      cb();
    })
    .catch(e => console.log(e.response.data.message));
}

export const fetchUpdateMeal = (id, formData, token, cb) => dispatch => {
  axios.patch(`${url}/api/own/${id}`, formData, {
    headers: { Authorization: token }
  })
    .then(({ data }) => {
      alert('Рецепт успешно изменен');
      dispatch(updateMeal({ id, meal: data }));
      cb();
    })
    .catch(e => console.log(e.response));
}

export const fetchRemoveMeal = (id, token) => dispatch => {
  axios.delete(`${url}/api/own/${id}`, {
    headers: { Authorization: token }
  })
    .then(() => {
      alert('Рецепт успешно удален');
      dispatch(removeMeal(id));
    })
    .catch(e => console.log(e));
}