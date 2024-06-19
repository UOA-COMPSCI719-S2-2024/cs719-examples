# CS719 - REST APIs

This example project shows off a very simple customers / orders REST API, showing some best practices in terms of:

- Route structure
- Path names
- HTTP methods

## API specification

The API specification for this REST service example is as follows:

- `GET /api/customers`: Returns a `200 OK` response with a JSON array of customers.

  - If the optional `search` query param is defined, only customers whose first name, last name, or email address match the search query will be returned. If no customers match, an empty array will be returned.
  - Otherwise, all customers will be returned.

- `GET /api/customers/:customerId`: Finds the customer with the given `id`. If found, a `200 OK` response is returned with a JSON representation of that customer. Otherwise, a `404 Not Found` response is returned.

- `POST /api/customers`: Creates a new customer with the information given in the request body. Returns a `201 Created` response with a JSON representation of the new customer, and a `Location` header pointing to the new customer.

- `PATCH /api/customers/:customerId`: Updates the customer with the given `id`, with the information in the request body. If the customer exists, the update will be performed, and a `204 No Content` response will be returned. Otherwise, a `404 Not Found` response will be returned.

- `DELETE /api/customers/:customerId`: Deletes the customer with the given `id`, if it exists. Either way, returns a `204 No Content` response.

- `GET /api/customers/:customerId/orders`: Returns a `200 OK` response with a JSON array of all orders for the given customer if that customer exists, or a `404 Not Found` response otherwise.

- `GET /api/customers/:customerId/orders/:orderId`: Finds the order with the given `id` belonging to the given customer. If found, returns a `200 OK` response with a JSON representation of that order. Otherwise, returns a `404 Not Found` response.

- `POST /api/customers/:customerId/orders`: Creates a new order for the given customer, with the information given in the request body. If the customer doesn't exist, returns a `404 Not Found` response. Otherwise, the order will be created, and a `201 Created` response will be returned along with a JSON representation of that order, and a `Location` header pointing to that order.

## Details

- **Route structure:** API routes are organized using express Routers, according to the type of _resource_ dealt with - API routes dealing with customers are in one file ([`api-customers.js`](./src/routes/api/api-customers.js)), while routes dealing with customer orders are in another ([`api-customer-orders.js`](./src/routes/api/api-customer-orders.js)).

  The routers are organized in the following logical hierarchy:

  - Application root **/** (`app.js`), contains:

    - API root **/api** (`routes/api/api.js`), contains:

      - Customers routes /api **/customers**, /api **/customers/:customerId** (`routes/api/api-customers.js`), contains:

      - Customer orders routes /api/customers/:customerId **/orders**, /api/customers/:customerId **/orders/:orderId** (`routes/api/api-customer-orders.js`).

- **Express routers and path parameters:** In `api-customers.js` line 82, we can see where we add the customer-orders routes to our application. Notice that we're adding the routes at `/:customerId/orders` - so all of these routes will have access to the `customerId` path parameter.

  If we want to actually use the `customerId` path parameter within the child routes, then we need some extra config. In `api-customer-orders.js` line 13, we can see that when we are creating the router, we use the `{ mergeParams: true }` option. This will allow all the routes in this file to access that parent `customerId` param (which we can see on lines 20, 38, and 49 in that file).

  Also note: The route defined on line 48 has another route param - `orderId`. This route will be able to access _both_ route params, no problem. So for the route `/api/customers/1/orders/3`, `customerId` will be `1`, and `orderId` will be `3`.

- **Naming of API paths**: This project follows **good practices** when it comes to naming our RESTful API paths. Take note that all of our paths refer to a _thing_:

  - `/api/customers`: A list of customers
  - `/api/customers/:customerId`: A single customer
  - `/api/customers/:customerId/orders`: A list of orders for a customer
  - `/api/customers/:customerId/orders/:orderId`: A single order for a customer

  We don't have any _verbs_ in our path names. The path names are basically _nouns_, or _resource names_. The verbs we _do_ use, are the HTTP methods (see below), choosing the correct one for each kind of action we want to do. Writing a path name like `/api/customers/createCustomer` would be **bad practice** and would definitely lose you marks in a test!

- **Use of path and query params**: Also note that we are using both path and query params in this project, for their intended purposes. We're using query params only to search - or _query_ - for customers via text search. We do _not_ use them to refer to identifiers. For example, the path `/api/customers?id=4` would be considered **bad practice**. For identifiers, path parameters should be used instead - e.g. `/api/customers/4`.

- **CRUD, REST, and HTTP**: Within REST, there are four common operations we might wish to do, each of which should be performed by API routes with corresponding HTTP methods:

  - **Create**: Creating new resources (e.g. new customers) should be done with `POST`.
  - **Retrieve**: Retrieving resources (e.g. getting a list of customers, or getting a customer with a particular id) should be done with `GET`.
  - **Update:** Updating resources (e.g. editing an existing customer) should be done with either `PUT` or `PATCH` methods.

    Technically, `PUT` should completely replace an existing resource with another one, while `PATCH` should be used to perform a partial update - but in practice either are usually fine for any update operation.

  - **Delete:** Deleting resources should be done with the `DELETE` method.

  There are other HTTP methods which we won't use. You can see the complete list [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) for your interest.

- **HTTP status codes**: HTTP response codes have meaning, and should be used correctly. Here are some commonly seen / used ones:

  - **200 OK**: Is used when a request was successful, did not update the server in any way, and has some data to return.
  - **201 Created**: Is used when a request was successful and resulted in a new resource being created on the server. Almost always accompanied by a `Location` header pointing to the new resource.
  - **204 No Content**: Is used when a request was successful, did not result in a new resource being created (but may have caused other updates), and there is no response data to return.
  - **400 Bad Request**: Is used when the client sends a request that cannot be understood by the server at all (for example, the client sends a PNG image when the server is expecting JSON data). Usually you would not return this status from your own code - Express does a good job of sending this one for you if required.
  - **401 Unauthorized**: Is sometimes used if the user needs to login, but has not yet done so. We may come back to this one in a later module when looking at auth.
  - **403 Forbidden**: Is sometimes used if the user has logged in, but their login credentials do not give them permission to do whatever they're trying to do (e.g. an authenticated user trying to delete another user's article in a blogging system). Again, we may come back to this one.
  - **404 Not Found**: Is used when trying to access or modify a resource which does not exist. Sometimes also used instead of 401 or 403 if we want to mask the real reason why the user could not perform an action, for security reasons (For example, if an order exists but belongs to another customer, we might reply 404 instead of 403, because replying 403 would give away that the resource exists, whereas 404 does not).
  - **418 I'm a Teapot**: [Yes, this exists](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/418). No, you should'nt use it in your own application.
  - **422 Unprocessable Content**: Is used when the client sends data in the correct format (e.g sending JSON when JSON is expected), but contains the wrong info (e.g. sending JSON for a new order to the "create customer" API route).
  - **500 Server Error**: Essentially if the server crashes. You should **never** return a 500 error or higher from your own code.

  There are many more HTTP responses, though the need to use them is rare. A comprehensive list is available [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status).
