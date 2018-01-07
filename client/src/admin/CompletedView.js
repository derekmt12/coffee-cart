import React, { Component } from 'react';
import * as _ from 'lodash';

import { OrderList } from './OrderList';
import { subscribeToOrders, OrdersApi } from '../api';
import { NavigationBar } from './NavigationBar';

export class CompletedView extends Component {
	constructor() {
		super();
		this.state = {
			orders: []
		};

		subscribeToOrders((err, order) => this.setState(prevState => ({
			orders: [...prevState.orders, order]
		})));
	}

	componentDidMount() {
		OrdersApi.getOrders().then(orders => this.setState({ orders }));
	}

	render() {
		const { orders } = this.state;
		const sortedOrders = _.orderBy(orders, ['timeSubmitted'], ['desc']);
		const completedOrders = sortedOrders.filter(order => order.status === 'complete');
		const uncompletedOrders = sortedOrders.filter(order => order.status !== 'complete');

		return (
			<div>
				<NavigationBar
					uncompletedOrderCount={uncompletedOrders.length}
					completedOrderCount={completedOrders.length}
				/>
                <h2>Completed</h2>
				<OrderList orders={completedOrders} />
			</div>
		);
	}
}