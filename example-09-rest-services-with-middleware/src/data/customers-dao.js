/** ChatGPT genned array of people. */
const customers = [
  {
    id: 1,
    firstName: "Ash",
    lastName: "Ketchum",
    email: "ash.ketchum@email.com"
  },
  {
    id: 2,
    firstName: "Misty",
    lastName: "Waterflower",
    email: "misty.waterflower@email.com"
  },
  {
    id: 3,
    firstName: "Brock",
    lastName: "Harrison",
    email: "brock.harrison@email.com"
  },
  {
    id: 4,
    firstName: "Serena",
    lastName: "Yvonne",
    email: "serena.yvonne@email.com"
  },
  {
    id: 5,
    firstName: "Gary",
    lastName: "Oak",
    email: "gary.oak@email.com"
  },
  {
    id: 6,
    firstName: "May",
    lastName: "Maple",
    email: "may.maple@email.com"
  },
  {
    id: 7,
    firstName: "Dawn",
    lastName: "Berlitz",
    email: "dawn.berlitz@email.com"
  },
  {
    id: 8,
    firstName: "Clemont",
    lastName: "Lemon",
    email: "clemont.lemon@email.com"
  },
  {
    id: 9,
    firstName: "Samuel",
    lastName: "Oak",
    email: "samuel.oak@email.com"
  },
  {
    id: 10,
    firstName: "Giovanni",
    lastName: "Sakaki",
    email: "giovanni.sakaki@email.com"
  }
];

/**
 * Creates a new customer and returns it.
 *
 * @param {any} customerData Should contain a firstName, lastName, and email.
 *
 * @returns the newly created customer
 */
export function createCustomer(customerData) {

  // Create new customer
  const newCustomer = {
    id: customers.length + 1,
    firstName: customerData.firstName,
    lastName: customerData.lastName,
    email: customerData.email
  }

  // Save it to our array, and return it.
  customers.push(newCustomer);
  return newCustomer;
}

/**
 * Retrieves an array of all customers.
 *
 * @returns an array of all customers
 */
export function retrieveCustomers() {
  return customers;
}

/**
 * Retrieves an array of all customers matching the given search parameter.
 * Searches customers' firstName, lastName, and email address.
 *
 * @param {string} search the search string. If undefined, will return all customers.
 *
 * @returns an array of matching customers (an empty array if no matches)
 */
export function retrieveCustomersSearch(search) {
  if (!search) return retrieveCustomers();

  return customers.filter(
    (c) => match(c.firstName, search) || match(c.lastName, search) || match(c.email, search)
  );
}

/**
 * Returns a value indicating whether the given customer data contains the given search string,
 * case insensitive.
 *
 * @param {string} customerData
 * @param {string} search
 *
 * @returns true if the customerData contains the given search string, case insensitive.
 */
function match(customerData, search) {
  return customerData.toLowerCase().includes(search.toLowerCase());
}

/**
 * Retrieves a customer with the matching id. Returns undefined if no match.
 * @param {*} id the id to match
 * @returns a customer, or undefined.
 */
export function retrieveCustomerById(id) {
  return customers.find((c) => c.id == id);
}

/**
 * Updates the customer with the given id. Throws an error if there's no matching customer.
 *
 * @param {*} id the id to match
 * @param {any} updateData The data to update.
 * 
 * @return the updated customer
 * @throws an error if there's no matching customer
 */
export function updateCustomer(id, updateData) {
  // Find the existing customer in the array
  const customer = customers.find((c) => c.id == id);

  // Error check
  if (!customer) throw `Customer ${id} not found!`;

  /**
   * Copy the update data to the existing customer.
   * 
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
   */
  Object.assign(customer, updateData);

  return customer;
}

/**
 * Deletes the customer with the given id.
 *
 * @param {*} id the id of the customer to delete
 * @param {boolean} throwIfNotFound true if an exception should be thrown if there's no matching customer.
 *
 * @throws an error if throwIfNotFound is true and there's no matching customer
 */
export function deleteCustomer(id, throwIfNotFound = false) {
  const index = customers.findIndex((c) => c.id == id);

  // Error check
  if (throwIfNotFound && index < 0) throw `Customer ${id} not found!`;

  // Delete customer
  if (index >= 0) customers.splice(index, 1);
}
