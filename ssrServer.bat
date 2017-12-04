SETLOCAL
SET NODE_ENV=production
SET BABEL_ENV=node
node node_modules\babel-cli\bin\babel-node.js .\ssrServer.js
