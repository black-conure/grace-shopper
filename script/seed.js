'use strict'

const db = require('../server/db')
const {User, Venue, TransactionItem, Transaction} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123', firstName: 'cody', lastName: 'theDog'}),
    User.create({email: 'murphy@email.com', password: '123', firstName: 'murphy', lastName: 'theCat'})
  ])

  console.log(`seeded ${users.length} users`)

  let offices = [ { name: 'Office 0',
  imageUrl: 'http://www.contemporist.com/wp-content/uploads/2011/09/ki_220911_09.jpg',
  description:
   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ex magna, egestas sed malesuada nec, porttitor ut metus. Nunc non luctus dolor. Sed bibendum sed diam nec vehicula. Integer luctus, metus at fermentu',
  address: '0 Main Street',
  price: 10000000,
  type: 'Office',
  capacity: 20 },
{ name: 'Office 1',
  imageUrl: 'https://assets.regus.com/images/nwp/homepage-product-office-space.jpg',
  description:
   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ex magna, egestas sed malesuada nec, porttitor ut metus. Nunc non luctus dolor. Sed bibendum sed diam nec vehicula. Integer luctus, metus at fermentu',
  address: '1 Main Street',
  price: 2500000,
  type: 'Office',
  capacity: 20 },
{ name: 'Office 2',
  imageUrl: 'https://www.intheblack.com/~/media/intheblack/allimages/sponsored-content/2018/dexus-office-space.jpg',
  description:
   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ex magna, egestas sed malesuada nec, porttitor ut metus. Nunc non luctus dolor. Sed bibendum sed diam nec vehicula. Integer luctus, metus at fermentu',
  address: '2 Main Street',
  price: 50000,
  type: 'Office',
  capacity: 20 },
{ name: 'Office 3',
  imageUrl: 'https://assets.regus.com/images/nwp/homepage-product-office-space.jpg',
  description:
   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ex magna, egestas sed malesuada nec, porttitor ut metus. Nunc non luctus dolor. Sed bibendum sed diam nec vehicula. Integer luctus, metus at fermentu',
  address: '3 Main Street',
  price: 75000,
  type: 'Office',
  capacity: 20 },
{ name: 'Office 4',
  imageUrl: 'https://assets.regus.com/images/nwp/homepage-product-co-working.jpg',
  description:
   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ex magna, egestas sed malesuada nec, porttitor ut metus. Nunc non luctus dolor. Sed bibendum sed diam nec vehicula. Integer luctus, metus at fermentu',
  address: '4 Main Street',
  price: 100000,
  type: 'Office',
  capacity: 20 },
{ name: 'Office 5',
  imageUrl: 'https://assets.regus.com/images/nwp/homepage-product-meeting-rooms.jpg',
  description:
   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ex magna, egestas sed malesuada nec, porttitor ut metus. Nunc non luctus dolor. Sed bibendum sed diam nec vehicula. Integer luctus, metus at fermentu',
  address: '5 Main Street',
  price: 120005,
  type: 'Office',
  capacity: 20 },
{ name: 'Office 6',
  imageUrl: 'https://assets.regus.com/images/nwp/homepage-product-lounges.jpg',
  description:
   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ex magna, egestas sed malesuada nec, porttitor ut metus. Nunc non luctus dolor. Sed bibendum sed diam nec vehicula. Integer luctus, metus at fermentu',
  address: '6 Main Street',
  price: 150000,
  type: 'Office',
  capacity: 20 },
{ name: 'Office 7',
  imageUrl: 'https://yourmactech.com.au/wp-content/uploads/2017/11/office-mac-365-macbook-imac-1110x530.jpg',
  description:
   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ex magna, egestas sed malesuada nec, porttitor ut metus. Nunc non luctus dolor. Sed bibendum sed diam nec vehicula. Integer luctus, metus at fermentu',
  address: '7 Main Street',
  price: 170005,
  type: 'Office',
  capacity: 20 },
{ name: 'Office 8',
  imageUrl: 'https://files.steinhafels.com/up/367ad987-40ca-4393-ac07-be07e3bff5f0_Office_1140.jpg',
  description:
   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ex magna, egestas sed malesuada nec, porttitor ut metus. Nunc non luctus dolor. Sed bibendum sed diam nec vehicula. Integer luctus, metus at fermentu',
  address: '8 Main Street',
  price: 200000,
  type: 'Office',
  capacity: 20 },
{ name: 'Office 9',
  imageUrl: 'https://2i4rql3xfq4g2wu3ic47wjri-wpengine.netdna-ssl.com/wp-content/gallery/thorton-office-2/Thorton-office-1a.jpg',
  description:
   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ex magna, egestas sed malesuada nec, porttitor ut metus. Nunc non luctus dolor. Sed bibendum sed diam nec vehicula. Integer luctus, metus at fermentu',
  address: '9 Main Street',
  price: 220005,
  type: 'Office',
  capacity: 20 } ]

  let eventSpaces = [ { name: 'Event Space 0',
  imageUrl:'https://www.ioimprov.com/files/2016/10/iO-Event-Space-5-800x533.jpg',
  description:
   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ex magna, egestas sed malesuada nec, porttitor ut metus. Nunc non luctus dolor. Sed bibendum sed diam nec vehicula. Integer luctus, metus at fermentu',
  address: '0 Fulton Street',
  price: 570000,
  type: 'Event-Space',
  capacity: 200 },
{ name: 'Event Space 1',
  imageUrl: 'https://conferenceeventspace.files.wordpress.com/2011/08/event-space-nyc1.jpg',
  description:
   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ex magna, egestas sed malesuada nec, porttitor ut metus. Nunc non luctus dolor. Sed bibendum sed diam nec vehicula. Integer luctus, metus at fermentu',
  address: '1 Fulton Street',
  price: 100000,
  type: 'Event-Space',
  capacity: 200 },
{ name: 'Event Space 2',
  imageUrl: 'http://www.stage37events.com/wp-content/gallery/venue-tour-main-event-sace/main-space-front-r-1.jpg',
  description:
   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ex magna, egestas sed malesuada nec, porttitor ut metus. Nunc non luctus dolor. Sed bibendum sed diam nec vehicula. Integer luctus, metus at fermentu',
  address: '2 Fulton Street',
  price: 200000,
  type: 'Event-Space',
  capacity: 200 },
{ name: 'Event Space 3',
  imageUrl: 'https://facultyhouse.columbia.edu/files/facultyhouse/rooms/DSC_9442.JPG',
  description:
   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ex magna, egestas sed malesuada nec, porttitor ut metus. Nunc non luctus dolor. Sed bibendum sed diam nec vehicula. Integer luctus, metus at fermentu',
  address: '3 Fulton Street',
  price: 300000,
  type: 'Event-Space',
  capacity: 200 },
{ name: 'Event Space 4',
  imageUrl: 'https://www.ioimprov.com/files/2016/10/iO-Event-Space-5-800x533.jpg',
  description:
   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ex magna, egestas sed malesuada nec, porttitor ut metus. Nunc non luctus dolor. Sed bibendum sed diam nec vehicula. Integer luctus, metus at fermentu',
  address: '4 Fulton Street',
  price: 400000,
  type: 'Event-Space',
  capacity: 200 },
{ name: 'Event Space 5',
  imageUrl: 'https://www.ioimprov.com/files/2016/10/iO-Event-Space-5-800x533.jpg',
  description:
   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ex magna, egestas sed malesuada nec, porttitor ut metus. Nunc non luctus dolor. Sed bibendum sed diam nec vehicula. Integer luctus, metus at fermentu',
  address: '5 Fulton Street',
  price: 500000,
  type: 'Event-Space',
  capacity: 200 },
{ name: 'Event Space 6',
  imageUrl: 'https://www.ioimprov.com/files/2016/10/iO-Event-Space-5-800x533.jpg',
  description:
   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ex magna, egestas sed malesuada nec, porttitor ut metus. Nunc non luctus dolor. Sed bibendum sed diam nec vehicula. Integer luctus, metus at fermentu',
  address: '6 Fulton Street',
  price: 600000,
  type: 'Event-Space',
  capacity: 200 },
{ name: 'Event Space 7',
  imageUrl: 'http://www.stage37events.com/wp-content/gallery/venue-tour-main-event-sace/main-space-front-r-1.jpg',
  description:
   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ex magna, egestas sed malesuada nec, porttitor ut metus. Nunc non luctus dolor. Sed bibendum sed diam nec vehicula. Integer luctus, metus at fermentu',
  address: '7 Fulton Street',
  price: 700000,
  type: 'Event-Space',
  capacity: 200 },
{ name: 'Event Space 8',
  imageUrl: 'https://conferenceeventspace.files.wordpress.com/2011/08/event-space-nyc1.jpg',
  description:
   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ex magna, egestas sed malesuada nec, porttitor ut metus. Nunc non luctus dolor. Sed bibendum sed diam nec vehicula. Integer luctus, metus at fermentu',
  address: '8 Fulton Street',
  price: 809000,
  type: 'Event-Space',
  capacity: 200 },
{ name: 'Event Space 9',
  imageUrl: 'https://www.ioimprov.com/files/2016/10/iO-Event-Space-5-800x533.jpg',
  description:
   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ex magna, egestas sed malesuada nec, porttitor ut metus. Nunc non luctus dolor. Sed bibendum sed diam nec vehicula. Integer luctus, metus at fermentu',
  address: '9 Fulton Street',
  price: 905500,
  type: 'Event-Space',
  capacity: 200 } ]

  let studios = [ { name: 'Studio 0',
  imageUrl: 'https://i.pinimg.com/originals/32/62/2c/32622cbcd26afcdc5b30477a629a8c62.jpg',
  description:
   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ex magna, egestas sed malesuada nec, porttitor ut metus. Nunc non luctus dolor. Sed bibendum sed diam nec vehicula. Integer luctus, metus at fermentu',
  address: '0 Wall Street',
  price: 990000,
  type: 'Studio',
  capacity: 5 },
{ name: 'Studio 1',
  imageUrl: 'https://2aef8o1zc4z01su5y33av6tv-wpengine.netdna-ssl.com/wp-content/uploads/2016/04/Control_Rm_Final-1.jpg',
  description:
   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ex magna, egestas sed malesuada nec, porttitor ut metus. Nunc non luctus dolor. Sed bibendum sed diam nec vehicula. Integer luctus, metus at fermentu',
  address: '1 Wall Street',
  price: 50000,
  type: 'Studio',
  capacity: 5 },
{ name: 'Studio 2',
  imageUrl: 'https://www.sneakybig.com/wp-content/uploads/studio-hero-recording-studio.jpg',
  description:
   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ex magna, egestas sed malesuada nec, porttitor ut metus. Nunc non luctus dolor. Sed bibendum sed diam nec vehicula. Integer luctus, metus at fermentu',
  address: '2 Wall Street',
  price: 100000,
  type: 'Studio',
  capacity: 5 },
{ name: 'Studio 3',
  imageUrl: 'https://static1.squarespace.com/static/52f55e64e4b0030add83011c/t/5c2cf9b10ebbe85745026aa1/1546451426620/',
  description:
   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ex magna, egestas sed malesuada nec, porttitor ut metus. Nunc non luctus dolor. Sed bibendum sed diam nec vehicula. Integer luctus, metus at fermentu',
  address: '3 Wall Street',
  price: 150000,
  type: 'Studio',
  capacity: 5 },
{ name: 'Studio 4',
  imageUrl: 'http://studio-a-recording.com/wp-content/uploads/2010/12/Control-Room_03.02-768x512.jpg',
  description:
   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ex magna, egestas sed malesuada nec, porttitor ut metus. Nunc non luctus dolor. Sed bibendum sed diam nec vehicula. Integer luctus, metus at fermentu',
  address: '4 Wall Street',
  price: 20000,
  type: 'Studio',
  capacity: 5 },
{ name: 'Studio 5',
  imageUrl: 'http://studio-a-recording.com/wp-content/uploads/2010/12/Booth_02.02-768x512.jpg',
  description:
   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ex magna, egestas sed malesuada nec, porttitor ut metus. Nunc non luctus dolor. Sed bibendum sed diam nec vehicula. Integer luctus, metus at fermentu',
  address: '5 Wall Street',
  price: 252500,
  type: 'Studio',
  capacity: 5 },
{ name: 'Studio 6',
  imageUrl: 'https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2017/7/26/0/uo2017_art-studio-01-wide-KB2A7554_h.jpg.rend.hgtvcom.966.644.suffix/1501095431818.jpeg',
  description:
   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ex magna, egestas sed malesuada nec, porttitor ut metus. Nunc non luctus dolor. Sed bibendum sed diam nec vehicula. Integer luctus, metus at fermentu',
  address: '6 Wall Street',
  price: 30000,
  type: 'Studio',
  capacity: 5 },
{ name: 'Studio 7',
  imageUrl: 'https://files.thefunpalette.com/media/djangocms_parallax/1255a234-46aa-11e8-baed-42010af00f06.jpg.1400x600_q85_crop.jpg',
  description:
   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ex magna, egestas sed malesuada nec, porttitor ut metus. Nunc non luctus dolor. Sed bibendum sed diam nec vehicula. Integer luctus, metus at fermentu',
  address: '7 Wall Street',
  price: 35000,
  type: 'Studio',
  capacity: 5 },
{ name: 'Studio 8',
  imageUrl: 'https://www.plumplumcreations.com/wp-content/uploads/2017/03/studio_1.jpg',
  description:
   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ex magna, egestas sed malesuada nec, porttitor ut metus. Nunc non luctus dolor. Sed bibendum sed diam nec vehicula. Integer luctus, metus at fermentu',
  address: '8 Wall Street',
  price: 40000,
  type: 'Studio',
  capacity: 5 },
{ name: 'Studio 9',
  imageUrl: 'https://i.pinimg.com/originals/32/62/2c/32622cbcd26afcdc5b30477a629a8c62.jpg',
  description:
   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ex magna, egestas sed malesuada nec, porttitor ut metus. Nunc non luctus dolor. Sed bibendum sed diam nec vehicula. Integer luctus, metus at fermentu',
  address: '9 Wall Street',
  price: 450000,
  type: 'Studio',
  capacity: 5 } ]

  const venues = [...offices, ...eventSpaces, ...studios]
  const venuePromises = venues.map(venue => Venue.create(venue))
  await Promise.all(venuePromises)

  console.log(`seeded ${venues.length} venues`)
  const transactions = await Promise.all([
    Transaction.create({date: Date.now(),isCart: true, userId: 1}),
    Transaction.create({date: Date.now(),isCart: false, userId: 2}),
    Transaction.create({date: Date.now(),isCart: true, userId: 2}),
    Transaction.create({date: Date.now(),isCart: false, userId: 1}),
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

