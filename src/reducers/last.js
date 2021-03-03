export const SET_LAST = 'SET_LAST';

const initialState = null;

const last = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_LAST:
      return payload;
  
    default:
      return state;
  }
}

export default last;