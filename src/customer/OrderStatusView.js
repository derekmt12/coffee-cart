import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import { subscribeToOrderUpdates } from '../api/orderingSocket';
import { OrdersApi } from '../api/OrdersApi';

export class OrderStatusView extends Component {
  static propTypes = {
    match: PropTypes.object
  };

  state = {
    orderId: this.props.match.params.id,
    order: null
  };

  componentDidMount() {
    subscribeToOrderUpdates(this.state.orderId, order => {
      this.setState({ order });
    });

    OrdersApi.getOrders(this.state.orderId).then(order =>
      this.setState({ order })
    );
  }

  render() {
    const { order } = this.state;

    if (!order) {
      return null;
    }

    return (
      <div>
        <h2>Order ID: {order.id}</h2>
        <div>Status: {order.status}</div>
        <div>
          Submitted: <Moment format="h:mm:ss a">{order.timeSubmitted}</Moment>
        </div>
        {order.timeStarted && (
          <div>
            Started: <Moment format="h:mm:ss a">{order.timeStarted}</Moment>
          </div>
        )}
        {order.timeCompleted && (
          <div>
            Completed: <Moment format="h:mm:ss a">{order.timeCompleted}</Moment>
          </div>
        )}
      </div>
    );
  }
}
