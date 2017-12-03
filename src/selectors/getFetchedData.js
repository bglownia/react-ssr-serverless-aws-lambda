import { is } from 'immutable';
import { defaultMemoize, createSelectorCreator } from 'reselect';

// Create a "selector creator" that uses immutable.is instead of ===
const createImmutableIsSelector = createSelectorCreator(defaultMemoize, is);

export default stateKey =>
  createImmutableIsSelector(
    (state, dataKey = []) =>
      state[stateKey].getIn(Array.isArray(dataKey) ? dataKey : [dataKey]),
    state => (state ? state.toObject() : {}),
  );
