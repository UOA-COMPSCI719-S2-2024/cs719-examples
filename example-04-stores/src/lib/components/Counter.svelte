<script>
  // Import the store(s) we're using.
  import { counterStore } from "$lib/js/basic-stores.js";
</script>

<div>
  <!-- Once we have access to a store we can use it very similarly to any other kind of variable,
        except that we will prepend it with "$". This is "syntactic sugar" added by Svelte which
        allows us to avoid having to manually call the stores' subscribe(), get(), and set() functions. -->
  <button on:click={() => $counterStore--}>⬅️</button>

  <span>{$counterStore}</span>

  <button on:click={() => $counterStore++}>➡️</button>
</div>

<style>
  div {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  span {
    font-size: 3rem;
    font-weight: bold;
  }

  button {
    border: 0;
    background-color: transparent;
    padding: 10px 0;
    translate: -1px -1px;
    font-size: 4rem;

    &:first-child {
      border-right: 1px solid lightgray;
    }

    &:last-child {
      border-left: 1px solid lightgray;
    }
  }

  button:hover {
    background-color: rgb(245, 255, 245);
  }

  button:active {
    background-color: rgb(235, 255, 235);
  }
</style>
