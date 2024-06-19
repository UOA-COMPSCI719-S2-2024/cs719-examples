const changeColorsButton = document.querySelector("#changeColors");
const numberList = document.querySelector("#numberList");

// Uses a for-loop to add 100 list items to the page.
for (let i = 0; i < 100; i++) {
  const listItem = document.createElement("li");
  listItem.innerHTML = `Number: ${i}`;

  /**
   * Add a click handler to the list item so that when it is clicked, the
   * changeListItemColor() function below will be called, with this list item
   * as the argument. So, when the user clicks a list item, its color will be
   * randomized.
   *
   * The click event handler function takes one argument which we haven't used until now. This argument
   * contains info about the click event which occurred. Its "target" property will be the element which
   * was clicked.
   */
  listItem.addEventListener("click", (e) => changeListItemColor(e.target));

  numberList.appendChild(listItem);
}

/**
 * When the changeColorsButton is clicked, use querySelectorAll to get an array of ALL
 * <li>s on the page. Then, use the array's forEach function to call the changeListItemColor()
 * function below, once for each item.
 *
 * Each time the function is called, the corresponding array element will be passed into the function
 * as its first argument.
 */
changeColorsButton.addEventListener("click", () => {
  const listItems = document.querySelectorAll("li");
  listItems.forEach(changeListItemColor);
});

/**
 * Sets the "backgroundColor" style property for the given li to a random color.
 *
 * @param {HTMLElement} li the list item to style
 */
function changeListItemColor(li) {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  li.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}
