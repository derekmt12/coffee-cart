import React, { Component } from 'react';
import Moment from 'react-moment';

import { subscribeToOrderUpdates, OrdersApi } from '../api';

export class OrderStatusView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderId: this.props.match.params.id,
            order: null
        };

        subscribeToOrderUpdates(this.state.orderId, (order) =>  {
            this.setState({ order });
        });
    }

    componentDidMount() {
        OrdersApi.getOrders(this.state.orderId).then(order => this.setState({ order }));
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
                <div>Submitted: <Moment format='h:mm:ss a'>{order.timeSubmitted}</Moment></div>
                {order.timeStarted && <div>Started: <Moment format='h:mm:ss a'>{order.timeStarted}</Moment></div>}
                {order.timeCompleted && <div>Completed: <Moment format='h:mm:ss a'>{order.timeCompleted}</Moment></div>}
            </div>
        );
    }
}
