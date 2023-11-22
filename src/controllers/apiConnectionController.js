const fs = require('fs');

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
        let response = await fetch(urlApi, options);
        let data = await response.json();
        fs.writeFileSync("peliculasOrdenadas1.json", JSON.stringify(data, null, 2));
        res.json(data);

        for (let index = 2; index < 7; index++) {
            let currentUrlApi = urlApi.replace(/page=\d+/, `page=${index}`);


            response = await fetch(currentUrlApi, options);
            let newData = await response.json();
            fs.writeFileSync("peliculasOrdenadas" + index + ".json", JSON.stringify(newData, null, 2));
        }
    } catch (error) {
        console.error(error);
    }
};

module.exports = apiConnectionController;
