# CS719 - REST APIs - Better code organization with middleware

This example project provides the exact same functionality as the previous example, but improves the code structure and removes some code duplication using _middleware_.

## API specification

The API specification for this REST service example is as follows:

1. `GET /api/customers`: Returns a `200 OK` response with a JSON array of customers.

   - If the optional `search` query param is defined, only customers whose first name, last name, or email address match the search query will be returned. If no customers match, an empty array will be returned.
   - Otherwise, all customers will be returned.

2. `GET /api/customers/:customerId`: Finds the customer with the given `id`. If found, a `200 OK` response is returned with a JSON representation of that customer. Otherwise, a `404 Not Found` response is returned.

3. `POST /api/customers`: Creates a new customer with the information given in the request body. Returns a `201 Created` response with a JSON representation of the new customer, and a `Location` header pointing to the new customer.

4. `PATCH /api/customers/:customerId`: Updates the customer with the given `id`, with the information in the request body. If the customer exists, the update will be performed, and a `204 No Content` response will be returned. Otherwise, a `404 Not Found` response will be returned.

5. `DELETE /api/customers/:customerId`: Deletes the customer with the given `id`, if it exists. Either way, returns a `204 No Content` response.

6. `GET /api/customers/:customerId/orders`: Returns a `200 OK` response with a JSON array of all orders for the given customer if that customer exists, or a `404 Not Found` response otherwise.

7. `GET /api/customers/:customerId/orders/:orderId`: Finds the order with the given `id` belonging to the given customer. If found, returns a `200 OK` response with a JSON representation of that order. Otherwise, returns a `404 Not Found` response.

8. `POST /api/customers/:customerId/orders`: Creates a new order for the given customer, with the information given in the request body. If the customer doesn't exist, returns a `404 Not Found` response. Otherwise, the order will be created, and a `201 Created` response will be returned along with a JSON representation of that order, and a `Location` header pointing to that order.

## More on Middleware
Take a look at the API specification above. Routes 2, 4, 5, 6, 7, and 8 all have shared functionality: _"Get the customer with the given customerId. If it doesn't exist, return a 404 Not Found response. Otherwise, [do something]"_.

In the previous example, this resulted in a lot of copy / pasting of the following lines of code:

```js
const customer = retrieveCustomerById(req.params.customerId);
if (!customer) return res.sendStatus(404);
```

Though this is only two lines, it is still annoying and error-prone to have to copy / paste this logic into so many places. It would be better if we could extract it out into a common function which runs whenever we need to perform this check. Luckily, using middleware, we can!

### "Single-use" middleware

Previously, we looked at middleware which will run for _all_ application routes. For example, the following would add JSON body parsing to all routes:

```js
app.use(express.json());
```

Instead, we can individually add middleware to single route handlers. For example, if we wanted to add JSON processing to only a single route, we could do so by adding `express.json()` before our own route handler in the same function, for example:

```js
router.post("/api/customers", express.json(), (req, res) => {

});
```

Essentially, for any route handling function, we can add as many handlers as we like, one after the other, separated by commas. They will be run in the order they are defined. So in the example above, `express.json()` will first parse the request body as JSON, and _then_ our own handler function will run, with the body having already been parsed and available to us as `req.body`.

### Calling the "next" handler
If we write our own middleware function, it's up to us to call the "next" function in the chain. We do that by writing our middleware function with three arguments rather than two:

```js
function myMiddleware(req, res, next) {

}
```

The last argument - `next` - is a _function_ which we can call, which will result in the next handler being run. If we don't call `next()`, the next function won't run, and the route handling will end.

Here are some examples:

```js
function helloMiddleware(req, res, next) {
    console.log("Hello, world!");
    next();
}
```

To log "Hello, world!" for _all_routes, we could use:

```js
app.use(helloMiddleware);
```

To log "Hello, world!" for all routes in a given Router, we could use:

```js
const router = express.Router();
router.use(helloMiddleware);
```

To log "Hello, world!" for a _single_ route, we could use:

```js
router.get("/", helloMiddleware, (req, res) => {
    // By the time we get to this point in our code, "Hello, world" will have been logged.
});
```

If we _don't_ call `next()`, the next function won't run. So, for example, in the below code, the route handler which is supposed to send a `204` response, will never run:

```js
function myMiddleware(req, res, next) {
    return res.sendStatus(404);
}

router.get("/", myMiddleware, (req, res) => {
    // Will never run, because myMiddleware runs first and it will just always return a 404.
    return res.sendStatus(204);
})
```

### A practical use for this
Now we've seen how it works, we can see a practical use case for writing our own middleware in this application.

In [`middleware/customers-middleware.js`](./src/middleware/customers-middleware.js), we've defined a middleware function which will search for a customer by id (according to the `customerId` path param, `req.params.customerId`). If found, we add that customer to `req.customer` so it can be used later on, then we call `next()`. If the customer is _not_ found, we return a `404` response, and don't call `next()`.

We're using this middleware in several places in [`api-customers.js`](./src/routes/api/api-customers.js). On lines 47 and 59, we're adding this middleware function to a single route handler. Then on line 88, we're adding it to an entire child Router (the one defined in `api-customer-orders.js`), because every route in that child Router needs access to the customer.

In this way, we've extracted out that part of our route handling logic from six different route handlers, and put it in one place - _much_ better code organization!