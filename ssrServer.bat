SETLOCAL
SET NODE_ENV=production
SET BABEL_ENV=node
SET API_ENPOINT_PREFIX=http://localhost:8001
node node_modules\babel-cli\bin\babel-node.js .\ssrServer.js
