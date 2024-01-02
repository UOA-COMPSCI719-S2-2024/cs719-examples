import express from "express";
import { retrieveCustomers } from "../../data/customers-dao.js";

const router = express.Router();

/**
 * GET /api/customers - Returns a JSON array of customers, with status code 200 (OK).
 */
router.get("/", (req, res) => {
  return res.json(retrieveCustomers());
});

export default router;