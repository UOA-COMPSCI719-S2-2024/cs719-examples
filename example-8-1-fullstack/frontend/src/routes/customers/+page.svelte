<script>
  import CustomerTable from "$lib/components/CustomerTable.svelte";
  import NewCustomerForm from "$lib/components/NewCustomerForm.svelte";
  import { PUBLIC_API_BASE_URL } from "$env/static/public";

  /**
   * This function will let us "invalidate" any page load functions which depend on a given URL, which will cause
   * them to be reloaded.
   */
  import { invalidate } from "$app/navigation";

  const CUSTOMERS_URL = `${PUBLIC_API_BASE_URL}/customers`;

  /**
   * Define a special prop called "data", which will be automatically filled by SvelteKit, with the result
   * of running the load() function defined in +page.js.
   */
  export let data;

  /**
   * When we want to save a customer, send a PATCH request to /api/customers/:id,
   * with the update information in the request body.
   *
   * If the patch fails, display a message alerting us of that fact.
   */
  async function handleSaveCustomer(e) {
    const customer = e.detail;
    // console.log(customer);

    /**
     * Demonstrates use of fetch() to send non-GET requests.
     * The fetch function can take a second argument, as shown here. The second argument is an object with
     * several properties we can configure. The "method" prop lets us set the HTTP method. The "headers" prop
     * lets us supply an object with any headers (here, we're setting the Content-Type to let the server know we
     * are sending JSON). The body "prop" lets us send a request body, which in this case is a JSON string.
     */
    const response = await fetch(`${CUSTOMERS_URL}/${customer.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer)
    });

    /**
     * If the response code is 204, we're good (because that's how we wrote our API). If not, then report it.
     */
    if (response.status != 204) {
      alert(`Unexpected status code received: ${response.status}`);
    }
  }

  /**
   * When we want to save a customer, send a DELETE request to /api/customers/:id.
   *
   * If the delete fails, display a message alerting us of that fact.
   *
   * If the delete succeeds, reload the page data so that the deleted customer will be removed
   * from the table.
   */
  async function handleDeleteCustomer(e) {
    const customer = e.detail;
    // console.log(customer);

    const response = await fetch(`${CUSTOMERS_URL}/${customer.id}`, {
      method: "DELETE"
    });

    console.log(`${CUSTOMERS_URL}/${customer.id}`);
    console.log(response.status);
    if (response.status === 204) {
      // Invalidating this URL will cause our +page.js load() function to rerun, because that load() function
      // depends on this URL.
      invalidate(CUSTOMERS_URL);
    } else {
      alert(`Unexpected status code received: ${response.status}`);
    }
  }

  /**
   * When we want to add a customer, send a POST request to /api/customers,
   * with the new customer information in the request body.
   *
   * If the post fails, display a message alerting us of that fact. If it succeeds (i.e.
   * returns a 201 Created response), instead reload the page data.
   */
  async function handleAddCustomer(e) {
    const customer = e.detail;
    // console.log(customer);

    const response = await fetch(CUSTOMERS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer)
    });

    if (response.status === 201) {
      invalidate(CUSTOMERS_URL);
    } else {
      alert(`Unexpected status code received: ${response.status}`);
    }
  }
</script>

<h1>Customers</h1>

<!-- Display customer data in a table component. -->
<CustomerTable
  customers={data.customers}
  on:customerSaved={handleSaveCustomer}
  on:customerDeleted={handleDeleteCustomer}
/>

<h2>New customer</h2>

<NewCustomerForm on:submit={handleAddCustomer} />