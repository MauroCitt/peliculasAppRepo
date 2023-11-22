const {Schema, model} = require('mongoose');

const movieSchema = new Schema
    ({
        id: {type: Number, required: true, unique: true},
        titulo: {type: String, required: true},
        genero: [{type: String, required: true}],
        director: [{type: Number, ref: 'director', required: true}],
        crew: [{type: String, required: true}],
        popularity: {type: Number, required: true},
        vote_count: {type: Number, required: true},
        vote_average: {type: Number, required: true}
    });

    export default mongoose.model('movie', movieSchema);