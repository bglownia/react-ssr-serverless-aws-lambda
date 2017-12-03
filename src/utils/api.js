export default function callApi(url, params) {
  const options = params || {};
  options.credentials = 'same-origin';
  return fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(new Error(`${response.status} ${response.statusText}`));
      }
      return response.json();
    });
}
