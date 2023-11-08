<script>
	export let list = [];
</script>

<h2>My shopping list</h2>

<!-- The #if block works like an if-statement in JavaScript. It takes any JavaScript expression, and will only
    render its content if that expression is true (or truthy). -->
{#if list && list.length > 0}
    <ul>
        <!-- The #each block will loop through an array, allowing us to render the same content
        for each element in that array. The first variable is the array we're looping through,
        the second variable (after the "as") is the variable name we should use within the #each
        block, to refer to the current array element. -->
        {#each list as listItem}
            <li>{listItem}</li>

        <!-- We close out of the #each block with /each. -->
        {/each}
    </ul>
<!-- The :else block will only render if the #if block above does not render. -->
{:else}
    <p>Nothing in the list!</p>

<!-- We close out of the #if block with /if. -->
{/if}