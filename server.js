//initiallizion a port 
const http = require('http');
const port = 3000;

//including our app.js file
const app = require('./app');

//creating a server
const server = http.createServer(app);

//litening to the port 
server.listen(port);