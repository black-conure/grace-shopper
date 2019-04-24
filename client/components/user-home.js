import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Homepage from './Homepage'

import {mergeCarts} from '../store/cart'

/**
 * COMPONENT
 */
class UserHome extends Component{
  componentDidMount(){
    this.props.mergeCarts()
  }
  render(){
    const {email} = this.props
    return (
      <Homepage />
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}
const mapDispatchToProps = dispatch => ({
  mergeCarts: () => dispatch(mergeCarts())
})

export default connect(mapState, mapDispatchToProps)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
