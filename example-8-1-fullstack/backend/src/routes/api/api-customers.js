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
 * If the request body has the required data (firstName, lastName, and email), the new customer
 * will be created, and a 201 (created) response will be returned, along with a Location header
 * pointing to that customer, and a JSON representation of that cusetomer.
 *
 * Otherwise, a 422 (Unprocessable Content) error response will be returned.
 */
router.post("/", async (req, res) => {
  try {
    // Create the new customer, create a location based on its id, and send everything back with a 201.
    const newCustomer = await createCustomer(req.body);
    const location = `/api/customers/${newCustomer.id}`;
    return res.status(201).location(location).json(newCustomer);
  } catch (err) {
    // console.err(err); // Log the error to console...

    // The createCustomer function will throw an error if it fails, so we can catch that error
    // to return the appropriate status code. We will also return the error message as JSON
    // (we don't have to do that, but could be useful for debug purposes).
    return res.status(422).json(err.errors);
  }
});

/**
 * GET /api/customers - Returns a JSON array of custoemrs, with status code 200 (OK).
 *
 * If the "search" query param is defined, the returned list will be filtered to only those
 * customers whose names or email addresses match the search.
 */
router.get("/", async (req, res) => {
  const search = req.query.search;

  if (!search) return res.json(await retrieveCustomers());

  return res.json(await retrieveCustomersSearch(search));
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
 * body. Returns 204 (No Content) if success, 404 (Not Found) if the customer is not found, or
 * 422 (Unprocessable content) if the provided JSON from the client is invalid.
 *
 * Any data in the request body other than the customer's firstName, lastName, and email will be ignored.
 *
 * Uses the useCustomerFromPath() middleware to handle sending a 404 if the customer is not found.
 */
router.patch("/:customerId", useCustomerFromPath, async (req, res) => {
  try {
    const isUpdated = await updateCustomer(req.customer.id, req.body);
    if (!isUpdated) return res.sendStatus(404); // 404 if there was no customer to update
    return res.sendStatus(204); // 204 if all successful.
  } catch (err) {
    // Handle error case where the provided update data in the request body is invalid.
    return res.status(422).json(err.errors);
  }
});

/**
 * DELETE /api/customers/:customerId - Deletes the customer with the given id, if found. Either way,
 * returns a 204 (No Content) response.
 */
router.delete("/:customerId", async (req, res) => {
  await deleteCustomer(req.params.customerId);
  return res.sendStatus(204);
});

export default router;
