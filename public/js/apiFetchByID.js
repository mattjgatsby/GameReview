const axios = require("axios");
require("dotenv").config();

const searchById = async (event) => {
  event.preventDefault();

  const userInput = document.querySelector("#game-search").value.trim();

  const response = await axios({
    method: "get",
    url: `https://api.rawg.io/api/games/${userInput}?key=${process.env.API_KEY}`,
  })
    .then((apiResponse) => {
      return apiResponse.json();
    })
    .then((displayData) => {
      res.render("gameRoutes", {
        displayData,
      });
    })
    .catch((err) => console.log(err));
};

document.querySelector('search-form').addEventListener('submit', searchById)