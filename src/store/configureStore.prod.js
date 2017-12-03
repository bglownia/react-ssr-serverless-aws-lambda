import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import api from '../middleware/api';

export default function configureStore(initialState) {
  const middlewere = applyMiddleware(thunk, api);
  const store = createStore(
    rootReducer,
    initialState,
    middlewere,
  );
  return store;
}
