/** ChatGPT genned array of people. */
const people = [
  {
    id: 1,
    firstName: "Ash",
    lastName: "Ketchum",
    email: "ash.ketchum@email.com"
  },
  {
    id: 2,
    firstName: "Misty",
    lastName: "Waterflower",
    email: "misty.waterflower@email.com"
  },
  {
    id: 3,
    firstName: "Brock",
    lastName: "Harrison",
    email: "brock.harrison@email.com"
  },
  {
    id: 4,
    firstName: "Serena",
    lastName: "Yvonne",
    email: "serena.yvonne@email.com"
  },
  {
    id: 5,
    firstName: "Gary",
    lastName: "Oak",
    email: "gary.oak@email.com"
  },
  {
    id: 6,
    firstName: "May",
    lastName: "Maple",
    email: "may.maple@email.com"
  },
  {
    id: 7,
    firstName: "Dawn",
    lastName: "Berlitz",
    email: "dawn.berlitz@email.com"
  },
  {
    id: 8,
    firstName: "Clemont",
    lastName: "Lemon",
    email: "clemont.lemon@email.com"
  },
  {
    id: 9,
    firstName: "Samuel",
    lastName: "Oak",
    email: "samuel.oak@email.com"
  },
  {
    id: 10,
    firstName: "Giovanni",
    lastName: "Sakaki",
    email: "giovanni.sakaki@email.com"
  }
];

/**
 * Retrieves an array of all people.
 *
 * @returns an array of all people
 */
export function retrievePeople() {
  return people;
}

/**
 * Retrieves an array of all people whose lastName matches the given name.
 * @param {string} lastName the lastName to match
 * @returns an array of matching people (an empty array if no matches)
 */
export function retrievePeopleByLastName(lastName) {
  return people.filter((p) => p.lastName === lastName);
}

/**
 * Retrieves a person with the matching id. Returns undefined if no match.
 * @param {*} id the id to match
 * @returns a person, or undefined.
 */
export function retrievePersonById(id) {
  return people.find((p) => p.id == id);
}
