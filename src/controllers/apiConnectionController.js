const fs = require('fs');
const Movie = require('../models/movie'); 

let fetch;

const init = async () => {
    fetch = (await import('node-fetch')).default;
};

init();

const apiConnectionController = {};

const urlApi = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&vote_count.gte=10000';
const apiKey = '4ede0b04611cdf9bdd6b1943d9ac3f24';
const authorization = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZWRlMGIwNDYxMWNkZjliZGQ2YjE5NDNkOWFjM2YyNCIsInN1YiI6IjY1NGI3NTYxZmQ0ZjgwMDBjN2ZlNWY4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Wzm-mDwRjmcNv_Nx3XkJtZrxfcfkC805GvdNYUg5stc';

apiConnectionController.getJsonFile = async (req, res, next) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            api_key: apiKey,
            Authorization: authorization
        },
    };

    try {
        let allData = [];
        for (let index = 1; index < 7; index++) {
            let currentUrlApi = urlApi.replace(/page=\d+/, `page=${index}`);
            let response = await fetch(currentUrlApi, options);
            let data = await response.json();
            const movies = data.results;
            await guardarDatosEnMongoDB(movies);
            fs.writeFileSync("peliculasOrdenadas" + index + ".json", JSON.stringify(data, null, 2));

            allData.push(data);
        }

        res.json(allData);

    } catch (error) {
        console.error(error);
    }
};

const guardarDatosEnMongoDB = async (movies) => {
    try {
        for (const movieData of movies) {
            const movie = new Movie({
                id: movieData.id,
                titulo: movieData.title,
                genero: movieData.genre_ids,
                director: movieData.director,
                crew: movieData.crew,
                popularity: movieData.popularity,
                vote_count: movieData.vote_count,
                vote_average: movieData.vote_average
            });
            await movie.save();
        }
        console.log('Películas guardadas en MongoDB');
    } catch (error) {
        console.error("Error al guardar las películas en MongoDB", error);
        throw error;
    }
}

module.exports = apiConnectionController;
