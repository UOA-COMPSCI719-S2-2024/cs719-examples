import express from "express";

const router = express.Router();

// import child routes
import customersRoutes from "./api-customers.js";
router.use("/customers", customersRoutes);

export default router;
