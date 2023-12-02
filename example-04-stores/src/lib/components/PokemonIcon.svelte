<script>
	import { pokemonStore } from "$lib/js/pokemon-store.js";
	const [pokemonData] = pokemonStore;
</script>

<img src={$pokemonData.smallImageUrl} alt={`${$pokemonData.name} icon`} />
