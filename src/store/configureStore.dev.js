import { createStore, compose, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import api from '../middleware/api';
import rootReducer from '../reducers';

const loadReducers = () => import('../reducers');

const stateTransformer = state =>
  Object.assign(
    {},
    state,
    Object.keys(state).reduce(
      (newState, currentKey) =>
        Object.assign(
          newState,
          state[currentKey] && state[currentKey].toJS ?
            { [currentKey]: state[currentKey].toJS() } :
            {},
        ),
      {},
    ),
  );

export default function configureStore(initialState) {
  const composeEnhancers = (
    // eslint-disable-next-line no-underscore-dangle
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
    compose
  );
  const middleware = [thunk, api, createLogger({ stateTransformer })];
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware)),
  );
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept(
      '../reducers',
      () => loadReducers().then(nextRootReducer => store.replaceReducer(nextRootReducer.default)),
    );
  }
  return store;
}
