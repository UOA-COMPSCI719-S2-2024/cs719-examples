<!-- This component contains a simple form allowing a user to add a new cookie, with a given name and value, and HTTP-only status (true or false).
    On submitting, this will POST to our API. The cookie will be created on the server and returned to the client in its Set-Cookie header. This is
    achieved by calling res.cookie() in our node.js / Express app. Once returned, we will refresh the page. -->
<script>
  import { createEventDispatcher } from "svelte";
  import { PUBLIC_API_BASE_URL } from "$env/static/public";
  const COOKIE_URL = `${PUBLIC_API_BASE_URL}/cookies`;
  const dispatch = createEventDispatcher();

  let newCookieName = "";
  let newCookieValue = "";
  let newCookieHttpOnly = false;

  /**
   * Sends the new cookie data to the server. The server will create the cookie and return it in the "Set-Cookie" header,
   * where it will be added to the browser.
   */
  async function handleNewCookie() {
    const newCookieData = {
      name: newCookieName,
      value: newCookieValue,
      httpOnly: newCookieHttpOnly
    };

    // Send POST request to our API
    const response = await fetch(COOKIE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(newCookieData)
    });

    // If response was successful, clear our form and raise the "cookieAdded" event.
    if (response.status === 204) {
      newCookieName = "";
      newCookieValue = "";
      newCookieHttpOnly = false;

      dispatch("cookieAdded");
    }

    // Otherwise, display alert message
    else {
      alert(`Unexpected response code: ${response.status}`);
    }
  }
</script>

<form on:submit|preventDefault={handleNewCookie}>
  <label for="name">Name:</label>
  <input type="text" name="name" bind:value={newCookieName} required />
  <label for="value">Value:</label>
  <input type="text" name="value" bind:value={newCookieValue} required />
  <label><input type="checkbox" bind:checked={newCookieHttpOnly} /> HTTP only?</label>
  <button type="submit">Submit</button>
</form>
