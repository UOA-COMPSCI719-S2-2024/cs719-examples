# CS719 - SvelteKit frontend + Express backend - Comprehensive REST example

This example continues on from the previous example, and shows of a more comprehensive customer app. Now, our Svelte website can Create, Retrieve, Update _and_ Delete customers. Each of these operations is backed by an appropriate REST endpoint in our node.js / Express server.

Retrieval of customer information from our server is the same as in the previous example. For the other three operations, see below.

- **Creating**: In our frontend, we have a `NewCustomerForm` component, which allows users to enter a first name, last name, and email address for a new customer. That component raises a `submit` event which we handle in `routes/customers/+page.svelte`. We can see the use of our form on line 114, and our handler function on line 85.

  In that function, we get the new customer info from our form's `submit` event, then send a `POST` request to <http://localhost:3000/api/customers>, with the new customer info in the request body.

  Notice the use of `fetch()` on line 89, to send non-GET requests. This usage of fetch takes a second argument - a JS object with several properties. The `method` prop lets us specify the HTTP method (e.g. `POST`), the `headers` prop lets us specify any headers we need (we're using it to set the `Content-Type` so the server knows to expect JSON data from the browser), and the `body` prop contains the actual data to send to the server (in our case, a JSON string).

  When the server returns a response, we will take different actions depending on whether the request was successful. If the request was successful (i.e. the response code is `201 Created`), we will call SvelteKit's `invalidate()` function. This lets us specify a URL to "invalidate". Any SvelteKit `load()` functions which depend on that URL will be rerun. This will result in our UI updating so we can see the newly added customer in the table.

  If the "create customer" request was not successful, we will display an alert to the user. In practice, we would probably want to display a nicer message or display an error directly in the "new customer" form, rather than an alert box.

- **Updating**: We have modified our `CustomerRow` component to include an "edit" button. If the user clicks this, then the table cells for that customer will become editable. Then, when the user clicks "save", we raise a custom `customerSaved` event, with info about the customer which was just edited by the user.

  In `CustomerTable.svelte` line 21, we are forwarding that event to the parent `+page.svelte`, rather than handling it directly in there.

  In `customers/+page.svelte`, we are handling the event on line 26. The code looks similar to the code for adding a new customer. We are sending a `PATCH` request to the URL corresponding to that customer, along with the updated customer info in the request body. If the request was not successful, we are displaying an alert to the user.

- **Deleting**: Similarly to above, we have added a "delete" button to our `CustomerRow` component. If we click it, we raise a custom `customerDeleted` event, which we handle in `customers/+page.svelte` line 59.

  Here, we send a `DELETE` request to the URL corresponding to that customer. If the request is successful, we `invalidate()` the customers API URL, which causes that data to be reloaded, which will result in the deleted customer being removed from the table.
