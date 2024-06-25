import express from "express";

const router = express.Router();

// import child routes
import routes from "./api-cookies.js";
router.use("/cookies", routes);

export default router;
