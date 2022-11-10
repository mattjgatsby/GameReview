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

    const reviews = await Review.bulkCreate(userReview);

    const games = await Games.bulkCreate(gamesData);

    process.exit(0);
}

seedDatabase();