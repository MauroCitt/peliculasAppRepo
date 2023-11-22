const {Schema, model} = require('mongoose');

const directorSchema = new Schema
    ({
        id: {type: Number, required: true, unique: true},
        nombre: {type: String, required: true},
        peliculas: [{ type: Schema.Types.ObjectId, ref: 'movie' }]
    });

    export default mongoose.model('director', directorSchema);