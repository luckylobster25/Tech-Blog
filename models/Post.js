const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class Post extends Model {}

Post.init(
  {
    title: DataTypes.STRING,
    body: DataTypes.STRING
  },
  {
    sequelize
  },
  {
    // When adding hooks via the init() method, they go below
    hooks: {
      // Use the beforeCreate hook to work with data before a new instance is created
      beforeCreate: async (newTitle) => {
        // In this case, we are taking the user's title address, and making all letters lower case before adding it to the database.
        newTitle.title = await newTitle.title.toUpperCase();
        return newTitle;
      },
      // Here, we use the beforeUpdate hook to make all of the characters lower case in an updated title address, before updating the database.
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.title = await updatedUserData.title.toUpperCase();
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);

module.exports = Post;
