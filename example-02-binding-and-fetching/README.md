# CS719 - Binding, custom events, fetching data
This project contains several examples from the "Svelte II" lecture, along with helpful comments.

In this project, you can see the following:

- **Custom events**: Previously, we saw how we could handle events like button clicks using the `on:` directive. In this project, we see how we can define, dispatch, and handle our own custom events.

    In the [`NumberPad`](./src/lib/components/NumberPad.svelte) component, we use Svelte's `createEventDispatcher()` function to create an event dispatcher (line 15). We can use this to dispatch our own custom events.

    In `NumberPad`, line 25, we define a function which will dispatch our own custom event, called `numberClicked`, supplying a number which was clicked. We're calling this function - and thus dispatching our custom event when the `<button>` on line 35 is clicked.

    Finally, in [`+page.svelte`](./src/routes/+page.svelte), line 22, we're handling our custom event using `on:numberClicked`. The custom event data we supplied (in this case, the number which was clicked) is available in the event object's `detail` (i.e. `e.detail`). To see more of what this event object contains, try logging it to the browser console.

- **Binding**: Previously, we have seen how parent components can supply data to child components, as properties, or *props* (which look and work very similarly to HTML attributes). In this project, we see how *children* can supply data back to *parents* - or even how to enable two-way data transfer - using the `bind:` directive.

    In [`SimpleCalculator`](./src/lib/components/SimpleCalculator.svelte), line 14, we can see how we have *bound* the values of our `a` and `b` variables to the `value` prop of two separate `<input>`s. In doing so, we have said that whenever the value of one of those `<input>`s changes, the associated variable (`a` or `b`) should also change, and vice versa.

    We can see the results by typing in the inputs - this will automatically update the values of our variables, which will in turn calculate the `sum` (a reactive value calculated on line 4 and displayed on line 14).

    In [`SignupForm`](./src/lib/components/SignupForm.svelte), we can see further examples of binding to multiple kinds of inputs and other form elements.

- **Custom binding**: We can bind to our own variables too! In [`BindableNumberPad`](./src/lib/components/BindableNumberPad.svelte) line 5, we have `export`ed a value - just like we would do if we wanted it supplied as a prop. We are modifying that value on line 9.

    Then, in `+page.svelte`, line 33, we can see that we have *bound* our `BindableNumberPad`'s `value` to our `enteredNumber` variable. This means that whenever we click any of the buttons to change the number pad's `value`, `enteredNumber` will also change to match, and vice versa.

    We can also see on line 34 that we've bound the same `enteredNumber` to an `<input>`. The result is that we can edit `enteredNumber` by either clicking the numpad buttons or typing in the input box.

- **Fetching data using `fetch()` and `{#await}`**: In [`PokemonInfo.svelte`](./src/lib/components/PokemonInfo.svelte), we've defined an `async` function on line 10, to fetch some info about random Pokemon from an API hosted on `trex-sandwich.com`. In that function, there are options to test various delays and errors.

    We can't use `await` within the root of the `<script>` block. Therefore, on line 30, we're calling our `getRandomPokemon()` function to get the *promise*, rather than the actual returned data itself.

    Then, on line 33, we're using Svelte's `{#await}` block to await that promise. This block has three sections defined:

    - The elements in the main `{#await}` block will be rendered as long as the promise is not yet resolved or rejected (i.e. the data is still being loaded from the API). We can use this section to display some kind of "loading" indicator to the user.

    - The elements in the `{:then}` block will be rendered if the promise successfully resolves (i.e. the data is returned from the API successfully). The value on line 36 which we've named `pokemon` will be set from the `data` returned by our `getRandomPokemon()` async function. We can use this section to display the data returned from the API.

    - The elements in the `{:catch}` block will be rendered if the promise rejects (i.e. if there's some kind of error). The value we've named `err` will be set from the error which is `throw`n by our function. The `fetch()` call itself will probably not throw an error unless the internet is down, so instead, we can test by setting `alwaysThrowError` to `true`. This section can be used to display an error message to the user.

