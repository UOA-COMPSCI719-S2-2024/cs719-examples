<script>
  import PokemonDetail from "$lib/components/PokemonDetail.svelte";
</script>

<svelte:head>
  <title>fetch() + stores</title>
</svelte:head>

<h1>Fetch stores</h1>
<p>
  The component on this page illustrates the use of the <code>fetchStore()</code> function located
  in <code>lib/js/fetch-store.js</code>. It shows how we can combine Svelte stores with
  <code>fetch()</code> to create a shared store including the data we want to fetch, as well as info
  about its loading / error status, and the ability to refetch if required.
</p>

<PokemonDetail />
