import { v4 as uuid } from "uuid";
import { writable } from "svelte/store";

const INITIAL_THINGS = [
  { id: uuid(), description: "Finding matching socks on the first try" },
  { id: uuid(), description: "Accidentally adulting successfully" },
  { id: uuid(), description: "When the Wi-Fi connects instantly" },
  { id: uuid(), description: "Eating pizza without dropping any toppings" },
  { id: uuid(), description: "Remembering why you walked into a room" },
  { id: uuid(), description: "Winning an argument with yourself in the shower" }
];

export const favouriteThingsStore = writable(INITIAL_THINGS);

/**
 * Adds a new favourite thing.
 *
 * This (and all other functions in this file) use the Svelte store's update() function. This takes a callback
 * which has one argument, which will be the current value of the store. In this case, that will be the current
 * array of all favourite things.
 *
 * The callback function should return the new value of the store - which in this case, should be a new array
 * with one extra thing (newThing). As you can see below, we use JavaScript's spread operator to easily
 * accomplish this.
 *
 * @param {string} description the description of the new favourite thing to add.
 */
export function addThing(description) {
  const newThing = { id: uuid(), description };
  favouriteThingsStore.update((things) => [...things, newThing]);
}

/**
 * This time we are using update() in combination with JavaScript array's filter() function to filter
 * out the thing with the matching id. This will result in the creation of a new array containing everything
 * except the thing with the given id.
 *
 * @param {string} id the id of the thing to remove
 */
export function removeThing(id) {
  favouriteThingsStore.update((things) => things.filter((t) => t.id !== id));
}

/**
 * This time we are using update() in combination with JavaScript array's map() function to return a new array
 * where every item is the same, except the thing we want to modify. For that one thing, we create and return a
 * new object with the same id and modified description.
 *
 * This code can be tricky to understand, but this is a common pattern. Refer back to this example often when
 * required.
 *
 * @param {string} id the id of the thing to modify
 * @param {string} newDescription the new description
 */
export function editThing(id, newDescription) {
  // Update the favourite things store. Given the current array of things...
  favouriteThingsStore.update((things) =>
    // Using map() return a new array...
    things.map((t) => {
      // Where, if the id of the thing at that index matches the supplied id, create a new object...
      if (t.id === id) return { id, description: newDescription };

      // Otherwise just use the existing thing.
      return t;
    })
  );
}
