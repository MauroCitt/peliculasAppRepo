const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


const server = express();

server.set('view engine', 'pug');   
server.set('views', path.join(__dirname, 'views'));
server.set('port', process.env.PORT || 3000);
server.use(morgan('dev'));
server.use(bodyParser.urlencoded({extended: true}));
server.use(require('./routes/apiConnectionRoutes.js'));

module.exports = server;