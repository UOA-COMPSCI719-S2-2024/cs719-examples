<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  let firstName = "";
  let lastName = "";
  let email = "";

  function handleSubmit() {
    dispatch("submit", { firstName, lastName, email });
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <label for="firstName">First name:</label>
  <input type="text" bind:value={firstName} name="firstName" required />
  <label for="lastName">Last name:</label>
  <input type="text" bind:value={lastName} name="lastName" required />
  <label for="email">Email address:</label>
  <input type="email" bind:value={email} name="email" required />
  <button type="submit">Submit</button>
</form>

<style>
  form {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 10px;
    padding-left: 100px;
    padding-right: 100px;
  }

  button {
    grid-column: 1 / 3;
  }
</style>
