const jsonServer = require('json-server');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const dirname = process.cwd();
const helmet = require('helmet')

let config = {}

try {
  const rawdata = fs.readFileSync(path.join(dirname, 'config.json'));
  const data = JSON.parse(rawdata);
  config = data;
}
catch (e) {
  
}

const server = jsonServer.create();
const router = jsonServer.router(path.join(dirname, config.DATABASE));
const middlewares = jsonServer.defaults();

server.use(helmet())
server.use(cors());
server.use(jsonServer.bodyParser);
server.use(middlewares);
server.use(router);

const PORT = config.PORT || 3001;
const HOST = config.HOST || "localhost";

server.listen(PORT, HOST, () => {
  console.log(`JSON Server is running on ${HOST}:${PORT}`);
})
