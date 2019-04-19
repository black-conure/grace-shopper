import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {editCart, deleteFromCart} from '../store/cart'
import {Button, Card, Image} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

export class CartItem extends Component {
  constructor(props){
    super(props)
    this.state = {
      isEditing: false,
      itemQuantity: 0
    }
    this.toggleEditing = this.toggleEditing.bind(this)
    this.handleQuantityChange = this.handleQuantityChange.bind(this)
    this.handleAccept = this.handleAccept.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
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
  handleAccept(){
    this.props.editCart(this.props.venue.id, this.state.itemQuantity)
    this.setState({
      isEditing: false
    })
  }
  handleDelete(){
    this.props.deleteFromCart(this.props.venue.id)
  }
  render(){
    return (
      <Card>
        <Link to={`/venues/${this.props.venue.id}`}><Image /></Link>
        <Card.Header>{this.props.venue.name}</Card.Header>
        <Card.Description>
          {this.state.isEditing ?
            <input
              type="number" min="0" value={this.state.itemQuantity}
              onChange={this.handleQuantityChange}
              placeholder={this.state.itemQuantity}
            />:
            <h4>Quantity: {this.props.quantity}</h4>
          }
        </Card.Description>
        {this.state.isEditing ?
          <button type="button" onClick={this.handleAccept}>Accept</button> :
          null}
        <button
          type="button" onClick={this.toggleEditing}
        >{this.state.isEditing ? 'Cancel' : 'Edit Quantity'}</button>
        <Card.Description>
          <h4>Price: {this.props.venue.price}</h4>
        </Card.Description>
        <button
          type="button" onClick={this.handleDelete}
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
