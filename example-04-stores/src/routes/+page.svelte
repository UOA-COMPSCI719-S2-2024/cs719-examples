<script>
	import Counter from "$lib/components/Counter.svelte";
	import CounterDisplay from "$lib/components/CounterDisplay.svelte";
	import SquareDisplay from "$lib/components/SquareDisplay.svelte";
	import NameForm from "$lib/components/NameForm.svelte";
	import SelfIntroduction from "$lib/components/SelfIntroduction.svelte";
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<h1>Basic stores</h1>

<h2>Counter store</h2>
<p>
	The two components below each get their data from the same store, located in
	<code>lib/js/basic-stores.js</code>. Whenever we change the counter value, the counter display
	also changes.
</p>

<h3>Counter</h3>
<Counter />

<h3>Counter display</h3>
<CounterDisplay />

<h2>Derived store</h2>
<p>
	The component below gets its data from a <em>derived</em> store, which will automatically
	calculate the square of the counter store whenever the counter store is updated. The code for this
	store is also located in <code>lib/js/basic-stores.js</code>.
</p>

<SquareDisplay />

<h2>More stores!</h2>
<p>
	See if you can examine the source code and trace how the two components get and share their data.
</p>

<NameForm />
<SelfIntroduction />