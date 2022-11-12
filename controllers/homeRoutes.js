const { application, response } = require("express");
const { json } = require("sequelize");
// const fetch = require('node-fetch');
const axios = require("axios");

const router = require("express").Router();
const { User, Review, Games } = require("../models");
require("dotenv").config();

router.get("/", (req, res) => {
  axios({
    method: "get",
    url: `https://api.rawg.io/api/games?key=${process.env.API_KEY}`,
  })
    .then((apiResponse) => {
      // console.log(apiResponse);

      let smallData = [];
      for (let i = 0; i < 5; i++) {
        let temp = {
          name: apiResponse.data.results[i].name,
          image: apiResponse.data.results[i].background_image,
          metacritic: apiResponse.data.results[i].metacitic,
        };
        smallData.push(temp);
      }
      return smallData;
    })
    .then((displayData) => {
      res.render("homepage", {
        // pass the data to handlebars
        displayData,
      });
    })
    .catch((error) => console.log(error));
});

router.get("/games/:id", async (req, res) => {
  try {
    const gamesData = await Games.findByPk(req.params.id, {
      include: [
        {
          model: Review,
          attributes: ["id", "review_body", "review_date", "user_id"],
        },
      ],
    });
    if (!gamesData) {
      const response = await axios({
        method: "get",
        url: `https://api.rawg.io/api/games/${userinput}?key=${process.env.API_KEY}`,
      })
        .then((response) => {
          return response.json();
        })
        .then((displayData) => {
          res.render("gameRoutes", {
            displayData,
          });
        })
        .catch((err) => console.log(err));
    }
    // if (!gamesData) {
    //   res.status(404).json({ message: "No Game found with this id" });
    //   return;
    // }
    res.status(200).json(gamesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/games", (req, res) => {
  res.render("gameRoutes");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = router;
