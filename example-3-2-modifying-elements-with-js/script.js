// Select the first paragraph using querySelector
const selectedParagraph = document.querySelector("p");
console.log(selectedParagraph);

// Modify the innerHTML of the first paragraph
selectedParagraph.innerHTML = "First paragraph: Updated paragraph content";

/**
 * Modify the style of the second paragraph (change color and font weight).
 * We can change any CSS style using the JavaScript "style" property.
 *
 * The names of the individual styles are almost the same as they are in CSS,
 * except replacing dash-case with camelCase - for example, fontWeight instead
 * of font-weight, as shown below.
 */
const highlightedParagraph = document.querySelector(".highlight");
highlightedParagraph.style.color = "red";
highlightedParagraph.style.fontWeight = "bold";

/**
 * Calculates a random integer.
 *
 * @param {number} min the minimum value to return
 * @param {number} max the maximum value to return
 * @returns an integer between min and max, inclusive.
 */
function randomIntegerBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Pick a random Pokemon Pokedex number
const dexNumber = randomIntegerBetween(1, 386);

/**
 * This `` syntax is a string template literal. It lets us add values into the string using
 * the ${} syntax. Here we are using it to add the value of the dexNumber variable above into our string.
 *
 * So, for example, if dexNumber is 149, then imgSrc will be equal to:
 * <https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/149.png>
 */
const imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${dexNumber}.png`;

// Set the image src
const image = document.querySelector("img");
image.src = imgSrc;
