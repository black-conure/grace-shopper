import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

import {Menu, Grid, Icon, Dropdown, GridColumn, Image, Sticky} from 'semantic-ui-react'

const Navbar = ({handleClick, isLoggedIn}) => (

    <Menu color='blue' inverted id='navBar' fixed='top'>
            <Menu.Item>
              <Image id="nav-image" src='/logo.png' size="mini" margin='10px'/>
            </Menu.Item>
            <Menu.Item>
              <Link className="nav-text" to="/home">Home</Link>
            </Menu.Item>
            <Menu.Item>
              <Link className="nav-text" to="/venues">Venues</Link>
            </Menu.Item>
            <Menu.Item id="navbar-title-and-image-container">
              <div id="nav-title"><div className="nav-title-text">Graceful</div><div className="nav-title-text">Venues</div></div>
            </Menu.Item>
            <Menu.Item id="cart-icon">
              <Link to="/cart">
                <Icon name="shopping cart" size="large" />
              </Link>
            </Menu.Item>
          {isLoggedIn ? (
            <Menu.Item id="menu-dropdown">
              <Button size="huge" >
                <Dropdown  text="User" labeled button inverted>
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
              </Button>
            </Menu.Item>
          ) : (
            <Fragment>
              <Menu.Item >
                <Link to="/login">Login</Link>
              </Menu.Item>
              <Menu.Item >
                <Link to="/signup">Sign Up</Link>
              </Menu.Item>
            </Fragment>
          )}
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
