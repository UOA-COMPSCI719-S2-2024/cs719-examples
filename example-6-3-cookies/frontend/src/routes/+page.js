import { PUBLIC_API_BASE_URL } from "$env/static/public";

/**
 * When the page loads, send a GET request to /api/cookies, which will simply "echo" back all cookies received from
 * the browser, as JSON.
 */
export async function load({ fetch }) {
  return {
    cookies: await fetch(`${PUBLIC_API_BASE_URL}/cookies`, { credentials: "include" }).then((r) =>
      r.json()
    )
  };
}
