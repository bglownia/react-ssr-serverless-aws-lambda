import { Map } from 'immutable';
import CALL_API from './callApi';

export const DEFAULT_CACHE_TTL = 5 * 60 * 1000;

const fetchData = (
  types,
  endpoint,
  params,
  constParams,
  method,
  mapRequestParams,
) => (dispatch, getState) => {
  let data = Object.assign(
    {},
    typeof constParams === 'function' ? constParams() : constParams,
    params,
  );
  if (mapRequestParams) {
    data = mapRequestParams(data, getState);
  }
  return dispatch({
    [CALL_API]: {
      types,
      endpoint,
      method,
      data,
    },
    params,
  });
};

const shouldFetchData = (state, dataKey, cacheTTL) => {
  const dataState = state.getIn(dataKey);
  if (!dataState) {
    return true;
  }

  if (
    !dataState.get('isFetching') &&
    (
      dataState.get('fetchingError') ||
      !dataState.get('data') ||
      !dataState.get('fetchedAt') ||
      (
        cacheTTL !== false &&
        dataState.get('fetchedAt') + cacheTTL < new Date().getTime()
      )
    )
  ) {
    return true;
  }

  return false;
};

export default ({
  types,
  endpoint,
  stateKey,
  constParams = {},
  dataKey = params => new Map(params),
  method = 'get',
  mapRequestParams = false,
}) =>
  (params = null, cacheTTL = DEFAULT_CACHE_TTL) =>
    (dispatch, getState) => {
      const requestParams = params instanceof Map ? params.toJS() : params;
      const dataKeyValue = [].concat(typeof dataKey === 'function' ? dataKey(params) : dataKey);
      const state = getState()[stateKey];
      if (shouldFetchData(state, dataKeyValue, cacheTTL)) {
        return dispatch(fetchData(
          types,
          endpoint,
          requestParams,
          constParams,
          method,
          mapRequestParams,
        ));
      }
      return Promise.resolve();
    };
