import yup from "yup";

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
 * This schema determines what is a valid "create order" request.
 *
 * Valid orders must have a valid integer customer id, along with an array of orders.
 *
 * Each item in the order array must have a product (a string), and an amount (an integer > 0).
 */
const createOrderSchema = yup
  .array()
  .of(
    yup
      .object({
        product: yup.string().required(),
        amount: yup
          .number()
          .integer()
          .min(1, "The amount of a product in an order must be > 0")
          .required()
      })
      .required()
  )
  .min(1, "An order must have at least one item.")
  .required();

/**
 * Creates a new order for the given customer. The order must be valid, according to the createOrderSchema above.
 * 
 * @param {*} customerId the id of the customer
 * @param {*} orderData the new order data
 * @returns
 */
export function createOrder(customerId, orderData) {
  // Validate that we've been sent a valid array of order products. Each
  // item in the array should contain a product string and an amount (number > 0).
  const orderProducts = createOrderSchema.validateSync(orderData, {
    abortEarly: false,
    stripUnknown: true
  });

  // Create the order itself
  const newOrder = {
    id: orders.length + 1,
    customerId,
    order: orderProducts
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
