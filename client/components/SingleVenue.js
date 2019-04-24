import React, {Component} from 'react'
import {fetchSingleVenue} from '../store/venue'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {addToCart, addToLocalCart} from '../store/cart'
import {Button, Header, Form, Segment, Image} from 'semantic-ui-react'

class SingleVenue extends Component {
  constructor(props) {
    super(props)

    this.state = {quantity: 1}
    this.handleChange = this.handleChange.bind(this)
    this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  componentDidMount() {
    this.props.populateVenue(this.props.match.params.id)
  }

  handleAddToCart() {
    if (this.props.isLoggedIn) {
      this.props.addToCart(this.props.venue.id, this.state.quantity)
    } else {
      this.props.addToLocalCart(this.props.venue, this.state.quantity)
    }
  }

  handleChange(event) {
    this.setState({quantity: event.target.value})
  }

  render() {
    const {
      name,
      type,
      price,
      capacity,
      address,
      imageUrl,
      description
    } = this.props.venue
    let dollarPrice = price/100
    return (
      <Segment placeholder>
        <Image src={imageUrl} />
        <Header>
          <font size="6">{name}</font>
        </Header>
        <h3>Type: {type}</h3>
        <h3>Description:</h3>
        <h4>{description}</h4>
        <h4>Price: ${dollarPrice}</h4>
        <h4>Capacity: {capacity}</h4>
        <p>Address: {address}</p>
        <Form>
          <Form.Group widths="equal">
            <Form.Field>
              <label htmlFor="quantity">
                <small>Quantity (hours)</small>
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
        <Link to="/cart">
          <Button
            size="huge"
            color="blue"
            type="button"
            onClick={this.handleAddToCart}
          >
            Add to Cart
          </Button>
        </Link>
      </Segment>
    )
  }
}

const mapStateToProps = state => ({
  venue: state.venues.selectedVenue,
  isLoggedIn: !!state.user.id
})

const mapDispatchToProps = dispatch => ({
  populateVenue: id => dispatch(fetchSingleVenue(id)),
  addToCart: (venueId, quantity) => dispatch(addToCart(venueId, quantity)),
  addToLocalCart: (venue, quantity) => dispatch(addToLocalCart(venue, quantity))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleVenue)
