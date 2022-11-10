const { Games } = require("../models");

const gamesData = [
  {
    games_name: "Fake God of War",
    game_description: "This is a video game description string.",
    release_date: 11 / 08 / 2022,
    metacritic: 99,
    platforms: "Playstation",
    background_image: "This will be an Image",
    short_screenshots: "This is the Short Screenshots",
    user_id: 1,
  },
  {
    games_name: "Call of Duty",
    game_description: "This is a video game description string.",
    release_date: 11 / 01 / 2022,
    metacritic: 90,
    platforms: "Playstation, Xbox, PC",
    background_image: "This is a Call of Duty Image",
    short_screenshots: "Short Screenshot Image",
    user_id: 2,
  },
  {
    games_name: "Mr. Rogers",
    game_description: "This is a video game description string.",
    release_date: 01 / 01 / 1970,
    metacritic: 100,
    platforms: "Playstation",
    background_image: "Background image",
    short_screenshots: "Short Screenshot Image",
    user_id: 3,
  },
];

const seedGames = () => Games.bulkCreate(gamesData);

module.exports = seedGames;
