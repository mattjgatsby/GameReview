const sequelize = require('../config/connection');
const { User, Review, Games } = require('../models');

const userData = require('./userData.json');
const userReview = require('./reviewsData.json');
const gamesData = require('./gamesData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true
    });

    const games = await Games.bulkCreate(gamesData);
    const reviews = await Review.bulkCreate(userReview);


    process.exit(0);
}

seedDatabase();