import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import * as _ from 'lodash';

import { subscribeToOrders } from '../api/orderingSocket';
import { OrdersApi } from '../api/OrdersApi';
import { NavigationBar } from './NavigationBar';
import { ViewOrderView } from './ViewOrderView';
import { QueueView } from './QueueView';
import { CompletedView } from './CompletedView';

class AdminView extends Component {
    constructor() {
        super();
        this.state = {
            orders: []
        };
    }

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
            // TODO: need to update just the individual order
            const newOrders = [...prevState.orders];
            newOrders[orderIndex] = order;
            return {
                orders: newOrders
            };
        });
    };

    render() {
        const { match } = this.props;
        const { orders } = this.state;
        const sortedOrders = _.orderBy(orders, ['timeSubmitted'], ['desc']);
        const completedOrders = sortedOrders.filter(order => order.status === 'complete');
        const uncompletedOrders = sortedOrders.filter(
            order => order.status !== 'complete'
        );

        return (
            <div>
                <NavigationBar
                    uncompletedOrderCount={uncompletedOrders.length}
                    completedOrderCount={completedOrders.length}
                />
                <Route
                    path={match.url + '/view/:id'}
                    component={props => (
                        <ViewOrderView
                            {...props}
                            uncompletedOrders={uncompletedOrders}
                            onGoToQueue={this.onGoToQueue}
                            onComplete={this.onComplete}
                        />
                    )}
                />
                <Route
                    path={match.url + '/queue'}
                    component={props => (
                        <QueueView
                            {...props}
                            uncompletedOrders={uncompletedOrders}
                            onViewOrder={this.onViewOrder}
                        />
                    )}
                />
                <Route
                    path={match.url + '/completed'}
                    component={props => (
                        <CompletedView {...props} completedOrders={completedOrders} />
                    )}
                />
            </div>
        );
    }
}

export default withRouter(AdminView);
