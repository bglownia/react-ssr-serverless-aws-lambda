import makeFetchedDataReducer from './fetchedData';

import {
  HEREOES_ORIGINS_FETCH_REQUEST,
  HEREOES_ORIGINS_FETCH_SUCCESS,
  HEREOES_ORIGINS_FETCH_FAILURE,
} from '../actions/heroesOrigins';

export default makeFetchedDataReducer({
  types: [
    HEREOES_ORIGINS_FETCH_REQUEST,
    HEREOES_ORIGINS_FETCH_SUCCESS,
    HEREOES_ORIGINS_FETCH_FAILURE,
  ],
  dataKey: () => ([]),
});
