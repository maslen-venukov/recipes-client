const initialState = {
  random: [],
  favorites: null,
  own: null,
  last: null,
  currentMeal: null,
  isLoading: false
}

const meal = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'ADD_RANDOM':
      return {
        ...state,
        random: [...state.random, payload]
      }

    case 'SET_OWN':
      return {
        ...state,
        own: payload
      }

    case 'SET_LAST':
      return {
        ...state,
        last: payload
      }

    case 'SET_CURRENT_MEAL':
      return {
        ...state,
        currentMeal: payload
      }

    case 'CREATE_MEAL':
      return {
        ...state,
        own: [...state.own, payload]
      }

    case 'REMOVE_MEAL':
      return {
        ...state,
        own: state.own.filter(meal => meal._id !== payload)
      }

    case 'SET_FAVORITES':
      return {
        ...state,
        favorites: payload
      }

    case 'ADD_FAVORITE':
      return {
        ...state,
        favorites: [...state.favorites, payload]
      }

    case 'REMOVE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter(favorite => favorite._id !== payload)
      }

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: payload
      }
  
    default:
      return state;
  }
}

export default meal;