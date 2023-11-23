const { Schema, model } = require('mongoose');

const genreSchema = new Schema
    ({
        id: {type: Number, required: true, unique: true},
        nombre: {type: String, required: true},
    });

    module.exports = model('genre', genreSchema);