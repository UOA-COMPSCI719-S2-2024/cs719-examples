const changeColorsButton = document.querySelector("#changeColors");
const numberList = document.querySelector("#numberList");

// Uses a for-loop to add 100 list items to the page.
for (let i = 0; i < 100; i++) {
  const listItem = document.createElement("li");
  listItem.innerHTML = `Number: ${i}`;
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
 * Sets the "color" style property for the given li to a random color.
 *
 * @param {HTMLElement} li the list item to style
 */
function changeListItemColor(li) {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  li.style.color = `rgb(${r}, ${g}, ${b})`;
}
