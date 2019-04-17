const Sequelize = require('sequelize')

const db = require('../db')

const Transaction = db.define('transaction', {
  date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  isCart: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
})

module.exports = Transaction
