const Sequelize = require('sequelize')
const db = require('../db')

const TransactionItem = db.define('transaction-item', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  }
})

module.exports = TransactionItem
