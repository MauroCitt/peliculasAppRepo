const Movie = require("../models/movie.js");
const { ids } = require("./apiConnectionController.js");

let fetch;

const init = async () => {
    fetch = (await import("node-fetch")).default;
};

init();

const providerApiController = {};

const apiKey = '4ede0b04611cdf9bdd6b1943d9ac3f24';
const authorization = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZWRlMGIwNDYxMWNkZjliZGQ2YjE5NDNkOWFjM2YyNCIsInN1YiI6IjY1NGI3NTYxZmQ0ZjgwMDBjN2ZlNWY4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Wzm-mDwRjmcNv_Nx3XkJtZrxfcfkC805GvdNYUg5stc';

providerApiController.getJsonFile = async (req, res, next) => {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            api_key: apiKey,
            Authorization: authorization,
        },
    };

    let allData = [];

    try {
        const placeCode = "ES";

        for (var id of ids) {
            for (var idMovie of id) {
                // Reset providers for each movie
                let flatrateProviders = [];
                let buyProviders = [];

                const urlApi =
                    "https://api.themoviedb.org/3/movie/" + idMovie + "/watch/providers";
                console.log(urlApi);

                let response = await fetch(urlApi, options);
                let data = await response.json();

                const providersForPlace = data.results && data.results[placeCode];

                if (providersForPlace) {
                    const flatrateProviders = providersForPlace.flatrate || [];
                
                    const flatrateProviderNames = flatrateProviders.map(
                        (provider) => provider.provider_name
                    );
                
                    console.log(flatrateProviderNames);
                
                    await Movie.findOneAndUpdate(
                        { id: idMovie },
                        { providers: flatrateProviderNames }
                    );
                
                    allData.push(data);
                }
            }
        }

        res.json(allData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = providerApiController;
