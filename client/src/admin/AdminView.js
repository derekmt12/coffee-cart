import React from 'react';
import { Route, withRouter } from 'react-router-dom';

import { NavigationBar } from './NavigationBar';
import { ViewOrderContainer } from './ViewOrderContainer';
import { QueueView } from './QueueView';
import { CompletedView } from './CompletedView';

export const AdminViewComponent = ({
    match,
    uncompletedOrders,
    completedOrders,
    onGoToQueue,
    onComplete,
    onViewOrder
}) => (
    <div>
        <NavigationBar
            uncompletedOrderCount={uncompletedOrders.length}
            completedOrderCount={completedOrders.length}
        />
        <Route
            path={match.url + '/view/:id'}
            component={props => (
                <ViewOrderContainer
                    {...props}
                    uncompletedOrders={uncompletedOrders}
                    onGoToQueue={onGoToQueue}
                    onComplete={onComplete}
                />
            )}
        />
        <Route
            path={match.url + '/queue'}
            component={props => (
                <QueueView
                    {...props}
                    uncompletedOrders={uncompletedOrders}
                    onViewOrder={onViewOrder}
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

export const AdminView = withRouter(AdminViewComponent);
