import ejs from 'ejs';
import ssr from './ssr';

// eslint-disable-next-line import/prefer-default-export
export const handler = (event, context) => {
  const requestPath = event.path.replace(/^\/heroes-serverless/, '') || '/';
  ssr(requestPath).then(({ code, data }) => {
    if (`${code}`[0] === '3') {
      context.succeed({
        statusCode: code,
        headers: {
          Location: data.url,
        },
      });
    } else {
      ejs.renderFile('index.ejs', data, {}, (err, body) => {
        if (err) {
          throw err;
        }
        context.succeed({
          statusCode: code,
          headers: {
            'Content-Type': 'text/html',
            'Access-Control-Allow-Origin': '*',
          },
          body,
        });
      });
    }
  }).catch((e) => {
    console.error(e);
    console.error(e.message);
  });
};
