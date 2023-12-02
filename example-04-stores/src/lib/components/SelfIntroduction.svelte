<script>
	import { personStore } from "$lib/js/basic-stores.js";
</script>

<p>
	Hello! My name is {$personStore.firstName}
	{$personStore.lastName}, and I'm {$personStore.age} years old!
</p>
