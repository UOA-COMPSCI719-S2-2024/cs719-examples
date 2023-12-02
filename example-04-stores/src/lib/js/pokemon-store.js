import { fetchStore } from "./fetch-store";

/**
 * Using the fetchStore() to create a fetch request to the trex-sandwich Pokemon API
 */
const [data, loading, error, get] = fetchStore(
	"https://cs719-a01-pt-server.trex-sandwich.com/api/pokemon/random",
	{
		name: "Loading...",
		dexEntry: "Loading...",
		imageUrl: "/placeholder.png",
		smallImageUrl: "/placeholder.png"
	}
);

export const pokemonStore = [data, loading, error, get];
