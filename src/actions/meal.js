import axios from 'axios';

import { ADD_RANDOM, SET_CURRENT_MEAL, SET_LOADING } from '../reducers/meal';

const addRandom = payload => ({
  type: ADD_RANDOM,
  payload
})

export const setCurrentMeal = payload => ({
  type: SET_CURRENT_MEAL,
  payload
})

const setLoading = payload => ({
  type: SET_LOADING,
  payload
})

export const fetchRandom = () => dispatch => {
  dispatch(setLoading(true));
  axios.get('/api/meal/random')
    .then(({ data }) => dispatch(addRandom(data)))
    .catch(e => console.log(e))
    .finally(() => dispatch(setLoading(false)))
}

export const fetchCurrentMeal = id => dispatch => {
  dispatch(setLoading(true));
  axios.get(`/api/meal/${id}`)
    .then(({ data }) => dispatch(setCurrentMeal(data)))
    .catch(e => console.log(e))
    .finally(() => dispatch(setLoading(false)))
}

// TODO выделить свои, последние и избранные блюда, как отдельные сущности в редаксе + на сервере сделать им отдельные роуты