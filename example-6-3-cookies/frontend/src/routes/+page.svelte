<script>
  import NewCookieForm from "$lib/components/NewCookieForm.svelte";
  import { parseDocumentCookies } from "$lib/js/cookie-util.js";
  import { invalidate } from "$app/navigation";
  import { PUBLIC_API_BASE_URL } from "$env/static/public";
  const COOKIE_URL = `${PUBLIC_API_BASE_URL}/cookies`;

  export let data;

  /**
   * Call the parseDocumentCookies() function to directly retrieve all cookies on the browser from the document.cookie object, without
   * going via the server at all.
   *
   * Note; This will NOT retrieve any cookies marked as HTTP-only, for security purposes.
   */
  let browserCookies = parseDocumentCookies();
  $: browserCookieNames = Object.keys(browserCookies);

  /**
   * data.cookies will contain a list of all cookies sent by the browser to the server (then echoed back in the response). This
   * DOES include the HTTP-only cookies (because the browser does send those to the server even though we can't access them through
   * document.cookie).
   */
  $: serverCookies = data.cookies;
  $: serverCookieNames = Object.keys(serverCookies);

  /**
   * Refresh the page by causing the page load data to be invalidated, and the document cookies to be reloaded.
   */
  function refreshPage() {
    browserCookies = parseDocumentCookies();
    invalidate(COOKIE_URL);
  }
</script>

<svelte:head>
  <title>Cookies demo</title>
</svelte:head>

<h1>Cookies demo</h1>

<h2>Your cookies</h2>

<div class="container">
  <div>
    <h3>From <code>document.cookie</code>:</h3>
    <p>
      Here is a list of all cookies recognized by this website, obtained directly from the
      <code>document.cookie</code> prop:
    </p>

    <!-- Display the list of all cookies parsed from document.cookie -->
    <ul>
      {#each browserCookieNames as name}
        <li>
          <strong>{name}:</strong>
          {#if typeof browserCookies[name] === "string"}
            <em>String:</em> {browserCookies[name]}
          {:else}
            <em>Object:</em> {JSON.stringify(browserCookies[name])}
          {/if}
        </li>
      {/each}
    </ul>
  </div>

  <div>
    <h3>From server:</h3>
    <p>Here is a list of all cookies sent by the browser to the server:</p>

    <!-- Display the list of all cookies sent by the browser to the server -->
    <ul>
      {#each serverCookieNames as name}
        <li>
          <strong>{name}:</strong>
          {#if typeof serverCookies[name] === "string"}
            <em>String:</em> {serverCookies[name]}
          {:else}
            <em>Object:</em> {JSON.stringify(serverCookies[name])}
          {/if}
        </li>
      {/each}
    </ul>
  </div>
</div>

<h2>Create a new cookie</h2>
<p>Use this form to create a new cookie.</p>
<NewCookieForm on:cookieAdded={refreshPage} />

<style>
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
</style>
