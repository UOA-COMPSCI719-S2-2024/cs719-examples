<script>
  import { createEventDispatcher } from "svelte";

  export let customer;

  // Create a copy of the customer which we can randomly edit
  let displayedCustomer = { ...customer };

  const dispatch = createEventDispatcher();

  let isEditing = false;

  /**
   * Raises a "customerSaved" event, supplying the edited customer.
   */
  function handleSave() {
    isEditing = false;
    dispatch("customerSaved", displayedCustomer);
  }

  /**
   * Raises a "customerDeleted" event, supplying the customer to delete.
   */
  function handleDelete() {
    isEditing = false;
    dispatch("customerDeleted", customer);
  }

  /**
   * Cancels any edit operation and resets the data
   */
  function handleCancel() {
    displayedCustomer = { ...customer };
    isEditing = false;
  }
</script>

<tr class:is-editing={isEditing}>
  <td>{displayedCustomer.id}</td>

  {#if isEditing}
    <!-- Use contenteditable=true to make a cell editable. Works with Svelte bindings to the textContent prop.
      NOTE: We MUST hardcode contenteditable=true, we can't make it dynamic e.g. contenteditable={isEditable}. This
      won't work. Hence why we are using an {#if} block to render two different sets of td's. -->
    <td contenteditable="true" bind:textContent={displayedCustomer.firstName} />
    <td contenteditable="true" bind:textContent={displayedCustomer.lastName} />
    <td contenteditable="true" bind:textContent={displayedCustomer.email} />
  {:else}
    <td>{displayedCustomer.firstName}</td>
    <td>{displayedCustomer.lastName}</td>
    <td>{displayedCustomer.email}</td>
  {/if}

  <!-- Control panel (edit / save / cancel / delete buttons) -->
  <td>
    <div class="control-panel">
      <button disabled={isEditing} on:click={() => (isEditing = true)}>Edit</button>
      <button disabled={!isEditing} on:click={handleSave}>Save</button>
      <button disabled={!isEditing} on:click={handleCancel}>Cancel</button>
      <button on:click={handleDelete}>Delete</button>
    </div>
  </td>
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

  .is-editing {
    background-color: rgb(70, 194, 105) !important;
  }

  td {
    padding: 10px;
    margin: 0;
    cursor: default;

    &[contenteditable="true"]:is(:hover, :focus) {
      background-color: white;
      cursor: text;
    }
  }

  .control-panel {
    display: flex;
    gap: 10px;
  }
</style>
