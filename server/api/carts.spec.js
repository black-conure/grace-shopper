/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const app = require('../index')

describe('carts routes', () => {
  describe('user that is not authenticated', () => {
    describe('/api/carts/', () => {
      it('GET /api/carts', async () => {
        await request(app).get('/api/carts').expect(401)
      })
    })
    describe('/api/carts/', () => {
      it('POST /api/carts/checkout', async () => {
        await request(app).post('/api/carts/checkout').expect(401)
      })
    })
  })
})