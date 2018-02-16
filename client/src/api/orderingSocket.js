import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8000');

export function subscribeToOrders(onReceive) {
    socket.on('orders', orders => onReceive(null, orders));
}

export function submitOrder(order, onSuccess) {
    socket.emit('order', { ...order, timeSubmitted: new Date() }, onSuccess);
}

export function subscribeToOrderUpdates(orderId, onUpdate) {
    socket.on(`order:${orderId}`, order => onUpdate(order));
}

export function updateOrder(order) {
    socket.emit(`order:update`, order);
}

export { socket };
