import React from 'react';
import Button from 'material-ui/Button';

export const CurrentOrderView = ({ order, onStart, onComplete }) => (
    <div>
        <h2>{order.description}</h2>
        <h4>{order.name}</h4>
        {order.status === 'submitted' && (
            <Button raised onClick={e => onStart(order, e)}>
                Start
            </Button>
        )}
        {order.status === 'started' && (
            <Button raised onClick={e => onComplete(order, e)}>
                Complete
            </Button>
        )}
    </div>
);
