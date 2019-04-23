import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {editCart, deleteFromCart} from '../store/cart'
import {Link} from 'react-router-dom'
import { Button, Icon, Image, Item, Label, Card, Segment, Input } from 'semantic-ui-react'


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
      <Item>
        <Segment as={Link} to={`/venues/${this.props.venue.id}`}>
        <Item.Image src={this.props.venue.imageUrl} size={'medium'}/>


        </Segment>
        <Item.Content className="cart-item-content" >
        <Link to={`/venues/${this.props.venue.id}`}>
          <Item.Header><h3>{this.props.venue.name}</h3></Item.Header></Link>

        <Item.Description>
          {this.state.isEditing ?
            <Input
              type="number" min="0" value={this.state.itemQuantity}
              onChange={this.handleQuantityChange}
              placeholder={this.state.itemQuantity}
            />:
            <h4>Quantity: {this.props.quantity}</h4>
          }
        </Item.Description>
        {this.state.isEditing ?
          <Button type="button" onClick={this.handleAccept}>Accept</Button> :
          null}
        <Button
          type="button" onClick={this.toggleEditing} size="small" color="blue"
        >{this.state.isEditing ? 'Cancel' : 'Edit Quantity'}</Button>
        <Item.Description>
          <h4>Price: {this.props.venue.price}</h4>
        </Item.Description>
        <Button
          type="button" onClick={this.handleDelete} size="small"
          color="red"
        >Delete</Button>


        </Item.Content>

      </Item>

    )
  }
}

const mapDispatchToProps = dispatch => ({
  editCart: (venueId, quantity) => dispatch(editCart(venueId, quantity)),
  deleteFromCart: venueId => dispatch(deleteFromCart(venueId)),
})

export default connect(null, mapDispatchToProps)(CartItem)
