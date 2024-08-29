<script>
  import FavouriteThingsList from "$lib/components/FavouriteThingsList.svelte";
  import { addThing } from "$lib/js/favourite-things-store";

  let newDescription = "";

  function handleAddFavouriteThing() {
    if (newDescription === "") return;
    addThing(newDescription);
    newDescription = "";
  }
</script>

<h1>My Favourite Things</h1>
<p>This page shows of a more "complete" example, showing how we can build a "favourite things" app, backed
by a Svelte store.</p>

<div class="container">
  <div>
    <h2>Things</h2>
    <FavouriteThingsList />
  </div>
  <div>
    <h2>New thing</h2>
    <input type="text" bind:value={newDescription} />
    <button on:click={handleAddFavouriteThing}>Add</button>
  </div>
</div>

<style>
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
</style>
