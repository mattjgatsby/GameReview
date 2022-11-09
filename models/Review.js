const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
class Review extends Model {}

Review.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allownull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    review_body: {
      type: DataTypes.STRING,
      allownull: false,
    },
    review_date: {
      type: DataTypes.DATEONLY,
      allownull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    game_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "games",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "review",
  }
);

module.exports = Review;
