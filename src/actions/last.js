import axios from 'axios';

import { SET_LAST } from '../reducers/last';

const setLast = payload => ({
  type: SET_LAST,
  payload
})

export const fetchLast = () => dispatch => {
  axios.get('/api/meal/last')
    .then(({ data }) => dispatch(setLast(data)))
    .catch(e => console.log(e))
}