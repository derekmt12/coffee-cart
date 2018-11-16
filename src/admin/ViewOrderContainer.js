import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ViewOrderView } from './ViewOrderView';
import { OrdersApi } from '../api/OrdersApi';
import { updateOrder } from '../api/orderingSocket';

export class ViewOrderContainer extends Component {
  static propTypes = {
    match: PropTypes.any,
    onComplete: PropTypes.func,
    onGoToQueue: PropTypes.func
  };

  state = {
    orderId: this.props.match.params.id,
    order: null
  };

  componentDidMount() {
    OrdersApi.getOrders(this.state.orderId).then(order =>
      this.setState({ order })
    );
  }

  onStart = (order, e) => {
    e.preventDefault();
    this.setOrderStatus(order, 'started');
  };

  onComplete = (order, e) => {
    e.preventDefault();
    const updatedOrder = this.setOrderStatus(order, 'complete');
    this.props.onComplete(updatedOrder);
  };

  setOrderStatus(order, status) {
    const updatedOrder = { ...order, status };

    if (status === 'started') {
      updatedOrder.timeStarted = new Date();
    }

    if (status === 'complete') {
      updatedOrder.timeCompleted = new Date();
    }

    this.setState(prevState => ({ order: updatedOrder }));
    updateOrder(updatedOrder);

    return updatedOrder;
  }

  onGoToQueue = e => {
    const { onGoToQueue } = this.props;
    e.preventDefault();

    onGoToQueue && onGoToQueue();
  };

  nextOrder = e => {
    e.preventDefault();
    OrdersApi.getNextOrder(this.state.orderId).then(
      order => order && this.setState({ order })
    );
  };

  render() {
    const { order } = this.state;

    return (
      <ViewOrderView
        order={order}
        onComplete={this.onComplete}
        onGoToQueue={this.onGoToQueue}
        onStart={this.onStart}
        onNextOrder={this.nextOrder}
      />
    );
  }
}
