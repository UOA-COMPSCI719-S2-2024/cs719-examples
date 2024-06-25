<script>
  import CustomerRow from "./CustomerRow.svelte";

  export let customers;
</script>

<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>First name</th>
      <th>Last name</th>
      <th>Email address</th>
      <th />
    </tr>
  </thead>
  <tbody>
    {#each customers as customer (customer.id)}
      <!-- We can forward events to the parent by naming them here without actually handling them!
        You learn something new every day 😅 -->
      <CustomerRow {customer} on:customerDeleted on:customerSaved />
    {/each}
  </tbody>
</table>

<style>
  table {
    width: 100%;
    text-align: left;
    border-collapse: collapse;
  }

  tr {
    background-color: rgb(42, 139, 70);
    color: white;
  }

  th {
    padding: 10px;
    padding-right: 0;
  }
</style>
