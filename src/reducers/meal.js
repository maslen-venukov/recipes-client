export const ADD_RANDOM = 'ADD_RANDOM';
export const SET_LAST = 'SET_LAST';
export const SET_CURRENT_MEAL = 'SET_CURRENT_MEAL';
export const SET_LOADING = 'SET_LOADING';

const initialState = {
  random: [],
  last: null,
  currentMeal: null,
  isLoading: false
}

const meal = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_RANDOM:
      return {
        ...state,
        random: [...state.random, payload]
      }

    case SET_LAST:
      return {
        ...state,
        last: payload
      }

    case SET_CURRENT_MEAL:
      return {
        ...state,
        currentMeal: payload
      }

    case SET_LOADING:
      return {
        ...state,
        isLoading: payload
      }
  
    default:
      return state;
  }
}

export default meal;