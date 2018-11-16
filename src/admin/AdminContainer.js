import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { subscribeToOrders } from '../api/orderingSocket';
import { OrdersApi } from '../api/OrdersApi';
import { AdminView } from './AdminView';

export class AdminContainer extends Component {
  static propTypes = {
    history: PropTypes.object
  };

  state = {
    orders: []
  };

  componentDidMount() {
    OrdersApi.getOrders().then(orders => this.setState({ orders }));

    subscribeToOrders((err, orders) => {
      this.setState({
        orders: Object.keys(orders).map(k => orders[k])
      });
    });
  }

  onViewOrder = order => {
    this.props.history.push(`/admin/view/${order.id}`);
  };

  onGoToQueue = () => {
    this.props.history.push('/admin/queue');
  };

  onComplete = order => {
    this.setState(prevState => {
      const orderIndex = prevState.orders.findIndex(o => o.id === order.id);
      const newOrders = [...prevState.orders];
      newOrders[orderIndex] = order;

      return { orders: newOrders };
    });
  };

  render() {
    const { orders } = this.state;
    const sortedOrders = _.orderBy(orders, ['timeSubmitted'], ['desc']);
    const completedOrders = sortedOrders.filter(
      order => order.status === 'complete'
    );
    const uncompletedOrders = sortedOrders.filter(
      order => order.status !== 'complete'
    );

    return (
      <AdminView
        completedOrders={completedOrders}
        uncompletedOrders={uncompletedOrders}
        onGoToQueue={this.onGoToQueue}
        onViewOrder={this.onViewOrder}
        onComplete={this.onComplete}
      />
    );
  }
}
