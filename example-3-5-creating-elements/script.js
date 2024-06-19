const addButton = document.querySelector("#addButton");
const numberList = document.querySelector("#numberList");

/**
 * This is using the arrow function syntax to define an anonymous function which will be called
 * when the button is clicked. See:
 *
 * <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions>
 */
addButton.addEventListener("click", () => {
  // Generate a random number between 0 and 99
  const randomNumber = Math.floor(Math.random() * 100);

  // Create a new <li> and set its innerHTML
  const listItem = document.createElement("li");
  listItem.innerHTML = `Random Number: ${randomNumber}`;

  // Add the new <li> to the #numberList
  numberList.appendChild(listItem);
});
