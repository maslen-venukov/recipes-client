export const SET_FAVORITES = 'SET_FAVORITES';
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';

const initialState = null;

const favorites = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_FAVORITES:
      return payload;

    case ADD_FAVORITE:
      return [...state, payload];

    case REMOVE_FAVORITE:
      return state.filter(favorite => favorite._id !== payload);
  
    default:
      return state;
  }
}

export default favorites;