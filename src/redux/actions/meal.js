import axios from 'axios';

export const addRandom = payload => ({
  type: 'ADD_RANDOM',
  payload
})

export const setOwn = payload => ({
  type: 'SET_OWN',
  payload
})

export const setLast = payload => ({
  type: 'SET_LAST',
  payload
})

export const setLoading = payload => ({
  type: 'SET_LOADING',
  payload
})

export const setCurrentMeal = payload => ({
  type: 'SET_CURRENT_MEAL',
  payload
})

export const createMeal = payload => ({
  type: 'CREATE_MEAL',
  payload
})

export const removeMeal = payload => ({
  type: 'REMOVE_MEAL',
  payload
})

export const setFavorites = payload => ({
  type: 'SET_FAVORITES',
  payload
})

export const removeFavorite = payload => ({
  type: 'REMOVE_FAVORITE',
  payload
})

export const addFavorite = payload => ({
  type: 'ADD_FAVORITE',
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

export const fetchOwn = token => dispatch => {
  axios.get('/api/meal/own', {
    headers: { Authorization: token }
  })
    .then(({ data }) => dispatch(setOwn(data)))
    .catch(e => console.log(e))
}

export const fetchLast = () => dispatch => {
  axios.get('/api/meal/last')
    .then(({ data }) => dispatch(setLast(data)))
    .catch(e => console.log(e))
}

export const fetchCreateMeal = (meal, token) => dispatch => {
  axios.post('/api/meal', meal, {
    headers: { Authorization: token }
  })
    .then(({ data }) => {
      alert('Рецепт успешно создан');
      dispatch(createMeal(data));
    })
    .catch(e => console.log(e))
}

export const fetchRemoveMeal = id => dispatch => {
  axios.delete(`/api/meal/${id}`)
    .then(() => {
      alert('Рецепт успешно удален');
      dispatch(removeMeal(id));
    })
    .catch(e => console.log(e));
}

export const fetchFavorites = token => dispatch => {
  axios.get('/api/favorites', {
    headers: { Authorization: token }
  })
    .then(({ data }) => dispatch(setFavorites(data)))
    .catch(e => console.log(e))
}

export const fetchRemoveFavorite = id => dispatch => {
  axios.delete(`/api/favorites/${id}`)
    .then(() => {
      alert('Рецепт успешно удален из избранного');
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