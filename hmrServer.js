/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.hmr');
const path = require('path');
const Express = require('express');
/* eslint-enable import/no-extraneous-dependencies */

const app = new Express();
const port = 8000;

const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

// get data mocks
app.get('/api/*', (req, res) => {
  const requestedFile = req.url.replace(/\?.*/, '').replace('api', 'apiMocks');
  res.sendFile(path.normalize(path.join(__dirname, requestedFile)));
});

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'src', '/index.html'));
});

/* eslint-disable no-console */
app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info('==> Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
  }
});
/* eslint-enable no-console */
