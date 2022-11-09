const { application } = require('express');
const { json } = require('sequelize');
const fetch = require('node-fetch');
const { default: axios } = require('axios');
const axios = require('axios').default;

const router = require('express').Router();
const { User, Review, Games } = require('../models');
require('dotenv').config();



router.get('/', async (req, res) => {

    let requestURL = `https://api.rawg.io/api/games?key=${process.env.API_KEY}`;

    axios.get(requestURL)
        .then(function (response) {
            console.log("results: " + bigData.map((data) => data.get({ plain: true })));

            const idkwhatthisis = results.map((game) => game.get({ plain: true }));

            res.render('homepage', {
                // pass the data to handlebars
                idkwhatthisis
            })
        })
        .catch(function (error) {
            console.log(error);
        })

    // try {


    //     // let results = await fetch(requestURL);

    //     // const bigData = await results.json();

    //     // console.log("results: " + bigData.map((data) => data.get({ plain: true })));

    //     // const idkwhatthisis = results.map((game) => game.get({ plain: true }));

    //     res.render('homepage', {
    //         // pass the data to handlebars
    //         // idkwhatthisis

    //     })

    // } catch (err) {
    //     res.status(500).json(err)
    // }

})


module.exports = router;