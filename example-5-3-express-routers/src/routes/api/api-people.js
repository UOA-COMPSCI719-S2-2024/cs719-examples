import express from "express";
import {
  retrievePeople,
  retrievePeopleByLastName,
  retrievePersonById
} from "../../data/people-dao.js";

const router = express.Router();

/**
 * This route handler will respond to a GET request to "/api/people" (e.g. http://localhost:3000/api/people).
 * It wil return a JSON array of all people by default. Or, if the "lastName" query parameter is supplied,
 * it will instead return an array of only those people whose lastName matches the query.
 */
router.get("/", (req, res) => {
  /**
   * Read the lastName query parameter. If the URL was ..../api/people?lastName=Oak, then
   * this lastName variable would equal "Oak". If the lastName query parameter is not supplied, this
   * will be undefined.
   */
  const lastName = req.query.lastName;

  // If there's no query parameter supplied, just return an array of all people.
  if (!lastName) return res.json(retrievePeople());

  // If the firstName query parameter is supplied, instead return an array of all people whose last names match the filter.
  return res.json(retrievePeopleByLastName(lastName));
});

/**
 * This route handler will respond to a GET request to "/api/people/:id", where :id is the id of a person.
 * If that person exists, it will be returned as JSON. Otherwise, a 404 (Not Found) error code will be returned.
 */
router.get("/:id", (req, res) => {
  // req.params contains all route parameters. Here, we're getting the value of the id param.
  const id = req.params.id;

  // Find the person with the matching id
  const person = retrievePersonById(id);

  // If there is a match, return that person as JSON
  if (person) return res.json(person);

  // Otherwise, return a 404 (Not Found) error code
  return res.sendStatus(404);
});

export default router;
