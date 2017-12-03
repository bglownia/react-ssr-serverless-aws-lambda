import makeFetchedDataReducer from './fetchedData';

import {
  HEREOES_FETCH_REQUEST,
  HEREOES_FETCH_SUCCESS,
  HEREOES_FETCH_FAILURE,
} from '../actions/heroes';

export default makeFetchedDataReducer({
  types: [
    HEREOES_FETCH_REQUEST,
    HEREOES_FETCH_SUCCESS,
    HEREOES_FETCH_FAILURE,
  ],
  mapReponseToData: response => response.data,
  dataKey: action => action.params.origin,
});
