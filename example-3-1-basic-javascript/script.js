// When the script first runs, display this alert box to the user.
alert("Welcome to this webpage!");

/**
 * Get a reference to the button on the page from within our JS code.
 *
 * Essentially, the document.querySelector() function will look for the given CSS selector (in this case
 * an element selector - "button") and will return the first HTML element on the page which matches that
 * CSS selector.
 */
const button = document.querySelector("button");

// This is a function that we can call later on to run the code inside.
function handleButtonClick() {
  alert("You clicked me!");
}

/**
 * Hook up the button so that when it is clicked, the handleButtonClick() function above will be run.
 *
 * Notice that we do NOT have () - we just wrote handleButtonClick, NOT handleButtonClick(). This is
 * because here, we are only NAMING the function to call later, we are NOT calling it immediately.
 *
 * Experiment by adding () to the end of handleButtonClick below and see what happens.
 */
button.addEventListener("click", handleButtonClick);

/**
 * This is another way of writing the above. Rather than defining a function and naming it to be called later,
 * we can write an anonymous function directly in the addEventListener call here. This can be useful if, for example,
 * we never need to use this function anywhere else.
 */
// button.addEventListener("click", function () {
//   alert("You clicked me!");
// });

/**
 * Here's another way of defining an anonymous function - this time, using arrow function syntax. This is a shorthand for the
 * above on lines 33 - 35. This is probably the most common of the three variations shown in this example, as they are
 * the quickest to write once you get used to them.
 *
 * See: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions>
 */
// button.addEventListener("click", () => alert("You clicked me!"));
