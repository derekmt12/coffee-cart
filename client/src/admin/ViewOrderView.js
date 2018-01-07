import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Button from 'material-ui/Button';

import { updateOrder, OrdersApi } from '../api';

class ViewOrderViewComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderId: this.props.match.params.id,
            order: null
        };
    }

    componentDidMount() {
        OrdersApi.getOrders(this.state.orderId)
            .then(order => this.setState({ order }));
    }

    onStart = (order, e) => {
		e.preventDefault();
		this.setOrderStatus(order, 'started');
	}

	onComplete = (order, e) => {
		e.preventDefault();
		this.setOrderStatus(order, 'complete');
    }
    
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
	}

    goBack = (e) => {
        e.preventDefault();
        this.props.history.push('/queue');
    };

    nextOrder = (e) => {
        e.preventDefault();
        OrdersApi.getNextOrder(this.state.orderId)
            .then(order => order && this.setState({ order }));
    };

    render() {
        const { order } = this.state;

        if (!order) {
            return null;
        }

        return (
            <div>
                <Button raised onClick={(e) => this.goBack(e)}>Back to Queue</Button>
                <h2>{order.description}</h2>
                <h4>{order.name}</h4>
                {order.status === 'submitted' && <Button raised onClick={(e) => this.onStart(order, e)}>Start</Button>}
                {order.status === 'started' && <Button raised onClick={(e) => this.onComplete(order, e)}>Complete</Button>}
                <Button raised onClick={(e) => this.nextOrder(e)}>Next Order</Button>
            </div>
        );
    }
}

export const ViewOrderView = withRouter(ViewOrderViewComponent);