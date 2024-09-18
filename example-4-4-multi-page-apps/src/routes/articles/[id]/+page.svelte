<script>
  import { articles } from "$lib/js/articles.js";
  import { page } from "$app/stores";

  /**
   * page.params contains all the route parameters. We're getting the "id" param here,
   * and using it to find the article with the matching id.
   */
  $: article = articles.find((a) => a.id == $page.params.id);
  $: pageTitle = article ? article.title : "Not found";
</script>

<svelte:head>
  <!-- {#if article}<title>{article.title}</title>{/if} -->
   <title>{pageTitle}</title>
</svelte:head>

{#if article}
  <h2>{article.title}</h2>

  <!-- The {@html} block will paste in the content as HTML. If we didn't do this, then
        the HTML elements inside the article content would be shown to the user, rather than
        acting as expected. -->
  <p>{@html article.content}</p>
{:else}
  <!-- Fallback if we try to browse to an article with a nonexistant id. -->
  <p>No article found with id = {$page.params.id}!</p>
{/if}
