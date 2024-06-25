<!-- This form allows a user to enter a new todo item. When the submit button is clicked, a custom
        "submit" event will be dispatched, containing the new item's task and dueDate. -->

<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  let task = "";

  // Initialize to today's date, in ISO (yyyy-MM-dd) format.
  let dueDate = new Date().toISOString().substring(0, 10);
</script>

<!-- When we submit this form, dispatch our custom event with the values the user entered. -->
<form on:submit|preventDefault={() => dispatch("submit", { task, dueDate })}>
  <div>
    <label for="task">Task:</label>
    <input type="text" name="task" bind:value={task} required />
  </div>

  <div>
    <label for="task">Due date:</label>
    <input type="date" name="task" bind:value={dueDate} required />
  </div>

  <button type="submit">Add</button>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;

    & div {
      display: flex;
      flex-direction: column;
    }
  }
</style>
