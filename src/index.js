require('dotenv').config();

const server = require('./server.js');
require('./database.js');

server.listen(server.get('port'));
console.log('Server on port', server.get('port'));