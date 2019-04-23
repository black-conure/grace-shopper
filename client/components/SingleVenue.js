import React, {Component} from 'react'
import {fetchSingleVenue} from '../store/venue'
import {connect} from 'react-redux'
import {addToCart} from '../store/cart'
import {Button, Header, Form, Segment, Image} from 'semantic-ui-react'

class SingleVenue extends Component {
  constructor(props) {
    super(props)

    this.state = {quantity: 1}
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.populateVenue(this.props.match.params.id)
  }

  handleAddToCart(venueId) {
    this.props.addToCart(venueId, this.state.quantity)
  }

  handleChange(event) {
    this.setState({quantity: event.target.value})
  }

  render() {
    const {name, type, price, capacity, address, id, imageUrl, description} = this.props.venue
    return (
      <Segment placeholder>
      <Image src={imageUrl} />
        <Header>
          <font size="6">{name}</font>
        </Header>
        <h3>Type: {type}</h3>
        <h3>Description:</h3>
        <h4>{description}</h4>
        <h4>Price: {price}</h4>
        <h4>Capacity: {capacity}</h4>
        <p>Address: {address}</p>
        <Form>
          <Form.Group widths="equal">
            <Form.Field>
              <label htmlFor="quantity">
                <small>Quantity</small>
              </label>
              <input
                onChange={this.handleChange}
                value={this.state.quantity}
                name="quantity"
                type="number"
              />
            </Form.Field>
          </Form.Group>
        </Form>
        <Button
          size="huge"
          color="blue"
          type="button"
          onClick={() => this.handleAddToCart(id, this.state.quantity)}
        >
          Add to Cart
        </Button>
      </Segment>
    )
  }
}

const mapStateToProps = state => ({
  venue: state.venues.selectedVenue
})

const mapDispatchToProps = dispatch => ({
  populateVenue: id => dispatch(fetchSingleVenue(id)),
  addToCart: (venueId, quantity) => dispatch(addToCart(venueId, quantity))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleVenue)
