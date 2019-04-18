const router = require('express').Router()
const {Venue} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const venues = await Venue.findAll()
    res.json(venues)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const venue = await Venue.findByPk(id)
    res.json(venue)
  } catch (err) {
    next(err)
  }
})
