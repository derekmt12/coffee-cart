import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';

export const OrderList = ({ orders, onSetCurrentOrder }) => (
  <List>
    {orders &&
      orders.map(order => (
        <ListItem key={order.id}>
          <Button onClick={() => onSetCurrentOrder(order)}>
            {order.description} - {order.name}
          </Button>
          (<Moment fromNow>{order.timeSubmitted}</Moment>)
        </ListItem>
      ))}
  </List>
);

OrderList.propTypes = {
  orders: PropTypes.array,
  onSetCurrentOrder: PropTypes.func
};
