import React from 'react'
import {Link} from 'react-router-dom'
import HistoryItem from './HistoryItem'
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

//Prop is entire transaction
const OrderHistory = props => {
  return props.transactions.map(transaction => {
    let price = 0
    let ti = transaction['transaction-items']
    transaction['transaction-items'].forEach(item => {
      price = price + item.purchasePrice
    })
    let date = new Date(transaction.date)

    let orderDate =
      date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear()


    return (
      <div key={transaction.id}>
        <Divider
          as="h3"
          className="header"
          horizontal
          style={{margin: '2em 0em', textTransform: 'uppercase'}}
        >
          <div>Order Number: #{transaction.id}</div>
          <div>Total Purchase Price: ${price/100}</div>
          <div>Placed On: {orderDate}</div>
        </Divider>
        <Grid divided>
          <HistoryItem transaction={ti} />
        </Grid>
      </div>
    )
  })
}

export default OrderHistory
