import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAllVenues} from '../store/venue'
import {Grid, Card, Image, Header} from 'semantic-ui-react'

class AllVenues extends Component {
  componentDidMount() {
    this.props.populateVenues()
  }
  render() {
    return (
      <div>
        <Header size="huge" textAlign='center' class="allvenuesHeader"><strong>All Venues</strong></Header>
        <Grid columns = {3} celled>
        <Grid.Row stretched>
          {this.props.venues.map(venue => {
            return (
            <Grid.Column columns='equal' key={venue.id} >
              <Card class="venuecards" color='blue' centered>
              <Link to={`venues/${venue.id}`}>
                <Image src={venue.imageUrl}  size='huge' />
                <Card.Header><strong>{venue.name}</strong></Card.Header>
                <Card.Meta>Type: {venue.type}</Card.Meta>
                <Card.Description>
                  Capacity: {venue.capacity}
                </Card.Description>
                <p>Address: {venue.address}</p>
                <br />
                <Card.Description ><strong>Price: ${venue.price/100}</strong>/per hour
                </Card.Description>
                </Link>
              </Card>
            </Grid.Column>
            )
          })}
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  venues: state.venues.venueList
})

const mapDispatchToProps = (dispatch) => (
  {
    populateVenues : () => dispatch(fetchAllVenues()),
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(AllVenues)
