<script>
  /**
   * We will display this value as part of the button's text below.
   *
   * When this value changes, Svelte will automatically take care of re-rendering the button!
   * This is known as a Reactive value, or Reactive state.
   *
   * This is one of the main benefits of a framework like Svelte - it means we don't have to have
   * tonnes of messy code to update the UI in response to state changes - that part is handled for us :)
   */
  let count = 0;
</script>

<!-- The button displays the "count" value above, and increments it when clicked. -->
<button on:click={() => count++}>The count is: {count}</button>

<!-- Here's some random CSS. It will only apply to this component. -->
<style>
  button {
    border: 0;
    background-color: rgb(52, 154, 70);
    padding: 10px 0;
    translate: -1px -1px;
    box-shadow: 2px 2px 2px rgba(128, 128, 128, 0.5);
    color: white;
    font-weight: bold;
  }

  button:hover {
    background-color: rgb(78, 181, 67);
  }

  button:active {
    background-color: rgb(42, 139, 70);
    translate: 0;
    box-shadow: 1px 1px 2px rgba(128, 128, 128, 0.5);
  }
</style>
