import qs from 'qs';
import CALL_API from '../actions/callApi';
import callApi from '../utils/api';

export const postJSON = (url, data, method = 'POST') => {
  const headers = new Headers();
  let body;
  if (data instanceof FormData) {
    body = data;
  } else {
    headers.append('Content-type', 'application/json');
    body = JSON.stringify(data);
  }
  return callApi(url, { headers, method, body });
};

export const getJSON = (url, data) =>
  callApi(
    data ? `${url}?${qs.stringify(data)}` : url,
    false,
  );

export const deleteJSON =
  (url, data) => postJSON(url, data, 'DELETE');

export const putJSON =
  (url, data) => postJSON(url, data, 'PUT');

export const patchJSON =
  (url, data) => postJSON(url, data, 'PATCH');

const methods = {
  post: postJSON,
  get: getJSON,
  delete: deleteJSON,
  put: putJSON,
  patch: patchJSON,
};

/**
 * A Redux middleware that interprets actions with CALL_API info specified.
 * Performs the call and promises when such actions are dispatched.
 */
export default store => next => (action) => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let { endpoint, method } = callAPI;
  const { data, types } = callAPI;

  if (typeof method === 'function') {
    method = method(action, store.getState());
  }

  method = method.toLowerCase();

  if (typeof endpoint === 'function') {
    endpoint = endpoint(action, store.getState());
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  const actionWith = (payload) => {
    const finalAction = Object.assign({}, action, payload);
    delete finalAction[CALL_API];
    return finalAction;
  };

  const [requestType, successType, failureType] = types;
  next(actionWith({ type: requestType }));
  if (!Object.hasOwnProperty.call(methods, method)) {
    throw new Error('Unsupported method.');
  }
  return methods[method](endpoint, data).then(
    payload => next(actionWith(Object.assign(payload, { type: successType }))),
    error => next(actionWith({ type: failureType, error })),
  );
};
