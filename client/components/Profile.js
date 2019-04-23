import React, {Component} from 'react'
import {fetchUserData} from '../store/user'
import {connect} from 'react-redux'
import {Button, Header, Form, Segment, Image} from 'semantic-ui-react'

class Profile extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchUser()

  }


  render(){

    return(
      <h1>USER PAGE </h1>
    )
  }
}
const mapStateToProps = (state) =>({
  userState: state.user
})

const mapDispatchToProps = (dispatch) =>({
    fetchUser: () => dispatch(fetchUserData())
})


export default connect(mapStateToProps, mapDispatchToProps)(Profile)
