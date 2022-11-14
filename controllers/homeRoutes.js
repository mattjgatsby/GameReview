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

router.post("/search", async (req, res) => {
  try {
    const gamesData = await Games.findOne(
      { where: { slug: req.body.search } },
      {
        include: [
          {
            model: Review,
            attributes: ["id", "review_body", "review_date", "user_id"],
          },
        ],
      }
    );
    if (!gamesData) {
      axios({
        method: "get",
        url: `https://api.rawg.io/api/games/${req.body.search}?key=${process.env.API_KEY}`,
      })
        .then((response) => {
          // console.log(response);

          //save all of it to session
          // req.session.slug = response.data.slug;

          let gameInfo = {
            slug: response.data.slug,
            game_description: response.data.description,
            release_date: response.data.released,
            metacitic: response.data.metacritic,
            // platforms: response.data.platforms,
            background_image: response.data.background_image,
            // short_screenshots: response.data.website
          };
          console.log(gameInfo);
          res.render("gameInfo",
            gameInfo
          );
          // return gameInfo;
        })
        // .then((displayData) => {
        //   displayData = JSON.stringify(displayData)
        //   console.log("Display:" + displayData);
        //   res.render("gameRoutes", {
        //     displayData,
        //   });
        // })
        .catch((err) => console.log(err));
    }
    // if (!gamesData) {
    //   res.status(404).json({ message: "No Game found with this id" });
    //   return;
    // }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/gameInfo", (req, res) => {
  res.render("gameInfo")
})

router.get("/games", (req, res) => {
  res.render("gameRoutes");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

module.exports = router;
