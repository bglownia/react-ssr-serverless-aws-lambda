const getApiUrl = url => {
  if (process.env.API_ENPOINT_PREFIX) {
    return `${process.env.API_ENPOINT_PREFIX}${url}`
  }
  return url;
}

export default function callApi(url, params) {
  const options = params || {};
  options.credentials = 'same-origin';
  return fetch(getApiUrl(url), options)
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(new Error(`${response.status} ${response.statusText}`));
      }
      return response.json();
    });
}
