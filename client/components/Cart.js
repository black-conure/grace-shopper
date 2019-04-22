import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCart, fetchLocalCart, checkout} from '../store/cart'
import CartItem from './CartItem'
class Cart extends Component {
  constructor(props){
    super(props)
    this.handleCheckout = this.handleCheckout.bind(this)
  }
  componentDidMount(){
    if (this.props.isLoggedIn){
      this.props.fetchCart()
    }
    else {
      this.props.fetchLocalCart()
    }
  }
  handleCheckout(){
    this.props.checkout()
  }
  render(){
    let cart = this.props.localCart
    if (this.props.isLoggedIn){
      cart = this.props.cart
    }
    return (
      <div>
        <h2>Your Shopping Cart</h2>
        {cart.map(cartItem => (
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
  cart: state.cart.cart,
  localCart: state.cart.localCart,
  isLoggedIn: !!state.user.id
})

const mapDispatchToProps = dispatch => ({
  fetchCart: () => dispatch(fetchCart()),
  fetchLocalCart: () => dispatch(fetchLocalCart()),
  checkout: () => dispatch(checkout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)