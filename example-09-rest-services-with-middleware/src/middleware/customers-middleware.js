import { retrieveCustomerById } from "../data/customers-dao.js";

/**
 * Retrieves the customer whose id is equal to the customerId path parameter.
 *
 * If that customer exists, add it to the request object as req.customer, and call the next handler.
 * Otherwise, return a 404 error with the text "Customer not found".
 * 
 * This shows is how we can use middleware to extract common functionality between our routes into a
 * separate function:
 * 
 * "Get the customer. If it doesn't exist, return a 404. If it exists, [do the next thing]".
 *
 * @param {*} req the incoming request object
 * @param {*} res the outgoing response object
 * @param {*} next the function to call the next hander in the sequence
 */
export function useCustomerFromPath(req, res, next) {
  const customer = retrieveCustomerById(req.params.customerId);

  if (!customer) return res.status(404).json(`Customer ${req.params.customerId} not found!`);

  req.customer = customer;
  return next();
}
