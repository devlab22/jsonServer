const jsonServer = require('json-server');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const dirname = process.cwd();

const server = jsonServer.create();
const router = jsonServer.router(path.join(dirname, 'db.json'));
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(jsonServer.bodyParser);
server.use(middlewares);
server.use(router);

let config = {}

try {
  const rawdata = fs.readFileSync(path.join(dirname, 'config.json'));
  const data = JSON.parse(rawdata);
  config = data;
}
catch (e) {
  
}

const PORT = config.PORT || 3001;

server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
})
