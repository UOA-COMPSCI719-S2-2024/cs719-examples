import express from "express";
import { products } from "../../data/products.js";

const router = express.Router();

// Responds to a GET request to /api/products by returning a JSON array of all product data.
router.get("/", (req, res) => {
  return res.json(products);
});

export default router;
