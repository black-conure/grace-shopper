'use strict'

const db = require('../server/db')
const {User, Venue, TransactionItem, Transaction} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123', name: 'cody'}),
    User.create({email: 'murphy@email.com', password: '123', name: 'murphy'})
  ])

  console.log(`seeded ${users.length} users`)

  let offices = []
  let eventSpaces = []
  let studios = []

  function createOffice(num){

  for (let i = 0; i < num; i++){
    offices[i] = {
      name: `Office ${i}`,
      address: `${i} Main Street`,
      price: i*25,
      type: 'Office',
      capacity: 20
    }

  }
  }
  function createEventSpace(num){

  for (let i = 0; i < num; i++){
    eventSpaces[i] = {
      name: `Event Space ${i}`,
      address: `${i} Fulton Street`,
      price: i*100,
      type: 'Event-Space',
      capacity: 200
    }

  }
  }
  function createStudio(num){

  for (let i = 0; i < num; i++){
    studios[i] = {
      name: `Studio ${i}`,
      address: `${i} Wall Street`,
      price: i*50,
      type: 'Studio',
      capacity: 5
    }

  }
  }

  createOffice(10)
  createEventSpace(10)
  createStudio(10)
  const venues = [...offices, ...eventSpaces, ...studios]
  const venuePromises = venues.map(venue => Venue.create(venue))
  await Promise.all(venuePromises)

  console.log(`seeded ${venues.length} venues`)
  const transactions = await Promise.all([
    Transaction.create({date: Date.now(),isCart: true, userId: 1, id: 2}),
    Transaction.create({date: Date.now(),isCart: false, userId: 2, id: 1}),
    Transaction.create({date: Date.now(),isCart: true, userId: 2, id: 4}),
    Transaction.create({date: Date.now(),isCart: false, userId: 1, id: 3}),
  ])
  console.log(`seeded ${transactions.length} transactions`)

  const transactionItems = await Promise.all([
    TransactionItem.create({quantity: 1, purchasePrice: 500, transactionId: 4, venueId: 1}),
    TransactionItem.create({quantity: 2, purchasePrice: 250, transactionId: 2, venueId: 2}),
    TransactionItem.create({quantity: 1, purchasePrice: 100, transactionId: 2, venueId: 3}),
    TransactionItem.create({quantity: 3, purchasePrice: 150, transactionId: 1, venueId: 9}),
    TransactionItem.create({quantity: 1, purchasePrice: 300, transactionId: 3, venueId: 1}),
  ])
  console.log(`seeded ${transactionItems.length} transactionItems`)


  console.log(`seeded successfully`)

}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed

