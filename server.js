const http = require('http');
const app = require('./app'); //app start point
const port = process.env.port || 3030; //port set to 3030
const server = http.createServer(app);
server.listen(port);