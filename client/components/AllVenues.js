import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAllVenues} from '../store/venue'

class AllVenues extends Component {
  componentDidMount() {
    this.props.populateVenues();
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
    populateVenues : () => dispatch(fetchAllVenues())
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(AllVenues)
