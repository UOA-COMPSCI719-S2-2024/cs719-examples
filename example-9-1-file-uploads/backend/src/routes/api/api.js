import express from "express";

const router = express.Router();

// import child routes
import routes from "./api-upload.js";
router.use("/uploads", routes);

export default router;
