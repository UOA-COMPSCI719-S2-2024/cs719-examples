# CS719 Example Code

This repository contains example code which you can run and play around with.

## Index

0. [**svelte-motivation**](./example-00-svelte-motivation/): Shows a non-trivial customer data summary viewer, written using vanilla HTML / CSS / JavaScript. This is included to help explain the motivation / need for modern UI frameworks, such as Svelte, which we learn in this course.

1. [**intro-to-svelte**](./example-01-intro-to-svelte/): Contains basic Svelte examples, including components, props & exports, event handling, reactivity, styling, and logic blocks.

2. [**binding-and-fetching**](./example-02-binding-and-fetching/): Contains more advanced Svelte exmaples, including custom events, data binding, and use of `fetch()` with the `{#await}` block.

3. [**multi-page-apps**](./example-03-multi-page-apps/): Contains examples showing how the SvelteKit filesystem-based router can be used to provide multi-page apps. Includes information on routes, file & directory structure, layouts and `<slot>`s, hyperlinks, route parameters, and more.

4. [**stores**](./example-04-stores/): Contains examples showing how Svelte stores can be created and used. Stores are a great way to take certain application state "out of" the component hierarchy and share it amongst many different components, while maintaining reactivity. This example shows off both writable & derived stores, and the use of the `$` syntax to access and modify stores almost as if they were plain variables. The example also shows how `fetch()` can be combined with stores.

5. [**the-simplest-server**](./example-05-the-simplest-server/): Contains a project showing now [Node.js](https://nodejs.org/en) can be used to create a simple HTTP server, with no additional dependencies. In practice, using Node by itself for this purpose is very uncommon; we usually use an additional framework such as Express (see below) on top of this.

6. [**intro-to-express**](./example-06-intro-to-express/): Contains a basic Node.js / [Express](https://expressjs.com/) server with a couple of _routes_ (around getting people info from a "database") and _middleware_ configurations. Contains many comments explaining what each piece does.

7. [**express-routers**](./example-07-express-routers/): Contains an Express server building on example 6 by organizing route handler code using Express routers. All Express servers provided (and made by you) throughout the course will follow this general layout.
