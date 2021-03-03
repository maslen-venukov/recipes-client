export const SET_OWN = 'SET_OWN';
export const CREATE_MEAL = 'CREATE_MEAL';
export const REMOVE_MEAL = 'REMOVE_MEAL';

const initialState = null;

const own = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_OWN:
      return payload;

    case CREATE_MEAL:
      return [...state, payload];

    case REMOVE_MEAL:
      return state.filter(meal => meal._id !== payload);
  
    default:
      return state;
  }
}

export default own;