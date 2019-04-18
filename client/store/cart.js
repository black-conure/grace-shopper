const axios = require('axios')

const ADDED_TO_CART = 'ADDED_TO_CART'
const EDITED_CART = 'EDITED_CART'
const DELETED_FROM_CART = 'DELETED_FROM_CART'
const CHECKEDOUT = 'CHECKEDOUT'

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

// Thunks

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
    const {data} = await axios.put('/api/carts', {
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

const initialState = []

export default function(state = initialState, action) {
  switch (action.type) {
    case ADDED_TO_CART: {
      const restOfCart = state.filter(item => item.venue.id !== action.venue.id)
      return [{quantity: action.quantity, venue: action.venue}, ...restOfCart]
    }
    case EDITED_CART: {
      const restOfCart = state.filter(item => item.venue.id !== action.venue.id)
      return [{quantity: action.quantity, venue: action.venue}, ...restOfCart]
    }
    case DELETED_FROM_CART:
      return state.filter(item => item.venue.id !== action.venueId)
    case CHECKEDOUT:
      return initialState
    default:
      return state
  }
}