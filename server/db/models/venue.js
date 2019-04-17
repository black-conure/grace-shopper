const Sequelize = require('sequelize')
const db = require('../db')

const Venue = db.define('venue', {
  name : {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true
    // defaultValue:
  },
  imageUrl : {
    type: Sequelize.STRING,

  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
    // validate: {
    //   isIn: [[office, studio, event-space]]
    // }
  },
  capacity: {
    type: Sequelize.INTEGER,
    allowNull: true,
    validate: {
      min: 1
    }
  },
})

module.exports = Venue;
