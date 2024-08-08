# CS719 - Intro to Svelte - Examples

This project contains several examples from the "Intro to Svelte" lecture, along with helpful comments.

In this project, you can see the following:

- **Basic Svelte components**: This project contains several simple Sevelte components. An example is [`AboutMe`](./src/lib/components/AboutMe.svelte). You can see how the component is imported and used within [`+page.svelte`](./src/routes/+page.svelte).

- **Exports & props**: Several components, including `AboutMe` (see above) can be configured with information supplied by parent components - similarly to how you can configure various HTML elements using attributes.

- **Event handling**: There are several buttons in the app which do things when clicked. Look at these to see the syntax for event handling in Svelte, using the `on:` directive. Basic examples can be seen in `+page.svelte`, lines 36 and 40.

- **Reactivity**: The [`Counter`](./src/lib/components/Counter.svelte) component contains a button which, when clicked, will increment a value. As you can see, we don't need to write any special code in this case, to get the UI to update itself properly when the value changes. This is known as _reactivity_.

  The [`CounterSquared`](./src/lib/components/CounterSquared.svelte) component shows how we can use _reactive statements_ - code which can automatically be re-run when certain values change.

- **Styling**: We can see examples of both global and local styling in this app.

  Global styles are achieved by importing CSS files. In this app, we are importing [`app.css`](./src/lib/css/app.css) from within [`+layout.svelte`](./src/routes/+layout.svelte). CSS imported in this way is applied to everything on your page - just as you're used to.

  Local styles are achieved by adding `<style>` blocks to individual Svelte components. You can see examples of this in many of the components in this app. Local CSS styles are _only_ applied to the components where they are written.

- **Logic blocks**: Using Svelte, we can easily render elements & components _conditionally_ using the `{#if}` block. We can also render elements & components multiple times (i.e. looping), using the `{#each}` block. Examples of both of these can be seen in the [`ShoppingList`](./src/lib/components/ShoppingList.svelte) component.

  Additionally, we can see a _keyed_ `{#each}` block in the [`StaffList`](./src/lib/components/StaffList.svelte) component. There, on line 14, we are saying that each staff member can be uniquely identified by its `id`. Doing this helps Svelte identify which HTML corresponds to which item in our array, which increases efficiency of its algorithms, especially when adding, removing, or changing items in the array. Usually, you should _always_ use a keyed #each if your data contains a unique value you can use (like our staff members' `id` in the example).
