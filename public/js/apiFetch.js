const router = require('express').Router();
require('dotenv').config();


async function getApiRawg() {
    console.log("Inside apiRawg");

    let requestURL = 'https://api.rawg.io/api/games?key=' + proccess.env.API_KEY;

    let res = await fetch(`https://api.rawg.io/api/games?key=${proccess.env.API_KEY}`);
    let rawgData = await res.json()
    console.log(rawgData);
    return rawgData;
}

getApiRawg();