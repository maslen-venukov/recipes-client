import axios from 'axios';

import { SET_OWN, CREATE_MEAL, REMOVE_MEAL } from '../reducers/own';

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

export const fetchOwn = token => dispatch => {
  axios.get('/api/own', {
    headers: { Authorization: token }
  })
    .then(({ data }) => dispatch(setOwn(data)))
    .catch(e => console.log(e))
}

export const fetchCreateMeal = (meal, token) => dispatch => {
  axios.post('/api/own', meal, {
    headers: { Authorization: token }
  })
    .then(({ data }) => {
      alert('Рецепт успешно создан');
      dispatch(createMeal(data));
    })
    .catch(e => console.log(e))
}

export const fetchRemoveMeal = id => dispatch => {
  axios.delete(`/api/own/${id}`)
    .then(() => {
      alert('Рецепт успешно удален');
      dispatch(removeMeal(id));
    })
    .catch(e => console.log(e));
}