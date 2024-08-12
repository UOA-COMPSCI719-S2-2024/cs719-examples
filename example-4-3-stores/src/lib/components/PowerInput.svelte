<script>
  import { powerStore } from "$lib/js/basic-stores.js";
</script>

<!-- This shows that we can bind to the value of a store too, to get / set that store value. -->
<label>Enter the power: <input type="number" bind:value={$powerStore} /></label>
