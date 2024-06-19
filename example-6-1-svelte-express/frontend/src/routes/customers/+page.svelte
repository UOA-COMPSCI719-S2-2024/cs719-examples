<script>
  import CustomerTable from "$lib/components/CustomerTable.svelte";

  /**
   * Define a special prop called "data", which will be automatically filled by SvelteKit, with the result
   * of running the load() function defined in +page.js.
   */
  export let data;
</script>

<h1>Customers</h1>

<!-- Display customer data in a table component. -->
<CustomerTable customers={data.customers} />
