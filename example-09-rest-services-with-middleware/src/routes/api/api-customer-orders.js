import express from "express";
import {
  createOrder,
  retrieveOrderById,
  retrieveOrdersForCustomer
} from "../../data/orders-dao.js";

/**
 * Unlike the previouse example, we don't need to set mergeRoutes to true because the
 * customer object is already added to the request in a parent route.
 */
const router = express.Router();

/**
 * POST /api/customers/:customerId/orders - Create a new order for a customer. The customer will already be available under
 * req.customer. A 201 will be returned with a Location pointing to that new order.
 */
router.post("/", (req, res) => {
  try {
    // Try to create the new order for the customer
    const newOrder = createOrder(req.customer.id, req.body);

    return res
      .status(201)
      .location(`/api/customers/${req.customer.id}/orders/${newOrder.id}`)
      .json(newOrder);
  } catch (err) {
    return res.status(422).json(err.errors);
  }
});

/**
 * GET /api/customers/:customerId/orders - Get all orders for a customer. The customer will already be available under
 * req.customer. A JSON array of that customer's orders will be returned.
 */
router.get("/", (req, res) => {
  return res.json(retrieveOrdersForCustomer(req.customer.id));
});

/**
 * GET /api/customers/:customerId/orders/:orderId - Get the order with the given id.
 *
 * If the order doesn't exist, or it belongs to a different customer, a 404 will be returned instead.
 */
router.get("/:orderId", (req, res) => {
  const order = retrieveOrderById(req.params.orderId);

  if (!order || order.customerId != req.customer.id) return res.sendStatus(404);
  return res.json(order);
});

export default router;
