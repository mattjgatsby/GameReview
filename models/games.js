const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Games extends Model {}

Games.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          games_name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          release_date: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          metacritic: {
            type: DataTypes.INTEGER,
          },
          platforms: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          background_image: {
            
          }
    }
)