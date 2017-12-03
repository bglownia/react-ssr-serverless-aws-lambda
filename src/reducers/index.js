import { combineReducers } from 'redux';
import heroes from './heroes';
import heroesOrigins from './heroesOrigins';

export default combineReducers({
  heroes,
  heroesOrigins,
});
