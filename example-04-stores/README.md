# CS719 - Svelte Stores

This project contains several examples from the "Svelte II" lecture, along with helpful comments.

In this project, you can see the following:

- **Svelte Stores**: Stores provide a method for sharing data between Svelte components - and even being able to access the data _outside_ of Svelte components. They are very useful when we have data which needs to be accessed / modified from many different components. If we didn't have stores, we would have to put all our data at the root of our app, pass it to children as props (sometimes through many layers of children), and then pass up any changes as bindable values or events. This can get tedious and error prone if we have a complex hierarchy of components - even moreso when we start dealing with multiple pages!

  Svelte stores are created using the `writable()`, `readable()`, and `derived()` functions available in the `svelte/store` package. Several examples are given in [`lib/js/basic-stores.js`](./src/lib/js/basic-stores.js).

  Stores have a standard JavaScript syntax we can use to access their values, modify them, and subscribe to them so we can be notified of any changes. This syntax involves calling their `set()`, `update()`, and `subscribe()` functions. You can see examples of this in the [Svelte docs](https://svelte.dev/docs/svelte-store). However, Svelte provides us a really nice "syntactic sugar" we can use (**Note:** This syntax is _only_ for Svelte apps - **not** vanilla JS).

  By prepending a store with `$` (e.g. writing `$counterStore` if our store is called `counterStore`), we can access them almost identically to standard reactive values in Svelte. You can see examples of this in many of the components in this app - for example, [Counter.svelte](./src/lib/components/Counter.svelte) lines 10 (modifying a value) and 12 (reading a value).

  In this app, there are also many examples of sharing data using stores. For example, `Counter` and [`CounterDisplay`](./src/lib/components/CounterDisplay.svelte) both get their data from the `counterStore` store defined in `basic-stores.js`. Therefore, when the user changes the counter value, the displayed sentence will also change.

- **Derived stores**: We can create stores whose values are determined by the values of other stores. Then, when one store changes, the derived store's value will be automatically updated. A couple of examples of this are provide in `basic-stores.js` (`squareStore` on line 19, and `personStore` on line 34). We can access the values of derived stores in the same way as "normal" stores (i.e. by prepending with `$`).

- **`fetch()` and stores**: Using stores and `fetch()`, we can create a combination of stores which represents the act of fetching data from an API, including:

  - The API URL;
  - Whether or not the data is still loading;
  - Whether or not there is an error;
  - The returned data itself;
  - The ability to re-fetch the data if required

  Have a look at [`lib/js/fetch-store.js`](./src/lib/js/fetch-store.js) and read the comments there to see how it works. Then, look at [`lib/js/pokemon-store.js`](./src/lib/js/pokemon-store.js) and the [`PokemonDetail`](./src/lib/components/PokemonDetail.svelte) component to see it in action, loading information about various Pokemon (it's also used somehwere else in the app - see if you can find it!). **Note:** Unfortunately, this won't work with the `{#await}` block, but we can easily use `{#if}` to check the loading / error status, for example.

  You are welcome to use and modify this function in your own code. Be sure to credit the source!
