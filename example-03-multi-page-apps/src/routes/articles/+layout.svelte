<script>
  import { articles } from "$lib/js/articles.js";
  import { page } from "$app/stores";
</script>

<svelte:head>
  <title>Articles</title>
</svelte:head>

<!-- This menu will be rendered on all /articles pages. -->
<h1>Articles</h1>
<div class="container">
  <nav>
    <header>Available articles</header>
    <ul>
      {#each articles as article}
        <li class:active={$page.url.pathname === `/articles/${article.id}`}>
          <a href={`/articles/${article.id}`}>{article.title}</a>
        </li>
      {/each}
    </ul>
  </nav>
  <div>
    <!-- Individual article view goes here. -->
    <slot />
  </div>
</div>

<style>
  .container {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 10px;
  }

  nav {
    & > header {
      background-color: rgb(42, 139, 70);
      color: white;
      padding: 3px 10px;
      text-align: center;
      font-weight: bold;
      font-size: 1.1rem;
    }

    & > ul {
      border: 1px solid lightgray;
      border-top: 0;
      margin: 0;
      list-style: none;
      padding: 5px 0;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    & li {
      padding: 5px 10px;

      &:is(:hover, .active) {
        color: rgb(42, 139, 70);
        background-color: rgb(102, 209, 130);
      }
    }

    & a {
      text-decoration: none;
      color: black;
    }
  }
</style>
