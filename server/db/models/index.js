const User = require('./user')
const Venue = require('./venue')
const Transaction = require('./transaction')
const TransactionItem = require('./transaction-item')
// const CartItem = require('./cart-item')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
User.hasMany(Transaction)
Transaction.belongsTo(User)

Transaction.belongsToMany(Venue, {through: TransactionItem})
Venue.belongsToMany(Transaction, {through: TransactionItem})

TransactionItem.belongsTo(Transaction)
Transaction.hasMany(TransactionItem)


/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Venue,
  Transaction,
  TransactionItem,
}
