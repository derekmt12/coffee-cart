import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as _ from 'lodash';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Moment from 'react-moment';
import Button from 'material-ui/Button';

import { subscribeToOrders, OrdersApi } from '../api';
import { NavigationBar } from './NavigationBar';

class QueueViewComponent extends Component {
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
        OrdersApi.getOrders()
            .then(orders => this.setState({ orders }));
    }
    
    viewOrder = (e, order) => {
        e.preventDefault();

        this.props.history.push(`/view/${order.id}`);
    }

    buildOrderTable(uncompletedOrders) {
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Order</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {uncompletedOrders && uncompletedOrders.map(order =>
                        <TableRow key={order.id}>
                            <TableCell>{order.description} - {order.name}</TableCell>
                            <TableCell><Moment fromNow>{order.timeSubmitted}</Moment></TableCell>
                            <TableCell><Button onClick={(e) => this.viewOrder(e, order)}>View</Button></TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        );
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
                <h2>Queue</h2>
                {uncompletedOrders.length
                    ? this.buildOrderTable(uncompletedOrders)
                    : <div>No orders yet</div>
                }
			</div>
		);
	}
}

export const QueueView = withRouter(QueueViewComponent);