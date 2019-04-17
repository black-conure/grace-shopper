const router = require('express').Router()
const {TransactionItem, Transaction} = require('../db/models')
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

router.post('/', async(req, res,next) => {
  if (!req.user){
    const err = new Error('Please login or sign up to use the cart.')
    err.status = 401
    next(err)
    return
  }
  try {
    let shoppingCart = await req.user.getTransactions({
      where: { isCart: true },
      })

    if (!shoppingCart.length) {
       shoppingCart = await Transaction.create({userId: req.user.id, date: Date.now()})
    }
    req.body.transactionId = shoppingCart[0].dataValues.id
    let updatedItem = await TransactionItem.update(req.body)
    res.json(updatedItem)
   }
   catch (err){
     next(err)
   }
})


router.put('/', async(req, res, next) => {
  if (!req.user){
    const err = new Error('Please login or sign up to use the cart.')
    err.status = 401
    next(err)
    return
  }
 try {
  //req.body will need to include - venueId, quantity
  // let itemToUpdate = await req.user.getTransactions({
  //   where: {
  //     isCart: true,
  //    },include: [{model: TransactionItem,
  //   where: {venueId: req.body.venueId}}]
  //   })
    let updatedItem = await TransactionItem.update({
      quantity: req.body.quantity},{
      where: {
        venueId: req.body.venueId,

    }, include: [{model: Transaction,
      where: {userId: req.user.id, isCart: true}}]
  })
    res.json(updatedItem)
 } catch (error) {
   next(error)
 }
})

router.delete('/', async(req, res, next) => {
  if (!req.user){
    const err = new Error('Please login or sign up to use the cart.')
    err.status = 401
    next(err)
    return
  }
 try {
  //req.body will need to include - venueId, quantity
  let itemToUpdate = await req.user.getTransactions({
    where: {
      isCart: true,
     },include: [{model: TransactionItem,
    where: {venueId: req.body.venueId}}]
    })
    itemToUpdate.quantity = req.body.quantity
    letItem = await TransactionItem.delete({
      where: {
        venueId: req.body.venueId
    }
  })
    res.json(updatedItem)
 } catch (error) {
   next(error)
 }
})


// router.post('/', async(req, res, next) => {
//   if (!req.user){
//     const err = new Error('Please log in or sign up to use the cart.')
//     err.status = 401
//     next(err)
//     return
//   }
//   if (!req.body.venueId || !req.body.quantity){
//     const err = new Error('Venue ID and quantity must be specified.')
//     err.status = 400
//     next(err)
//     return
//   }
//   let createdItem = null
//   try {
//     createdItem = await CartItem.create({
//       userId: req.user.id,
//       venueId: req.body.venueId,
//       quantity: req.body.quantity
//     },{
//       returning: true
//     })
//   }
//   catch (err){
//     if (err.name === 'SequelizeUniqueConstraintError'){
//       res.status(403).send(
//         'That venue is already in your cart.'
//       )
//     }
//     else {
//       next(err)
//     }
//     return
//   }
//   res.json(createdItem)
// })
