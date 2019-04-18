import React from 'react'

import {Container} from 'semantic-ui-react'

import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <Container>
        <Routes />
      </Container>
    </div>
  )
}

export default App
