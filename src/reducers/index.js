import { combineReducers } from 'redux';

import user from './user';
import meal from './meal';
import own from './own';
import favorites from './favorites';
import last from './last';

const rootReducer = combineReducers({
  user,
  meal,
  own,
  favorites,
  last
})

export default rootReducer;