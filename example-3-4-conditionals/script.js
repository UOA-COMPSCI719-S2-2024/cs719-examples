function checkAge() {
  const ageInput = document.querySelector("#ageInput");
  const resultParagraph = document.querySelector("#result");

  const age = parseInt(ageInput.value);

  // The following if-else block will run the code inside the first matching condition.

  if (age < 1) {
    // If age is less than 1, this code will run.
    resultParagraph.textContent = "Invalid age. Please enter a valid age.";
  } else if (age < 18) {
    // If age is between 1 and 17 inclusive, this code will run.
    resultParagraph.textContent = "You are a minor.";
  } else if (age < 120) {
    // If age is between 18 and 119 inclusive, this code will run.
    resultParagraph.textContent = "You are an adult.";
  } else {
    // If age is 120 or higher, this code will run.
    resultParagraph.textContent = "Wow, you're really old!";
  }
}

const checkButton = document.querySelector("#checkButton");
checkButton.addEventListener("click", checkAge);
