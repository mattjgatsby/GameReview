const router = require('express').Router();
require('dotenv').config();


async function getApiRawg (games) {
    let res = await fetch(`https://api.rawg.io/api/games?key=${proccess.env.API_KEY}`);
    let rawgData = await res.json()
}