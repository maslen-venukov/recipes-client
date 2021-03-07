import axios from 'axios';

import { SET_FAVORITES, REMOVE_FAVORITE, ADD_FAVORITE } from '../reducers/favorites';

const setFavorites = payload => ({
  type: SET_FAVORITES,
  payload
})

const removeFavorite = payload => ({
  type: REMOVE_FAVORITE,
  payload
})

const addFavorite = payload => ({
  type: ADD_FAVORITE,
  payload
})

export const fetchFavorites = token => dispatch => {
  axios.get('/api/favorites', {
    headers: { Authorization: token }
  })
    .then(({ data }) => dispatch(setFavorites(data)))
    .catch(e => console.log(e))
}

export const fetchRemoveFavorite = (id, token) => dispatch => {
  axios.delete(`/api/favorites/${id}`, {
    headers: { Authorization: token }
  })
    .then(() => {
      alert('Рецепт удален из избранного');
      dispatch(removeFavorite(id));
    })
    .catch(e => console.log(e));
}

export const fetchAddFavorite = (id, token) => dispatch => {
  axios.post(`/api/favorites/${id}`, {}, {
    headers: { Authorization: token }
  })
    .then(({ data }) => {
      alert('Рецепт добавлен в избранное');
      dispatch(addFavorite(data));
    })
    .catch(e => console.log(e))
}