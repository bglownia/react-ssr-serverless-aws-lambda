import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter, matchPath } from 'react-router-dom';
import createStore from './store/configureStore.prod';
import prefetch from './ssrPrefetch';

import App from './components/App';

export default (url) => {
  const store = createStore();
  return Promise.all(prefetch.map((route) => {
    const match = matchPath(url, route);
    if (match) {
      return route.loadData(store, match);
    }
    return false;
  }).filter(p => p)).then(() => {
    const context = {};
    const markup = renderToString((
      <StaticRouter
        location={url}
        context={context}
      >
        <Provider store={store}>
          <App />
        </Provider>
      </StaticRouter>
    ));

    if (context.url) {
      // Somewhere a `<Redirect>` was rendered
      return { code: 302, data: { url: context.url } };
    }
    const preloadedState = JSON.stringify(store.getState()).replace(/</g, '\\u003c');
    return { code: 200, data: { markup, preloadedState } };
  });
};
