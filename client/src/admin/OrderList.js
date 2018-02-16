import React from 'react';
import Moment from 'react-moment';
import List, { ListItem } from 'material-ui/List';
import Button from 'material-ui/Button';

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
