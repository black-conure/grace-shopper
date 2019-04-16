import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAllVenues} from '../store/venue'

export default class AllVenues extends Component {
  constructor(props){
    super(props)

  }

  componentDidMount() {
    console.log('HELLO??')
    // this.props.populateVenues();
  }

  render () {
    console.log('HELLO??')
    return (
      <div>
      <h1>All Venues</h1>

      </div>
    )
  }

}

// const mapStateToProps = (state) => (
//   {
//   venues : state.venueState
// }
// )

// const mapDispatchToProps = (dispatch) => (
//   {
//     populateVenues : () => dispatch(fetchAllVenues())
//   }
// )

// export default connect(mapStateToProps, mapDispatchToProps)(AllVenues)
