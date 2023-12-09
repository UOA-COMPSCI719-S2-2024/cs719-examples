// Some dummy orders to start off with
const orders = [
  {
    id: 1,
    customerId: 1,
    order: [
      {
        product: "Pikachu Plushie",
        amount: 1
      },
      {
        product: "Pokeball",
        amount: 500
      }
    ]
  },
  {
    id: 2,
    customerId: 1,
    order: [
      {
        product: "Ultra ball",
        amount: 200
      }
    ]
  },
  {
    id: 3,
    customerId: 2,
    order: [
      {
        product: "Mystic Water",
        amount: 2
      },
      {
        product: "Beach chair",
        amount: 4
      }
    ]
  }
];

/**
 * Creates a new order. The provided orderData should be an array of orders, each with a product and amount.
 *
 * @param {*} orderData
 */
export function createOrder(customerId, orderData) {
  const newOrder = {
    id: orders.length + 1,
    customerId,
    order: orderData
  };

  // Add it to our array, and return it.
  orders.push(newOrder);
  return newOrder;
}

/**
 * Gets all orders for a given customer (empty array if no matching orders)
 *
 * @param {*} customerId the customer's id
 * @returns the orders, or an empty array
 */
export function retrieveOrdersForCustomer(customerId) {
  return orders.filter((o) => o.customerId == customerId);
}

/**
 * Gets the order with the given id, if any
 *
 * @param {*} id the order id
 * @returns the order, or undefined if no match
 */
export function retrieveOrderById(id) {
  return orders.find((o) => o.id == id);
}
