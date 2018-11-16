export const OrdersApi = {
  getOrders(id) {
    const request = id ? fetch(`/api/orders/${id}`) : fetch(`/api/orders`);
    return request.then(res => res && res.json());
  },
  getNextOrder(id) {
    return fetch(`/api/orders/next/${id}`).then(res => res && res.json());
  }
};
