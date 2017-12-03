import makeFetchDataIfNeeded from './fetchDataIfNeeded';

export const HEREOES_FETCH_REQUEST = 'HEREOES_FETCH_REQUEST';
export const HEREOES_FETCH_SUCCESS = 'HEREOES_FETCH_SUCCESS';
export const HEREOES_FETCH_FAILURE = 'HEREOES_FETCH_FAILURE';

export const stateKey = 'heroes';

export const fetchHeroesIfNeeded = makeFetchDataIfNeeded({
  types: [
    HEREOES_FETCH_REQUEST,
    HEREOES_FETCH_SUCCESS,
    HEREOES_FETCH_FAILURE,
  ],
  endpoint: action => `/api/heroes/${action.params.origin}.json`,
  stateKey,
  dataKey: params => params.origin,
  mapRequestParams: () => null,
});
