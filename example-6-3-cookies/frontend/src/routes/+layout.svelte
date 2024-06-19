<script>
  import "$lib/css/app.css";

  import { page } from "$app/stores";
  $: path = $page.url.pathname;
</script>

<nav>
  <ul>
    <li><a href="/" class:active={path === "/"}>Home</a></li>
  </ul>
</nav>

<div class="container">
  <slot />
</div>

<style>
  nav {
    background-color: rgb(42, 139, 70);
    padding-left: 20px;
    box-shadow: 0 5px 3px lightgray;

    & > ul {
      list-style: none;
      margin: 0;
      display: flex;
      gap: 10px;
    }

    & li {
      padding: 10px;

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
  }

  .container {
    width: 1200px;
    margin: 0 auto;

    @media (max-width: 1200px) {
      width: 100%;
    }
  }
</style>
