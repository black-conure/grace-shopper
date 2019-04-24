import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility
} from 'semantic-ui-react'

// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */


/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({fixed: false})
  showFixedMenu = () => this.setState({fixed: true})

  render() {
    const {children} = this.props
    const {fixed} = this.state

    return (
      <Responsive >
          <Segment id='homepageBackground'

            textAlign="center"
            vertical
          >
          <Container text>
            <p as="h2" style={{fontSize: '2em'}} id="homepageTitleBlerb1">
              We help you find the perfect space</p>
          </Container>

          <Container text>
            <p as="h3" style={{fontSize: '2em'}} id="homepageTitleBlerb2">
              Studios, Offices, and Event spaces {'\n'}
              for only as long as you need them.
            </p>
          </Container>


            <Container text>
            <Link to='/venues'>
              <Button primary size="huge">
                Start Shopping!
                <Icon name="right arrow" />
              </Button>
            </Link>
            </Container>
          </Segment>


        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node
}

const ResponsiveContainer = ({children}) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node
}

const HomepageLayout = () => (
  <ResponsiveContainer>
    <Segment style={{padding: '8em 0em'}} vertical>
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as="h3" style={{fontSize: '2em'}}>
              We help you find the space you were looking for!
            </Header>
            <p style={{fontSize: '1.33em'}}>
              We aim to facilitate the creation of great art by amateur and professional artists alike.  Our company allows painters, dancers, musicians, photographers and more to have access to specialize tools and facilities for only as long as they need them.
            </p>
            <Header as="h3" style={{fontSize: '2em'}}>
              Looking for the perfect space to paint, work or host?  Look no further!
            </Header>
            <p style={{fontSize: '1.33em'}}>
              Be it art, work or space for friends and family to gather, our platform allows you to find the perfect space you need for as long as you may need it.  Need to practice that presentation with a projector or smartbooard?  Want to practice in a studio before an album recording?  You dont need to buy the equipment, just rent the space to borrow the associated equipment.
            </p>
          </Grid.Column>
          <Grid.Column floated="right" width={6}>
          <Link to='/venues'>
            <Button size="huge">Check Them Out</Button>
            </Link>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign="center">

          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Segment style={{padding: '0em'}} vertical>
      <Grid celled="internally" columns="equal" stackable>
        <Grid.Row textAlign="center">
          <Grid.Column style={{paddingBottom: '5em', paddingTop: '5em'}}>
            <Header as="h3" style={{fontSize: '2em'}}>
              "What a Company"
            </Header>
            <p style={{fontSize: '1.33em'}}>
              That is what they all say about us
            </p>
          </Grid.Column>
          <Grid.Column style={{paddingBottom: '5em', paddingTop: '5em'}}>
            <Header as="h3" style={{fontSize: '2em'}}>
              "I shouldn't have gone with their competitor."
            </Header>
            <p style={{fontSize: '1.33em'}}>
              <b>Nan</b> Chief Fun Officer Acme Toys
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Segment style={{padding: '8em 0em'}} vertical>
      <Container text>
        <Header as="h3" style={{fontSize: '2em'}}>

        </Header>
        <p style={{fontSize: '1.33em'}}>
          Instead of focusing on content creation and hard work, we have learned
          how to master the art of doing nothing by providing massive amounts of
          whitespace and generic content that can seem massive, monolithic and
          worth your attention.
        </p>
        <Button as="a" size="large">
          Read More
        </Button>
      </Container>
    </Segment>
    <Segment id='homepageFooter' inverted vertical style={{padding: '5em 0em'}}>
      <Container  >
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="About" />
              <List link inverted>
                <List.Item as="a">Sitemap</List.Item>
                <List.Item as="a">Contact Us</List.Item>
                <List.Item as="a">Religious Ceremonies</List.Item>
                <List.Item as="a">Gazebo Plans</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="Services" />
              <List link inverted>
                <List.Item as="a">Banana Pre-Order</List.Item>
                <List.Item as="a">DNA FAQ</List.Item>
                <List.Item as="a">How To Access</List.Item>
                <List.Item as="a">Favorite X-Men</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as="h4" inverted>
                Footer Header
              </Header>
              <p>
                Extra space for a call to action inside the footer that could
                help re-engage users.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>
)
export default HomepageLayout
