import express from "express";

/**
 * Create a new express Router
 */
const router = express.Router();

/**
 * This route handler will respond to a GET request to the "/" path (e.g. http://localhost:3000/). It will
 * return an HTTP 200 (OK) response with the given JSON data.
 */
router.get("/", (req, res) => {
  /**
   * res.json() will return a 200 OK response, with Content-Type = application/json, and a JSON string equal
   * to the result of calling JSON.stringify() on the given JavaScript object.
   */
  return res.json({ message: "Hello, world!" });
});

/**
 * Add child routes
 */
import apiRoutes from "./api/api.js";
router.use("/api", apiRoutes);

/**
 * Export the router so it can be used outside.
 */
export default router;
