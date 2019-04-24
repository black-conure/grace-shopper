import React, {Component} from 'react'
import {fetchUserData, editUser} from '../store/user'
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
  Divider,
  Input
} from 'semantic-ui-react'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      historyShowing: false,
      editingEmail: false,
      editingName: false,
      firstName: '',
      lastName: '',
      email: ''
    }
    this.orderHistory = this.orderHistory.bind(this)
    this.editEmail = this.editEmail.bind(this)
    this.editName = this.editName.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async componentDidMount() {
    await this.props.fetchUser()
    this.setState({
      firstName: this.props.userState.firstName,
      lastName: this.props.userState.lastName,
      email: this.props.userState.email
    })
  }

  orderHistory() {
    this.setState(prevState => ({
      historyShowing: !prevState.historyShowing
    }))
  }
  editName() {
    this.setState(prevState => ({
      editingName: !prevState.editingName
    }))
  }
  editEmail() {
    this.setState(prevState => ({
      editingEmail: !prevState.editingEmail
    }))
  }

  async handleEdit() {
    await this.props.editUser(this.state)
    this.setState({
      editingEmail: false,
      editingName: false
    })
    this.props.fetchUser()
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    let {firstName, lastName, email, id, transactions} = this.props.userState
    firstName = firstName[0].toUpperCase() + firstName.slice(1)
    lastName = lastName[0].toUpperCase() + lastName.slice(1)
    if (transactions && transactions.length) {
      transactions.sort((a,b) => b.id - a.id)
    }
    return (
      <div id='profileContainer'>
        <Header textAlign="center" size="huge">
          {this.state.historyShowing
            ? `${firstName}'s Order History`
            : `Welcome to your user profile, ${firstName} ${lastName}`}
        </Header>
        <Segment style={{padding: '2em 0em'}} vertical>
          <Grid>
            <Grid.Column textAlign="center">
              <Button onClick={this.orderHistory} size="large" color="blue">
                {this.state.historyShowing ? 'Profile' : 'Order History'}
              </Button>
            </Grid.Column>
          </Grid>
          {/* DETERMINE WHAT TO SHOW ON PAGE HISTORY OR EDIT INFO */}
          {this.state.historyShowing ? (
            <OrderHistory transactions={transactions} />
          ) : (
            <Container text>
              {/* FIRST AND LAST NAMES */}
              <Divider
                as="h3"
                className="header"
                horizontal
                style={{margin: '3em 0em 2em 0em', textTransform: 'uppercase'}}
              >
                <div>Name</div>
              </Divider>
              {this.state.editingName ? (
                <div>
                  <Input
                    name="firstName"
                    type="text"
                    value={this.state.firstName}
                    onChange={this.handleChange}

                  />
                  <Input
                    name="lastName"
                    type="text"
                    value={this.state.lastName}
                    onChange={this.handleChange}

                  />
                  <Button as="a" size="large" color="green" onClick={this.handleEdit}>
                    Accept{' '}
                    <Icon style={{margin: '0px 5px'}} name="edit outline" />
                  </Button>
                  <Button as="a" size="large" color='red' onClick={this.editName}>
                    Cancel{' '}
                    <Icon style={{margin: '0px 5px'}} name="cancel" />
                  </Button>
                </div>
              ) : (
                <div>
                  <p style={{fontSize: '1.25em'}}>
                    {firstName} {lastName}
                  </p>
                  <Button as="a" size="large" onClick={this.editName}>
                    Edit{' '}
                    <Icon style={{margin: '0px 5px'}} name="edit outline" />
                  </Button>
                </div>
              )}

              {/* EMAIL PART */}
              <Divider
                as="h3"
                className="header"
                horizontal
                style={{margin: '1.5em 0em', textTransform: 'uppercase'}}
              >
                <div>Email</div>
              </Divider>


              {this.state.editingEmail ? (
                <div>
                  <Input
                    name="email"
                    type="text"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                  <Button as="a" size="large" color="green" onClick={this.handleEdit}>
                    Accept{' '}
                    <Icon style={{margin: '0px 5px'}} name="edit outline" />
                  </Button>
                  <Button as="a" size="large" color='red' onClick={this.editEmail}>
                    Cancel{' '}
                    <Icon style={{margin: '0px 5px'}} name="cancel" />
                  </Button>
                </div>
              ):(
              <div>
                <p style={{fontSize: '1.25em'}}>{email}</p>
                <Button as="a" size="large" onClick={this.editEmail}>Edit <Icon style={{margin: '0px 5px'}} name="edit outline" />
              </Button>
              </div>)}

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
          )}
        </Segment>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  userState: state.user
})

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(fetchUserData()),
  editUser: user => dispatch(editUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
