const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('friend', {
  }, {
    freezeTableName: true
  });

};
