<script>
	import NumberPad from "./NumberPad.svelte";

	// We can bind to values which we export.
	export let value = 0;

	// Updates the value by multiplying it by 10 then adding the clicked number.
	function handleNumberClicked(e) {
		value = 10 * value + e.detail;
	}
</script>

<NumberPad on:numberClicked={handleNumberClicked} />
