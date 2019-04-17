const router = require('express').Router()
const {TransactionItem, Venue} = require('../db/models')
module.exports = router

router.get('/', async(req, res, next) => {
  if (!req.user){
    const err = new Error('Please login or sign up to use the cart.')
    err.status = 401
    next(err)
    return
  }
  try {
   let shoppingCart = await req.user.getTransactions(
     {
      where: {
        isCart: true,
      },
      include: [{model: TransactionItem}]
      }
    )
    res.json(shoppingCart)
  }
  catch (err){
    next(err)
  }
})

router.post('/checkout', async(req, res, next) => {
  if (!req.user){
    const err = new Error('Please log in or sign up to use the cart.')
    err.status = 401
    next(err)
    return
  }
  let shoppingCartArr = null
  try {
    shoppingCartArr = await req.user.getTransactions(
      {
        where: {
          isCart: true,
        },
        include: [{model: TransactionItem}]
        }
    )
  }
  catch (err){
    next(err)
    return
  }
  if (
    shoppingCartArr.length > 0 && 
    shoppingCartArr[0]['transaction-items'].length > 0
  ){
    const cart = shoppingCartArr[0]
    try {
      await cart.update({isCart: false})
      for (let ti of cart['transaction-items']){
        const venue = await Venue.findByPk(ti.venueId)
        await ti.update({purchasePrice: venue.price})
      }
    }
    catch (err){
      next(err)
      return
    }
    res.send('Purchase complete!')
  }
  else {
    res.status(403).send('Your shopping cart is empty.')
  }
})
