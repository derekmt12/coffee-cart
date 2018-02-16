import React, { Component } from 'react';

import { OrderList } from './OrderList';

export class CompletedView extends Component {
    render() {
        const { completedOrders } = this.props;

        return (
            <div>
                <h2>Completed</h2>
                <OrderList orders={completedOrders} />
            </div>
        );
    }
}
