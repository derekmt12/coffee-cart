import React, { Component } from 'react';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Moment from 'react-moment';
import Button from 'material-ui/Button';

export class QueueView extends Component {
    viewOrder = (e, order) => {
        const { onViewOrder } = this.props;
        e.preventDefault();

        onViewOrder && onViewOrder(order);
    };

    buildOrderTable(uncompletedOrders) {
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Order</TableCell>
                        <TableCell />
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {uncompletedOrders &&
                        uncompletedOrders.map(order => (
                            <TableRow key={order.id}>
                                <TableCell>
                                    {order.description} - {order.name}
                                </TableCell>
                                <TableCell>
                                    <Moment fromNow>{order.timeSubmitted}</Moment>
                                </TableCell>
                                <TableCell>
                                    <Button onClick={e => this.viewOrder(e, order)}>
                                        View
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        );
    }

    render() {
        const { uncompletedOrders } = this.props;
        return (
            <div>
                <h2>Queue</h2>
                {uncompletedOrders.length ? (
                    this.buildOrderTable(uncompletedOrders)
                ) : (
                    <div>No orders yet</div>
                )}
            </div>
        );
    }
}
