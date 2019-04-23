/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Venue = db.model('venue')

describe('Venue routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/venues/', () => {

    beforeEach(() => {
      return Venue.bulkCreate([
        {
          name: 'Cody\'s Cafe',
          description: 'Cafe of Javascript',
          address: '100 Sequelize St',
          price: 1000,
          type: 'event-space',
          capacity: 1000
        },
        {
          name: 'Funky Funcs',
          description: 'Lounge of Javascript',
          address: '1600 Function Ave',
          price: 500,
          type: 'office',
          capacity: 500
        }
      ])
    })

    it('GET /api/venues', async () => {
      const res = await request(app)
        .get('/api/venues')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body.length).to.be.equal(2)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
