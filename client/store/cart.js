/*eslint-disable complexity*/

const axios = require('axios')
const localStorage = window.localStorage

const FETCHED_CART = 'FETCHED_CART'
const ADDED_TO_CART = 'ADDED_TO_CART'
const EDITED_CART = 'EDITED_CART'
const DELETED_FROM_CART = 'DELETED_FROM_CART'
const CHECKEDOUT = 'CHECKEDOUT'

const FETCHED_LOCAL_CART = 'FETCHED_LOCAL_CART'
const ADDED_TO_LOCAL_CART = 'ADDED_TO_LOCAL_CART'
const DELETED_FROM_LOCAL_CART = 'DELETED_FROM_LOCAL_CART'

const MERGED_CARTS = 'MERGED_CARTS'

export const fetchedCart = (cartItems) => ({
  type: FETCHED_CART,
  cartItems
})

export const addedToCart = (venue, quantity) => ({
  type: ADDED_TO_CART,
  venue,
  quantity
})

export const editedCart = (venue, quantity) => ({
  type: EDITED_CART,
  venue,
  quantity
})

export const deletedFromCart = venueId => ({
  type: DELETED_FROM_CART,
  venueId
})

export const checkedOut = () => ({
  type: CHECKEDOUT
})

export const fetchedLocalCart = (detailedLocalCart) => ({
  type: FETCHED_LOCAL_CART,
  detailedLocalCart
})

export const addedToLocalCart = (venue, quantity) => ({
  type: ADDED_TO_LOCAL_CART,
  venue,
  quantity
})

export const deletedFromLocalCart = venueId => ({
  type: DELETED_FROM_LOCAL_CART,
  venueId
})

export const mergedCarts = (remoteCartItems) => ({
  type: MERGED_CARTS,
  remoteCartItems
})

// Thunks

export const fetchCart = () => async(dispatch) => {
  try {
    const {data} = await axios.get('/api/carts')
    const cartItems = data.map(ti => ({
      venue: ti.venue,
      quantity: ti.quantity
    }))
    dispatch(fetchedCart(cartItems))
  } 
  catch (error) {
    console.error(error)
  }
}

export const addToCart = (venueId, quantity) => async(dispatch) => {
  try {
    const {data} = await axios.post('/api/carts', {
      venueId,
      quantity
    })
    dispatch(addedToCart(data.venue, data.quantity))
  }
  catch (err){
    console.error(err)
  }
}

export const editCart = (venueId, quantity) => async(dispatch) => {
  try {
    const {data} = await axios.post('/api/carts', {
      venueId,
      quantity
    })
    dispatch(editedCart(data.venue, data.quantity))
  }
  catch (err){
    console.error(err)
  }
}

export const deleteFromCart = (venueId) => async(dispatch) => {
  try {
    await axios.delete(`/api/carts/${venueId}`)
    dispatch(deletedFromCart(venueId))
  }
  catch (err){
    console.error(err)
  }
}

export const checkout = () => async(dispatch) => {
  try {
    await axios.post('/api/carts/checkout')
    dispatch(checkedOut())
  } 
  catch (err){
    console.error(err)
  }
}

export const fetchLocalCart = () => async(dispatch) => {
  try {
    const response = await axios.get('/api/venues')
    const venues = response.data
    const idToVenue = new Map()
    venues.forEach(venue => {
      idToVenue.set(venue.id, venue)
    })
    const localCartStr = localStorage.getItem('cart')
    const localCart = localCartStr ? JSON.parse(localCartStr) : []
    const detailedLocalCart = []
    for (let item of localCart){
      if (idToVenue.has(item.venueId)){
        detailedLocalCart.push({
          venue: idToVenue.get(item.venueId),
          quantity: item.quantity
        })
      }
    }
    dispatch(fetchedLocalCart(detailedLocalCart))
  }
  catch (error) {
    console.error(error)
  }
}

export const addToLocalCart = (venue, quantity) => dispatch => {
  const localCartStr = localStorage.getItem('cart')
  const localCart = localCartStr ? JSON.parse(localCartStr) : []
  let foundVenueInCart = false
  for (let item of localCart){
    if (venue.id === item.venueId){
      foundVenueInCart = true
      item.quantity = quantity
      break
    }
  }
  if (!foundVenueInCart){
    localCart.push({
      venueId: venue.id,
      quantity
    })
  }
  const newLocalCartStr = JSON.stringify(localCart)
  localStorage.setItem('cart', newLocalCartStr)
  dispatch(addedToLocalCart(venue, quantity))
}

export const deleteFromLocalCart = venueId => dispatch => {
  const localCartStr = localStorage.getItem('cart')
  const localCart = localCartStr ? JSON.parse(localCartStr) : []
  const newLocalCart = localCart.filter(item => item.venueId !== venueId)
  const newLocalCartStr = JSON.stringify(newLocalCart)
  localStorage.setItem('cart', newLocalCartStr)
  dispatch(deletedFromLocalCart(venueId))
}

export const mergeCarts = () => async(dispatch) => {
  try {
    const localCartStr = localStorage.getItem('cart')
    const localCart = localCartStr ? JSON.parse(localCartStr) : []
    const addToCartPromises = localCart.map(item => (
      axios.post('/api/carts', {
        venueId: item.venueId,
        quantity: item.quantity
      })
    ))
    await Promise.all(addToCartPromises)
    localStorage.setItem('cart', '[]')
    // fetch remote cart items again
    const {data} = await axios.get('/api/carts')
    const cartItems = data.map(ti => ({
      venue: ti.venue,
      quantity: ti.quantity
    }))
    dispatch(mergedCarts(cartItems))
  }
  catch (error){
    console.error(error)
  }
}

const initialState = {cart: [], localCart: []}

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCHED_CART: {
      return {
        cart: action.cartItems,
        localCart: state.localCart
      }
    }
    case ADDED_TO_CART: {
      const restOfCart = state.cart.filter(item => item.venue.id !== action.venue.id)
      return {
        cart: [{quantity: action.quantity, venue: action.venue}, ...restOfCart],
        localCart: state.localCart
      }
    }
    case EDITED_CART: {
      const restOfCart = state.cart.filter(item => item.venue.id !== action.venue.id)
      return {
        cart: [{quantity: action.quantity, venue: action.venue}, ...restOfCart],
        localCart: state.localCart
      }
    }
    case DELETED_FROM_CART: {
      const newCart = state.cart.filter(item => item.venue.id !== action.venueId)
      return {
        cart: newCart,
        localCart: state.localCart
      }
    }
    case CHECKEDOUT:
      return initialState
    case FETCHED_LOCAL_CART: {
      return {
        cart: state.cart,
        localCart: action.detailedLocalCart
      }
    }
    case ADDED_TO_LOCAL_CART: {
      const restOfLocalCart = state.localCart.filter(
        item => item.venue.id !== action.venue.id
      )
      return {
        cart: state.cart,
        localCart: [
          {quantity: action.quantity, venue: action.venue}, ...restOfLocalCart
        ]
      }
    }
    case DELETED_FROM_LOCAL_CART: {
      const newLocalCart = state.localCart.filter(
        item => item.venue.id !== action.venueId
      )
      return {
        cart: state.cart,
        localCart: newLocalCart
      }
    }
    case MERGED_CARTS: {
      return {
        cart: action.remoteCartItems,
        localCart: []
      }
    }
    default:
      return state
  }
}