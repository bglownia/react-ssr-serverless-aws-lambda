import { Map } from 'immutable';

/* state shape
{
    'key': {
        data: {}, // data object (mapResponseToData) null if do not have any data yet
        isFetching: true|false, // bool if data is fetching at the moment
        fetchedAt: Date // time when fetched,
        fetchingError: true // bool if error occured while fetching data
    }, ...
}
*/

const initialState = Map({});

export default ({
  types = [],
  mapActionToData = action => action.data,
  dataKey = action => new Map(action.params),
}) =>
  (state = initialState, action) => {
    if (!types.includes(action.type)) {
      return state;
    }
    let keyValue = typeof dataKey === 'function' ? dataKey(action) : dataKey;
    if (!keyValue) {
      return state;
    }
    if (!Array.isArray(keyValue)) {
      keyValue = [keyValue];
    }
    const keyState = state.getIn(
      keyValue,
      Map({
        data: null,
        isFetching: true,
        fetchingError: null,
        fetchedAt: 0,
      }),
    );

    switch (action.type) {
      case types[0]:
        return state.setIn(keyValue, keyState.merge({
          isFetching: true,
          fetchingError: null,
        }));

      case types[1]:
        return state.setIn(keyValue, keyState.merge({
          data: mapActionToData(action),
          isFetching: false,
          fetchedAt: new Date().getTime(),
          fetchingError: null,
        }));

      case types[2]:
        return state.setIn(keyValue, keyState.merge({
          isFetching: false,
          fetchingError: action.error,
        }));

      default:
        return state;
    }
  };
