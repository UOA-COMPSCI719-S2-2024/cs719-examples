<script>
  import { firstNameStore, lastNameStore } from "$lib/js/basic-stores.js";
</script>

<form>
  <!-- We can bind to stores too!! -->
  <label for="firstName">First name:</label>
  <input type="text" bind:value={$firstNameStore} />

  <label for="lastName">Last name:</label>
  <input type="text" bind:value={$lastNameStore} />
</form>
