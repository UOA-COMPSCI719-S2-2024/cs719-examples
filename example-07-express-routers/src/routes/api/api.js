import express from "express";

const router = express.Router();

// import child routes
import peopleRoutes from "./api-people.js";
router.use("/people", peopleRoutes);

import productsRoutes from "./api-products.js";
router.use("/products", productsRoutes);

export default router;
