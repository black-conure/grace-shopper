import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchCart, fetchLocalCart, checkout} from '../store/cart'
import CartItem from './CartItem'
import StripeCheckout from 'react-stripe-checkout';
import STRIPE_PUBLISHABLE from '../constants/stripe';
import { Item, Message } from 'semantic-ui-react'

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
  fromDollarToCent = () =>{
    let amount = 0

    this.props.cart.forEach(cartItem => {

      amount += (cartItem.venue.price * cartItem.quantity)
    })

    return amount * 100;
  }

  render(){
    let cart = this.props.localCart
    if (this.props.isLoggedIn){
      cart = this.props.cart
    }
    return (
      <div>
        {cart.length < 1 ? <h2>Your Shopping Cart is Empty</h2> : <h2>Your Shopping Cart:</h2>}
        <Item.Group divided>
        {cart.map(cartItem => (
          <CartItem
            venue={cartItem.venue} quantity={cartItem.quantity}
            key={cartItem.venue.id}
          />
        ))}
        </Item.Group>
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
          <br/>
          <br/>
          <br/>
        </div>
        {this.props.isLoggedIn ?
          null :
          <Message id="cartMessage" compact>
            To checkout, please <Link to="/login">log in</Link> or <Link to="/signup">sign up</Link>.
          </Message>
        }
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
