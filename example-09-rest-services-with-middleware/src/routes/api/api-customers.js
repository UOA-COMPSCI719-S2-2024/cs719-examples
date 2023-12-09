import express from "express";
import {
  createCustomer,
  retrieveCustomers,
  retrieveCustomersSearch,
  updateCustomer,
  deleteCustomer
} from "../../data/customers-dao.js";
import { useCustomerFromPath } from "../../middleware/customers-middleware.js";

const router = express.Router();

/**
 * POST /api/customers - Creates a new customer.
 *
 * A 201 (created) response will be returned, along with a Location header pointing to that customer,
 * and a JSON representation of that cusetomer.
 */
router.post("/", (req, res) => {
  const newCustomer = createCustomer(req.body);
  const location = `/api/customers/${newCustomer.id}`;
  return res.status(201).location(location).json(newCustomer);
});

/**
 * GET /api/customers - Returns a JSON array of custoemrs, with status code 200 (OK).
 *
 * If the "search" query param is defined, the returned list will be filtered to only those
 * customers whose names or email addresses match the search.
 */
router.get("/", (req, res) => {
  const search = req.query.search;

  if (!search) return res.json(retrieveCustomers());

  return res.json(retrieveCustomersSearch(search));
});

/**
 * GET /api/customers/:customerId - Returns a JSON representation of the customer with the given id,
 * or a 404 Not Found response if that customer doesn't exist.
 *
 * Uses the useCustomerFromPath() middleware function to add the customer object to the request
 * (as req.customer) or return a 404. So, if we get to this route handler, we already know the
 * customer exists and can just return it.
 */
router.get("/:customerId", useCustomerFromPath, (req, res) => {
  return res.json(req.customer);
});

/**
 * PATCH /api/customers/:customerId - Updates the customer with the given id, with the data in the request
 * body. Returns 204 (No Content) if success, or 404 (Not Found) if the customer is not found.
 *
 * Any data in the request body other than the customer's firstName, lastName, and email will be ignored.
 *
 * Uses the useCustomerFromPath() middleware to handle sending a 404 if the customer is not found.
 */
router.patch("/:customerId", useCustomerFromPath, (req, res) => {
  try {
    updateCustomer(req.customer.id, req.body);
    return res.sendStatus(204);
  } catch (err) {
    return res.status(422).json(err.errors);
  }
});

/**
 * DELETE /api/customers/:customerId - Deletes the customer with the given id, if found. Either way,
 * returns a 204 (No Content) response.
 */
router.delete("/:customerId", (req, res) => {
  deleteCustomer(req.params.id, false);
  return res.sendStatus(204);
});

// Customer orders routes
import customerOrdersRoutes from "./api-customer-orders.js";

/**
 * Setup our own middlware. Add the customer orders routes above so, for example,
 * /api/customers/4/orders will be dealing with the orders for customer number 4.
 *
 * Because every one of these orders routes needs to know about a customer, we are using the
 * useCustomerFromPath middleware to add the customer to req.customer, or return a 404 if
 * the customer is not found.
 */
router.use("/:customerId/orders", useCustomerFromPath, customerOrdersRoutes);

export default router;
