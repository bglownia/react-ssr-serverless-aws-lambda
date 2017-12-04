import path from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import Express from 'express';
import ssr from './src/ssr';

const port = process.env.PORT || 8001;
const env = process.env.NODE_ENV || 'production';

// initialize the server and configure support for ejs templates
const app = new Express();
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/src`);

// define the folder that will be used for static assets
app.use('/static', Express.static('dist'));

// get data mocks
app.get('/api/*', (req, res) => {
  const requestedFile = req.url.replace(/\?.*/, '').replace('api', 'apiMocks');
  res.sendFile(path.normalize(path.join(__dirname, requestedFile)));
});

// universal routing and rendering
app.get('*', (req, res) => {
  const { code, data } = ssr(req.url);
  // eslint-disable-next-line no-console
  console.log(code, data);
  if (`${code}`[0] === 3) {
    res.redirect(code, data.url);
  } else {
    res.render('index', data);
  }
});

// start the server
app.listen(port, (error) => {
  if (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  } else {
    // eslint-disable-next-line no-console
    console.info(`Server running on http://localhost:${port} [${env}]`);
  }
});
