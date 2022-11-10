const { application, response } = require('express');
const { json } = require('sequelize');
// const fetch = require('node-fetch');
const axios = require('axios');


const router = require('express').Router();
const { User, Review, Games } = require('../models');
require('dotenv').config();



router.get('/', (req, res) => {

    axios({
        method: 'get',
        url: `https://api.rawg.io/api/games?key=${process.env.API_KEY}`
    })
        .then(apiResponse => {
            // console.log(apiResponse);

            let smallData = [];
            for (let i = 0; i < 5; i++) {
                let temp = {
                    name: apiResponse.data.results[i].name,
                    image: apiResponse.data.results[i].background_image,
                    metacritic: apiResponse.data.results[i].metacitic
                }


                smallData.push(temp);

                // console.log("this is smalldata:  " + smallData);
                // return smallData.json();
            }

            return smallData;
        })
        .then(displayData => {

            // console.log("this is sent to handlebars   " + displayData);

            res.render('homepage', {
                // pass the data to handlebars
                displayData,

            })
        })
        .catch(error => console.log(error))

})


module.exports = router;