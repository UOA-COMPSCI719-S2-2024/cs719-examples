<script>
	/**
	 * Accept the todo list as a prop called "todos".
	 *
	 * Alternatively, we could have had this component access the store directly. There isn't really one correct answer
	 * about which to choose.
	 */
	export let todos = [];

	/**
	 * When a todo's "delete" button is clicked, remove it from the list.
	 * We can do this by filtering out the todo which we want to remove.
	 */
	function handleDelete(todo) {
		todos = todos.filter((t) => t !== todo);
	}
</script>

<div class="container">
	<!-- Create the HTML elements for each todo item. We could probably extract the HTML for each
            item into its own component, and use bind: to bind the whole todo item. -->
	{#each todos as todo}
		<span>Task:</span>
        <!-- Data binding to individual properties of the todo item, just works :) -->
		<input type="text" bind:value={todo.task} />
		<span>Due:</span>
		<input type="date" bind:value={todo.dueDate} />
		<label><input type="checkbox" bind:checked={todo.isComplete} /> Is complete?</label>
		<button on:click={() => handleDelete(todo)}>❌</button>

		<hr />
	{/each}
</div>

<style>
	.container {
		display: grid;
		row-gap: 20px;
		column-gap: 10px;
		grid-template-columns: auto auto auto auto 1fr auto;
		align-items: center;
	}

	span {
		text-align: right;
	}

	hr {
		grid-column: 1 / 7;
		width: 90%;
		border: 0;
		border-top: 1px dashed lightgray;

		&:last-child {
			display: none;
		}
	}
</style>
