const morgan = require('morgan');
const express = require('express');

const server = express();

server.set('port', process.env.PORT || 3000);
server.use(morgan('dev'));
server.use(require('./routes/apiConnectionRoutes.js'));

module.exports = server;