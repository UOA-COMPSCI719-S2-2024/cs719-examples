# CS719 - The Full Stack

This example continues on from the "Svelte Express Comprehensive" example, and replaces the array in the backend with an actual SQLite 3 database, to which we can connect from our node.js code using the [`sqlite`](https://www.npmjs.com/package/sqlite) and [`sqlite3`](https://www.npmjs.com/package/sqlite3) packages. With this, we have a true full-stack applicaiton:

- SQLite database
- Node.js / Express backend
- SvelteKit frontend

The frontend project in this example is identical to the frontend project in the previous example - we don't need to change anything on our frontend to add the database, as this implementation detail is hidden behind our REST API.

Within the backend project, the vast majority of the changes are in the [`src/data`](./backend/src/data/) folder, in the newly added `database.js` file, and the `customers-dao.js` file. We also needed to slightly modify the `routes/api/api-customers.js` file - but only to change our route handlers into `async` functions (since the database operations are all async too, and we want to use `async` / `await`).

Within this project, the following concepts can be seen:

## Opening a database

In `database.js`, line 28, we are using `sqlite`'s `open()` function to open the database. Here, we supply the filename of the `*.db` file. It will be created if it does not already exist. We also need to specify that this is an `sqlite3` database - that's the configuration option on line 30.

We can see that we're storing the database file name as an environment variable, `DB_FILENAME`, specified in our `.env` file and accessed using `process.env.DB_FILENAME`. It is good practice to put any database connection values as environment variables rather than hardcoding them.

In the same function (`openDatabase()`), on line 34, we are also immediately enabling foreign key support, as this is disabled by default for SQLite databases, but we definitely want to enable this functionality all the time.

Another function in the same file - `getDatabase()` (line 13) - is how we access the database from outside of this file. This function will call `openDatabase()` the first time we try to access the database from our application, and will return the cached instance (the `db` variable) after that. Speaking of which, the `db` variable on line 6 has been commented with a `@type` comment, which will help enable proper Intellisense in VS Code when accessing the database outside of this file.

## Initializing a database

In the `openDatabase()` function, before we open the database, we check if the DB file already exists. If it doesn't, then it means this is the first time we've ever opened the database on this computer. In that case, once we open the database, we call the `initDatabase()` function to initialize the database.

This function (on line 49) will read in the `*.sql` file containing SQL code to create the database. In our case, that's [`src/sql/init-db.sql`](./backend/src/sql/init-db.sql) - but again, we have specified this as an environment variable, `DB_INIT_SCRIPT`.

Once the file is read in, the SQL will be executed using the database's `exec()` function (line 53).

## Retrieving data from the database (executing SQL SELECT statements)

If we want to retrieve data from our database, we need to run a `SELECT` statement. There are two functions we can use to do this:

- The `all()` function will run the `SELECT` statement and will return the entire result of the query, or an empty array if there are no results. This is useful when we don't know how many results there will be. We can see examples in `customers-dao.js` lines 63 and 84, where we are retrieving customer data.

- The `get()` function will run the `SELECT` statement and will return only the first result of the query, or `undefined` if there are no results. this is useful when we know there will be either 0 or 1 result row. We can see an example in `customers-dao.js` line 101, where we are retrieving a customer with a particular `id`.

## Updating the database (executing SQL INSERT, UPDATE, and DELETE statements)

If we want to update our database, we need to run `INSERT`, `UPDATE`, or `DELETE` statements. To do this, we use the `run()` function. We can see examples of this in our `createCustomer()`, `updateCustomer()`, and `deleteCustomer()` functions.

The `run()` function will execute the given statement, and return a result object with two useful properties:

- The `changed` property will equal the number of rows affected by the query (for example, the number of rows which were added, changed, or deleted from the database). See line 166 for a usage example.

- The `lastID` property will return the auto-generated primary key value for an `UPDATE` statement, so we can access it without having to do another database query. See line 52 for a usage example.

## Parameters

The query we want to run might depend on runtime data. For example, when retrieving a customer by `id`, we don't know the `id` to search for until the program is already running, and we get a request to our API. The `id` to search for will be given as a path param.

Whenever we have queries which depend on "outside" data like this, we can use _parameters_. When we write the query, we can put question marks (`?`) wherever we want to supply a parameter, then we can supply all the parameters as extra arguments to the function.

Examples of this can be seen in many places in `customers-dao.js`:

- On line 44, we are supplying the `firstName`, `lastName`, and `email` as parameters to this `INSERT` statement.

- On line 84, we are supplying the search string as a parameter to this `SELECT` statement, three times. We are surrounding it with `%`, which is the wildcard we use with the SQL `LIKE` keyword.

- On line 101, we are supplying the customer id as a parameter to this `SELECT` statement.

- On lines 139 - 158, we are building a more complicated `UPDATE` statement using parameters, because the user doesn't have to supply the `firstName`, `lastName`, or `email` - they are all optional, so we have to check which ones the user supplied, and then only add those parameters.

- On line 177, we are supplying the customer id as a parameter to this `DELETE` statement.
