const Sequelize = require('sequelize')
const db = require('../db')

const Venue = db.define('venue', {
  name : {
    type: Sequelize.STRING,
    allowNull: false
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
    // validate: {
    //   isIn: [[office, studio, event-space]]
    // }
  },
  capacity: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
})

module.exports = Venue;
