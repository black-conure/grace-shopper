import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAllVenues} from '../store/venue'
import {Button, Card, Image} from 'semantic-ui-react'

class AllVenues extends Component {
  componentDidMount() {
    this.props.populateVenues()
  }

  render() {
    return (
      <div>
        <h1>All Venues</h1>
        <Card.Group>
          {this.props.venues.map(venue => {
            return (
              <Card key={venue.id}>
                <Image />
                <Card.Header>{venue.name}</Card.Header>
                <Card.Meta>Type: {venue.type}</Card.Meta>
                <Card.Description>
                  <h4>Price: {venue.price}</h4>
                </Card.Description>
                <Card.Description>
                  <h4>Capacity: {venue.capacity}</h4>
                </Card.Description>
                <p>Address: {venue.address}</p>
              </Card>
            )
          })}
        </Card.Group>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  venues: state.venues.venueList
})

const mapDispatchToProps = dispatch => ({
  populateVenues: () => dispatch(fetchAllVenues())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllVenues)
