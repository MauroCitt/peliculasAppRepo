const mongoose = require('mongoose');

const {MOVIE_VAULT_MONGODB_HOST, MOVIE_VAULT_MONGODB_DATABASE} = process.env;
const MONGODB_URI = `mongodb://${MOVIE_VAULT_MONGODB_HOST}/${MOVIE_VAULT_MONGODB_DATABASE}`;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const conexion = mongoose.connection;

conexion.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
conexion.once('open', () => {
  console.log('Conectado a MongoDB');
});
