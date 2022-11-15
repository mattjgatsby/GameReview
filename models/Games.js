const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Games extends Model { }

Games.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    game_description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
    release_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    metacritic: {
      type: DataTypes.INTEGER,
    },
    background_image: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "games",
  }
);

module.exports = Games;