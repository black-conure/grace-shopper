const Sequelize = require('sequelize')
const db = require('../db')

const TransactionItem = db.define('transaction-item', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  purchasePrice: {
    type: Sequelize.INTEGER,
    allowNull: true,
    validate: {
      min: 0
    }
  }

})

module.exports = TransactionItem
