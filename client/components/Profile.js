import React, {Component} from 'react'
import {fetchUserData} from '../store/user'
import {connect} from 'react-redux'
import OrderHistory from './OrderHistory'
import {Link} from 'react-router-dom'
import {
  Button,
  Header,
  Form,
  Grid,
  Segment,
  Icon,
  Container,
  Divider
} from 'semantic-ui-react'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state={
      historyShowing: false
    }
    this.orderHistory = this.orderHistory.bind(this)
  }

  componentDidMount() {
    this.props.fetchUser()
  }
  orderHistory(){
    this.setState(prevState => ({
      historyShowing: !prevState.historyShowing,
    }))
  }

  render() {
    let {firstName, lastName, email, id, transactions} = this.props.userState
    firstName = firstName[0].toUpperCase() + firstName.slice(1)
    lastName = lastName[0].toUpperCase() + lastName.slice(1)
    console.log('*****this.props: ', this.props);
    return (
      <div>
        <Header textAlign="center" size="huge">
          Welcome to your user profile, {firstName} {lastName}
        </Header>
        <Segment style={{padding: '2em 0em'}} vertical>
          <Grid>
            <Grid.Column textAlign="center">
              <Button onClick={this.orderHistory} size="large" color="blue">
                Order History
              </Button>
            </Grid.Column>
          </Grid>
          {/* DETERMINE WHAT TO SHOW ON PAGE HISTORY OR EDIT INFO */}
          {this.state.historyShowing ? <OrderHistory transactions={transactions} /> :
          <Container text>
          <Divider
            as="h3"
            className="header"
            horizontal
            style={{margin: '3em 0em 2em 0em', textTransform: 'uppercase'}}
          >
            <div>Name</div>
          </Divider>
          <p style={{fontSize: '1.25em'}}>
            {firstName} {lastName}
          </p>
          <Button as="a" size="large">
            Edit <Icon style={{margin: '0px 5px'}} name="edit outline" />
          </Button>
          <Divider
            as="h3"
            className="header"
            horizontal
            style={{margin: '1.5em 0em', textTransform: 'uppercase'}}
          >
            <div>Email</div>
          </Divider>
          <p style={{fontSize: '1.25em'}}>{email}</p>
          <Button as="a" size="large">
            Edit <Icon style={{margin: '0px 5px'}} name="edit outline" />
          </Button>
          <Divider
            as="h3"
            className="header"
            horizontal
            style={{margin: '1.5em 0em', textTransform: 'uppercase'}}
          >
            <div>Password</div>
          </Divider>
          <p style={{fontSize: '1em'}}>***************</p>
          <Button as="a" size="large">
            Change Password{' '}
            <Icon style={{margin: '0px 5px'}} name="edit outline" />
          </Button>
        </Container>
          }
      </Segment>

      </div>
    )
  }
}
const mapStateToProps = state => ({
  userState: state.user
})

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(fetchUserData())
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
