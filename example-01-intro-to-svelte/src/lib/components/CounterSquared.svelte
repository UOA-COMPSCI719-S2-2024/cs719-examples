<script>
	let count = 0;

	/**
	 * This is a reactive statement. It will run after all the other code in the <script>
	 * block, then again when any of the values it "depends" on change. A reactive statement
	 * "depends on" another value if and only if that value appears somewhere to the right
	 * of the equals sign. In this case, "squared" depends on "count", so the value of "squared"
	 * will be automatically updated whenever the value of "count" changes.
	 */
	$: squared = count * count;
</script>

<!-- The button displays the "squared" value above, and increments "count" when clicked. -->
<button on:click={() => count++}>The count SQUARED!!! is: {squared}</button>
