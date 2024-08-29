# CS719 - Fetching data in Svelte II

This project contains an example showing another way of fetching data in Svelte apps - using SvelteKit's `load()` functions, in `+page.js` and `+layout.js`.

In our root `+layout.js` (`src/routes/+layout.js`), there is an `async` `load()` function which is run whenever the layout first loads - which will be once when the user first navigates to our app, for the root layout. In here, we use the provided `fetch()` function to load our data from trex-sandwich, and return it as part of a JS object.

That JS object is then accessible within our application. If we `export let data` from any of our `+page.svelte` or `+layout.svelte` files, the people data from above will be available as `data.people`.

Then, in our `[id]` path in our applcication, we additionally have a `+page.js`, whose `load()` function will run whenever we navigate to the page of a specific person - e.g. <http://localhost:5173/1> is the URL for the person with `id` = `1`. In this `load()` function, we are using `await parent()` to get the _parent_ data (which is the data that was already loaded in the root `+layout.js` - i.e a list of all people). We're finding the matching person from that list so we can get their name.

In addition, we're fetching that person's friends, and returning the name and friends list. These will be available in the `data` variable declared in `src/routes/[id]/+page.svelte`.
