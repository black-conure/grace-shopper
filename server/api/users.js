const router = require('express').Router()
const {User, Transaction, TransactionItem, Venue} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/me', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: [
        {
          model: Transaction,
          where: {
            isCart: false
          },
          include: [
            {
              model: TransactionItem,
              include: [
                {
                model: Venue
              }
            ]
            },

          ],
        }
      ]
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})
