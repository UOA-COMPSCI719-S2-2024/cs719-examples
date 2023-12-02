<script>
	import "$lib/css/app.css";

	// This is a special Svelte store which provides info about the current page.
	import { page } from "$app/stores";
	$: path = $page.url.pathname;

	/**
	 * Whenever the page store changes, we will log the pathname to the console. The $page syntax is how
	 * we access store values. See the "Stores" examples for more on this.
	 *
	 * We're also using this value down below for a more useful purpose - to set which link is "active".
	 */
	$: console.log($page.url.pathname);
</script>

<!-- This navbar will be rendered on all pages. -->
<nav>
	<ul>
		<!-- Hyperlinks work just the same as normal - except that when browsing to other pages in your own app,
			the pages will be rendered on the client. No roundtrip to the server or page refresh required! -->

		<!-- The class:active syntax here applies the "active" CSS class if the given condition is true. -->
		<li><a href="/" class:active={path === "/"}>Home</a></li>
		<li><a href="/about" class:active={path === "/about"}>About</a></li>
		<li>
			<!-- This one is a tiny bit more complex because we still want the "articles" menu item to be highlighted
				even if one of the individual article pages, such as /articles/4, is displayed. -->
			<a href="/articles" class:active={path === "/articles" || path.startsWith("/articles/")}>
				Articles
			</a>
		</li>

		<!-- Try browsing here to see the default Svelte 404 page. -->
		<li><a href="/notfound">Not Found</a></li>
	</ul>
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
