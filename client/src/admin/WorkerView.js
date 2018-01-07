import React, { Component } from 'react';
import * as _ from 'lodash';
import Grid from 'material-ui/Grid';

import { OrderList } from './OrderList';
import { CurrentOrderView } from './CurrentOrderView';
import { subscribeToOrders, updateOrder, OrdersApi } from '../api';
import { NavigationBar } from './NavigationBar';

export class WorkerView extends Component {
	constructor() {
		super();
		this.state = {
			orders: [],
			currentOrderId: null
		};

		subscribeToOrders((err, order) => this.setState(prevState => ({
			orders: [...prevState.orders, order]
		})));
	}

	componentDidMount() {
		OrdersApi.getOrders().then(orders => this.setState({ orders }));
	}

	onStart = (order, e) => {
		e.preventDefault();
		this.setOrderStatus(order, 'started');
	}

	onComplete = (order, e) => {
		e.preventDefault();
		this.setOrderStatus(order, 'complete');
	}

	setCurrentOrder = (order) => {
		this.setState({ currentOrderId: order.id });
	}

	setOrderStatus(order, status) {
		const updatedOrder = { ...order, status };

		if (status === 'started') {
			updatedOrder.timeStarted = new Date();
		}

		if (status === 'complete') {
			updatedOrder.timeCompleted = new Date();
		}

		this.setState(prevState => ({ orders: prevState.orders.map((o) => o === order ? updatedOrder : o) }));
		updateOrder(updatedOrder);
	}

	render() {
		const { orders, currentOrderId } = this.state;
		const currentOrder = currentOrderId != null && orders.find(order => order.id === currentOrderId);
		const sortedOrders = _.orderBy(orders, ['timeSubmitted'], ['desc']);
		const completedOrders = sortedOrders.filter(order => order.status === 'complete');
		const uncompletedOrders = sortedOrders.filter(order => order.status !== 'complete');

		return (
			<div>
				<NavigationBar
					uncompletedOrderCount={uncompletedOrders.length}
					completedOrderCount={completedOrders.length}
				/>
				<Grid container>
					<Grid item sm={6}>
						<h2>Newest Orders</h2>
						<OrderList orders={uncompletedOrders} onSetCurrentOrder={this.setCurrentOrder} />
						<h2>Complete</h2>
						<OrderList orders={completedOrders} onSetCurrentOrder={this.setCurrentOrder} />
					</Grid>
					<Grid item sm={6}>
						{!!currentOrder && <CurrentOrderView order={currentOrder} onStart={this.onStart} onComplete={this.onComplete} />}
					</Grid>
				</Grid>
			</div>
		);
	}
}