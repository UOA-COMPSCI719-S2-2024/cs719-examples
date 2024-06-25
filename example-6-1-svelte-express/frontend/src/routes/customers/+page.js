/**
 * This is how we import environment variables in SvelteKit, rather than using process.env like we do with our
 * Express server.
 *
 * Note: Any env variables we import into our code which will run on the browser, MUST be prefixed with PUBLIC_.
 */
import { PUBLIC_API_BASE_URL } from "$env/static/public";

const CUSTOMERS_URL = `${PUBLIC_API_BASE_URL}/customers`;

/**
 * Whenever we navigate to the customers page, this load function will run first before the page is rendered.
 *
 * Here, it will fetch the customers from our backend and return them.
 * 
 * Any data we return will be accessible via the "data" prop in the +page.svelte file.
 */
export async function load({ fetch }) {
  const response = await fetch(CUSTOMERS_URL);
  const customers = await response.json();
  return { customers };
}
