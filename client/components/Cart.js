import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCart, checkout} from '../store/cart'
import CartItem from './CartItem'
class Cart extends Component {
  constructor(props){
    super(props)
    this.handleCheckout = this.handleCheckout.bind(this)
  }
  componentDidMount(){
    this.props.fetchCart()
  }
  handleCheckout(){
    this.props.checkout()
  }
  render(){
    return (
      <div>
        <h2>Your Shopping Cart</h2>
        {this.props.cart.map(cartItem => (
          <CartItem
            venue={cartItem.venue} quantity={cartItem.quantity}
            key={cartItem.venue.id}
          />
        ))}
        <button type="button" onClick={this.handleCheckout}>Checkout</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  fetchCart: () => dispatch(fetchCart()),
  checkout: () => dispatch(checkout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)