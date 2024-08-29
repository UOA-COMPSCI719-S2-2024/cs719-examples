# CS719 - Fetching data in Svelte I

This project contains an example showing one way of fetching data in Svelte apps - directly within our Svelte components.

In our `+page.svelte`, we have created an `async` function `fetchPeople()`. This uses `fetch()` to fetch a list of people from [trex-sandwich](https://people-db.trex-sandwich.com/people). `fetch()` is an _asynchronous_ (`async`) function. This means it returns a _promise_, rather than the actual response immediately. If we want the response object itself, we can `await` it, as we are doing here on line 12.

Then, on line 13, we call the `response` object's `json()` function (which is also `async` and so must be `await`ed) to get the people data itself.

On line 19, we are using Svelte's `onMount()` function to reference the `fetchPeople` function we wrote. This code will cause the `fetchPeople` function to be run _once_, when the component first loads.

We are also fetching data inside the `PersonFriends` component. Here, we have defined another `async` function called `fetchFriends()`, which will fetch the friends of a person with the given `id`, also from trex-sandwich.

This time, we are calling this function on line 6, using a Svelte _reactive statement_ (**$:** syntax). This will ensure that our `fetchFriends()` function is called each time the `id` property changes, which will cause the component to display a different person's friends.
