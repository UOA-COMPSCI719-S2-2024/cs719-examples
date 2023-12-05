<!-- This component shows how we can create and dispatch custom events. In this case, we have defined a custom
    "numberClicked" event, which will be dispatched to listeners whenever the user clicks one of the numpad
    buttons. The event will contain information about which number was clicked. -->

<script>
  // We need to access Svelte's createEventDispatcher function to create our own custom events.
  import { createEventDispatcher } from "svelte";

  const NUMS = [1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, null];

  /**
   * This gets us access to an event dispatcher (the "dispatch" variable), which we can call to
   * dispatch custom events.
   */
  const dispatch = createEventDispatcher();

  /**
   * This function dispatches a "numberClicked" event, supplying the number which was clicked.
   *
   * We could just as easily have defined this as an arrow function directly in the button's
   * on:click handler below.
   *
   * @param num the number which was clicked.
   */
  function dispatchNumberClickedEvent(num) {
    dispatch("numberClicked", num);
  }
</script>

<div>
  <!-- Loop through our NUMS array. Display a button for each number (or a grid placeholder if null). -->
  {#each NUMS as num}
    {#if num != null}
      <!-- Whenever this button is clicked, we will dispatch our custom event. -->
      <button on:click={() => dispatchNumberClickedEvent(num)}>{num}</button>
    {:else}
      <span><!-- Placeholder --></span>
    {/if}
  {/each}
</div>

<style>
  div {
    display: grid;
    grid-template-columns: repeat(3, 50px);
    grid-auto-rows: 50px;
    gap: 5px;
  }
</style>
