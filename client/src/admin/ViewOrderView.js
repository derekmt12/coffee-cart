import React, { Component } from 'react';
import Button from 'material-ui/Button';

import { OrdersApi } from '../api/OrdersApi';
import { updateOrder } from '../api/orderingSocket';

export class ViewOrderView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderId: this.props.match.params.id,
            order: null
        };
    }

    componentDidMount() {
        OrdersApi.getOrders(this.state.orderId).then(order => this.setState({ order }));
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
            !!order && (
                <div>
                    <Button raised onClick={e => this.onGoToQueue(e)}>
                        Back to Queue
                    </Button>
                    <h2>{order.description}</h2>
                    <h4>{order.name}</h4>
                    {order.status === 'submitted' && (
                        <Button raised onClick={e => this.onStart(order, e)}>
                            Start
                        </Button>
                    )}
                    {order.status === 'started' && (
                        <Button raised onClick={e => this.onComplete(order, e)}>
                            Complete
                        </Button>
                    )}
                    <Button raised onClick={e => this.nextOrder(e)}>
                        Next Order
                    </Button>
                </div>
            )
        );
    }
}
