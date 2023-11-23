const fs = require('fs');
const Genre = require('../models/genre.js');
const e = require('express');

let fetch;

const init = async () => {
    fetch = (await import('node-fetch')).default;
};

init();

const genreConnectionController = {};

const urlApi = 'https://api.themoviedb.org/3/genre/movie/list';
const apiKey = '4ede0b04611cdf9bdd6b1943d9ac3f24';
const authorization = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZWRlMGIwNDYxMWNkZjliZGQ2YjE5NDNkOWFjM2YyNCIsInN1YiI6IjY1NGI3NTYxZmQ0ZjgwMDBjN2ZlNWY4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Wzm-mDwRjmcNv_Nx3XkJtZrxfcfkC805GvdNYUg5stc';

genreConnectionController.getJsonFile = async (req, res, next) => {
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
            const genre = data.genres;
            await guardarDatosEnMongoDB(genre);
            res.json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error'})
        }
    };

    const guardarDatosEnMongoDB = async (genres) => {
        try{
            for(const genreData of genres){
                const genre = new Genre({
                    id: genreData.id,
                    nombre: genreData.name,
                });
                await genre.save();
            }
            console.log('Géneros guardados en MongoDB');
        } catch(error){
            console.error("Error al guardar los géneros en MongoDB", error);
            throw error;
        }
    }

module.exports = genreConnectionController;
