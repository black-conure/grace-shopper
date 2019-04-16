const Sequelize = require('sequelize')

const db = require('../db')

const Transaction = db.define('transaction', {
  date: {
    type: Sequelize.DATE,
    allowNull: false
  }
})

module.exports = Transaction
