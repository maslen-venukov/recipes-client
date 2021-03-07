export const SET_OWN = 'SET_OWN';
export const CREATE_MEAL = 'CREATE_MEAL';
export const REMOVE_MEAL = 'REMOVE_MEAL';
export const UPDATE_MEAL = 'UPDATE_MEAL';

const initialState = null;

const own = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_OWN:
      return payload;

    case CREATE_MEAL:
      return [payload, ...state];

    case REMOVE_MEAL:
      return state.filter(meal => meal._id !== payload);

    case UPDATE_MEAL:
      return state.map(meal => meal._id === payload.id ? payload.meal : meal);
  
    default:
      return state;
  }
}

export default own;