<script>
	/**
	 * Import some components here. $lib is a special directive that always points to our "lib" folder,
	 * no matter where we are in the folder hierarchy.
	 *
	 * Once imported, we can use our components below, similarly to regular HTML elements.
	 */
	import AboutMe from "$lib/components/AboutMe.svelte";
	import Counter from "$lib/components/Counter.svelte";
	import CounterSquared from "$lib/components/CounterSquared.svelte";
	import ShoppingList from "$lib/components/ShoppingList.svelte";

	/**
	 * This function will be called when the button below is clicked.
	 * @param event contains info about the button click.
	 */
	function onButtonClick(event) {
		alert("Thanks for clicking me!");
	}
</script>

<!-- The "HTML" section of the doc starts here. We can use a mix of
	regular HTML, Svelte components, and {} syntax. -->
<h1>Hello, world!</h1>

<p>This is a new paragraph!</p>

<!-- Shows how we can use the AboutMe component imported above,
	supplying the values of the "name" and "interest" props. -->
<AboutMe name="Andrew" interest="Pokemon" />

<h2>Buttons are cool! Let's click some buttons!</h2>
<div class="buttonPanel">
	<!-- This button has a "click" event handler defined, which will call the "onButtonClick"
	function defined above. -->
	<button on:click={onButtonClick}>Click me!</button>

	<!-- This button also has a "click" handler. We can use arrow functions if we like, rather than
	calling functions written above. This will log some info to the browser console. -->
	<button on:click={(e) => console.log(e)}>Click me too!</button>

	<!-- Here's another button - this time, as a Svelte component with some extra logic defined :) -->
	<Counter />

	<CounterSquared />
</div>

<ShoppingList list={[]} />

<!-- An "internal" style. CSS defined here will only apply to this component. -->
<style>
	.buttonPanel {
		display: flex;
		flex-direction: column;
		width: 300px;
		margin: 0 auto;
		gap: 10px;
	}
</style>
