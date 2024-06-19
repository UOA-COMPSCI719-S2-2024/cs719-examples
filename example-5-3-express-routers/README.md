# CS719 - Express Routers

This example shows how we can use Express Routers to break our Express server up into multiple code files. We show one possible way of organizing your routes, based on the URL paths.

- **Express routers**: Routers, several of which are defined in this app, can contain route handlers and middleware, just as the `express()` server itself can. Then, we can add those routers to our express server - or to other routers - to add all of that router's defined handlers to our app. When we add a router, we can (and usually should) also define a path under which that router's handlers should be "contained". In this way, we can nest routers by URL path quite easily.

  We add a router to the express app, or to another router, by using the following syntax:

  ```js
  app.use("/path/goes/here", myRouter);
  ```

- **Nesting routers**: In this app, we have some layers of nesting in our routers, as follows:

  - [`app.js`](./src/app.js) uses [`routes/routes.js`](./src/routes/routes.js), at path **/** (see `app.js` line 26).

    - `routes/routes.js` uses [`routes/api/api.js`](./src/routes/api/api.js), at path **/api** (see `routes.js` line 24).

      - `routes/api/api.js` uses [`routes/api/api-people.js`](./src/routes/api/api-people.js), at path **/people** (see `api.js` line 7).

      - `routes/api/api.js` uses [`routes/api/api-products.js`](./src/routes/api/api-products.js), at path **/products** (see `api.js` line 10).

  To figure out what URL path corresponds to a particular route handler in this router hierarchy, we combine the paths together. For exmaple:

  - The single route handler in `routes.js` (line 12) will be available at path **/**.

  - The single route handler in `api-products.js` (line 7) will be available at path **/api/products**.

  - The two route handlers in `api-people.js` (lines 15 and 34) will be available at paths **/api/people** and **/api/people/:id** (where `:id` is a path param).

- **Route organization**: In this application, we have organized our routes as follows:

  - We have an `api` folder to contain our REST API routes (more on REST APIs in the future!).

  - We have broken our API routes into separate files based on the kind of _resource_ (or data) they are dealing with (products and people, respectively).

  - We have used file and folder names appropriately to try and make it clear whic URL paths are associated with the routes in which files (files are named according to URL paths, with each "/" in the path corresponding to either a new folder, or a "-" in the filename).

  You don't _have_ to organize your application's routes in this way - but you should _always_ have some manner of organization which is easy for your team - and markers - to understand.

  If you find yourself with:

  - Many route handlers in a single file (_especially_ if they are unrelated to each other), OR

  - Confusion about which URL paths correspond to which routes

  Then you should consider _refactoring_ your routes into a better organizational structure.

  **PS:** We _never_ want to see a route handler defined in `app.js` itself! Please actually use express routers properly in your codebases!

