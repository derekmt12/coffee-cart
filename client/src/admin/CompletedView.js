import React from 'react';

import { OrderList } from './OrderList';

export const CompletedView = ({ completedOrders }) => (
    <div>
        <h2>Completed</h2>
        <OrderList orders={completedOrders} />
    </div>
);
