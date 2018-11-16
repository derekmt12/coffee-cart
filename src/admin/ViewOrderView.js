import React from 'react';
import Button from '@material-ui/core/Button';

export const ViewOrderView = ({
  order,
  onGoToQueue,
  onStart,
  onComplete,
  onNextOrder
}) =>
  !!order && (
    <div>
      <Button variant="contained" onClick={e => onGoToQueue(e)}>
        Back to Queue
      </Button>
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
      <Button variant="contained" onClick={e => onNextOrder(e)}>
        Next Order
      </Button>
    </div>
  );
