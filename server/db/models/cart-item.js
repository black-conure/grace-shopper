const Sequelize = require('sequelize')
const db = require('../db')

const CartItem = db.define('cart-item', {
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1
    }
  }
},{ 
  indexes: [ { unique: true, fields: [ 'userId', 'venueId' ] } ] 
})

module.exports = CartItem
