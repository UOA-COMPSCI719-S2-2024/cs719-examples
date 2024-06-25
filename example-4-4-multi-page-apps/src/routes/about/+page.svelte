<script>
  import { goto } from "$app/navigation";

  /**
   * goto() will programmatically navigate to the given URL ("/" in this case).
   *
   * The second argument to goto() is a configuration object. Here, we are supplying one property: replaceState.
   * If true, this navigation will not be added to the browser's history, so when we click the back button, it
   * will go back to where we were BEFORE we originally landed on this page. Otherwise, the navigation functions as normal,
   * and clicking the back button will go back to this page.
   */
  function goHome() {
    const replaceState = false;

    goto("/", { replaceState });
  }
</script>

<!-- We can include a svelte:head element on our pages. Within, we can include anything we would normally
	include in a standard <head> element in a normal HTML page. The most common use for this is to set
	the page's <title>. -->
<svelte:head>
  <title>About Me</title>
</svelte:head>

<h1>About me</h1>
<p>My name is Andrew, and I like Pokemon!</p>

<!-- When we click this button, we'll go home -->
<button on:click={goHome}>Go home!</button>
