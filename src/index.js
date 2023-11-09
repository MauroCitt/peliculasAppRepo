const server = require('./server.js');

server.listen(server.get('port'));
console.log('Server on port', server.get('port'));