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
      dispatch(getAllVenues(venues.data))
    }
    catch (error) { console.error(error)}
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
