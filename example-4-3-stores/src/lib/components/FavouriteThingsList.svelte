<script>
  import { favouriteThingsStore, editThing, removeThing } from "$lib/js/favourite-things-store";

  let currentlyEditingThing = null;
  let currentlyEditingDescription = null;

  function handleEditStart(thing) {
    currentlyEditingThing = thing;
    currentlyEditingDescription = thing.description;
  }

  function handleEditFinish() {
    editThing(currentlyEditingThing.id, currentlyEditingDescription);
    currentlyEditingThing = null;
  }

  function handleCancelEdit() {
    currentlyEditingThing = null;
  }
</script>

<ul>
  {#each $favouriteThingsStore as thing (thing.id)}
    <li class:editing={currentlyEditingThing === thing}>
      {thing.description}
      <button on:click={() => handleEditStart(thing)}>Edit</button>
      <button on:click={() => removeThing(thing.id)}>Delete</button>

      <!-- Edit box below -->
      {#if currentlyEditingThing === thing}
        <input type="text" bind:value={currentlyEditingDescription} />
        <button on:click={handleEditFinish}>Ok</button>
        <button on:click={handleCancelEdit}>Cancel</button>
      {/if}
    </li>
  {/each}
</ul>

<style>
  ul {
    list-style: none;
    padding: 0;
    display: grid;
    grid-template-columns: auto 1fr 1fr;
    gap: 1rem;
  }

  li {
    display: grid;
    grid-column: 1 / 4;
    grid-template-columns: subgrid;
    gap: 1rem;
  }

  .editing {
    outline: 3px solid green;
    outline-offset: 3px;
  }
</style>
