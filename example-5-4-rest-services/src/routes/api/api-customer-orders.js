import express from "express";
import {
  createOrder,
  retrieveOrderById,
  retrieveOrdersForCustomer
} from "../../data/orders-dao.js";
import { retrieveCustomerById } from "../../data/customers-dao.js";

/**
 * This router is created with the { mergeParams: true } option. This will mean it can access
 * route parameters from "parent" routers - such as the api-customers router in this case.
 */
const router = express.Router({ mergeParams: true });

/**
 * POST /api/customers/:customerId/orders - Create a new order for a customer. If the customer is not found, return 404.
 * Otherwise, a 201 will be returned with a Location pointing to that new order.
 */
router.post("/", (req, res) => {
  const customer = retrieveCustomerById(req.params.customerId);
  if (!customer) return res.status(404).json(`Customer ${req.params.customerId} not found!`);

  // Try to create the new order for the customer
  const newOrder = createOrder(customer.id, req.body);

  return res
    .status(201)
    .location(`/api/customers/${customer.id}/orders/${newOrder.id}`)
    .json(newOrder);
});

/**
 * GET /api/customers/:customerId/orders - Get all orders for a customer. If the customer doesn't exist, return a 404.
 * Otherwise, a JSON array of that customer's orders will be returned.
 */
router.get("/", (req, res) => {
  console.log(req.params);
  const customer = retrieveCustomerById(req.params.customerId);
  if (!customer) return res.status(404).json(`Customer ${req.params.customerId} not found!`);
  return res.json(retrieveOrdersForCustomer(customer.id));
});

/**
 * GET /api/customers/:customerId/orders/:orderId - Get the order with the given order id and customer id.
 *
 * If the order doesn't exist, or it belongs to a different customer, a 404 will be returned instead.
 */
router.get("/:orderId", (req, res) => {
  const customer = retrieveCustomerById(req.params.customerId);
  if (!customer) return res.status(404).json(`Customer ${req.params.customerId} not found!`);

  const order = retrieveOrderById(req.params.orderId);

  if (!order || order.customerId != customer.id) return res.sendStatus(404);
  return res.json(order);
});

export default router;
