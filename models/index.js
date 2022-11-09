const User = require('./User');
const Review = require('./Review');
const Games = require('./Games');

User.hasMany(Games, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});
User.hasMany(Review, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});
Games.hasMany(Review, {
    foreignKey: 'games_id',
    onDelete:'CASCADE'
});
Review.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});
Games.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});
Review.belongsTo(Games, {
    foreignKey: 'games_id',
    onDelete: 'CASCADE'
});


module.exports = { User, Review, Games };