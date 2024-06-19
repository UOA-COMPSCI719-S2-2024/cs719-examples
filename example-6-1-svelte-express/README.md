# CS719 - SvelteKit frontend + Express backend

This example shows a simple REST backend powered by node.js / Express, along with a Svelte / SvelteKit frontend which gets customer data from that REST backend.

The following important concepts can be seen here:

- **File / folder organization**: Inside this folder, we have _two_ child folders - `frontend` and `backend`. These contain our Svelte frontend and our node.js / Express backend, respectively.

  Each of these folders will have their own `package.json`, specific to the frontend and backend, rather than combining all dependencies into one `package.json` (which would not be good practice - since the frontend doesn't directly need to know about node.js, and the backend doesn't directly need to know about Svelte).

  To run the app, first install dependencides in both folders. Then, `npm run dev` in both folders (probably run the backend first, since the frontend assumes the backend will be running already). Then, navigating to the "Customers" page in the frontend will show a table of customer data, loaded from the backend.

  I recommend having two separate VS Code windows open - one each for the frontend and backend - though this is not a hard requirement.

- **Client-side environment variables**: Just as we can use environment variables from a `.env` file in our node.js / Express backend (see previous Express examples), we can also do this in our frontend. We can see a `.env` file defined in the `frontend` folder, with a single variable defined - `PUBLIC_API_BASE_URL` - which points to the URL of our backend when it is running. It is good practice to put this info in an environment variable, so that if we ever need to change the location of the backend (for example, if we want to run them on different machines), we will be able to easily do this simply by changing this config value.

  **Note:** The way we access environment variables in SvelteKit is much different than how we did it in our backend. We don't directly use `process.env` at all, nor do we need to configure `dotenv`. Instead, we can simply `import` our environment variables. An example can be seen in `frontend/src/routes/customers/+page.js` line 7.

  Note that if we are importing environment variables into code which will run in the browser (i.e. most of our Svelte code), the environment variable name _must_ be prefixed with `PUBLIC_`. This is a "safety" feature built into SvelteKit to make sure that developers _really_ want to do this - any environment variables accessed from the browser will be visible by anyone who knows their way around the browser dev tools, so care should be taken to avoid putting any sensitive info here which you do not want your users to see.

- **+page.js and load() function**: As mentioned above, we have a file called `+page.js` located in `frontend/src/routes/customers`. This is another specially-named SvelteKit file which pairs up with the `+page.svelte` file located in the same place (i.e. the "customers" page).

  This file contains a single function, named `load()` (this is a special function name and we cannot change it). Whenever the user navigates to the Customers page, this `load()` function will run automatically, and should be used to fetch the data used by the customers page.

  Note that this function will receive several bits of info from SvelteKit, which we can use to help us. In the example, we're only using the `fetch` function provided by SvelteKit, which is almost identical to the built-in browser `fetch` function (can can be used in the same way). For more information on other info provided to this function which we can use in different ways, have a look at the [SvelteKit "load" docs](https://kit.svelte.dev/docs/load).

  The `load()` function should return a single value. In our case, we're returning a JS object with a `customers` prop, whose data has been fetched from our own backend.

  Everything returned by `load()` will be accessible to our page, via the special `data` prop. We can see this defined in `customers/+page.svelte`, line 8. Then, we can see how we access the `customers` data from there, on line 14.
