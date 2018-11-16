import React from 'react';
import PropTypes from 'prop-types';

import { OrderList } from './OrderList';

export const CompletedView = ({ completedOrders }) => (
  <div>
    <h2>Completed</h2>
    <OrderList orders={completedOrders} />
  </div>
);

CompletedView.propTypes = {
  completedOrders: PropTypes.array
};
