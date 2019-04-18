const axios = require('axios')

const ADDED_TO_CART = 'ADDED_TO_CART'
const EDIT_CART = 'EDIT_CART'
const DELETE_FROM_CART = 'DELETE_FROM_CART'
const CHECKOUT = 'CHECKOUT'

export const addedToCart = (venue, quantity) => {
  return {
    type: ADDED_TO_CART,
    venue,
    quantity
  }
}

// Thunks

export const addToCart = (venueId, quantity) => {
  return async(dispatch) => {
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
}

const initialState = []

export default function(state = initialState, action) {
  switch (action.type) {
    case ADDED_TO_CART: {
      const newState = state.filter(item => item.venue.id !== action.venue.id)
      newState.push({quantity: action.quantity, venue: action.venue})
      return newState
    }
    default:
      return state
  }
}