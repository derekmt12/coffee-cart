import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

export const CurrentOrderView = ({ order, onStart, onComplete }) => (
  <div>
    <h2>{order.description}</h2>
    <h4>{order.name}</h4>
    {order.status === 'submitted' && (
      <Button variant="contained" onClick={e => onStart(order, e)}>
        Start
      </Button>
    )}
    {order.status === 'started' && (
      <Button variant="contained" onClick={e => onComplete(order, e)}>
        Complete
      </Button>
    )}
  </div>
);

CurrentOrderView.propTypes = {
  order: PropTypes.object,
  onStart: PropTypes.func,
  onComplete: PropTypes.func
};
