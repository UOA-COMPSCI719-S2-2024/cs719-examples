import { writable } from "svelte/store";

/**
 * A function that creates and returns several Svelte stores to store the progress
 * and result of making an API request using fetch(). The stores returned include:
 *
 * - A store containing the data itself (first array element in the result)
 * - A store containing a boolean indicating whether the data is loading (second element)
 * - A store containing any errors which occurred, if any (third element)
 * - A function which can be called to re-fetch the data if required (fourth element)
 *
 * @param {string} url the API URL (i.e. where to fetch the data)
 * @param {any} initialData the initial data to use while the fetch() is still ongoing, if required.
 *  Defaults to an empty array.
 *
 * @author Andrew Meads, modified from code found at https://svelte.dev/repl/b2d671b8119845ca903667f1b3a96e31?version=3.37.0
 */
export function fetchStore(url, initialData = []) {
  // Create the stores
  const loading = writable(false);
  const error = writable(false);
  const data = writable(initialData);

  /**
   * The function to actually get the data
   */
  async function get() {
    // Before fetching, set "loading" to true and clear any error messages
    loading.set(true);
    error.set(false);

    try {
      // Try to fetch the data and save the result to the data store
      const response = await fetch(url);
      data.set(await response.json());
    } catch (err) {
      // If there was an error, save it here.
      error.set(err);
    }

    // We're done loading.
    loading.set(false);
  }

  // Start fetching data immediately
  get();

  return [data, loading, error, get];
}
