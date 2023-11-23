const fs = require("fs");
const { ids } = require("./apiConnectionController.js");
const Movie = require("../models/movie");

const init = async () => {
    fetch = (await import("node-fetch")).default;
};

init();

const crewApiController = {};

const apiKey = "4ede0b04611cdf9bdd6b1943d9ac3f24";
const authorization = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZWRlMGIwNDYxMWNkZjliZGQ2YjE5NDNkOWFjM2YyNCIsInN1YiI6IjY1NGI3NTYxZmQ0ZjgwMDBjN2ZlNWY4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Wzm-mDwRjmcNv_Nx3XkJtZrxfcfkC805GvdNYUg5stc";

crewApiController.getJsonFile = async (req, res, next) => {
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
        for (var id of ids) {
            for(var idMovie of id){
            const urlApi = "https://api.themoviedb.org/3/movie/"+ id + "/credits";

            let response = await fetch(urlApi, options);
            let data = await response.json();
            const crew = data.crew;
            const cast = data.cast;

            let director = null; 

            for(let person of crew){
                if(person.job == "Director"){
                    director = person.name;
                    break;
                }
            }

            // Use findOneAndUpdate to update the director field
            await Movie.findOneAndUpdate({ id: idMovie }, { $set: { director: director } }, { new: true });
            allData.push(data);
        }
    }

        res.json(allData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = crewApiController;
