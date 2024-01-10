import yup from "yup";
import { getDatabase } from "./database.js";

/**
 * This schema defines a valid "create customer" request.
 *
 * These requests must have a firstName, lastName, and email. All must be strings. The email
 * must additionally validate as an actual email address.
 *
 * @see https://www.npmjs.com/package/yup
 */
const createCustomerSchema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().required().email()
  })
  .required();

/**
 * Creates a new customer and returns it. Throws an error if any of the required data is undefined.
 *
 * @param {any} customerData Must contain a firstName, lastName, and email.
 *
 * @returns the newly created customer
 * @throws an error if the input does not contain the required data.
 */
export async function createCustomer(customerData) {
  /**
   * Create a new customer.
   *
   * We create the new customer using the Yup package's validateSync method, which will verify
   * that the incoming data has the correct values, and will strip out any unknown data.
   *
   * This will throw an error if invalid data is provided.
   */
  const newCustomer = createCustomerSchema.validateSync(customerData, {
    abortEarly: false,
    stripUnknown: true
  });

  // Insert new customer into database
  const db = await getDatabase();
  const dbResult = await db.run(
    "INSERT INTO Customers(firstName, lastName, email) VALUES(?, ?, ?)",
    newCustomer.firstName,
    newCustomer.lastName,
    newCustomer.email
  );

  // Give the returned customer an ID, which was created by the database, then return.
  newCustomer.id = dbResult.lastID;
  return newCustomer;
}

/**
 * Retrieves an array of all customers.
 *
 * @returns an array of all customers
 */
export async function retrieveCustomers() {
  const db = await getDatabase();
  const customers = await db.all("SELECT * FROM Customers");
  return customers;
}

/**
 * Retrieves an array of all customers matching the given search parameter.
 * Searches customers' firstName, lastName, and email address.
 *
 * @param {string} search the search string. If undefined or empty string, will return all customers.
 *
 * @returns an array of matching customers (an empty array if no matches)
 */
export async function retrieveCustomersSearch(search) {
  // If no or empty search string provided, just return all customers.
  if (!search || search.length === 0) return await retrieveCustomers();

  const db = await getDatabase();

  // Search for customers whose firstName, lastName, or email include the given search string
  // (ignore case by converting everything to lowercase)
  const lowercaseSearch = search.toLowerCase();
  const customers = await db.all(
    "SELECT * FROM Customers WHERE LOWER(firstName) LIKE ? OR LOWER(lastName) LIKE ? OR LOWER(email) LIKE ?",
    `%${lowercaseSearch}%`,
    `%${lowercaseSearch}%`,
    `%${lowercaseSearch}%`
  );

  return customers;
}

/**
 * Retrieves a customer with the matching id. Returns undefined if no match.
 * @param {*} id the id to match. Will be converted to a number using parseInt().
 * @returns a customer, or undefined.
 */
export async function retrieveCustomerById(id) {
  const db = await getDatabase();
  const customer = await db.get("SELECT * FROM Customers WHERE id = ?", parseInt(id));
  return customer;
}

/**
 * This schema defines a valid "update customer" request. Similarly to the "create customer"
 * schema on line 76, we are looking for a first name, last name, and email address. However,
 * this time, all the values are optional - we can update as many or as few of them as we like.
 *
 * @see https://www.npmjs.com/package/yup
 */
const updateCustomerSchema = yup
  .object({
    firstName: yup.string().optional(),
    lastName: yup.string().optional(),
    email: yup.string().optional().email()
  })
  .required();

/**
 * Updates the customer with the given id, if it exists and the provided update data is valid.
 *
 * @param {*} id the id to match. Will be converted to a number using parseInt().
 * @param {*} updateData The data to update. Any included firstName, lastName, and email properties
 *            will replace those existing values for the matching customer. Any other properties will be ignored.
 *
 * @return true if the database was updated, false otherwise.
 * @throws an error if updateData contains invalid data.
 */
export async function updateCustomer(id, updateData) {
  //Validated update data (will throw exception if updateData is invalid).
  const validatedUpdateData = updateCustomerSchema.validateSync(updateData, {
    abortEarly: true,
    stripUnknown: true
  });

  // Build the update statement. firstName, lastName, and email are all optional so we can't just write one SQL query
  // that updates all three, if all three aren't used. We must consider each one one-by-one.
  const updateOperations = [];
  const updateParams = [];
  if (validatedUpdateData.firstName) {
    updateOperations.push("firstName = ?");
    updateParams.push(validatedUpdateData.firstName);
  }
  if (validatedUpdateData.lastName) {
    updateOperations.push("lastName = ?");
    updateParams.push(validatedUpdateData.lastName);
  }
  if (validatedUpdateData.email) {
    updateOperations.push("email = ?");
    updateParams.push(validatedUpdateData.email);
  }

  // If we aren't actually updating anything just get outta here.
  if (updateParams.length === 0) return false;

  // Build actual SQL statement
  const sql = `UPDATE Customers SET ${updateOperations.join(", ")} WHERE id = ?`;
  console.log(sql);

  // Execute SQL
  const db = await getDatabase();
  const dbResult = await db.run(sql, ...updateParams, parseInt(id));

  // Return true if changes were made, false otherwise.
  return dbResult.changes > 0;
}

/**
 * Deletes the customer with the given id, if any.
 *
 * @param {*} id the id of the customer to delete. Will be converted to a number using parseInt().
 * @return true if a customer was deleted, false otherwise.
 */
export async function deleteCustomer(id) {
  const db = await getDatabase();
  const dbResult = await db.run("DELETE FROM Customers WHERE id = ?", parseInt(id));
  return dbResult.changes > 0;
}
