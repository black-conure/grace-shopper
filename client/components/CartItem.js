import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {editCart, deleteFromCart} from '../store/cart'
import {Button, Card, Image} from 'semantic-ui-react'

export class CartItem extends Component {
  constructor(props){
    super(props)
    this.state = {
      isEditing: false,
      itemQuantity: this.props.quantity
    }
    this.toggleEditing = this.toggleEditing.bind(this)
    this.handleQuantityChange = this.handleQuantityChange.bind(this)
  }
  toggleEditing(){
    this.setState(prevState => ({
      isEditing: !prevState.isEditing,
      itemQuantity: this.props.quantity
    }))
  }
  handleQuantityChange(event){
    this.setState({
      itemQuantity: event.target.value
    })
  }
  render(){
    return (
      <Card key={this.props.venue.id}>
        <Image />
        <Card.Header>{this.props.venue.name}</Card.Header>
        <Card.Description>
          {this.state.isEditing ?
            <input
              type="numeric" value={this.state.itemQuantity}
              onChange={this.handleQuantityChange}
            />:
            <h4>Quantity: {this.props.quantity}</h4>
          }
        </Card.Description>
        {this.state.isEditing ?
          <button type="button">Accept</button> :
          null}
        <button
          type="button" onClick={this.toggleEditing}
        >{this.state.isEditing ? 'Cancel' : 'Edit Quantity'}</button>
        <Card.Description>
          <h4>Price: {this.props.venue.price}</h4>
        </Card.Description>
        <button
          type="button" onClick={() => this.handleAddToCart(this.props.venue.id)}
        >Delete</button>
      </Card>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  editCart: (venueId, quantity) => dispatch(editCart(venueId, quantity)),
  deleteFromCart: venueId => dispatch(deleteFromCart(venueId)),
})

export default connect(null, mapDispatchToProps)(CartItem)
