import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

import {Menu, Grid, Icon, Dropdown} from 'semantic-ui-react'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <Menu color={'blue'} inverted>
      <Grid textAlign='center'>
        <Grid.Row stretched>


            <Menu.Item>
                <Link to="/home">Home</Link>
              </Menu.Item>
            <Menu.Item>
              <Link to="/venues">Venues</Link>
            </Menu.Item>



            <Menu.Item>Graceful Venues</Menu.Item>



            <Menu.Item>
              <Link to="/cart"><Icon name="shopping cart" size="large"/></Link>
            </Menu.Item>


            {isLoggedIn ? (
            <Menu.Item>
            <Dropdown text="User" labeled button inverted>
              <Dropdown.Menu >
                  <Dropdown.Header  content={<Link to="/userProfile">User Profile</Link>} />
                  <Dropdown.Header onClick={handleClick} content={<Link to="/userProfile">Log Out</Link>} />
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
