import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {Link} from 'react-router-dom'
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Container,
  Icon
} from 'semantic-ui-react'
/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className="login-form">
      <Grid textAlign="center" style={{height: '100%'}} verticalAlign="middle">
        <Grid.Column style={{maxWidth: 450}}>
          <Header as="h2" textAlign="center">
            <Image src="/logo.png" size="massive" />{' '}
            {name === 'signup'
              ? 'Sign up for your account'
              : 'Log-in to your account'}
          </Header>
          <Form size="large" color="blue">
            <form onSubmit={handleSubmit} name={name}>
              <Segment stacked>
                {name === 'signup' ? (
                  <div>
                    <Form.Field>
                      <label htmlFor="firstname">
                        <large>First Name</large>
                      </label>
                      <input
                        name="firstname"
                        type="text"
                        placeholder="First Name"
                      />
                    </Form.Field>
                    <Form.Field>
                      <label htmlFor="lastname">
                        <large>Last Name</large>
                      </label>
                      <input
                        name="lastname"
                        type="text"
                        placeholder="Last Name"
                      />
                    </Form.Field>
                  </div>
                ) : null}
                <br />
                <Form.Field>
                  <label htmlFor="email">
                    <large>Email Address</large>
                  </label>
                  <input
                    name="email"
                    type="text"
                    placeholder="E-mail address"
                  />
                </Form.Field>
                <Form.Field>
                  <label htmlFor="password">
                    <large>Password</large>
                  </label>
                  <input
                    name="password"
                    type="password"
                    placeholder="Password"
                  />
                </Form.Field>
              </Segment>
              <div>
                <Button color="blue" size="large" type="submit">
                  {displayName}
                </Button>
              </div>

              {error && error.response && <div> {error.response.data} </div>}
            </form>
            <br />
            <Button>
              <a href="/auth/google">
                <font size="2">
                  {displayName} with {'                  '}
                </font>
                <Icon name="google" />
              </a>
            </Button>
            {name === 'signup' ? (
              <Message>
                Already have an account? <Link to="/login">Log In</Link>
              </Message>
            ) : (
              <Message>
              New to us? <Link to="/signup">Sign Up</Link>
              </Message>
            )}
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatchSignUp = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const method = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      const firstName = evt.target.firstname.value
      const lastName = evt.target.lastname.value
      dispatch(auth(email, password, method, firstName, lastName))
    }
  }
}

const mapDispatchLogIn = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const method = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, method))
    }
  }
}

export const Login = connect(mapLogin, mapDispatchLogIn)(AuthForm)
export const Signup = connect(mapSignup, mapDispatchSignUp)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
