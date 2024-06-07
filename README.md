# CS719 Example Code

This repository contains example code which you can run and play around with.

## Index

0. [**svelte-motivation**](./example-00-svelte-motivation/): Shows a non-trivial customer data summary viewer, written using vanilla HTML / CSS / JavaScript. This is included to help explain the motivation / need for modern UI frameworks, such as Svelte, which we learn in this course.

1. [**intro-to-svelte**](./example-01-intro-to-svelte/): Contains basic Svelte examples, including components, props & exports, event handling, reactivity, styling, and logic blocks.

2. [**binding**](./example-02-binding/): Contains more advanced Svelte exmaples, including custom events and data binding.

3. [**stores**](./example-03-stores/): Contains examples showing how Svelte stores can be created and used. Stores are a great way to take certain application state "out of" the component hierarchy and share it amongst many different components, while maintaining reactivity. This example shows off both writable & derived stores, and the use of the `$` syntax to access and modify stores almost as if they were plain variables.

4. [**multi-page-apps**](./example-04-multi-page-apps/): Contains examples showing how the SvelteKit filesystem-based router can be used to provide multi-page apps. Includes information on routes, file & directory structure, layouts and `<slot>`s, hyperlinks, route parameters, and more.

5. [**the-simplest-server**](./example-05-the-simplest-server/): Contains a project showing now [Node.js](https://nodejs.org/en) can be used to create a simple HTTP server, with no additional dependencies. In practice, using Node by itself for this purpose is very uncommon; we usually use an additional framework such as Express (see below) on top of this.

6. [**intro-to-express**](./example-06-intro-to-express/): Contains a basic Node.js / [Express](https://expressjs.com/) server with a couple of _routes_ (around getting people info from a "database") and _middleware_ configurations. Contains many comments explaining what each piece does.

7. [**express-routers**](./example-07-express-routers/): Contains an Express server building on example 6 by organizing route handler code using Express routers. All Express servers provided (and made by you) throughout the course will follow this general layout.

8. [**rest-services**](./example-08-rest-services/): Contains an example RESTful Customer / Order API, written using node.js and Express.

9. [**rest-services-with-middleware**](./example-09-rest-services-with-middleware/): Expands on the previous exmaple by using custom middleware to extract common functionality (searching for a customer with a particular id and returning a 404 Not Found response if the customer doesn't exist) into its own reusable middleware function.

10. [**rest-services-with-validation**](./example-10-rest-services-with-validation/): Expands on the previous exmaple by adding validation of incoming client requests using the [Yup](https://www.npmjs.com/package/yup) package.

11. [**svelte-express**](./example-11-svelte-express/): Shows how we can use a SvelteKit frontend with a node.js / Express backend.

12. [**svelte-express-comprehensive**](./example-12-svelte-express-comprehensive/): A more advanced version of the previous example, this time also showing how we can send non-`GET` requests from the frontend.

13. [**cookies**](./example-13-cookies/): Shows how we can interact with HTTP cookies from both the frontend and backend.

14. [**fullstack**](./example-14-fullstack/): Shows a full-stack application, including an SQLite database, node.js / Express backend, and SvelteKit frontend.

15. [**file-uploads**](./example-15-file-uploads/): A bonus example showing how we can allow users to upload files using the `FormData` object on the frontend, and the `multer` package on the backend. **Hint:** Useful for your final project!!