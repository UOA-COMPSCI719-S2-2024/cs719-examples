// Disables server-side rendering.
export const ssr = false;

/**
 * This function will be called by SvelteKit when the app loads. It fetches all people
 * from trex-sandwich.
 */
export async function load({ fetch, params }) {
  const response = await fetch(`https://people-db.trex-sandwich.com/people`);
  const people = await response.json();
  return { people };
}
