<script>
  import "$lib/css/app.css";
  import PokemonIcon from "$lib/components/PokemonIcon.svelte";

  // This is a special Svelte store which provides info about the current page.
  import { page } from "$app/stores";
  $: path = $page.url.pathname;
</script>

<!-- This navbar will be rendered on all pages. -->
<nav>
  <ul>
    <!-- The class:active syntax here applies the "active" CSS class if the given condition is true. -->
    <li><a href="/" class:active={path === "/"}>Home</a></li>

    <li><a href="/fetch-stores" class:active={path === "/fetch-stores"}>Fetch stores</a></li>

    <li><a href="/todos" class:active={path === "/todos"}>Todo List</a></li>
  </ul>

  <span />

  <PokemonIcon />
</nav>

<div class="container">
  <!-- The contents of whichever page we're rendering will be placed here.
		If that page has its own +layout.svelte defined, that page's layout will be rendered too. -->
  <slot />
</div>

<!-- BONUS: The styles below show off Nested CSS - a relatively new and cool feature (to vanilla CSS, not
	just Svelte). Feel free to use it yourselves, or not - up to you! -->
<style>
  nav {
    background-color: rgb(42, 139, 70);
    padding-left: 20px;
    box-shadow: 0 5px 3px lightgray;
    display: flex;

    & > ul {
      list-style: none;
      margin: 0;
      display: flex;
      gap: 10px;
    }

    & li {
      padding: 10px;
      display: flex;
      align-items: center;

      &:hover {
        background-color: rgba(255, 255, 255, 0.2);
      }
    }

    & a {
      color: white;
      font-size: 1.2rem;
      font-weight: bold;
      text-decoration: none;

      &.active {
        text-decoration: underline;
      }
    }

    & > span {
      flex-grow: 1;
    }

    & > img {
      width: 64px;
      align-self: center;
    }
  }

  .container {
    width: 1200px;
    margin: 0 auto;

    @media (max-width: 1200px) {
      width: 100%;
    }
  }
</style>
