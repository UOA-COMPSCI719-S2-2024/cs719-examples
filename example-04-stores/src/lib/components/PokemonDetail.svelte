<script>
	import { pokemonStore } from "$lib/js/pokemon-store.js";

	const [pokemonData, loading, error, refetchPokemon] = pokemonStore;
</script>

<h2>{$pokemonData.name}</h2>
<p>{$pokemonData.dexEntry}</p>

<div class="control-panel">
	<button on:click={refetchPokemon}>Load another Pokemon</button>
	{#if $loading}
		<span>Loading...</span>
	{/if}
	{#if $error}
		<span class="error">Error: {$error}</span>
	{/if}
</div>

<div class="image-container">
	<img src={$pokemonData.imageUrl} alt={$pokemonData.name} />
</div>

<style>
	.control-panel {
		display: flex;
		flex-direction: row;
		gap: 5px;

		& span {
			font-style: italic;
			font-size: 0.9rem;
			color: darkslategray;
		}
	}

	.error {
		color: red;
		font-weight: bold;
	}

	.image-container {
		display: flex;
		justify-content: center;
	}
</style>
