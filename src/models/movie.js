const { Schema, model } = require('mongoose');

const movieSchema = new Schema
    ({
        id: {type: Number, required: true, unique: true},
        titulo: {type: String},
        genero: [{type: Number, ref:'genre'}],
        director: {type: String, ref: 'director'},
        crew: [{type: String}],
        popularity: {type: Number},
        vote_count: {type: Number},
        vote_average: {type: Number}
    });

    module.exports = model('movie', movieSchema);