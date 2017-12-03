import makeFetchDataIfNeeded from './fetchDataIfNeeded';

export const HEREOES_ORIGINS_FETCH_REQUEST = 'HEREOES_ORIGINS_FETCH_REQUEST';
export const HEREOES_ORIGINS_FETCH_SUCCESS = 'HEREOES_ORIGINS_FETCH_SUCCESS';
export const HEREOES_ORIGINS_FETCH_FAILURE = 'HEREOES_ORIGINS_FETCH_FAILURE';

export const stateKey = 'heroesOrigins';

export const fetchHeroesOriginsIfNeeded = makeFetchDataIfNeeded({
  types: [
    HEREOES_ORIGINS_FETCH_REQUEST,
    HEREOES_ORIGINS_FETCH_SUCCESS,
    HEREOES_ORIGINS_FETCH_FAILURE,
  ],
  endpoint: '/api/heroesOrigins.json',
  stateKey,
  dataKey: () => ([]),
});
