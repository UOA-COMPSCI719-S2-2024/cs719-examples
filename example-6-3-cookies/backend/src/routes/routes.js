import express from "express";

/**
 * Create a new express Router
 */
const router = express.Router();

/**
 * Add child routes
 */
import apiRoutes from "./api/api.js";
router.use("/api", apiRoutes);

/**
 * Export the router so it can be used outside.
 */
export default router;
