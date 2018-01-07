export const OrdersApi = {
    getOrders: (id) => {
        const request = id
            ? fetch(`http://localhost:3000/api/orders/${id}`)
            : fetch(`http://localhost:3000/api/orders`);
        return request.then(res => res && res.json());
    },
    getNextOrder: (id) => {
        return fetch(`http://localhost:3000/api/orders/next/${id}`)
            .then(res => res && res.json());
    }
};