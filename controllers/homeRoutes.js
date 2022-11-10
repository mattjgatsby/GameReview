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
            console.log(apiResponse);

            let smallData = [];
            for (let i = 0; i < apiResponse.data.results.length; i++) {

                smallData.push(apiResponse.data.results[i].name);
                console.log("this is smalldata" + smallData);
            }

            // const idkwhatthisis = apiResponse.map((results) => results.get({ plain: true }));

            // return idkwhatthisis;
            // apiResponse.json();

            // const bigData = apiResponse.data;
            // console.log(bigData);
            // apiResponse.json(bigData);
        })
        .then(displayData => {

            res.render('homepage', {
                // pass the data to handlebars
                displayData,
                // idkwhatthisis
            })
        })
        .catch(error => console.log(error))


    // let requestURL = `https://api.rawg.io/api/games?key=${process.env.API_KEY}`;

    // axios.get(``)
    //     .then((results) => {
    //         console.log(results);

    //     }).catch(err => console.log(err));


    // ----------------this give the json Formatter--------------------
    // try {
    //     let requestURL = `https://api.rawg.io/api/games?key=${process.env.API_KEY}`;


    //     const bigData = await axios.get(requestURL)
    //     console.log("results from axios " + bigData);
    //     const display = await bigData.json();

    //     res.render('homepage', {
    //         // pass the data to handlebars

    //     })
    // } catch (err) {
    //     res.status(500).json(err);
    // }




    // console.log(requestURL);

    // axios.get(requestURL)
    //     .then(bigData => bigData.json())
    //     .then(function (response) {

    //         console.log("results: " + response.map((data) => data.get({ plain: true })));

    //         const idkwhatthisis = results.map((game) => game.get({ plain: true }));

    //         res.render('homepage', {
    //             // pass the data to handlebars
    //             idkwhatthisis
    //         })
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     })

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