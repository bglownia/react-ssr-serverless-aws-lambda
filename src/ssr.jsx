import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import createStore from './store/configureStore.prod';

import App from './components/App';

export default (url) => {
  const store = createStore();
  const context = {};
  // eslint-disable-next-line function-paren-newline
  const markup = renderToString(
    <StaticRouter
      location={url}
      context={context}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </StaticRouter>);

  if (context.url) {
    // Somewhere a `<Redirect>` was rendered
    return { code: 302, data: { url: context.url } };
  }
  const preloadedState = JSON.stringify(store.getState()).replace(/</g, '\\u003c');
  return { code: 200, data: { markup, preloadedState } };
};
