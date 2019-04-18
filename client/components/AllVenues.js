import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAllVenues} from '../store/venue'
import {addToCart} from '../store/cart'

class AllVenues extends Component {
  componentDidMount() {
    this.props.populateVenues();
  }
  handleAddToCart(venueId){
    this.props.addToCart(venueId, 1)
  }
  render () {
    return (
      <div>
        <h1>All Venues</h1>
        {this.props.venues.map(venue => {
          return (
            <div key={venue.id}>
              <h3>{venue.name}</h3>
              <h4>Type: {venue.type}</h4>
              <h4>Price: {venue.price}</h4>
              <h4>Capacity: {venue.capacity}</h4>
              <p>Address: {venue.address}</p>
              <button
                type="button" onClick={() => this.handleAddToCart(venue.id)}
              >Add to Cart</button>
            </div>
          )
        })}
      </div>
    )
  }

}

const mapStateToProps = (state) => (
  {
    venues : state.venues.venueList
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    populateVenues : () => dispatch(fetchAllVenues()),
    addToCart: (venueId, quantity) => dispatch(addToCart(venueId, quantity))
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(AllVenues)
