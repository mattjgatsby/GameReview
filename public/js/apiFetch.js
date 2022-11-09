const router = require('express').Router();
require('dotenv').config();

//https://api.rawg.io/api/games/{id} - querying for game by slug id


async function getApiRawg (games) {
    let res = await fetch(`https://api.rawg.io/api/games?key=${proccess.env.API_KEY}`);
    let rawgData = await res.json()
}