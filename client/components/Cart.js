import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCart, checkout} from '../store/cart'
import CartItem from './CartItem'
import StripeCheckout from 'react-stripe-checkout';
import STRIPE_PUBLISHABLE from '../constants/stripe';



class Cart extends Component {
  constructor(props){
    super(props)
    this.handleCheckout = this.handleCheckout.bind(this)
    this.buttonDisabled = this.buttonDisabled.bind(this)
  }
  buttonDisabled(){
    return this.props.cart.length < 1 ? true : false
  }
  componentDidMount(){
    this.props.fetchCart()
  }
  handleCheckout(){
    this.props.checkout()
  }
  fromDollarToCent = () =>{
    let amount = 0

    this.props.cart.forEach(cartItem => {

      amount += (cartItem.venue.price * cartItem.quantity)
    })

    return amount * 100;
  }

  render(){
    return (
      <div>

        {this.props.cart.length < 1 ? <h2>Your Shopping Cart is Empty</h2> : <h2>Your Shopping Cart:</h2>}
        {this.props.cart.map(cartItem => (
          <CartItem
            venue={cartItem.venue} quantity={cartItem.quantity}
            key={cartItem.venue.id}
          />
        ))}
        {/* <button type="button" onClick={this.handleCheckout}>Checkout</button> */}
        {/* THIS IS THE STRIPE CHECKOUT */}
        <div>
          <StripeCheckout
            name={name}
            description= "Checkout your shopping cart!"
            amount={this.fromDollarToCent()}
            token={this.handleCheckout}
            currency='USD'
            stripeKey={STRIPE_PUBLISHABLE}
            disabled={!this.props.cart.length}
          />
        </div>
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
