const { application, response } = require("express");
const { json } = require("sequelize");
// const fetch = require('node-fetch');
const axios = require("axios");
const withAuth = require("../utils/auth");

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

router.get("/search", async (req, res) => {
  try {
    console.log(req.query);
    const gamesData = await Games.findOne(
      { where: { slug: req.query.gametitle } },
      {
        include: [
          {
            model: Review,
            attributes: ["id", "review_body", "review_date", "user_id"],
          },
        ],
      }
    );
    // let gameInfo;
    if (!gamesData) {
      axios({
        method: "get",
        url: `https://api.rawg.io/api/games/${req.query.gametitle}?key=${process.env.API_KEY}`,
      })
        .then((response) => {
          let gameInfo = {
            title: response.data.name,
            slug: response.data.slug,
            game_description: response.data.description_raw,
            release_date: response.data.released,
            metacitic: response.data.metacritic,
            background_image: response.data.background_image,
          };

          console.log(gameInfo);
          res.json(gameInfo);
        })
        .catch((err) => console.log(err));
    } else {
      // change to gamesData
      let gameInfo = {
        title: gamesData.title,
        slug: gamesData.slug,
        game_description: gamesData.description,
        release_date: gamesData.released,
        metacitic: gamesData.metacritic,
        // platforms: gamesData.data.platforms,
        background_image: gamesData.background_image,
        // short_screenshots: gamesData.data.website
      };
      console.log("something else");
      res.json(gameInfo);
    }

    // if (!gamesData) {
    //   res.status(404).json({ message: "No Game found with this id" });
    //   return;
    // }
    // console.log("final", gameInfo);

    // res.json("No game found.", gameInfo)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/gameInfo", (req, res) => {
  res.render("gameInfo");
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

router.get("/dashboard", withAuth, (req, res) => {
  // try {
  //   const userData = await User.findByPk(req.session.user_id, {
  //     attributes: { exclude: ['password']},
  //     include: [{model: Review}],
  //   })
  // }
  res.render("dashboard", { logged_in: true });
});

module.exports = router;
