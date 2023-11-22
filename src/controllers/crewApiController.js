const fs = require('fs');

let fetch;

const init = async () => {
    fetch = (await import('node-fetch')).default;
};

init();

const crewApiController = {};

const urlApi = 'https://api.themoviedb.org/3/movie/${movieId}/credits';
const apiKey = '4ede0b04611cdf9bdd6b1943d9ac3f24';
const authorization = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZWRlMGIwNDYxMWNkZjliZGQ2YjE5NDNkOWFjM2YyNCIsInN1YiI6IjY1NGI3NTYxZmQ0ZjgwMDBjN2ZlNWY4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Wzm-mDwRjmcNv_Nx3XkJtZrxfcfkC805GvdNYUg5stc';

crewApiController.getJsonFile = async (req, res, next) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            api_key: apiKey,
            Authorization: authorization
        },
    };
}