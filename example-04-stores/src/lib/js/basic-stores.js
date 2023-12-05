// Import the store creation functions from svelte/store to be able to create stores.
import { derived, writable } from "svelte/store";

/**
 * Create a store called "counterStore" with the initial value of 0.
 *
 * Export it so we can import it into other places in our code.
 */
export const counterStore = writable(0);

/**
 * Create a derived store called "squaredStore" which will automatically calculate
 * the square of the above store.
 *
 * The first argument to this function is either a single store or an array of stores from which
 * to derive the final value. The second argument is a function which returns the derived value
 * from the input stores.
 */
export const squareStore = derived(counterStore, ($counterStore) => Math.pow($counterStore, 2));

/**
 * Here's another couple of stores which store string data this time
 */
export const firstNameStore = writable("");
export const lastNameStore = writable("");

/**
 * And here's one more derived store, which creates a JS object from the values in all of the above stores.
 * Note that the first argument is an array of all the input stores we need, and the arrow function defined
 * in the second argument takes that same array.
 *
 * The derived result will be a JS object with a firstName, lastName, and age property.
 */
export const personStore = derived(
  [squareStore, firstNameStore, lastNameStore],
  ([$squareStore, $firstNameStore, $lastNameStore]) => ({
    firstName: $firstNameStore,
    lastName: $lastNameStore,
    age: $squareStore
  })
);
