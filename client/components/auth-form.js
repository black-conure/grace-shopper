import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

import {Button, Form, Container, Icon} from 'semantic-ui-react'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <Form>
      <form onSubmit={handleSubmit} name={name}>
        {name === 'signup' ? (
          <Form.Group widths="equal">
            <Form.Field>
              <label htmlFor="firstname">
                <small>First Name</small>
              </label>
              <input name="firstname" type="text" />
            </Form.Field>
            <Form.Field>
              <label htmlFor="lastname">
                <small>Last Name</small>
              </label>
              <input name="lastname" type="text" />
            </Form.Field>
          </Form.Group>
        ) : null}
        <Form.Group widths="equal">
          <Form.Field>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text" />
          </Form.Field>
          <Form.Field>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" />
          </Form.Field>
        </Form.Group>
        <div>
          <Button type="submit">{displayName}</Button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <a href="/auth/google">
        <font size="1">
          {displayName} with {'                  '}
        </font>
        <Icon name="google" />
      </a>
    </Form>
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

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
