import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALL_VENUES = 'GET_ALL_VENUES'
const REMOVE_VENUE = 'REMOVE_VENUE'

/**
 * INITIAL STATE
 */
const defaultVenueState = {
  venueList : []
}

/**
 * ACTION CREATORS
 */
const getAllVenues = venues => {
  console.log('IN GET ALL VENUES ACTION CRATOR'  )
  return {type: GET_ALL_VENUES, venues}
}
const removeVenue = () => ({type: REMOVE_VENUE})

/**
 * THUNK CREATORS
 */
export const fetchAllVenues = () => {
  return async (dispatch) => {
    try {
      const venues = await axios.get('/api/venues')
      console.log('VENUES:', venues.data)
      dispatch(getAllVenues(venues.data))
    }
    catch (error) { next(error)}

  }
}

/**
 * REDUCER
 */
export default function(state = defaultVenueState, action) {
  switch (action.type) {
    case GET_ALL_VENUES:
      return {...state, venueList: action.venues}
    case REMOVE_VENUE:
      return defaultVenueState
    default:
      return state
  }
}
