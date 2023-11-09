const fs = require('fs');
let fetch;

const init = async () => {
    fetch = (await import('node-fetch')).default;
};

init();

const apiConnectionController = {};

const urlApi = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc';
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
    }
    try {
        const response = await fetch(urlApi, options);
        const data = await response.json();
        fs.writeFileSync("peliculasOrdenadas.json", JSON.stringify(data, null, 2));
        res.json(data);
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

module.exports = apiConnectionController;
