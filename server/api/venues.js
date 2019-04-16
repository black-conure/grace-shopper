const router = require('express').Router()
const {Venue} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await Venue.findAll()
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/venues/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const users = await Venue.findOne({where: {id}})
    res.json(users)
  } catch (err) {
    next(err)
  }
})
