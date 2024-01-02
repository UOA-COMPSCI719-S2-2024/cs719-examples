import express from "express";
import {
  createCustomer,
  retrieveCustomerById,
  retrieveCustomers,
  retrieveCustomersSearch,
  updateCustomer,
  deleteCustomer
} from "../../data/customers-dao.js";

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
 */
router.get("/:customerId", (req, res) => {
  const customer = retrieveCustomerById(req.params.customerId);
  if (!customer) return res.status(404).json(`Customer ${req.params.customerId} not found!`);

  return res.json(customer);
});

/**
 * PATCH /api/customers/:customerId - Updates the customer with the given id, with the data in the request
 * body. Returns 204 (No Content) if success, or 404 (Not Found) if the customer is not found.
 *
 * Any data in the request body other than the customer's firstName, lastName, and email will be ignored.
 */
router.patch("/:customerId", (req, res) => {
  try {
    updateCustomer(req.params.customerId, req.body);
    return res.sendStatus(204);
  } catch (err) {
    // console.err(err); // Log the error to console...
    return res.status(404).json(err.errors ?? err);
  }
});

/**
 * DELETE /api/customers/:customerId - Deletes the customer with the given id, if found. Either way,
 * returns a 204 (No Content) response.
 */
router.delete("/:customerId", (req, res) => {
  deleteCustomer(req.params.customerId, false);
  return res.sendStatus(204);
});

// Customer orders routes
import customerOrdersRoutes from "./api-customer-orders.js";

/**
 * Setup our own middlware. Add the customer orders routes above so, for example,
 * /api/customers/4/orders will be dealing with the orders for customer number 4.
 */
router.use("/:customerId/orders", customerOrdersRoutes);

export default router;
