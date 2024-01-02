<script>
  export let customer;
</script>

<tr>
  <td>{customer.id}</td>
  <td>{customer.firstName}</td>
  <td>{customer.lastName}</td>
  <td>{customer.email}</td>
</tr>

<style>
  tr {
    background-color: rgb(208, 232, 215);

    &:nth-child(odd) {
      background-color: rgb(205, 241, 215);
    }

    &:hover {
      background-color: rgb(244, 247, 245);
    }
  }

  td {
    padding: 10px;
    padding-right: 0;
  }
</style>
