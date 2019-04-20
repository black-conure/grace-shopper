import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

import {Menu, Grid} from 'semantic-ui-react'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <Menu color={'blue'} inverted>
      <Grid columns={6}>
        <Grid.Row stretched>
          {isLoggedIn ? (
            <Fragment>
              {/* The navbar will show these links after you log in */}
              <Menu.Item>
                <Link to="/home">Home</Link>
              </Menu.Item>
              <Menu.Item>
                <a href="#" onClick={handleClick}>
                  Logout
                </a>
              </Menu.Item>
            </Fragment>
          ) : (
            <Fragment>
              {/* The navbar will show these links before you log in */}
              <Grid.Column>
                <Menu.Item>
                  <Link to="/login">Login</Link>
                </Menu.Item>
              </Grid.Column>
              <Grid.Column>
                <Menu.Item>
                  <Link to="/signup">Sign Up</Link>
                </Menu.Item>
              </Grid.Column>
            </Fragment>
          )}
          <Grid.Column>
            <Menu.Item>
              <Link to="/venues">All Venues</Link>
            </Menu.Item>
          </Grid.Column>

          <Grid.Column>
            <Menu.Item>Graceful Venues</Menu.Item>
          </Grid.Column>

          <Grid.Column>
            <Menu.Item>
              <Link to="/cart">Shopping Cart</Link>
            </Menu.Item>
          </Grid.Column>

          <Grid.Column>
            <Menu.Item>
              <Link to="/userProfile">User Profile</Link>
            </Menu.Item>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Menu>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
