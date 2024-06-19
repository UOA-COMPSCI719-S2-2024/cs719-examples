/**
 * Gets the numbers entered by the user in the #num1 and #num2 inputs,
 * calculates their sum, and displays it in the #result paragraph.
 */
function calculateSum() {
  // Get input elements
  const num1Input = document.querySelector("#num1");
  const num2Input = document.querySelector("#num2");

  // Get the values of the inputs. All input values are strings, so we need to parse them as numbers.
  const num1 = parseFloat(num1Input.value);
  const num2 = parseFloat(num2Input.value);

  // Calculate the sum
  const sum = num1 + num2;

  // Get the result paragraph and display the sum
  const resultParagraph = document.querySelector("#result");
  resultParagraph.textContent = `Sum: ${sum}`;
}

/**
 * Add event listener to the button which will call the calculateSum
 * function above when it is clicked.
 */
const calculateButton = document.querySelector("#calculateButton");
calculateButton.addEventListener("click", calculateSum);
