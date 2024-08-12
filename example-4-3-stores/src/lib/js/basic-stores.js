// Import the store creation functions from svelte/store to be able to create stores.
import { derived, writable } from "svelte/store";

/**
 * Create a store called "counterStore" with the initial value of 0.
 *
 * Export it so we can import it into other places in our code.
 */
export const counterStore = writable(0);

/**
 * Create a store called "powerStore" with the initial value of 2.
 *
 * Export it so we can import it into other places in our code.
 */
export const powerStore = writable(2);

/**
 * Create a derived store called "squareStore" which will automatically calculate
 * the square of the above store.
 *
 * The first argument to this function is either a single store or an array of stores from which
 * to derive the final value. The second argument is a function which returns the derived value
 * from the input stores.
 */
export const squareStore = derived(counterStore, ($counterStore) => Math.pow($counterStore, 2));
squareStore.subscribe((value) => console.log(value));

/**
 * And here's one more derived store, this one depends on two source stores, both counterStore and powerStore.
 * Its derived value will be the value of counterStore, raised to the power of the value of powerStore.
 */
export const mathyStore = derived([counterStore, powerStore], ([$counterStore, $powerStore]) =>
  Math.pow($counterStore, $powerStore)
);
