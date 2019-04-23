import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

import {Menu, Grid, Icon, Dropdown, GridColumn, Image} from 'semantic-ui-react'

const Navbar = ({handleClick, isLoggedIn}) => (

    <Menu color={'blue'} inverted>
            <Menu.Item>
              <Link to="/home">Home</Link>
            </Menu.Item>


            <Menu.Item>
              <Link to="/venues">Venues</Link>
            </Menu.Item>

          <Menu.Item>
             <Image src='/logo.png' size="mini" margin='10px'/> Graceful Venues
          </Menu.Item>

          <Menu.Menu position="right">
          <Menu.Item >
            <Link to="/cart">
              <Icon name="shopping cart" size="large" />
            </Link>
          </Menu.Item>

          {isLoggedIn ? (
            <Menu.Item position="right">
              <Dropdown text="User" labeled button inverted>
                <Dropdown.Menu>
                  <Dropdown.Header
                    content={<Link to="/userProfile">User Profile</Link>}
                  />
                  <Dropdown.Header
                    onClick={handleClick}
                    content={<Link to="/userProfile">Log Out</Link>}
                  />
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
          ) : (
            <Fragment>
              <Menu.Item>
                <Link to="/login">Login</Link>
              </Menu.Item>

              <Menu.Item>
                <Link to="/signup">Sign Up</Link>
              </Menu.Item>
            </Fragment>
          )}
          </Menu.Menu>


    </Menu>

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
