import React from 'react'

import {
  Button,
  Header,
  Form,
  Grid,
  Segment,
  Icon,
  Container,
  Divider,
  Item
} from 'semantic-ui-react'

const HistoryItem = props => {

  return props.transaction.map(ti => {
    return (
      <div key={ti.id}>
        <Item.Description>Venue: {ti.venue.name}</Item.Description>
        <Item.Description>Hours Rented: {ti.quantity}</Item.Description>
        <Item.Description>Price Per Hour: {ti.venue.price}</Item.Description>
        <Item.Description>Venue Price: {(ti.venue.price * 100 ) * ti.quantity}</Item.Description>
      </div>
    )
  })
}

export default HistoryItem
