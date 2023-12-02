<script>
	import { onMount } from "svelte";
	
	/**
	 * An async function to get a random pokemon.
	 *
	 * The API has a query parameter, delay, which lets us specify a delay in milliseconds before
	 * the response is returned. We can use this to more clearly see our "loading" message.
	 *
	 * We can also set alwaysThrowError to true to test our error message display code.
	 */
	async function getRandomPokemon() {
		const response = await fetch(
			"https://cs719-a01-pt-server.trex-sandwich.com/api/pokemon/random?delay=300"
		);

		// Figure out if there was an error, and throw it if so.
		const alwaysThrowError = false; // Set this to true to test your error display code below.
		if (alwaysThrowError || response.status != 200) {
			// The message we throw here will be available in the "err" below.
			throw `Could not get Pokemon info (response status code = ${response.status}).`;
		}

		const data = await response.json();
		return data;
	}

	/**
	 * Note that this is getting the promise, not the actual data. We can't await values from the root of the
	 * <script> tag. So, we will do it below, using Svelte's handy #await block!
	 *
	 * We are using onMount() to ensure we only start fetching once this component is loaded in the browser. In the
	 * meantime, we display some dummy data. If we don't do this, Svelte will give us a warning when rendering the
	 * component on the server.
	 */
	let pokePromise = Promise.resolve({ name: "...", dexEntry: "..." });
	onMount(() => (pokePromise = getRandomPokemon()));
</script>

{#await pokePromise}
	<!-- Elements in this block are rendered while the data is still loading -->
	<p>Loading...</p>
{:then pokemon}
	<!-- Elements in this block are rendered once the data has finished loading.
        -->
	<p><strong>{pokemon.name}:</strong> {pokemon.dexEntry}</p>
{:catch err}
	<!-- Elements in this block are rendered if there is an error. NOTE: When using fetch(), 
        it only counts as an "error" if the server never returns any response at all. It doesn't count
        as an error even if the response is something like a 404 status code. -->
	<p class="error"><strong>Error:</strong> {err}</p>
{/await}

<!-- When we click this button, it will re-fetch the data for a new random Pokemon. -->
<button on:click={() => (pokePromise = getRandomPokemon())}>Randomize</button>

<style>
	.error {
		color: red;
	}
</style>
