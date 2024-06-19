/**
 * This variable respresents a person. A person is a more complex data type than just a number,
 * string, or boolean.
 */
const person = {
  // Some properties of this person are simple values (strings, numbers, etc).
  firstName: "Walter",
  lastName: "White",
  isAlive: false,
  age: 52,

  // This person's address is itself another JS object, with its own properties.
  address: {
    streetAddress: "308 Negra Arroyo Lane",
    city: "Albuquerque",
    state: "NM",
    country: "USA",
  },

  // This person's phoneNumbers are an Array of JS objects, each with their own properties.
  phoneNumbers: [
    { type: "home", number: "212 555-1234" },
    { type: "office", number: "646 555-4567" },
    { type: "mobile", number: "123 456-7890" },
  ],

  // Walter is not married by the end of the series, so their spouse is null :(
  spouse: null,
};

displayPerson(person);

/**
 * Displays the given person in the #info div.
 *
 * @param person the person to display
 */
function displayPerson(person) {
  const div = document.querySelector("#info");

  displayName(person, div);
  displayAddress(person, div);
  displayPhoneNumbers(person, div);
}

/**
 * Adds a paragraph with the person's name to the given div.
 *
 * @param person the person whose name to display
 * @param div the div where the info should be displayed
 */
function displayName(person, div) {
  div.innerHTML += `<p>Name: ${person.firstName} ${person.lastName}</p>`;
}

/**
 * Adds a paragraph with the person's address to the given div.
 *
 * @param person the person whose address to display
 * @param div the div where the info should be displayed
 */
function displayAddress(person, div) {
  const add = person.address;
  div.innerHTML += `<p>Address: ${add.streetAddress}, ${add.city}, ${add.state}, ${add.country}</p>`;
}

/**
 * Adds a list (<ol>) with the person's phone numbers to the given div.
 *
 * @param person the person whose phone numbers to display
 * @param div the div where the info should be displayed
 */
function displayPhoneNumbers(person, div) {
  // Create a paragraph, with an <ol> inside, and append it to the div.
  const p = document.createElement("p");
  p.innerText = "Phone numbers:";
  const list = document.createElement("ol");
  div.appendChild(p);
  p.appendChild(list);

  // Add a <li> for each phone number. We are looping using forEach and an arrow function.
  const phNums = person.phoneNumbers;
  phNums.forEach((phNum) => {
    list.innerHTML += `<li>${phNum.number} (${phNum.type})</li>`;
  });
}

// Exercise: Try modifying this code to display some of Walt's other data!