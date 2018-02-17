import React from 'react';
import Button from 'material-ui/Button';

export const ViewOrderView = ({ order, onGoToQueue, onStart, onComplete, onNextOrder }) =>
    !!order && (
        <div>
            <Button raised onClick={e => onGoToQueue(e)}>
                Back to Queue
            </Button>
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
            <Button raised onClick={e => onNextOrder(e)}>
                Next Order
            </Button>
        </div>
    );
